import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Product from './components/Product.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Cart from "./components/Cart.jsx"
import Payment from './components/Payment.jsx'

import Accessories from './views/Accessories.jsx'
import About from './views/About.jsx'
import Home from './views/Home.jsx'
import Teas from "./views/Teas.jsx"
import Grocery from "./views/Grocery.jsx"
import GrandsCrus from "./views/GrandsCrus.jsx"

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: "cart/isAlreadyLogin" })
    }, [])

    return (
        <>
            <BrowserRouter>
                <header>
                    <Header />
                </header>
                <main>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/teas' element={<Teas />} />
                        <Route path='/product/:id' element={<Product />} />
                        <Route path='/grandscrus' element={<GrandsCrus />} />
                        <Route path='/accessories' element={<Accessories />} />
                        <Route path='/grocery' element={<Grocery />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/payment' element={<Payment />} />
                        <Route path='*' element={<Home />} />
                    </Routes>
                </main>
                <footer>
                    <Footer />
                </footer>
            </BrowserRouter>
        </>
    )
}

export default App