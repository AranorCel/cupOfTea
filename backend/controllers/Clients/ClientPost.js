import clientModel  from "../../models/clientModel.js"
import bcrypt from "bcrypt"

export default async (req, res) => {

    let existingClient;
    console.log("De ClientPost API : ", req.body)
    try {
        existingClient = await clientModel.findOne( {email : req.body.email} );
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Erreur du serveur`})
    }
    if (existingClient) {
        return res.status(400).json('Un utilisateur avec le même email existe déjà.');
    }

    // Password protection with Bcrypt
    const salt = await bcrypt.genSalt(10)
    let hashedPassword
    try {
        hashedPassword = bcrypt.hashSync(req.body.password, salt/* process.env.SALT */);
        console.log("hash : " + hashedPassword)
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: `Erreur du serveur`})
    }
    
    // Creating a new client 
    const client = new clientModel({...req.body, password : hashedPassword, passwordVis : req.body.password});

    try {
        await client.save();
    } catch (err) {
        return console.log(err);
    }
    return res.status(201).json({client})
}