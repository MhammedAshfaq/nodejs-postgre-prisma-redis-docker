"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "NodeJS Postgre Prisma and Docker",
            version: "1.0.0",
            description: "API documentation for your app",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}/api`,
            },
        ],
    },
    apis: ["./src/routes/**/*.ts"], // Path to route files
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function setupSwagger(app) {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
}
