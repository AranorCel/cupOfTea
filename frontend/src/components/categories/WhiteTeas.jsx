import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom"
import axios from 'axios';

const WhiteTeas = () => {
    const [data, setData] = useState([])

    const getData = () => {
        const url = `/api/teas`;
        const all = ([
            { $match: { category: 'Thé blanc' } },
            { $limit: 3 }
        ])
        axios.post(url, { all })
            .then((result) => { return result.data.teas })
            .then((res) => {
                if (res.length > 0) {
                    // console.log(res);
                    setData(res)
                }
            })
    }

    useEffect(() => { getData() }, [])

    return (
        <>
            <section className="tea">
                <img src="img/tea/4.jpg" alt="Tasse de thé blanc" />
                <h2><span>Thé blanc</span></h2>
                <p className="clear">Le thé blanc est une spécialité de la province chinoise du Fujian. De toutes les familles de thé, c'est celle dont la feuille est la moins transformée par rapport à son état naturel. Non oxydé, le thé blanc ne subit que deux opérations : un flétrissage et une dessiccation. Il existe deux grands types de thés blancs : les Aiguilles d'Argent et les Bai Mu Dan.</p>
                <section className="listing-product">
                    {
                        data.map((product, u) =>
                            <article key={u}>
                                <h3>{data[u].name}</h3>
                                <img src={data[u].img} alt="thé en vrac" />
                                <section className="price">
                                    <p>À partir de <strong>{data[u].unitPrice}€</strong></p>
                                </section>
                                <NavLink className="btn" to={`/product/${data[u]._id}`}>Voir ce produit</NavLink>
                            </article>
                        )
                    }
                </section>
            </section>
        </>
    )
}

export default WhiteTeas