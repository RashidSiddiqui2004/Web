var http = require("http");

var app = http.createServer(function (req, res) {
    res.writeHead(200);
    res.end("bye!!");
});

app.listen(8001, () => {
    console.log("Server listening on port 8001!");
});