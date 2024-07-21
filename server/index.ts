const express = require("express");
const dotenv = require("dotenv");
const path = require('path')
const router = require('./routes/api')

import  { Express, Request, Response } from "express";;
import { connectDB } from './database';
import cors from 'cors'
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);
app.use(cors)

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, async () => {
  await connectDB();
  console.log(`[server]: Server is  running at http://localhost:${port}`);
});
