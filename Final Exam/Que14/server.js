const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    if (req.url === '/users') {
        fs.readFile('data.json', (err, data) => {
            res.writeHead(200, { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(data);
        });
    }

});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});