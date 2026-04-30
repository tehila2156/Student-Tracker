import mongoose from 'mongoose'



const cityschema = new mongoose.Schema({
  
cityName:String
  });
  export default mongoose.model('city', cityschema);
  

