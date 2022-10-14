import Joi from 'joi'

export interface LoginDto {
    email: string
    password: string
}

export const LoginDtoSchema = Joi.object<LoginDto>({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'id'] } }).required(),
    password: Joi.string().min(6).required()
})

export interface SignUpDto {
    firstName: string
    lastName: string
    userName: string
    email: string
    password: string
    avatar: string
    role: string
    address: string
    phone: string
}

export const SignUpDtoSchema = Joi.object<SignUpDto>({
    firstName: Joi.string().min(2).regex(new RegExp("[a-zA-Z0-9\s_]+")).required(),
    lastName: Joi.string().min(2).regex(new RegExp("[a-zA-Z0-9\s_]+")).required(),
    userName: Joi.string().min(3).regex(new RegExp("[a-zA-Z0-9_]+")).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'id'] } }).required(),
    password: Joi.string().min(6).required(),
    avatar: Joi.string().default("#"),
    role: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
})