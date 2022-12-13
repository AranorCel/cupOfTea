import teaModel from "../../models/teaModel.js";

// Post Tea
export default async (req, res, next) => {
    let existingTea; 
    try {
        existingTea = await teaModel.findOne({ref: req.body.ref})
    } catch (err) {
        return console.log(err);
    }
    if(existingTea) {
        return res.status(400).json({ message : 'This ref product already exists'})
    }

    const tea = new teaModel ({...req.body})

    try {
        await tea.save();
    } catch (err) {
        return console.log(err);
    }
    return res.status(201).json({tea})
};