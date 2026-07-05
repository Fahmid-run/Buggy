import cookieParser from 'cookie-parser';
import express from 'express';
import { userRoutes } from './modules/user/user.route';
import bodyParser from 'body-parser';

import cors from "cors"
import configuration from './config';
import { projectController } from './modules/Projects/project.controller';
import { projectRoutes } from './modules/Projects/project.route';
import { bugRoutes } from './modules/bugs/bugs.route';
import { authROute } from './modules/auth/auth.route';
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
  origin: configuration.AppPort,
  credentials:true
}))


app.use("/api/", userRoutes)
app.use('/api/auth', authROute);

app.use('/api/projects', projectRoutes);
app.use('/api/bugs', bugRoutes);

app.get("/", (req, res) => {
  res.end("hello")
})


export  default app
