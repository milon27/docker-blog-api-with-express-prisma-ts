"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
const PrismaMid = (req, res, next) => {
    req.prisma = client;
    next();
};
exports.default = PrismaMid;
//# sourceMappingURL=PrismaMid.js.map