import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.server = http.createServer(app);

//Middlewares
app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.get('/', (req, res) => res.send("Hello world"));

app.server.listen(process.env.PORT || 3000);

export default app;