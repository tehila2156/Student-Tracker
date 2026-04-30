import city from "../models/city.js";


export const getAll=(req,res)=>{
    city.find()
     .then(c=>
     {
        res.send(c)
     }
     )
      .catch(err => {
        res.send({error: err.message});  
     });
}


export const Add_city=(req,res)=>
    {
        //לבדוק האם המשתמש כבר מחובר 

        const { cityName,apartments } = req.body;
        if (!cityName || !apartments  === undefined)
          return res.status(400) .send({error:`There is a nullable fileds`})
        const newcity=new city(
            {
                cityName,
                apartments
       
            }
        )
        newcity.save()
        .then(c=>
        {
            return res.status(201).send({message:`This city is Added`,c})
        }
        )
        .catch(err=>
        {
            return res.status(400).send({error:err.message})
        }
        )

      
    
    }
    