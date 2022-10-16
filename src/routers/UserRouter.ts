import { Router } from "express";
import UserController from "../controllers/UserController";
import { SignUpDtoSchema, UserUpdateDtoSchema } from "../models/dto/AuthDto";
import { RoleUpdateDtoSchema } from "../models/dto/RoleDto";
import ValidateMid from "./middlewares/ValidateMid";

const UserRouter = Router()

/**
 * @description get all user with paginate
 * @get http://localhost:2727/user/
 */
UserRouter.get('/', UserController.getAllByPaginate)

/**
 * @description get single user
 * @get http://localhost:2727/user/:id
 */
UserRouter.get('/:id', UserController.getSingleUser)

/**
 * @description create a new user
 * @post http://localhost:2727/user/
 */
UserRouter.post('/', ValidateMid(SignUpDtoSchema), UserController.createUser)

/**
 * @description update a user
 * @put http://localhost:2727/user/:id
 */
UserRouter.put('/:id', ValidateMid(UserUpdateDtoSchema), UserController.updateUser)

/**
 * @description delete a user
 * @delete http://localhost:2727/user/:id
 */
UserRouter.delete('/:id', UserController.deleteUser)


export default UserRouter