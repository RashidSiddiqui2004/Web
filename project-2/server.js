const net = require('net');

const server = net.createServer((socket) => {
    console.log('Client connected!');

    socket.write('Hello, Client! Ready to communicate?');

    socket.on('data', (data) => {
        const message = data.toString();
        console.log(`Client: ${message}`);

        if (message.toLowerCase() === 'exit') {
            console.log('Client disconnected.');
            socket.end();
        } else {
            process.stdout.write('Server: ');
            process.stdin.once('data', (input) => {
                socket.write(input.toString());
            });
        }
    });

    socket.on('end', () => {
        console.log('Connection closed by the client.');
    });
});

server.listen(5000, '127.0.0.1', () => {
    console.log('Server is listening on port 5000...');
});
