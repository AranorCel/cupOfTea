import clientModel from "../../models/clientModel.js";
import bcrypt from 'bcryptjs';

// Update Client
export default async (req, res, next) => {
    let client;
    if(clientModel.findOne({email : req.body.email})) {
        return res
        .status(400)
        .json({ message: 'Email already exists' });
    }
    // Password protection with Bcrypt
    const hashedPassword = bcrypt.hashSync(req.body.password); //! Important to put it before creating a new User so that the newly created pwd will be hashed
    try {
        client = await clientModel.findByIdAndUpdate(
            req.body.id,
            {...req.body, password : hashedPassword},
            {
                new: true
            }
        )

    } catch (err) {
        return console.log(err);
    }
    if (!client) {
        return res.status(500).json({ message: 'This client does not exist' })
    }
    return res.status(200).json( {client} )
}
