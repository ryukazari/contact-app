import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import indexRoutes from './routes/index.routes';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
require('./passport/local-auth');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set('port', port);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({extended: true}));
app.use(session({
    secret: 'contact-app-keyword',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());


app.use(`${process.env.ROUTE_CONTEXT}`, indexRoutes);

export default app;