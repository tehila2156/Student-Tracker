import advertiser from "../models/advertiser.js";
import apartment from "../models/apartment.js";

export const Add_apartment = async (req, res) => {




  const {
    apartmentName,
    description,
    src,
    categoryCode,
    cityCode,
    address,
    numofbeds,
    Extras,
    price,
    asvertiserCode,
  } = req.body;

  try {
    const newApartment = new apartment({
      apartmentName,
      description,
      src,
      categoryCode,
      cityCode,
      address,
      numofbeds,
      Extras,
      price,
      asvertiserCode,
    });

    const savedApartment = await newApartment.save();

    const foundAdvertiser = await advertiser.findById(asvertiserCode);

    if (!foundAdvertiser) {
      return res.status(404).send({ error: 'Advertiser not found' });
    }

    foundAdvertiser.apartments.push(savedApartment._id);
    await foundAdvertiser.save();

    return res
      .status(201)
      .send({ message: 'This apartment is added', apartment: savedApartment });

  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};
export const deleteApartment = (req, res) => {
  apartment.findByIdAndDelete(req.params.id)
    .then(deletedApartment => {
      if (!deletedApartment) {
        return res.status(404).send({ message: 'Apartment not found' });
      }

      // הסרה של הדירה ממערך הדירות של המפרסם
      advertiser.findById(deletedApartment.asvertiserCode)
        .then(foundAdvertiser => {
          if (foundAdvertiser) {
            foundAdvertiser.apartments = foundAdvertiser.apartments.filter(
              aptId => aptId.toString() !== deletedApartment._id.toString()
            );
            foundAdvertiser.save()
              .then(() => {
                return res.status(200).send({ message: 'Apartment deleted', apartment: deletedApartment });
              })
              .catch(err => res.status(500).send({ error: err.message }));
          } else {
            // אם המפרסם לא נמצא, עדיין מחזירים הצלחה על מחיקת הדירה
            return res.status(200).send({ message: 'Apartment deleted', apartment: deletedApartment });
          }
        })
        .catch(err => res.status(500).send({ error: err.message }));
    })
    .catch(err => {
      return res.status(500).send({ error: err.message });
    });
};





//עדכון
export const update = (req, res) => {
  apartment.findByIdAndUpdate(req.params.id, req.body, { new: true })

    .then(c => {
      if (!c)
        return res.status(404).send({ message: 'apartment not found' });
      res.status(200).send({ message: "apartment updated", c });
    })
    .catch(err =>
      res.status(400).send({ error: err.message })
    );
};


export const getAll = (req, res) => {
  apartment.find()
    .populate('categoryCode', 'categoryName')
    .populate('cityCode', 'cityName')
    .populate('asvertiserCode', 'name phone email')
    .then(a => {
      res.send(a);
    })
    .catch(err => {
      res.send({ error: err.message });
    });
};


export const getById = (req, res) => {
  //לבדוק האם הוא מחובר

  apartment.findById(req.params.id)
    .populate('categoryCode', 'categoryName')
    .populate('cityCode', 'cityName')
    .populate('asvertiserCode', 'name phone email')
    .then(c =>
      res.send(c))
    .catch(err =>
      res.send({ error: err.message }));

}



export const getByCategoryCode = (req, res) => {
  //לבדוק האם הוא מחובר

  apartment.find({ categoryCode: req.params.code })
    .populate('categoryCode', 'categoryName')
    .populate('cityCode', 'cityName')
    .populate('asvertiserCode', 'name phone email')
    .then(c =>
      res.send(c))
    .catch(err =>
      res.send({ error: err.message }));

}

export const getByCityCode = (req, res) => {
  //לבדוק האם הוא מחובר

  apartment.find({ cityCode: req.params.code })
    .populate('categoryCode', 'categoryName')
    .populate('cityCode', 'cityName')
    .populate('asvertiserCode', 'name phone email')
    .then(c =>
      res.send(c))
    .catch(err =>
      res.send({ error: err.message }));

}


export const getByAdvertiserCode = (req, res) => {
  //לבדוק האם הוא מחובר
  
  apartment.find({ asvertiserCode: req.params.code })
    .populate('categoryCode', 'categoryName')
    .populate('cityCode', 'cityName')
    .populate('asvertiserCode', 'name phone email')
    .then(c =>
      res.send(c))
    .catch(err =>
      res.send({ error: err.message }));

}






export const getByLessThen5Beds = (req, res) => {
  //לבדוק האם הוא מחובר

  apartment.find({ numofbeds: { $lt: 5 } })
    .populate('categoryCode', 'categoryName')
    .populate('cityCode', 'cityName')
    .populate('asvertiserCode', 'name phone email')
    .then(c =>
      res.send(c))
    .catch(err =>
      res.send({ error: err.message }));

}

export const getByMoreThen5Beds = (req, res) => {
  //לבדוק האם הוא מחובר

  apartment.find({ numofbeds: { $gt: 5 } })
    .populate('categoryCode', 'categoryName')
    .populate('cityCode', 'cityName')
    .populate('asvertiserCode', 'name phone email')
    .then(c =>
      res.send(c))
    .catch(err =>
      res.send({ error: err.message }));
}


export const getByMoreThen15Beds = (req, res) => {
  //לבדוק האם הוא מחובר

  apartment.find({ numofbeds: { $gt: 15 } })
    .populate('categoryCode', 'categoryName')
    .populate('cityCode', 'cityName')
    .populate('asvertiserCode', 'name phone email')
    .then(c =>
      res.send(c))
    .catch(err =>
      res.send({ error: err.message }));
}





export const getByLessThen500Price = (req, res) => {
  //לבדוק האם הוא מחובר

  apartment.find({ price: { $lt: 500 } })
    .populate('categoryCode', 'categoryName')
    .populate('cityCode', 'cityName')
    .populate('asvertiserCode', 'name phone email')
    .then(c =>
      res.send(c))
    .catch(err =>
      res.send({ error: err.message }));

}

export const getByMoreThen500Price = (req, res) => {
  //לבדוק האם הוא מחובר

  apartment.find({ price: { $gt: 500 } })
    .populate('categoryCode', 'categoryName')
    .populate('cityCode', 'cityName')
    .populate('asvertiserCode', 'name phone email')
    .then(c =>
      res.send(c))
    .catch(err =>
      res.send({ error: err.message }));
}


export const getByMoreThen1500Price = (req, res) => {
  //לבדוק האם הוא מחובר

  apartment.find({ price: { $gt: 1500 } })
    .populate('categoryCode', 'categoryName')
    .populate('cityCode', 'cityName')
    .populate('asvertiserCode', 'name phone email')
    .then(c =>
      res.send(c))
    .catch(err =>
      res.send({ error: err.message }));
}


















/*
  export const deleteapartment = (req, res) => {
    Category.findByIdAndDelete(req.params.id)
      .then(c => {
        if (!c)
          return res.status(404).send({ message: 'Category not found' });
        res.status(200).send({ message: `Category deleted, id = ${c.id}` });
      })
      .catch(err =>
        res.status(500).send({ error: err.message })
      );
  };
*/

