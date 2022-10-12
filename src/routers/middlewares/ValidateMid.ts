import { Response, Request, NextFunction } from 'express'
import { ObjectSchema } from 'joi'
import MyResponse from '../../models/MyResponse'

const ValidateMid = <T>(schema: ObjectSchema<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body, {
                abortEarly: false
            })
            next()
        } catch (errors) {
            // console.error("ValidateMid", (errors as any).message);
            let err = errors
            if (errors) {
                err = ((errors as any).details as Array<any>).map(item => {
                    return {
                        key: item.context.key,
                        message: item.message
                    }
                })
            }
            return res.status(422).send(MyResponse(true, (errors as any).message, err))
        }
    }
}
export default ValidateMid