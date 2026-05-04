const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.url === '/employees') {

        fs.readFile('employees.json', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });

    }
});

server.listen(3000, () => console.log("Server running on 3000"));