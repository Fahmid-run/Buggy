import cookieParser from 'cookie-parser';
import express from 'express';
import { userRoutes } from './modules/user/user.route';
import bodyParser from 'body-parser';

import cors from "cors"
import configuration from './config';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
  origin: configuration.AppPort,
  credentials:true
}))


app.use("/api/", userRoutes)


export  default app
