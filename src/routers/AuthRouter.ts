import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { LoginDtoSchema, SignUpDtoSchema } from "../models/dto/AuthDto";
import AuthMid from "./middlewares/AuthMid";
import ValidateMid from "./middlewares/ValidateMid";
const AuthRouter = Router()

/**
 * @description create a new user then login user
 * @param { email:String, name:String, password:String } = req.body
 * @post http://localhost:2727/auth/signup
 */
AuthRouter.post('/signup', ValidateMid(SignUpDtoSchema), AuthController.signUp)

/**
 * @description login user
 * @param { email:String, password:String } = req.body
 * @post http://localhost:2727/auth/login
 */
AuthRouter.post('/login', ValidateMid(LoginDtoSchema), AuthController.login)

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