import express from 'express';
import path from 'path';
import './redux/remote';
import './index.html';

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.use(express.static(path.join(__dirname, 'client')));

app.listen(3000);
