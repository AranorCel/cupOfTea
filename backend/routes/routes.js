import express from 'express';

import HomeGet from '../controllers/HomeGet.js';

import ClientDelete from "../controllers/Clients/ClientDelete.js";
import ClientPut from "../controllers/Clients/ClientPut.js";
import ClientPost from '../controllers/Clients/ClientPost.js';
import ClientGet from '../controllers/Clients/ClientGet.js';

import OrderDelete from "../controllers/Orders/OrderDelete.js";
import OrderGetById from "../controllers/Orders/OrderGetById.js";
import OrderPost from "../controllers/Orders/OrderPost.js";
import OrderPut from "../controllers/Orders/OrderPut.js";

import TeaPost from "../controllers/Teas/TeaPost.js";
import TeaDelete from "../controllers/Teas/TeaDelete.js";
import TeaPut from "../controllers/Teas/TeaPut.js";

import SellerGetById from '../controllers/Sellers/SellerGetById.js';
import SellerDelete from "../controllers/Sellers/SellerDelete.js";
import SellerPost from "../controllers/Sellers/SellerPost.js";
import SellerPut from "../controllers/Sellers/SellerPut.js";
import { loginSeller, loginClient } from '../controllers/Login.js';

import ClientAPI from "../controllers/Clients/ClientAPI.js"
import TeasGet from '../controllers/Teas/TeasGet.js';
import TeaGet from '../controllers/Teas/TeaGet.js';

const router = express.Router();

router.route('/')
    .get(HomeGet);

router.route('/teas')
    .post(TeaPost)
    .delete(TeaDelete)
    .put(TeaPut)

router.route('/orders')
    .post(OrderPost)
    .delete(OrderDelete)
    .put(OrderPut)
    .get(OrderGetById);
    
router.route("/client")
    .delete(ClientDelete)
    .put(ClientPut);

router.route("/api/client")
    .post(ClientGet);
    
router.route("/api/createClient")
    .post(ClientPost);

router.route("/seller")
    .get(SellerGetById)
    .delete(SellerDelete)
    .put(SellerPut);

router.route("/signup")
    .post(SellerPost)
    .post(ClientPost);

router.route("/login")
    .post(loginClient)
    .post(loginSeller);

router.route("/api/tea")
    .post(TeaGet);

router.route("/api/teas")
    .post(TeasGet);

router.route("/api/client")
    .post(ClientAPI);
    
export default router