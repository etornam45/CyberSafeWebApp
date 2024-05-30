import type { IncomingMessage, ServerResponse, Server } from "http";
import { Server as ioServer } from "socket.io";


export function attach_sockets(
    server : any
) {

    const io = new ioServer(server, { cors: { origin: "*" } });

    io.on('connection', (socket) => {
        socket.emit('eventFromServer', {
            speaker: "Server",
            timestamp: new Date().toISOString(),
            message: 'Welcome to the chat!'
        })
        socket.on('eventFromClient', (data) => {
            // Send data to all connected clients
            io.emit('eventFromServer', data)
            // console.log(data)
        })
    })
}