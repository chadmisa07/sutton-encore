// const mysql = require("mysql2");
// const { exit } = require("process");

// require("dotenv").config();

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// (async function () {
//   //Update delivery_status
//   //   await db
//   //     .promise()
//   //     .query(
//   //       "UPDATE subscribers SET delivery_status='1' WHERE delivery_status='2' OR delivery_status='3'"
//   //     );

//   const day = new Date().getDay() + 2;

//   await db.promise().query(
//     `
//           UPDATE subscribers
//           LEFT JOIN routes ON routes.id = subscribers.route_id
//           LEFT JOIN day ON day.id = routes.delivery_day
//           SET delivery_status='1'
//           WHERE day.id = '${day}';
//       `
//   );

//   exit();
// })();
