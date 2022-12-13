import { Client } from "../models/clientModel.js"
import axios from "axios"

export default (req, res) => {
    const myClient = new Client({
        email : "bob.top@gmail.com",
        login: "Bob",
        address: {
            firstname: "Bobby",
            lastname: "Top",
            streetNumber : 12,
            addInfo : "ter",
            streetName: "Rue du général Koening",
            postalCode: 67170,
            city: "Colmar"
        },
        password: "123456789",
        goldMember: "false",
        phone:"0620304050"
    })

    const sendTest = async () => {
        try {
            const test = await axios.post(`http://${process.env.MYHOSTNAME}:${process.env.PORT}/signUp`, myClient)
            .then((res) => console.log(res.data));
        } catch (err) {
            console.log(err)
        }
    }
    sendTest()
    res.redirect("/")
}



