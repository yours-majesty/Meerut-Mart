import express from 'express';
import { loginUser, registerUser, promoteToAdmin, demoteToUser, superAdminLogin} from '../controllers/userController.js';
import adminAuth from '../middleware/adminAuth.js';
import superAdminAuth from '../middleware/superAdminAuth.js';
import authUser from '../middleware/auth.js';
import authorizeSuperAdmin from '../middleware/authorize.js';
import getAllSellers from '../controllers/getAllSellers.js';
import adminLogin from '../controllers/adminController.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/superadmin', superAdminLogin);


// Superadmin routes
userRouter.get('/',superAdminAuth,getAllSellers); // Change 'router' to 'userRouter'
userRouter.post('/promote-admin', superAdminAuth, promoteToAdmin); // Promote user to admin
userRouter.post('/demote-admin', superAdminAuth, demoteToUser); // Demote admin to user

export default userRouter;
