import Joi from 'joi'

export interface RoleDto {
    title: string
    desc: string
}

export const RoleCreateDtoSchema = Joi.object<RoleDto>({
    title: Joi.string().min(3).required(),
    desc: Joi.string().min(3).required()
})

export const RoleUpdateDtoSchema = Joi.object<Partial<RoleDto>>({
    title: Joi.string().min(3).optional(),
    desc: Joi.string().min(3).optional()
}).min(1)