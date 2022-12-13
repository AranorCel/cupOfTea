import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    idClient: null,
    cart: [],
    count: 0,
    totalPrice: 0,
    existingCart: [],
}

const storage = "cupOfTea"

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        isAlreadyLogin: (state) => {
            // on importe le localStorage existant
            const data = JSON.parse(localStorage.getItem(storage));
            // S'il n'est pas vide
            if (data !== null) {
                // On regarde si un client était déjà connecté auquel cas on reprend là où il en était
                if (data?.idClient) {
                    //On sauvegarde la valeur dans le store
                    state.idClient = data.idClient || null
                    // On récupère le panier qu'il avait en cours
                    let currentCart = data?.cart.map(product => Object.assign({}, product, { idClient: data?.currentClient }))
                    for (let i = 0; i < data.existingCart.length; i++) {
                        if (data?.existingCart[i]?.idClient?.id === data?.currentClient?.id) {
                            currentCart.push(data?.existingCart.splice(i, 1)[0])
                            i--
                        }
                    }
                    if (currentCart.length) {
                        state.cart = currentCart
                        state.count = state.cart.length
                        state.totalPrice = state?.cart.map((product => product.quantity * product.unitPrice * (1 - product.discount))).reduce((a, b) => a + b, 0)
                        state.existingCart = data.existingCart
                        localStorage.setItem(storage, JSON.stringify(state))
                    }

                    // Sinon on ne fait rien de particulier
                } else {
                    console.log("Aucun stockage en cours")
                }
            } else {
                console.log("Aucun espace n'est créé")
            }
        },

        login: (state, action) => {
            // On login le client en sauvegardant dans le store son id au niveau du state.client
            state.idClient = action.payload

            // S'il y avait des produits dans le panier alors qu'aucun client n'ait été logé, alors on lui affecte les produits

            state.cart = state?.cart.map(product => Object.assign({}, product, { idClient: state.idClient }))


            for (let i = 0; i < state.existingCart.length; i++) {
                if (state?.existingCart[i]?.idClient?.id === state?.idClient?.id) {
                    state.cart.push(state.existingCart.splice(i, 1)[0])
                    i--
                }
            }
            state.count = state?.cart.length
            state.totalPrice = state?.cart.map((product => product.quantity * product.unitPrice * (1 - product.discount))).reduce((a, b) => a + b, 0)

            // on fait le lien ave le local storage
            localStorage.setItem(storage, JSON.stringify(state))
        },

        logout: (state) => {
            state.existingCart = state.existingCart.concat(state.cart)
            state.count = 0
            state.totalPrice = 0
            state.cart.length = 0
            state.idClient = null
            localStorage.setItem(storage, JSON.stringify(state))
        },

        addProduct: (state, action) => {

            const newProduct = {
                idProduct: action.payload.idProduct,
                ref: action.payload.ref,
                name: action.payload.name,
                category: action.payload.category,

                bagSize: action.payload.bagSize,
                quantity: action.payload.quantity,
                unitPrice: action.payload.unitPrice,
                discount: action.payload.discount,

                image: action.payload.image,
                idClient: state.idClient !== null ? state.idClient : null,
            }

            state.cart.push(newProduct)
            state.count++
            state.totalPrice += newProduct.quantity * newProduct.unitPrice * (1 - newProduct.discount)
            localStorage.setItem(storage, JSON.stringify(state))
        },

        deleteProduct: (state, action) => {
            state.cart.splice(action.payload, 1)
            state.count--
            state.totalPrice = state?.cart.map((product => product.quantity * product.unitPrice * (1 - product.discount))).reduce((a, b) => a + b, 0)
            localStorage.setItem(storage, JSON.stringify(state))
        },

        clearCart : (state, action) => {
            state.cart = []
            state.count = 0
            state.totalPrice = 0
            localStorage.setItem(storage, JSON.stringify(state))
        }
    }
});

export const { create, up, down } = cartSlice.actions;

export const selectCount = (state) => state.count;

export default cartSlice.reducer;