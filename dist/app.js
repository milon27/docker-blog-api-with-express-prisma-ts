"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const ErrorsMid_1 = __importDefault(require("./routers/middlewares/ErrorsMid"));
const PrismaMid_1 = __importDefault(require("./routers/middlewares/PrismaMid"));
const AuthRouter_1 = __importDefault(require("./routers/AuthRouter"));
const AgentMid_1 = __importDefault(require("./routers/middlewares/AgentMid"));
const TestRouter_1 = __importDefault(require("./routers/TestRouter"));
//init
dotenv_1.default.config();
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(AgentMid_1.default);
app.use(PrismaMid_1.default);
//routers
app.get('/', (req, res) => res.send(`Running app in ${process.env.NODE_ENV}... 🚀`));
app.use('/test', TestRouter_1.default);
app.use('/auth', AuthRouter_1.default);
app.use(ErrorsMid_1.default);
const port = process.env.PORT || 2828;
app.listen(port, () => console.log(`Server Running on PORT ${port}`));
//# sourceMappingURL=app.js.map