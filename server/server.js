const cors = require("cors");
const express = require("express");
const mysql = require("mysql2");
const utils = require("./utils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const DEFAULT_ERROR_MESSAGE =
  "Something went wrong, please consult with your provider!";

const sendMessage = async (number, message) => {
  try {
    if (Array.isArray(number)) {
      const results = await Promise.all(
        number.map((num) => {
          twilioClient.messages
            .create({
              body: message,
              to: num, // Text your number
              from: process.env.TWILIO_NUMBER, // From a valid Twilio number
            })
            .then(async (response) => {
              await utils.saveMessage(
                message,
                process.env.TWILIO_NUMBER,
                num,
                response.sid,
                db
              );
            });
        })
      );
    } else {
      twilioClient.messages
        .create({
          body: message,
          to: number, // Text your number
          from: process.env.TWILIO_NUMBER, // From a valid Twilio number
        })
        .then(async (response) => {
          await utils.saveMessage(
            message,
            process.env.TWILIO_NUMBER,
            number,
            response.sid,
            db
          );
        });
    }
  } catch (err) {
    console.log(err);
  }
};

const formatAddress = (address) => {
  const [streetNumber, ...rest] = address.split(" ");
  const streetName = rest.join(" ");

  return { streetNumber, streetName };
};

const app = express();
app.use(
  cors({
    origin: [
      "https://bagelsroundtop.com",
      "https://www.bagelsroundtop.com",
      "http://localhost:3001",
      "http://127.0.0.1:3001",
    ],
  })
);
app.use(express.json()); // receive form data
// app.use(express.urlencoded({extended: true, limit: '1mb'}))
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const STRIPE_DOMAIN = `${process.env.APP_DOMAIN}\sutton-encore`;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ errMessage: "Token is not valid!" });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ errMessage: "You are not authenticated!" });
  }
};

const generateToken = (user, secret, noExpiry = true) => {
  return jwt.sign(user, secret, noExpiry ? {} : { expiresIn: "2h" });
};

app.get("/", async (req, res) => {
  res.json({ message: "connected" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await db
    .promise()
    .query("SELECT * FROM users where username = ?", [username]);

  if (user[0].length) {
    // check if password is correct
    if (!(await bcrypt.compareSync(password, user[0][0].password))) {
      return res
        .status(401)
        .json({ errMessage: "Username or password is incorrect." });
    }

    const data = user[0][0];
    // generate access token
    const accessToken = generateToken(
      data,
      process.env.JWT_ACCESS_SECRET_KEY,
      false
    );

    res.status(200).json({
      username: data.username,
      isAdmin: data.isAdmin,
      accessToken,
    });
  } else {
    res.status(401).json({ errMessage: "Username or password is incorrect." });
  }
});

// verify of access token saved in localStorage is still valid
app.post("/verifyToken", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const accessToken = authHeader.split(" ")[1];

    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json({ errMessage: "Token is not valid!" });
      } else {
        res.status(200).json({
          accessToken,
          isAdmin: user.isAdmin,
          username: user.username,
        });
      }
    });
  }
});

app.post("/logout", verify, async (req, res) => {
  res.status(200).json({ message: "You have logged out successfully!" });
});

app.post("/subscribe", async (req, res) => {
  const {
    name,
    phone_number,
    postal_code,
    quantity,
    email,
    city,
    accept_sms_notification,
    accept_email_notification,
    address,
    apartment,
  } = req.body;

  const formattedAddress = formatAddress(address);

  const user = {
    name,
    phone_number,
    postal_code,
    quantity,
    city,
    status: 1,
    created_date: new Date(),
    email,
    accept_sms_notification,
    accept_email_notification,
    street_name: formattedAddress.streetName,
    street_number: formattedAddress.streetNumber,
    apartment,
  };

  try {
    // get the user data saved from the db
    const userData = await db
      .promise()
      .query("SELECT * FROM subscribers WHERE phone_number = ?", [
        phone_number,
      ]);

    if (userData[0].length) {
      return res.status(400).send({
        errMessage:
          "Le numéro de téléphone est déjà abonné. Restez à l'écoute des mises à jour !",
      });
    }

    const data = await db
      .promise()
      .query("INSERT INTO temp_subscribers SET ?", user);

    res.send({
      message: "Successfully subscribed! Stay tuned for more details.",
      userId: data[0].insertId,
    });
  } catch (err) {
    console.log("error >>>>>>>>>>>>", error);
    res.status(400).send({
      errMessage: DEFAULT_ERROR_MESSAGE,
    });
  }
});

// Used for updating the subscriber data
app.post("/update-subscriber", verify, async (req, res) => {
  const {
    name,
    phone_number,
    postal_code,
    quantity,
    email,
    id,
    route_id,
    subscription_id,
    customer_id,
    accept_sms_notification,
    accept_email_notification,
    address,
    apartment,
  } = req.body;

  const formattedAddress = formatAddress(address);

  const user = {
    name,
    phone_number,
    postal_code,
    quantity,
    updated_date: new Date(),
    email,
    route_id,
    accept_sms_notification,
    accept_email_notification,
    street_name: formattedAddress.streetName,
    street_number: formattedAddress.streetNumber,
    apartment,
  };

  try {
    // get the user data saved from the db
    const userData = await db
      .promise()
      .query("SELECT * FROM subscribers WHERE id = ?", [id]);

    if (route_id && userData[0][0].route_id !== Number(route_id)) {
      // query route for the actual delivery_day data
      const route = await db
        .promise()
        .query(`SELECT delivery_day from routes WHERE id="${route_id}"`);

      // retrieve the current subscription for the default_payment_method
      const currentSubscription = await stripe.subscriptions.retrieve(
        subscription_id
      );

      // fetch the price id
      const prices = await stripe.prices.list({
        lookup_keys: [`${quantity}`],
        expand: ["data.product"],
      });

      // create new subscription for that has correct billing_cycle_anchor
      const newSubscription = await stripe.subscriptions.create({
        customer: customer_id,
        default_payment_method: currentSubscription.default_payment_method,
        billing_cycle_anchor: utils.getStartDay(route[0][0].delivery_day),
        proration_behavior: "none",
        items: [
          {
            price: prices.data[0].id,
          },
        ],
      });

      // update the db with the new subscription_id
      await db
        .promise()
        .query(
          `UPDATE subscribers SET subscription_id="${newSubscription.id}" WHERE id = "${id}" `
        );

      // cancel old subscription as its billing_cycle_anchor is not correct
      await stripe.subscriptions.cancel(subscription_id);
    }

    // update the subscribers data
    await db
      .promise()
      .query("UPDATE subscribers SET ? WHERE id = ? ", [user, id]);

    res.status(200).send({
      message: "Successfully updated subscriber data.",
    });
  } catch (err) {
    console.log("error >>>>>>>>>>>>", err);
    res.status(400).json({
      errMessage: DEFAULT_ERROR_MESSAGE,
    });
  }
});

// Used for fetching subscribers
app.get("/customers", verify, async (req, res) => {
  try {
    let data = await db.promise().query(
      `SELECT subscribers.*, status.description AS status_desc, 
      CONCAT(subscribers.street_number, ' ', subscribers.street_name) AS address
      FROM subscribers AS subscribers
      LEFT JOIN STATUS ON status.id = subscribers.status
      ORDER BY subscribers.id DESC`
    );
    res.json(data[0]);
  } catch (error) {
    console.log("error >>>>>>>>>>>>", error);
    res.status(400).json({
      errMessage: DEFAULT_ERROR_MESSAGE,
    });
  }
});

// Used for sending SMS
app.post("/sendSMS", async (req, res) => {
  const { phone_number, message } = req.body;

  try {
    await sendMessage(phone_number, message);
    res.status(200).json({
      message: `You have successfully sent a message to ${phone_number}`,
    });
  } catch (error) {
    console.log("error >>>>>>>>>>>>", error);
    res.status(400).json({ errMessage: DEFAULT_ERROR_MESSAGE });
  }
});

// Used for broadcasting sms to all of the subscribers in a specific route
app.post("/broadcast-sms", verify, async (req, res) => {
  const { route, message, isUpdateStatus } = req.body;

  const subscribers = await db
    .promise()
    .query(
      "SELECT * FROM subscribers WHERE route_id = ? AND status = '1' ORDER BY id DESC",
      [route]
    );

  const routeData = await db
    .promise()
    .query("SELECT name FROM routes WHERE id = ?", [route]);

  if (isUpdateStatus) {
    await db
      .promise()
      .query(
        "UPDATE subscribers SET delivery_status='2' WHERE route_id = ? AND status = '1'",
        [route]
      );

    await db
      .promise()
      .query("UPDATE routes SET delivery_status='2' WHERE id = ?", [route]);
  }

  if (subscribers[0].length) {
    try {
      const numbers = await Promise.all(
        subscribers[0].map((subscriber) => subscriber.phone_number)
      );

      await sendMessage(numbers, message);
      res.status(200).json({
        message: `You have successfully broadcast a text message to ${routeData[0][0].name}`,
        route,
      });
    } catch (error) {
      console.log("error >>>>>>>>>>>>", error);
      res.status(400).json({ errMessage: DEFAULT_ERROR_MESSAGE });
    }
  } else {
    res.status(400).json({
      errMessage: "No subscribers in this route.",
    });
  }
});

// Used for creating checkout session
app.post("/create-checkout-session", async (req, res) => {
  const { name, email, address, city, postal_code, apartment, phone_number } =
    req.body.user_info;
  try {
    const prices = await stripe.prices.list({
      lookup_keys: [`${req.body.lookup_key}`],
      expand: ["data.product"],
    });

    //FOR TESTING PURPOSES ONLY AND MUST BE REMOVED
    const testClock = await stripe.testHelpers.testClocks.create({
      frozen_time: Math.floor(new Date().getTime() / 1000),
    });

    const customer = await stripe.customers.create({
      name,
      email,
      test_clock: testClock.id,
      address: {
        line1: address,
        line2: apartment,
        city,
        postal_code,
      },
      phone: phone_number,
    });

    const currentDate = new Date();

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      billing_address_collection: "auto",
      line_items: [
        {
          price: prices.data[0].id,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      //Used to set the billing period to start on the next monday for date uniformity when billing the customers
      subscription_data: {
        billing_cycle_anchor: utils.getStartDay(currentDate.getDay()),
        proration_behavior: "none",
      },
      mode: "subscription",
      success_url: `${process.env.APP_DOMAIN}/success/{CHECKOUT_SESSION_ID}__${req.body.userId}`,
      cancel_url: `${process.env.APP_DOMAIN}`,
    });

    if (session?.url) {
      res.json({ url: session.url, clientSecret: session.client_secret });
    }
  } catch (err) {
    console.log("error >>>>>>>>>>>>", error);
    res.status(400).send({
      errMessage: DEFAULT_ERROR_MESSAGE,
    });
  }
});

// Used for cancel subscription
app.post("/cancel-subscription", async (req, res) => {
  try {
    await stripe.subscriptions.cancel(req.body.subscriptionId);
    //SET subscription_id of the newly subscribed user
    db.promise().query("UPDATE subscribers SET status='2' where id= ? ", [
      req.body.id,
    ]);

    res
      .status(200)
      .json({ message: "Customer subscription is successfully cancelled." });
  } catch (error) {
    console.log("error >>>>>>>>>>>>", error);
    res.status(400).json({ errMessage: DEFAULT_ERROR_MESSAGE });
  }
});

// Used for setting value to subscription_id for reference
app.post("/set-subscription", async (req, res) => {
  const { session_id: params } = req.body;
  const session_id = params.split("__")[0];
  const user_id = params.split("__")[1];

  try {
    const data = await stripe.checkout.sessions.retrieve(session_id);

    const tempQuery = await db
      .promise()
      .query("SELECT * FROM temp_subscribers WHERE id = ? ", [user_id]);

    const tempUser = tempQuery[0][0];

    await db
      .promise()
      .query("DELETE FROM temp_subscribers WHERE id = ?", [tempUser.id]);

    delete tempUser.id;
    tempUser.subscription_id = data.subscription;
    tempUser.customer_id = data.customer;

    await db.promise().query("INSERT INTO subscribers SET ?", tempUser);

    const successMessage =
      "Bagels Round Top vous souhaite la bienvenue! Votre abonnement à nos bons bagels frais est matinenant activé. À bientôt!";

    await sendMessage(
      tempUser.phone_number,
      "Félicitations! Vous êtes maintenant un membre VIP de Sutton Encore! Vanessa communiquera avec vous par texto pour les avantages VIP"
    );

    res.json({ subscriptionId: data.subscription, message: successMessage });
  } catch (error) {
    console.log("error >>>>>>>>>>>>", error);
    res.status(400).send({
      errMessage: DEFAULT_ERROR_MESSAGE,
    });
  }
});

// Used for client unsubscribe
app.post("/unsubscribe", async (req, res) => {
  const subscriber = await db
    .promise()
    .query("SELECT * FROM subscribers where phone_number = ?", [
      req.body.phoneNumber,
    ]);

  if (subscriber[0].length === 0) {
    res.status(400).json({ errMessage: "Phone number is incorrect." });
  } else {
    //SET subscriber status to unsubscribing and will go to inactive after responding unsubscribe to the text message
    await db
      .promise()
      .query("UPDATE subscribers SET status = ? WHERE id = ? ", [
        2,
        subscriber[0][0].id,
      ]);

    const message =
      "Vous êtes désabonné des livraisons de bagels.  Passez quand même nous voir à la fabrique! 1 Principale Sud à Sutton";

    await sendMessage(subscriber[0][0].phone_number, message);

    res.status(200).json({ message });
  }
});

//Used for retrieving subscription info
app.get("/retrieve-subscription", async (req, res) => {
  const { subscription_id } = req.query;

  const data = await stripe.invoices.list({ subscription: subscription_id });
  res.json({ data: data.data });
});

//UNUSED
app.post("/create-portal-session", async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { session_id } = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = STRIPE_DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: process.env.APP_DOMAIN,
  });

  res.json({ url: portalSession.url });
});

app.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    let event = request.body;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = process.env.STRIPE_SECRET;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    let subscription;
    let status;
    // Handle the event
    switch (event.type) {
      case "customer.subscription.trial_will_end":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case "customer.subscription.deleted":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break;
      case "customer.subscription.created":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
        break;
      case "customer.subscription.updated":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break;
      case "checkout.session.async_payment_failed":
        const checkoutSessionAsyncPaymentFailed = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        break;
      case "checkout.session.async_payment_succeeded":
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        break;
      case "subscription_schedule.aborted":
        const subscriptionScheduleAborted = event.data.object;
        // Then define and call a function to handle the event subscription_schedule.aborted
        break;
      case "subscription_schedule.canceled":
        const subscriptionScheduleCanceled = event.data.object;
        // Then define and call a function to handle the event subscription_schedule.canceled
        break;
      case "subscription_schedule.expiring":
        const subscriptionScheduleExpiring = event.data.object;
        // Then define and call a function to handle the event subscription_schedule.expiring
        break;
      // ... handle other event types
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.listen(8001, () => {
  console.log(`Server is running on port 8001.`);
});
