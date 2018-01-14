import express from 'express'
import http from 'http';
import path from 'path';
import WebSocket from 'ws';
import { createStore } from 'redux';
import './redux/remote';
import './index.html';
import { reducer } from './redux';
import { remoteUpdate } from './redux/remote';
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.use(express.static(path.join(__dirname, 'client')));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const store = createStore(reducer);

store.subscribe(() => {
    // Something has changed in the state, let every client know by sending an update action
    const action = remoteUpdate(store.getState());

    wss.clients.forEach(ws => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(action));
        }
    });
});

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(message);
        store.dispatch(JSON.parse(message));
    });
    ws.on('error', (err) => {
        console.log('ws error', err);
    });
    ws.send(JSON.stringify(remoteUpdate(store.getState())));
});

server.listen(3000, function listening() {
  console.log('Listening on %d', server.address().port);
});
