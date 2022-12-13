import validator from "express-validator"

export default (req, res, next) => {
    console.log("coucou de ClientAuth");
    const {login, email, password, address: {firstname, lastname, streetNumber, addInfo, streetName, postalCode, city}, goldMember, phone} = req.body
    login.isAlpha(),
    firstname.isAlpha(),
    lastname.isAlpha(),
    streetNumber.isNumber(),
    city.isAlpha(),
    goldMember.isBoolean(),
    phone.isMobilePhone(),
    email.isEmail(),
    postalCode.isPostalCode(),
    password.isStrongPassword(),
    next();
}