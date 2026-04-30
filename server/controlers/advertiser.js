import advertiser from "../models/advertiser.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import apartment from "../models/apartment.js";

dotenv.config();

// הרשמה
export const register = (req, res) => {

  const { name, email, password ,anotherPhone, phone} = req.body

  advertiser.find({ email })
      .then(users => {
          if (users.length > 0) {
              return res.status(400).send({ error: `email already exists` })
          }
  
          const newadvertiser = new advertiser({
              name,
              email,
              password,
              apartments:[],
              anotherPhone,
              phone

          })
           
          newadvertiser.save()
              .then(user => {
                
                const token = jwt.sign(
                  {
                    email:user.email,
                    name:user.name,
                    _id:user._id
                  
                  },
                  process.env.SECRET,
                  { expiresIn: '1d' }
                );
                  res.status(200).send({ user, token })
              })
     console.log("SECRET בעת יצירת הטוקן:", process.env.SECRET);

      })
      .catch(error => {
          res.status(500).send({ error: error.message })
      })
}
  // התחברות
export const sign_in = async (req, res) => {
  try {
    
    const { email, password } = req.body
    const user = await advertiser.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).send("Incorrect email or password 🥲");
    }
    // יצירת טוקן עם פרטים מזהים
    const token = jwt.sign(
      {
        email:user.email,
        name:user.name,
        _id:user._id
      },
      process.env.SECRET,
      { expiresIn: '1d' }
    );
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
export const getAll=(req,res)=>{
    advertiser.find()
     .then(c=>
     {
        res.send(c)
     }
     )
      .catch(err => {
        res.send({error: err.message});  
     });
}
export const getAdvertiserById = (req, res) => {
  const { id } = req.params;

  advertiser.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};
export const updateAdvertiser = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, anotherPhone, password } = req.body;

  advertiser.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      if (name) user.name = name;
      if (email) user.email = email;
      if (phone) user.phone = phone;
      if (anotherPhone) user.anotherPhone = anotherPhone;
      if (password) user.password = password;

      user.save()
        .then((updatedUser) => {
          res.status(200).send(updatedUser);
        })
        .catch((err) => {
          res.status(500).send({ error: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};






