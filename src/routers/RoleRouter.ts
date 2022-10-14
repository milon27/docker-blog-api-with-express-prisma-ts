import { Router } from "express";
import RoleController from "../controllers/RoleController";
import { RoleCreateDtoSchema, RoleUpdateDtoSchema } from "../models/dto/RoleDto";
import ValidateMid from "./middlewares/ValidateMid";

const RoleRouter = Router()

/**
 * @description get all role with paginate
 * @get http://localhost:2727/role?page=1
 */
RoleRouter.get('/', RoleController.getAllByPaginate)

/**
 * @description create a new role
 * @post http://localhost:2727/role/
 */
RoleRouter.post('/', ValidateMid(RoleCreateDtoSchema), RoleController.createRole)

/**
 * @description update a role
 * @put http://localhost:2727/role/:id
 */
RoleRouter.put('/:id', ValidateMid(RoleUpdateDtoSchema), RoleController.updateRole)

/**
 * @description delete a role
 * @delete http://localhost:2727/role/:id
 */
RoleRouter.delete('/:id', RoleController.deleteRole)


export default RoleRouter