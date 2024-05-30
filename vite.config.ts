import { sveltekit } from '@sveltejs/kit/vite';
import { type ViteDevServer, defineConfig } from 'vite'

import { Server } from 'socket.io'


// import { attach_sockets } from "./sockets";

// const webSocketServer = {
// 	name: "socket.io-server",
// 	configureServer(server: ViteDevServer) {
// 		attach_sockets(server.httpServer!);
// 	},
// };


const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return

		const io = new Server(server.httpServer, {
			path: '/socket.io',
			cors: {
				origin: '*'
			}
		})

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
}

export default defineConfig({
	plugins: [sveltekit(), webSocketServer]
});
