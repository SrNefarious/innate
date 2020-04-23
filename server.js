require("dotenv").config();
var app = require("./app");
var server = require("http").createServer(app);
var port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server Running on Port :: ${port}`);
});
