const http=require('http');
const { parse } = require('path');

let tasks=[];
http.createServer((req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,PUT,DELETE,POST");
    res.setHeader("Content-Type","application/json");
    res.setHeader("Access-Control-Allow-Headers","Content-Type");

    if(req.method==="OPTIONS"){
        res.writeHead(200);
        return res.end();
    }

    if(req.method==="GET" && req.url==="/")
    {
        res.end(JSON.stringify(tasks));
    }
    else if(req.method==="POST" && req.url==="/")
    {
        let body="";

        req.on("data",c=>body+=c);
        req.on("end",()=>{
            let task=JSON.parse(body);
            task.id=Date.now();
            tasks.push(task);
            res.end(JSON.stringify(task));
        });
    }

    else if(req.method==="DELETE")
    {
        let id=parseInt(req.url.split("/")[1]);
        tasks=tasks.filter(t=>t.id!==id);
        res.end(JSON.stringify({msg:"Deleted"}));
    }
    else if(req.method==="PUT")
    {
        let id=parseInt(req.url.split("/")[1]);
        let body="";

        req.on("data",c=>body+=c);
        req.on("end",()=>{
            let updated=JSON.parse(body);
            tasks=tasks.map(t=>
                t.id===id?{...tasks,...updated}:t
            );
            res.end(JSON.stringify({msg:"Updated"}))
        });
    }

}).listen(3000,()=>console.log("server started"));