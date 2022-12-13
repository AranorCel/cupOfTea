import React, { useEffect, useState } from 'react'
import axios from "axios"
import { NavLink, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import Category from "../components/Category"

const Home = () => {
    const [newProduct, setNewProduct] = useState({})
    const [favourite, setFavourite] = useState({})
    const [bestSeller, setBestSeller] = useState({})

    //? Nombre minimal de caractères à afficher dans la description
    const min = 0;
    //? Nombre maximal de caractères à afficher dans la description
    const max = 150;

    //? Requête vers DB pour obtenir le premier thé qui valide le booléen "isNewProduct"
    const getNewTea = async () => {
        const all = ([
            { $match: { isNewProduct: { $eq: true } } },
            { $project: { _id: 1, name: 1, detail: 1, img: 1, unitPrice: 1, } },
        ])
        const url = `/api/teas`
        const response = await axios.post(url, { all })
        setNewProduct(response.data.teas[0])
    }

    //? Requête vers DB pour obtenir le premier thé qui valide le booléen "isFavourite"
    const getFavourite = async () => {
        const all = ([
            { $match: { isFavourite: { $eq: true } } },
            { $project: { _id: 1, name: 1, detail: 1, img: 1, unitPrice: 1, } },
        ])
        const url = `/api/teas`
        const response = await axios.post(url, { all })
        setFavourite(response.data.teas[0])
    }

    //? Requête vers DB pour obtenir le premier thé qui valide le booléen "isBestSeller"
    const getBestSeller = async () => {
        const all = ([
            { $match: { isBestSeller: { $eq: true } } },
            { $project: { _id: 1, name: 1, detail: 1, img: 1, unitPrice: 1, } },
        ])
        const url = `/api/teas`
        const response = await axios.post(url, { all })
        setBestSeller(response.data.teas[0])
    }

    //? useEffect commun pour gérer l'affichage des 3 thés ciblés (isNewProduct, isFavourite, isBestSeller)
    useEffect(() => {
        getNewTea()
        getBestSeller()
        getFavourite()
        // console.log(newProduct)
    }, [])

    return (
        <>
            <main className="container">
                <section className="noel">
                    <h1>C'est noël chez Cup of Tea, profitez-en !</h1>
                    <img src="img/offre-noel.jpg" alt="Offre spéciale pour noel ! Dès 45€ d'achat, le photophore de noël vous sera offert. Et dès 85€ un thé vert au prune et coing de 100 gramme vous sera offert" />
                    <small>Pour toute commande effectuée avant le 20 décembre</small>
                </section>

                <section className="categorie">
                    <h2><span>Choisissez votre thé</span></h2>

                    <Category />

                </section>

                <section className="teaTime">
                    {newProduct &&
                        <article className="new">
                            <h2><span>Notre nouveauté</span></h2>
                            <img src={newProduct.img} alt={newProduct.name} />
                            <h3>{newProduct.name}</h3>
                            <p>{newProduct.detail && (newProduct.detail.substring(min, max)).concat(newProduct.detail.length > max ? "..." : "")}</p>
                            <section className="price">
                                <p>À partir de <strong>{newProduct.unitPrice} €</strong></p>
                            </section>
                            <NavLink className="btn" to={`/product/${newProduct._id}`}>Voir ce produit</NavLink>
                        </article>}

                    {bestSeller &&
                        <article className="best">
                            <h2><span>Notre best-seller</span></h2>
                            <img src={bestSeller.img} alt={bestSeller.name} />
                            <h3>{bestSeller.name}</h3>
                            <p>{bestSeller.detail && (bestSeller.detail.substring(min, max)).concat(bestSeller.detail.length > max ? "..." : "")}</p>
                            <section className="price">
                                <p>À partir de <strong>{bestSeller.unitPrice} €</strong></p>
                            </section>
                            <NavLink className="btn" to={`/product/${bestSeller._id}`}>Voir ce produit</NavLink>
                        </article>}

                    {favourite &&
                        <article className="crush">
                            <h2><span>Notre coup de coeur</span></h2>
                            <img src={favourite.img} alt={favourite.name} />
                            <h3>{favourite.name}</h3>
                            <p>{favourite.detail && (favourite.detail.substring(min, max)).concat(favourite.detail.length > max ? "..." : "")}</p>
                            <section className="price">
                                <p>À partir de <strong>{favourite.unitPrice} €</strong></p>
                            </section>
                            <NavLink className="btn" to={`/product/${favourite._id}`}>Voir ce produit</NavLink>
                        </article>}
                </section>
            </main>
        </>
    )
}

export default Home