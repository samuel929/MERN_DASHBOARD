import Transaction from "../Models/Transaction.js";
import Users from '../Models/users.js'
import getCountryIso3 from 'country-iso-2-to-3'
import User from "../Models/users.js"
export const getCustomers= async(req,res)=>{
    try{
       const customers=await Users.find({role:"user"}).select("-password");
       res.status(200).json(customers)
       
    }catch(err){
      res.status(404).json(err)
    }
}

export const getTransaction=async(req,res)=>{
  try{
    const {page=1,pageSize=20,sort=null,search=""}=req.query;

   const generateSort=()=>{
     const sortParsed=JSON.parse(sort);
     const sortFormatted={
       [sortParsed.field]:sortParsed.sort='asc' ? 1 : -1
     }
    return sortFormatted
   }
    const sortFormatted=Boolean(sort) ? generateSort() : {};
    const transactions=await Transaction.find({
      $or:[ {cost:{$regex:new RegExp(search,"i")}},
            {userId:{$regex:new RegExp(search,"i")}}
     ]
    }).sort(sortFormatted)
    .skip(page*pageSize)
    .limit(pageSize)

    const total=await Transaction.countDocuments({
      name:{$regex:search,$options:"i"}
    })
    res.status(200).json({
      transactions,
      total
    })
    
 }catch(err){
   res.status(404).json(err)
 }
}


export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
