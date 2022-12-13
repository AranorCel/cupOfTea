import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom"
import axios from 'axios';

const Category = () => {

    const [category, setCategory] = useState([])
    // num pour les numéros des images dans le dossier assets hors DB
    const num = [1, 2, 3, 4, 5]

    const getCategory = async () => {
        const all = ([
            { $group: { _id: null, category: { $addToSet: "$category" } } },
            { $unwind: "$category" },
            { $project: { _id: 0, category: 1 } },
        ])
        const url = `/api/teas`
        const response = await axios.post(url, { all })
        setCategory(response.data.teas)
    }

    useEffect(() => {
        getCategory()
    }, [])

    return (
        <>
            {
                category.map((c, i) =>
                    <NavLink key={i} to="/teas">
                        <img src={`img/tea/${num[i]}.jpg`} alt={c.category} />
                        <h3>{c.category}</h3>
                    </NavLink>
                )
            }
        </>
    )
}

export default Category