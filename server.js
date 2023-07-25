const http = require('http'); 
const app = require('./app');

//defining the port on which server will run
const port = process.env.PORT || 3000;

//creating the server to run on app
const server = http.createServer(app);

//listening the server on defined port
server.listen(port, ()=>{
    console.log("Server has been started on port" + port)
})