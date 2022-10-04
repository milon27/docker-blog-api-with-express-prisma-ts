import { Request, Response, NextFunction } from "express"

const AgentMid = (req: Request, res: Response, next: NextFunction) => {
    const agent = req.headers['user-agent']?.split("/")[0]
    if (agent === 'okhttp') {
        //we are from android app.
        req.agent = "android"
    } else if (agent === "PostmanRuntime") {
        req.agent = "postman"
    } else {
        req.agent = "browser"
    }
    next()
}

export default AgentMid