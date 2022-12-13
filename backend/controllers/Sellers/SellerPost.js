import sellerModel from "../../models/sellerModel.js";
import bcrypt from 'bcryptjs';

// Post Seller
export default async (req, res, next) => {
    let existingSeller;
    try {
        existingSeller = await sellerModel.findOne(req.body.email);
    } catch (err) {
        return console.log(err);
    }
    if (existingSeller) {
        return res
            .status(400)
            .json({ message: 'Seller already exists, please login instead' });
    }

    // Password protection with Bcrypt
    const hashedPassword = bcrypt.hashSync(password); //! Important to put it before creating a new User so that the newly created pwd will be hashed

    // Creating a new client 
    const seller = new sellerModel(
        {...req.body, password: hashedPassword});

    try {
        await seller.save();
    } catch (err) {
        return console.log(err);
    }
    return res.status(201).json( {seller} )
}
