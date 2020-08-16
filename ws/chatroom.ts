import { WebSocket, isWebSocketCloseEvent, isWebSocketPingEvent } from 'https://deno.land/std/ws/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

let sockets = new Map<string, WebSocket>();

interface BroadcastObj {
	name: string,
	msg: string,
};

const broadcastEvent = (obj: BroadcastObj) => {
	sockets.forEach((ws: WebSocket) => {
		ws.send(JSON.stringify(obj));
	});
};

const chatConnection = async (ws: WebSocket) => {
	// add new ws connection to map
	const uid = v4.generate();
	sockets.set(uid, ws);

	try {
		for await (const ev of ws) {
			console.log(ev);
	
			if (typeof ev === 'string') {
				console.log('ws:Text', ev);

				let evObj = JSON.parse(ev);
				broadcastEvent(evObj);
			} else if (ev instanceof Uint8Array) {
				console.log('ws:Binary', ev);
			} else if (isWebSocketPingEvent(ev)) {
				const [, body] = ev;
        // ping
        console.log('ws:Ping', body);
			} else if (isWebSocketCloseEvent(ev)) {
				const { code, reason } = ev;
				console.log('ws:Close', code, reason);
				
				sockets.delete(uid);
			}
		}
	} catch(err) {
		console.error(`failed to receive frame: ${err}`);
		
		if (!ws.isClosed) {
			await ws.close(1000).catch(console.error);
		}
	}
};

export { chatConnection };