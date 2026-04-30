import express from 'express';
import { Add_category, getAll } from '../controlers/category.js';
const categoryrouter=express.Router()
categoryrouter.get('/getAll', getAll)
categoryrouter.post('/Add_category', Add_category)

export default categoryrouter;
