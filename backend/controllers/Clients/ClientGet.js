import Client  from "../../models/clientModel.js"
import bcrypt from "bcrypt"

export default async (req, res) => {
    let client
    console.log("Depuis ClientAPI", req.body)
    try {
        client = await Client.findOne({email : req.body.email});
    } catch (err) {
        res.status(500).json({ message: `Erreur du serveur`})
        return console.log(err);
    }

    if (!client) {
        return res.status(404).json({ message: `L'utilisateur n'existe pas.`});
    }

    const isPasswordCorrect =  await bcrypt.compare(req.body.password, client.password);
    if (!isPasswordCorrect){
        return res.status(404).json({ message: `Mot de passe incorrect.` });
    }

    return res.status(201).json({client})
}