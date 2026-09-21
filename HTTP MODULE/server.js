import http from "http";

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end("Hello, Welcome to Node.js HTTP Server!");
});

server.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});