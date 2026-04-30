import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import cityrouter from './router/city.js';
import categoryrouter from './router/category.js';
import advertiserrouter from './router/advertiser.js';
import apartmentrouter from './router/apartment.js';

dotenv.config();

const app = express();
const port = 3001;

// יצירת __dirname ב-ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// הגדרות כלליות
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// חשיפת תיקיית התמונות
app.use("/images", express.static(path.join(__dirname, "images")));

// התחברות למונגו
mongoose.connect("mongodb://127.0.0.1:27017/apartmentDb")
    .then(() => {
        console.log("conection to mongoDb! 😁😁");
    })
    .catch(err => {
        console.error({ error: err });
    });

// ראוטרים
app.use('/city', cityrouter);
app.use('/category', categoryrouter);
app.use('/advertiser', advertiserrouter);
app.use('/apartment', apartmentrouter);

// מאזין
app.listen(port, () => {
    console.log(`my application is running in http://localhost:${port}`);
});
