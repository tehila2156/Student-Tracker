import express from 'express';
import { getAdvertiserById, getAll, register, sign_in, updateAdvertiser } from '../controlers/advertiser.js';
import { checkAuth } from '../controlers/midelwere.js';

const advertiserrouter=express.Router();
advertiserrouter.post("/register",register)
advertiserrouter.post("/sign-in",sign_in)
advertiserrouter.post("/update/:id",checkAuth,updateAdvertiser)
advertiserrouter.get("/getById/:id",getAdvertiserById)
advertiserrouter.get("/getAll",getAll)

export default advertiserrouter;
