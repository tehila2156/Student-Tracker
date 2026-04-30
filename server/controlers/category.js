import category from "../models/category.js";

export const getAll=(req,res)=>{
    category.find()
     .then(c=>
     {
        res.send(c)
     }
     )
      .catch(err => {
        res.send({error: err.message});  
     });
}




export const Add_category=(req,res)=>
    {
        //לבדוק האם המשתמש כבר מחובר 

        const { categoryName,apartments } = req.body;
        if (!categoryName || !apartments  === undefined)
          return res.status(400) .send({error:`There is a nullable fileds`})
        const newcategory=new category(
            {
                categoryName,
                apartments
       
            }
        )
        newcategory.save()
        .then(c=>
        {
            return res.status(201).send({message:`This category is Added`,c})
        }
        )
        .catch(err=>
        {
            return res.status(400).send({error:err.message})
        }
        )

      
    }