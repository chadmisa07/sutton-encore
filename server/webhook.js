const cors = require("cors");
const express = require("express");
const mysql = require("mysql2");

require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const utils = require("./utils");

const { MessagingResponse } = require("twilio").twiml;

const app = express();
app.use(cors({ origin: [process.env.APP_DOMAIN] }));
app.use(express.json()); // receive form data
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.get("/", async (req, res) => {
  res.json({ message: "connected" });
});

app.post("/", async (req, res) => {
  console.log("@@@@ body >>>>", req.body);
  console.log("@@@@ headers >>>>", req.headers);
  const twiml = new MessagingResponse();

  const { Body, From, MessageSid, To } = req.body;

  if (req?.body?.Body?.toLowerCase().includes("non")) {
    //Get subscriber data based on contact number
    const subscriber = await db.promise().query(
      `SELECT subscribers.*, routes.delivery_day FROM subscribers
        LEFT JOIN routes ON routes.id = subscribers.route_id
        WHERE phone_number= ?`,
      [From]
    );

    if (subscriber[0].length && subscriber[0][0].delivery_status === 2) {
      try {
        //Update delivery_status
        await db
          .promise()
          .query(
            "UPDATE subscribers SET delivery_status='3' WHERE phone_number = ? AND status = '1'",
            [From]
          );

        const subscription = await stripe.subscriptions.retrieve(
          subscriber[0][0].subscription_id
        );

        const ONE_DAY = 1 * 24 * 60 * 60;

        const updatedSubscription = await stripe.subscriptions.update(
          subscriber[0][0].subscription_id,
          {
            pause_collection: {
              behavior: "void",
              // Set resume date to be the current period end date + 1 day so that it will skip billing the current cycle
              resumes_at: subscription.current_period_end + ONE_DAY,
            },
          }
        );

        //Save message data
        await utils.saveMessage(
          Body,
          From,
          process.env.TWILIO_NUMBER,
          MessageSid,
          db
        );

        //Set status to inactive
        // await db
        //   .promise()
        //   .query(
        //     `UPDATE subscribers SET status="2" WHERE phone_number="${From}"`
        //   );

        const message = `Confirmation: votre livraison de bagels pour cette semaine sera annulée. À la semaine prochaine! (visitez https://bagelsroundtop.com pour d'autres options)`;

        //Save message data
        await utils.saveMessage(
          message,
          process.env.TWILIO_NUMBER,
          From,
          MessageSid,
          db
        );
        twiml.message(message);
      } catch (error) {
        console.log("@@@@@@@@@@@@ error >>>>>>>>>>>>>>>>>>>>", error);
      }
    }
  } else if (
    Body.toLowerCase().includes("désabonner") ||
    Body.toLowerCase().includes("desabonner")
  ) {
    const subscriber = await db
      .promise()
      .query("SELECT * FROM subscribers where phone_number = ?", [
        req.body.From,
      ]);

    if (subscriber[0].length === 0) {
      return res.status(400).json({ errMessage: "Record not found" });
    } else if (subscriber[0][0].status === 1) {
      try {
        await stripe.subscriptions.cancel(subscriber[0][0].subscription_id);

        //SET subscriber status to inactive
        await db
          .promise()
          .query("UPDATE subscribers SET status = ? WHERE id = ? ", [
            2,
            subscriber[0][0].id,
          ]);

        //Save message data
        await utils.saveMessage(Body, From, To, MessageSid, db);

        const message =
          "Vous êtes désabonné des livraisons de bagels.  Passez quand même nous voir à la fabrique! 1 Principale Sud à Sutton";

        //Save message data
        await utils.saveMessage(Body, From, To, MessageSid, db);
        twiml.message(message);
      } catch (error) {
        console.log("error >>>>>>>>>>>>", error);
      }
    }
  } else {
    twiml.message("The Robots are coming! Head for the hills!");
  }

  res.type("text/xml").send(twiml.toString());
});

app.listen(8001, () => {
  console.log("Express server listening on port 8001");
});
