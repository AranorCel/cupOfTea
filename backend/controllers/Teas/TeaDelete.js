import teaModel from "../../models/teaModel.js";

// Delete Tea
export default async (req, res, next) => {
    const id = req.query.id
    let tea;
    try {
        tea = await teaModel.findByIdAndRemove(id)
    } catch (err) {
        return console.log(err)
    }
    if(!tea) {
        return res.status(500).json({ message : 'This product no longer exists'})
    }
    return res.status(200).json({ message : 'Successfully deleted'});
}