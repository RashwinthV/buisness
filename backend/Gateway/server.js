const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const cors = require("cors");

app.use(cors());

const userService = createProxyMiddleware({
  target: "http://localhost:4010",
  changeOrigin: true,
});

const BussinessService = createProxyMiddleware({
  target: "http://localhost:4011",
  changeOrigin: true,
});


app.use('/v1',userService)
app.use('/v2',BussinessService)

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Gateway is running on port: ${port}`);
});
