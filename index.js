const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/getToken", async (req, res) => {
  try {
    // Send a POST request
    const response = await axios.post(
      process.env.GENERATE_TOKEN_URL,
      req.data,
      {
        headers: {
          "Api-key": process.env.apiKey,
        },
      }
    );

    const { data } = response;

    if (!data.status) {
      res.send(data.errors || "Failed to generate token");
    } else {
      res.send(data.data);
    }
  } catch (err) {
    throw new Error(err);
  }
});

app.post("/getProducts", async (req, res) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    res.status(404).send({ message: "authToken is missing!" });
  }
  try {
    // Send a POST request
    const response = await axios.post(
      process.env.GET_PRODUCTS_URL,
      {
        session_id: process.env.SESSION_ID,
      },
      {
        headers: {
          "Api-key": process.env.apiKey,
          "Auth-token": authToken,
        },
      }
    );

    const { data } = response;

    if (!data.status) {
      res.send(data.errors || "Failed to get Products");
    } else {
      res.json(data.data);
    }
  } catch (err) {
    res.send(err);
  }
});

// Starts the server
app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
