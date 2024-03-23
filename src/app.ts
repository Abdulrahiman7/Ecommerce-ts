import express from 'express';

import { mongoConnect } from './util/database';
import adminRoutes from './routes/admin';
import userRoutes from './routes/user';

const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Or '*' for any domain
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.use(adminRoutes);
app.use(userRoutes);

mongoConnect(()=>{
    app.listen(3000);
})
