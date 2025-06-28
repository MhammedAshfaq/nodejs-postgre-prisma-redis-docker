import { Router } from 'express';
import userRoutes from './user/user.routes';
import addressRoutes from './address/address.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/user-address', addressRoutes);

export default router;
