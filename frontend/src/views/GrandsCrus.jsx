import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom"
import axios from 'axios';

const GrandsCrus = () => {

    const [grandCru, setGrandCru] = useState([])
    const getGrandCru = async () => {
        const all = ([
            { $match: { isGrandCru: { $eq: true } } },
            { $project: { _id: 1, name: 1, detail: 1, img: 1, unitPrice: 1, category: 1 } },
        ])
        const url = `/api/teas`
        const response = await axios.post(url, { all })
        setGrandCru(response.data.teas)
    }

    useEffect(() => {
        getGrandCru()
        // console.log(grandCru)
    }, [])

    return (
        <>
            <section className="teaTime">
                {grandCru.map((g, i) =>
                    <article key={i} className="new">
                        {grandCru &&
                            <>
                                <h2><span>Notre grand cru</span></h2>
                                <img src={g.img} alt={g.name} />
                                <h3>{g.name}</h3>
                                <p>{g.detail && (g.detail.substring(0, 150)).concat(g.detail.length > 150 ? "..." : "")}</p>
                                <section className="price">
                                    <p>À partir de <strong>{g.unitPrice} €</strong></p>
                                </section>
                                <NavLink className="btn" to={`/product/${g._id}`}>Voir ce produit</NavLink>
                            </>
                        }
                    </article>
                )}
            </section>
        </>
    )
}

export default GrandsCrus