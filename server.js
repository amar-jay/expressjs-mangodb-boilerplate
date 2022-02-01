// Loads the configuration from config.env to process.env
require('dotenv').config({ path: './.env' });

const express = require('express');
const cors = require('cors');
// get MongoDB driver connection
const dbo = require('./db/conn');

const PORT = process.env.PORT || 9000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(require('./routes/record'));

// Global error handling
app.use(function (err, _req, res) {
	console.error("Global Error: ", err.stack);
//	res.status(400).send('Something broke!');
});

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error("Error:", err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
  });
});
