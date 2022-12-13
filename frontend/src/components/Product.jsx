import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
import ProductRating from "./Rating"
import ButtonProduct from './ButtonProduct';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [count, setCount] = useState(1);
    const [pochette, setPochete] = useState({});
    const dispatch = useDispatch();
    const state = useSelector(state => state.cartList);
    console.log("1 ", state)

    const getData = async () => {
        const query = { _id: id }
        const project = { _id: 1, name: 1, ref: 1, detail: 1, img: 1, unitPrice: 1, description: 1, reviews: 1, bagSize: 1, category : 1 }
        const url = `/api/tea`
        const response = await axios.post(url, { query, project })
        console.log("2 ", state)
        setProduct({
            idProduct: response.data.tea._id,
            ref: response.data.tea.ref,
            name: response.data.tea.name,
            category : response.data.tea.category,
            description : response.data.tea.description,
            detail : response.data.tea.detail,
            bagSize : response.data.tea.bagSize,
            quantity : 0,
            unitPrice : response.data.tea.unitPrice,
            discount : 0,
            notes : response.data.tea.notes,
            img : response.data.tea.img,
            idClient : state?.idClient,
        })
        // setProduct(newProduct)
        // console.log(newProduct)
        // setProduct(response.data.tea)
    }

    const handleValidate = (e) => {

    }

    useEffect(() => {
        getData()
    }, [])

    const handleRating = (e) => {
        // console.log(e)
    }

    const handleClick = (e) => {

    }

    const handleSelect = (e) => {
        
    }

    const myRef = useRef(0)

    const showMe = () => {
        // console.log(myRef.current.innerText)
        setCount(parseInt(myRef.current.innerText))
    }

    return (
        <>
            <main className="container">
                <section className="product">
                    <section className="product-detail">
                        <div className="product-name">
                            <h1>{product.name}</h1>
                            <h2>{product.description}</h2>
                            <p>Ref. {product.ref}</p>
                        </div>
                        <div className="rating">
                            {/* <p>Note moyenne : {product?.reviews?.map(u => u.notes).reduce((a, b) => (a) + (b))}</p> */}
                            <ProductRating handleChange={handleRating} /> Note : {product?.reviews?.map(u => u.notes).reduce((a, b) => (a) + (b))}
                            <NavLink to={`/product/${product.reviews}`}>Voir les avis clients</NavLink>
                        </div>
                    </section>
                    <section className="product-quantity">
                        <img src={product.img} alt="thé en vrac" />
                        <div className="price">
                            {product.bagSize && (
                                <>
                                    <select className="quantity" onChange={handleSelect}>
                                        {product?.bagSize.map((pochette, i) => <option value={pochette} key={i}>Pochette de {pochette.size} gr</option>)}
                                    </select>
                                    <h3>{parseInt(product.unitPrice) * myRef.current.innerText} €</h3>
                                </>
                            )}
                            <ButtonProduct myRef={myRef} />
                            <button onClick={showMe}>Show Me</button>

                            <NavLink className="btn" onClick={(e) => handleValidate(e)}>Ajouter au panier</NavLink>
                            <NavLink className="wishlist" to="/whishlist">Ajouter à ma liste d'envie</NavLink>
                        </div>
                    </section>
                    <section className="product-description">
                        <p>{product.detail}</p>
                        <p><strong>Profitez d'une remise de 5% sur la pochette de 500g (prix déjà remisé).</strong></p>
                        <p><strong>Profitez d'une remise de 10% sur le lot de 2 pochettes de 500g (prix déjà remisé).</strong></p>
                    </section>
                </section>
            </main>
        </>
    )
}

export default Product