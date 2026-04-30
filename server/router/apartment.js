import express from 'express';
import { checkAuth } from '../controlers/midelwere.js';
import { Add_apartment, deleteApartment, getAll, getByAdvertiserCode, getByCategoryCode, getByCityCode, getById, getByLessThen500Price, getByLessThen5Beds, getByMoreThen1500Price, getByMoreThen500Price, getByMoreThen5Beds, update } from '../controlers/apartment.js';

const apartmentrouter=express.Router();
apartmentrouter.post('/Add_apartment',checkAuth,Add_apartment);
apartmentrouter.put('/update/:id',checkAuth,update);
apartmentrouter.get('/getAll',getAll);
apartmentrouter.get('/getById/:id',getById);
apartmentrouter.get('/getByCategoryCode/:code',checkAuth,getByCategoryCode);
apartmentrouter.get('/getByCityCode/:code',checkAuth,getByCityCode);
apartmentrouter.get('/getByAdvertiserCode/:code',checkAuth,getByAdvertiserCode);
apartmentrouter.get('/getByLessThen5Beds',checkAuth,getByLessThen5Beds);
apartmentrouter.get('/getByMoreThen5Beds',checkAuth,getByMoreThen5Beds);
apartmentrouter.get('/getByLessThen500Price',checkAuth,getByLessThen500Price);
apartmentrouter.get('/getByMoreThen500Price',checkAuth,getByMoreThen500Price);
apartmentrouter.get('/getByMoreThen1500Price',checkAuth,getByMoreThen1500Price);
apartmentrouter.delete('/deleteApartment/:id',checkAuth,deleteApartment);

export default apartmentrouter;











