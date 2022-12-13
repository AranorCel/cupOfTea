import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
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
    const navigate = useNavigate();
    console.log(state)

    const getData = async () => {
        const query = { _id: id }
        const project = { _id: 1, name: 1, ref: 1, detail: 1, img: 1, unitPrice: 1, description: 1, reviews: 1, bagSize: 1, category : 1 }
        const url = `/api/tea`
        const response = await axios.post(url, { query, project })
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
            discount : parseFloat(response.data.tea.bagSize[0].reducePrice),
            notes : response.data.tea.reviews.map(r => r.notes),
            image : response.data.tea.img,
        })
    }

    const handleValidate = () => {
        const myProduct = {...product, quantity : parseFloat(myRef.current.innerText), bagSize : product.bagSize.filter(p => p.reducePrice === product.discount)[0].size, idClient : state?.idClient || null};
        delete myProduct.detail;
        delete myProduct.description;
        delete myProduct.notes;
        
        console.log(myProduct);
        dispatch({type : "cart/addProduct", payload : myProduct});
        navigate("/")
    }

    useEffect(() => {
        getData()
       
    }, [])


    const handleSelect = (e) => {
        setProduct({...product, discount : parseFloat(e.target.value) })
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
                            <p>Note : {product?.notes?.reduce((a, b) => (a + b))}</p>
                            <ProductRating value={product?.notes?.reduce((a, b) => (a + b))}/>
                            <NavLink to={`/product/${product.reviews}`}>Voir les avis clients</NavLink>
                        </div>
                    </section>
                    <section className="product-quantity">
                        <img src={product.image} alt="thé en vrac" />
                        <div className="price">
                            {product.bagSize && (
                                <>
                                    <select className="quantity" onChange={handleSelect}>
                                        {product?.bagSize.map((pochette, i) => <option key={i} value={pochette.reducePrice}>Pochette de {pochette.size} gr</option>)}
                                    </select>
                                    
                                </>
                            )}
                            <ButtonProduct myRef={myRef} unitPrice={product.unitPrice} discount={product.discount}/>
                            {/* <button onClick={showMe}>Show Me</button> */}

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