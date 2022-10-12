import { Response, Request, NextFunction } from 'express'
import MyResponse from '../../models/MyResponse'

const NotFoundMid = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send(MyResponse(true, "Route Not Found"))
}

const ErrorMid = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(MyResponse(true, err.message))
}

const ErrorsMid = [NotFoundMid, ErrorMid]

export default ErrorsMid