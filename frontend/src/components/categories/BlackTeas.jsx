import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom"
import axios from 'axios';

const BlackTeas = () => {

    const [data, setData] = useState([])
    const getData = () => {
        const url = `/api/teas`;
        const all = ([
            { $match: { category: 'Thé noir' } },
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
                <img src="img/tea/1.jpg" alt="Tasse de thé noir" />
                <h2><span>Thé noir</span></h2>
                <p className="clear">Le thé noir, que les chinois appellent thé rouge en référence à la couleur cuivrée de son infusion, est un thé complètement oxydé. La fabrication du thé noir se fait en cinq étapes : le flétrissage, le roulage, l'oxydation, la torréfaction et le triage. Cette dernière opération permet de différencier les différents grades.</p>
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

export default BlackTeas