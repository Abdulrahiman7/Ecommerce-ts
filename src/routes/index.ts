import { Router } from 'express';
import {TokenAuthorization} from '../middleware/token';

const router:Router = Router();

router.post('/addProduct', TokenAuthorization,   )