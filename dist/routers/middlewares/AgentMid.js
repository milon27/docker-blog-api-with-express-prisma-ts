"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AgentMid = (req, res, next) => {
    var _a;
    const agent = (_a = req.headers['user-agent']) === null || _a === void 0 ? void 0 : _a.split("/")[0];
    if (agent === 'okhttp') {
        //we are from android app.
        req.agent = "android";
    }
    else if (agent === "PostmanRuntime") {
        req.agent = "postman";
    }
    else {
        req.agent = "browser";
    }
    next();
};
exports.default = AgentMid;
//# sourceMappingURL=AgentMid.js.map