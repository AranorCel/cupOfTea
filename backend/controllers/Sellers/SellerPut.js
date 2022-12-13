import sellerModel from "../../models/sellerModel.js";
import bcrypt from 'bcryptjs';

// Update Seller
export default async (req, res, next) => {
    let seller;
    if(sellerModel.findOne({email : req.body.email})) {
        return res
        .status(400)
        .json({ message: 'Email already exists' });
    }
    // Password protection with Bcrypt
    const hashedPassword = bcrypt.hashSync(req.body.password); //! Important to put it before creating a new User so that the newly created pwd will be hashed
    try {
        seller = await sellerModel.findByIdAndUpdate(
            req.body.id,
            {...req.body, password : hashedPassword},
            {
                new: true
            }
        )

    } catch (err) {
        return console.log(err);
    }
    if (!seller) {
        return res.status(500).json({ message: 'This seller does not exist' })
    }
    return res.status(200).json( {seller} )
}
