import { serve } from 'https://deno.land/std/http/server.ts';
import { acceptWebSocket, acceptable } from 'https://deno.land/std/ws/mod.ts';
import { chatConnection } from './ws/chatroom.ts';

const server = serve({ port: 443 });
console.log('websocket server started');

for await (const req of server) {
	if (req.url === '/') {
		req.respond({
			status: 200,
			body: await Deno.open('./public/index.html')
		});
	}
	if (req.url === '/style.css') {
		req.respond({
			status: 200,
			body: await Deno.open('./public/style.css')
		});
	}
	if (req.url === '/favicon.ico') {
		req.respond({ status: 404 });
	}

	if (req.url === '/ws') {
		if (acceptable(req)) {
			acceptWebSocket({
				conn: req.conn,
				bufReader: req.r,
				bufWriter: req.w,
				headers: req.headers,
			})
			.then(chatConnection);
		}
	}
}