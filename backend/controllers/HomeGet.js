import Client from "../models/clientModel.js"
import Seller from "../models/sellerModel.js";
import Tea from "../models/teaModel.js";
import axios from "axios"

export default async (req, res) => {
    const data = await Tea.find();
    res.json(data);
};


//? Exemple de requête filtrée (ici par la catégorie de thé : "noir" et demande de renvoi uniquement le nom : 1 mais pas l'id 0)
// export default async (req, res) => {
//     const query = {category : "Noir"};
//     const project = {_id:0, name:1};

//     //? on récupère la data "filtrée" par les query et projects précédents
//     const reponse = await axios.post(`http://${process.env.MYHOSTNAME}:${process.env.PORT}/api/teas`, {query, project})
//     res.send(reponse.data)
// }

