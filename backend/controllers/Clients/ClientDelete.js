import clientModel from "../../models/clientModel.js";

// Delete Client
export default async (req, res, next) => {

    const id = req.query.id
    let client;
    try {
        client = await clientModel.findByIdAndDelete(id)
    } catch (err) {
        return console.log(err)
    }
    if (!client) {
        return res.status(500).json({ message: 'This client has already been removed' })
    }
    return res.status(200).json({ message: 'Successfully deleted' });
}