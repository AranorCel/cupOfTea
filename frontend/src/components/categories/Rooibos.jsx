import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom"
import axios from 'axios';

const Rooibos = () => {
    const [data, setData] = useState([])
    
    const getData = () => {
        const url = `/api/teas`;
        const all = ([
            { $match: { category: 'Rooibos' } },
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
                <img src="img/tea/5.jpg" alt="Tasse de rooibos" />
                <h2><span>Rooibos</span></h2>
                <p className="clear">Le Rooibos (appelé thé rouge bien qu'il ne s'agisse pas de thé) est une plante poussant uniquement en Afrique du Sud et qui ne contient pas du tout de théine. Son infusion donne une boisson très agréable, ronde et légèrement sucrée. Riche en antioxydants, faible en tanins et dénué de théine, le Rooibos peut être dégusté en journée comme en soirée.</p>
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

export default Rooibos