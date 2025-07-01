"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
const swagger_1 = require("./swagger");
const rateLimit_middleware_1 = require("./middleware/rateLimit.middleware");
const cache_service_1 = require("./cache/cache.service");
const prom_client_1 = __importDefault(require("prom-client"));
const requestLogger_1 = require("./middleware/requestLogger");
const logger_1 = __importDefault(require("./logger/logger"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3005;
const register = new prom_client_1.default.Registry();
prom_client_1.default.collectDefaultMetrics({ register });
const httpRequestCounter = new prom_client_1.default.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
});
register.registerMetric(httpRequestCounter);
app.use((req, res, next) => {
    httpRequestCounter.inc();
    next();
});
app.get("/metrics", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Content-Type", register.contentType);
    res.send(yield register.metrics());
}));
app.use(express_1.default.json());
(0, swagger_1.setupSwagger)(app);
app.use((0, rateLimit_middleware_1.rateLimit)(60, 10));
app.use(requestLogger_1.requestLogger);
app.use((0, helmet_1.default)({
    contentSecurityPolicy: process.env.NODE_ENV === "production",
}));
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
}));
// Health check
app.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Ok");
}));
// Redis check
app.get("/redis", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, cache_service_1.setCache)("test", "hello redis");
    const val = yield (0, cache_service_1.getCache)("test");
    res.send(val);
}));
app.use("/api", index_1.default);
app.listen(PORT, () => {
    logger_1.default.info(`Server is running on http://localhost:${PORT}`);
    logger_1.default.info(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
});
