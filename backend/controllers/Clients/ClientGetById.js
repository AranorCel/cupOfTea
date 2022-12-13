import clientModel from '../../models/clientModel.js';

//? Get Clients
export default async (req, res) => {
    let myClient;
    try {
        myClient = await clientModel.findById(req.query.id);
    } catch (err) {
        console.log(err)
    } if (!myClient) {
        res.status(404).json({ message: 'No Client Found' })
    } else {
        return res.status(200).json( {myClient} );
    }
};



