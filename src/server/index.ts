import express from 'express';
import serveStatic from 'serve-static';

const app = express();
const port = process.env.PORT || 3000;

app.use(serveStatic('../client/dist'));

app.listen(port);
