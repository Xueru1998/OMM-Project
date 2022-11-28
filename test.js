//test!!

const http = require("http");
const url = require("url");

const server = http.createServer((req,res)=>{
    console.log("Hey you");
});

server.listen(3501,()=>{
    console.log("Server is running on 3501.");
})