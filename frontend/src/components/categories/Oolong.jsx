import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom"
import axios from 'axios';

const Oolong = () => {

    const [data, setData] = useState([])

    const getData = () => {
        const url = `/api/teas`;
        const all = ([
            { $match: { category: 'Oolong' } },
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
                <img src="img/tea/3.jpg" alt="Tasse de oolong" />
                <h2><span>Oolong</span></h2>
                <p className="clear">Les Oolong, que les chinois appellent thés bleu-vert en référence à la couleur de leurs feuilles infusées, sont des thés semi-oxydés : leur oxydation n'a pas été menée à son terme. Spécialités de Chine et de Taïwan, il en existe une grande variété, en fonction de la région de culture, de l'espèce du théier ou encore du processus de fabrication.</p>
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

export default Oolong