import teaModel from "../../models/teaModel.js";

// Update Tea
export default async (req, res, next) => {
    let tea;
    if(teaModel.findOne({ref : req.body.ref})) {
        return res
        .status(400)
        .json({ message: 'This ref product already exists' });
    }
    try {
        tea = await teaModel.findByIdAndUpdate(
            req.query.id,
            req.body,
            {
                new: true
            }
        )
    
    } catch (err) {
        return console.log(err);
    } 
    if (!tea) {
        return res.status(500).json({message: 'Unable to update the product'})
    }
    return res.status(200).json({tea})
    }