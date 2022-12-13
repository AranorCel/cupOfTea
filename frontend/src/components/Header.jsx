import React, { useEffect, useState } from 'react'
import { NavLink, redirect } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
    const [, setRerender] = useState()
    const state = useSelector(state => state.cartList);
    const dispatch = useDispatch()
    //const navigate = useNavigate()
    useEffect(() => { }, [state])

    const handleClick = () => {
        dispatch({ type: "cart/logout" })
        redirect("/")
        //setRerender({})
    }

    return (
        <>
            <header>
                <img className="ribbon" src="../img/ribbon.svg" alt="élu meilleur thé en 2016" />
                <section className="topbar">Livraison offerte à partir de 65€ d'achat !</section>
                <div className="container">
                    <section className="logo">
                        <NavLink to="/">
                            <img src="/img/logo.png" alt="Logo de Cup of Tea" />
                        </NavLink>
                        <section className="cart">
                            <NavLink to="/cart" activeclassname="active" style={{ color: 'white' }}>
                                <span>Mon panier</span>
                                <strong>{state.totalPrice}</strong>
                                <p>{state.idClient?.firstname} {state.idClient?.lastname}</p>
                            </NavLink>
                        </section>
                    </section>
                    <nav>
                        <NavLink to="/">ACCUEIL</NavLink>
                        <NavLink to="/teas">THÉS</NavLink>
                        <NavLink to="/grandscrus">GRANDS CRUS</NavLink>
                        <NavLink to="/accessories">ACCESSOIRES</NavLink>
                        <NavLink to="/grocery">ÉPICERIE</NavLink>
                        <NavLink to="/about">NOTRE HISTOIRE</NavLink>
                        {state.idClient === null ?
                            <NavLink to="/login">Se connecter</NavLink> :
                            <NavLink to="/" onClick={handleClick}>Se déconnecter</NavLink>}

                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header