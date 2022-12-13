import teaModel from "../../models/teaModel.js";

export default async (req, res) => {
    let tea
    console.log("Depuis TeaGet", req.body.query)
    try {
        tea = await teaModel.findOne(req.body.query, req.body.project);
    } catch (err) {
        res.status(500).json({ message: `Erreur liée à la méthode`})
        return console.log(err);
    }
    if (!tea) {
        return res.status(404).json({ message: `Rien a été trouvé.`});
    }
    console.log(tea)
    return res.status(201).json({tea})
}