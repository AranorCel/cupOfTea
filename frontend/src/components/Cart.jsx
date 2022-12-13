import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material'

const Cart = () => {
    const [cart, setCart] = useState([])
    const [client, setClient] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const state = useSelector(state => state.cartList)

    const getStarted = async () => {
        const res = await dispatch({ type: "cart/isAlreadyLogin" })
        setCart(state.cart.map(product =>
            [
                { label: "Id", value: product.idProduct, type: "hidden" },
                { label: "Ref", value: product.ref, type: "text" },
                { label: "Nom", value: product.name, type: "text" },
                { label: "Catégorie", value: product.category, type: "text" },
                { label: "Image", value: product.image, type: "img" },
                { label: "Format", value: product.bagSize, type: "text" },
                { label: "Quantité", value: product.quantity, type: "value" },
                { label: "Prix Unitaire", value: product.unitPrice, type: "hidden" },
                { label: "Reduction", value: product.discount, type: "hidden" },
                { label: "Prix", value: product.unitPrice * product.quantity * (1 - product.discount), type: "text" },
            ]
        ))
        setClient(state.idClient)
    }

    useEffect(() => {
        getStarted()
    }, [])


    const modifyQty = (arg) => {
        const tmpCart = [...cart]

        //Modification de la Quantité
        tmpCart[arg.row.nbRow][6].value = Math.max(tmpCart[arg.row.nbRow][6].value + arg.action, 0);

        //Modification du Prix (total)
        tmpCart[arg.row.nbRow][9].value = tmpCart[arg.row.nbRow][6].value * tmpCart[arg.row.nbRow][7].value * (1 - tmpCart[arg.row.nbRow][8].value)
        setCart(tmpCart);
    }

    const generateOrder = () => {
        const tmpCart = []
        for (let product of cart) {
            const tmpProduct = {
                type: product[0].value,
                name: product[2].value,
                bagSize: product[5].value,
                quantity: product[6].value,
                price: parseFloat(product[9].value).toFixed(2),
            }
            tmpCart.push(tmpProduct)
        }


        return {
            client: client.id,
            cart: tmpCart,
            paymentMethod: "CB",
            shippingPrice: 3.99,
            totalPrice: cart.map(product => product[9].value).reduce((a, b) => a + b),
            shoppingPlace: "website",
            shippingAddress: client.address,
            isValidated: true,
            isPaid: true,
            isShipped: true,
            isDelivered: true
        }
    }

    const postOrder = async () => {
        let res
        const myOrder = generateOrder()
        try {
            res = await axios.post(`/api/createOrder`, myOrder)
        } catch (err) {
            console.log(err)
            return
        }
        dispatch({ type: "cart/clearCart" })
        console.log(myOrder)
        navigate("/payment")
    }

    return (
        <>
            <h2>VOTRE PANIER</h2>
            <h3>{client?.firstname} {client?.lastname} {client?.address?.city}</h3>
            {(cart.length > 0) &&
                <>
                    <TableContainer component={Paper}>
                        <Table aria-label='Cart' stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {cart[0].flatMap((header, i) => (header.type === "hidden" ? [] : <TableCell key={i}>{header.label}</TableCell>))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.flatMap((row, nbRow) => (
                                    <TableRow key={nbRow} sx={{ '& last-child td, &:last-child th': { border: 0 } }} >
                                        {row.flatMap((field, i) => (field.type === "hidden" ? [] :
                                            <TableCell key={i}>
                                                {(field.type === "text" && field.value)}
                                                {(field.type === "img" && <img src={field.value} alt="" height="50" width="50" />)}
                                                {(field.type === "value" && (
                                                    <>
                                                        <button onClick={() => modifyQty({ row: { nbRow }, action: -1 })}>-</button>
                                                        <input type="text" value={field.value} disabled />
                                                        <button onClick={() => modifyQty({ row: { nbRow }, action: 1 })}>+</button>
                                                    </>
                                                ))}
                                            </TableCell>))}
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell>
                                        <p>Total : {parseFloat(cart.map(product => product[9].value).reduce((a, b) => a + b)).toFixed(2).toString().replace('.', '€')}</p>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <button onClick={postOrder}>Valider le panier</button>
                </>
            }
        </>
    )
}

export default Cart