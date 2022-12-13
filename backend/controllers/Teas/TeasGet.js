import teaModel from "../../models/teaModel.js";

export default async (req, res) => {
    let teas
    console.log("Depuis TeasGet", req.body)
    try {
        teas = await teaModel.aggregate(req.body.all);
    } catch (err) {
        res.status(500).json({ message: `Erreur liée à la méthode`})
        return console.log(err);
    }
    if (!teas) {
        return res.status(404).json({ message: `Rien a été trouvé.`});
    }
    console.log(teas)
    return res.status(201).json({teas})
}