import express from 'express'
import mongoose from 'mongoose';
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import db from "./(kambaz)/database/index.js";
import UserRoutes from "./(kambaz)/users/routes.js";
import ModulesRoutes from './(kambaz)/modules/routes.js';
import "dotenv/config";
import session from "express-session";
import CourseRoutes from "./(kambaz)/courses/routes.js";
import AssignmentsRoutes from './(kambaz)/assignments/routes.js';
import EnrollmentsRoutes from './(kambaz)/enrollments/routes.js';

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);

const app = express()

app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL || "http://localhost:3000",
    })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.SERVER_URL,
    };
}
app.use(session(sessionOptions));

app.use(express.json());
Lab5(app)
Hello(app)
UserRoutes(app);
CourseRoutes(app);
ModulesRoutes(app);
AssignmentsRoutes(app);
EnrollmentsRoutes(app);
app.listen(process.env.PORT || 4000)

