import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import dotenv from 'dotenv'

dotenv.config()

const options: swaggerJsdoc.Options = {
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

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
