import { Router } from "express";
import AuthController from "../controllers/AuthController";
import AuthMid from "./middlewares/AuthMid";
const AuthRouter = Router()

/**
 * @description create a new user then login user
 * @param { email:String, name:String, password:String } = req.body
 * @post http://localhost:2727/auth/signup
 */
AuthRouter.post('/signup', AuthController.signUp)

/**
 * @description login user
 * @param { email:String, password:String } = req.body
 * @post http://localhost:2727/auth/login
 */
AuthRouter.post('/login', AuthController.login)

/**
 * @description logout user
 * @get http://localhost:2727/auth/logout
 */
AuthRouter.get('/logout', AuthController.logout)

/**
 * @description get logged in user
 * @get http://localhost:2727/auth/user
 */
AuthRouter.get('/user', AuthMid, AuthController.getLoggedInUser)

export default AuthRouter