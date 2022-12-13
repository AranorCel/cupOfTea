import clientModel from "../models/clientModel.js";
import sellerModel from "../models/sellerModel.js";

// Login Client
export const loginClient = async (req, res, next) => {
    const { email, password } = req.body;
    let existingClient;
    try {
        existingClient = await clientModel.findOne({ email });
    } catch (err) {
        return console.log(err)
    }
    if (!existingClient) {
        return res.status(404).json({ message: 'Wrong Credentials' });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingClient.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Incorrect Password' });
    }
    return res.status(200).json({ message: 'Login Succesful', user: existingClient })
}

// Login Seller
export const loginSeller = async (req, res, next) => {
    const { email, password } = req.body;
    let existingSeller;
    try {
        existingSeller = await sellerModel.findOne({ email });
    } catch (err) {
        return console.log(err)
    }
    if (!existingSeller) {
        return res.status(404).json({ message: 'Wrong Credentials' });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingSeller.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Incorrect Password' });
    }
}