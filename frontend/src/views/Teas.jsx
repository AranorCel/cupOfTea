import React, { useState, useEffect } from 'react'
import BlackTeas from '../components/categories/BlackTeas'
import GreenTeas from "../components/categories/GreenTeas"
import WhiteTeas from "../components/categories/WhiteTeas"
import Rooibos from "../components/categories/Rooibos"
import Oolong from "../components/categories/Oolong"

const Teas = () => {

    return (
        <>
            <main className="container">
                <GreenTeas />
                <BlackTeas />
                <WhiteTeas />
                <Rooibos />
                <Oolong />
            </main>
        </>
    )
}

export default Teas