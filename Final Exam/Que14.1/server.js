const http=require("http");
const fs=require("fs");

const server=http.createServer((req,res)=>{
    if(req.url==="/users")
    {
        fs.readFile("data.json",(err,data)=>{
            res.writeHead(200,{
                "contentType":"application/json",
                "Access-Control-allow-origin":"*"
            });
            res.end(data);
        });
    }
});

server.listen(3000,()=>{console.log("Server started")});