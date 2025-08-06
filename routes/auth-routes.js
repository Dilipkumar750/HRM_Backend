import { Router } from 'express';
import { register, login ,resetPassword,getUserInfo} from '../controllers/auth.controller.js';
import { activateEmail } from '../controllers/employee.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/reset-password',resetPassword);
router.get('/get-user-info',protect,getUserInfo);
router.get('/validate/:token', activateEmail);  // Email validation route

export default router;