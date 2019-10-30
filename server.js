const http = require("http");

const app = require("./app");

const server = http.createServer(app);
console.log(process.env.PORT || 3001);
server.listen(process.env.PORT || 3001);
