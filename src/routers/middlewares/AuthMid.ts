import { Request, NextFunction, Response } from 'express'
import Define from './../../utils/Define';
import Helper from '../../utils/Helper'
import MyResponse from '../../models/MyResponse';

const AuthMid = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies[Define.TOKEN]
        if (!token) {
            throw new Error("Unauthorized Access")
        }
        //token validation
        const uid = Helper.verifyJWTtoken(token)
        // console.log("authmid: ", uid);
        //set user email in request
        req.userId = uid
        next()
    } catch (e: any) {
        res.status(401).json(MyResponse(true, e.message))
    }
}
export default AuthMid