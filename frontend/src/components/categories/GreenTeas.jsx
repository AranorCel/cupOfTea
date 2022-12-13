import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom"
import axios from 'axios';

const GreenTeas = () => {

    const [data, setData] = useState([])

    const getData = () => {
        const url = `/api/teas`;
        const all = ([
            { $match: { category: 'Thé vert' } },
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
                <img src="img/tea/2.jpg" alt="Tasse de thé vert" />
                <h2><span>Thé vert</span></h2>
                <p className="clear">Réputé pour ses nombreuses vertus grâce à sa richesse en antioxydants, le thé vert désaltère, tonifie, apaise, fortifie, et procure une incontestable sensation de bien-être. Délicat et peu amer, il est apprécié à tout moment de la journée et propose une palette d'arômes très variés : végétal, minéral, floral, fruité.</p>
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

export default GreenTeas