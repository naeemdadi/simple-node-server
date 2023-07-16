const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.get("/getToken", async (req, res) => {
  // Send a POST request
  const response = await fetch(process.env.URL, {
    method: "post",
    headers: {
      "Api-key": process.env.apiKey,
    },
  });

  const data = await response.json();

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
