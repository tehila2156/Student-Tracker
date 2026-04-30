import express from 'express';
import { Add_city, getAll } from '../controlers/city.js';
const cityrouter = express.Router()

cityrouter.get('/getAll', getAll);
cityrouter.post('/Add_city', Add_city)


export default cityrouter;  