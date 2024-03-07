import { Router } from 'express';
// import {TokenAuthorization} from '../middleware/token';
import { addProduct, fetchProductById, fetchProducts, deleteProduct } from '../controllers/admin';

const router:Router = Router();

router.post('/addProduct',  addProduct );

router.get('/fetchProducts', fetchProducts);

router.get('/getProduct/:id', fetchProductById);

router.delete('/deleteProduct/:id', deleteProduct);

router.post('/editProduct', addProduct);
export default router;