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
    email: string
    name: string
    password: string
}

export const SignUpDtoSchema = Joi.object<SignUpDto>({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'id'] } }).required(),
    name: Joi.string().min(3).alphanum().required(),
    password: Joi.string().min(6).required()
})