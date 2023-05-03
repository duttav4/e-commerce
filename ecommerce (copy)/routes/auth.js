import express from "express";
import {forgotPasswordController, loginController, registerController, testController} from "../controllers/authController.js";
import { isAdmin, protectedRoute } from "../middlewares/authMiddlewaare.js";

/* router object */
const router = express.Router();

/* routing */
/* register */
router.post('/register', registerController)
/* login */
router.post('/login', loginController)
// test route
router.post('/test', protectedRoute,isAdmin, testController)

// forgot password
router.post('/forgot-password', forgotPasswordController)

//Protected user route
router.get( '/user-auth', protectedRoute, (req,res)=>{
    res.status(200).send({ok:true})
} )
// protected  admin route
router.get("/admin-auth", protectedRoute,isAdmin ,(req, res)=>{
    res.status(200).send({ok:true})
})

export default router