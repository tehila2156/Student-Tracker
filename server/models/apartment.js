import mongoose from 'mongoose'


const apartmentschema = new mongoose.Schema({
  apartmentName:String,
  description:String,
  src:String,
  categoryCode:
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'category'
  },
  cityCode:
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'city'
  },  
address:String,
numofbeds:Number,
Extras:String,
price:Number,
asvertiserCode:
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'advertiser'
  }
  });
  
  export default mongoose.model('apartment', apartmentschema);
  

