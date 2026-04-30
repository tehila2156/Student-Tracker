import mongoose from 'mongoose'

const advertiserschema = new mongoose.Schema({

    email: {
         type:String
           },
    name:String ,
    password:String,
    phone:String,
    anotherPhone:String,
    apartments: [{type: mongoose.Schema.Types.ObjectId, ref: 'apartment' }]
     //מערך דירות


  });
  export default mongoose.model('advertiser', advertiserschema);
  
