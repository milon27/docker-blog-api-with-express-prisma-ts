import { Router } from "express";
import UserController from "../controllers/UserController";

const UserRouter = Router()

/**
 * @description get all User with paginate
 * @get http://localhost:2727/User/
 */
UserRouter.get('/', UserController.getAllByPaginate)

/**
 * @description create a new User
 * @post http://localhost:2727/User/
 */
UserRouter.post('/', UserController.createUser)

/**
 * @description update a User
 * @put http://localhost:2727/User/:id
 */
UserRouter.put('/:id', UserController.updateUser)

/**
 * @description delete a User
 * @delete http://localhost:2727/User/:id
 */
UserRouter.delete('/:id', UserController.deleteUser)


export default UserRouter