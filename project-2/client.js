const net = require('net');
 
const client = net.createConnection({ port: 5000, host: '127.0.0.1' }, () => {
    console.log('Connected to the server.');
});
 
client.on('data', (data) => {
    const message = data.toString();
    console.log(`Server: ${message}`);

    if (message.toLowerCase() === 'exit') {
        console.log('Disconnected from server.');
        client.end();
    } else { 
        process.stdout.write('Client: ');
        process.stdin.once('data', (input) => {
            client.write(input.toString());
        });
    }
});
 
client.on('end', () => {
    console.log('Disconnected from the server.');
});
