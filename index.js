const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

axios.defaults.baseURL = process.env.URL;

app.get("/getToken", async (req, res) => {
  // Send a POST request
  const response = await axios.post("/generate-token", req.data, {
    headers: {
      "Api-key": process.env.apiKey,
    },
  });

  const { data } = response;

  if (!data.status) {
    res.send(data.errors || "Failed to generate token");
  } else {
    res.send(data.data);
  }
});

app.post("/getProducts", async (req, res) => {
  const { authToken } = req.body;
  // Send a POST request
  const response = await axios.post(
    "/plan-list",
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
    res.send(data.errors || "Failed to generate token");
  } else {
    res.send(data.data);
  }
});

// Starts the server
app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
