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
    isVerified: boolean
    bio: string
    address: string
    phone: string
    lastLoggedIn: Date
}

export const SignUpDtoSchema = Joi.object<SignUpDto>({
    firstName: Joi.string().min(2).regex(new RegExp("[a-zA-Z0-9\s_]+")).required(),
    lastName: Joi.string().min(2).regex(new RegExp("[a-zA-Z0-9\s_]+")).required(),
    userName: Joi.string().min(3).regex(new RegExp("[a-zA-Z0-9_]+")).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'id'] } }).required(),
    password: Joi.string().min(6).required(),
    avatar: Joi.string().default("#"),
    bio: Joi.string().optional(),
    isVerified: Joi.boolean().default(false),
    role: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    lastLoggedIn: Joi.date().optional()
})

export const UserUpdateDtoSchema = Joi.object<Partial<SignUpDto>>({
    firstName: Joi.string().min(2).regex(new RegExp("[a-zA-Z0-9\s_]+")).optional(),
    lastName: Joi.string().min(2).regex(new RegExp("[a-zA-Z0-9\s_]+")).optional(),
    userName: Joi.string().min(3).regex(new RegExp("[a-zA-Z0-9_]+")).optional(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'id'] } }).optional(),
    password: Joi.string().min(6).optional(),
    avatar: Joi.string().optional(),
    bio: Joi.string().optional(),
    isVerified: Joi.boolean().optional(),
    role: Joi.string().optional(),
    address: Joi.string().optional(),
    phone: Joi.string().optional(),
    lastLoggedIn: Joi.date().optional()
}).min(1)