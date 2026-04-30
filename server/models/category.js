import mongoose from 'mongoose'







const categoryschema = new mongoose.Schema({

  categoryName:String
  });
  export default mongoose.model('category', categoryschema);
  

  