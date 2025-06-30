## PROJECT STEPS ##
1. npm init -y

2. npm i express @prisma/client dotenv

3. npm install -D typescript ts-node-dev @types/node @types/express

4. npx tsc --init

5. Update tsconfig file
    {
        "rootDir": "./src",
        "outDir": "./dist",
    }

6. Update Package.json file
    "scripts": {
        "dev": "nodemon --watch src --ext ts --exec ts-node src/index.ts",   || "nodemon --exec ts-node src/index.ts"
        "build": "tsc",
        "start": "node dist/index.js"
    }

7. Prisma setup
    7(1). run `npx prisma init`
    7(2). update env `DATABASE_URL`
    7(3). run `npx prisma generate`
    7(4). run `npx prisma migrate dev --name init`

8. Create Seed data
    -> create seed folder and seed files
    -> update package.json file
    -> "scripts": {
        "dev": "nodemon --watch src --ext ts --exec ts-node src/index.ts",
        "build": "tsc",
        "start": "node dist/index.js",
        "seed": "ts-node src/seed/index.ts"
    },
    "prisma": {
        "seed": "ts-node src/seed/index.ts"
    },
    -> run `npx prisma db seed`
    -> run `npm run seed`

9. Open Prisma studio
    -> run `npx prisma generate`
    -> run `npx prisma studio`

10. Run Project
    npm run dev
    npm run build
    npm start
11. npm install nodemon --save-dev

12. npm install swagger-ui-express swagger-jsdoc

13. npm i --save-dev @types/swagger-jsdoc @types/swagger-ui-express

14. npm install joi


9. Create Dockerfile out side the root directery

10. Create `docker-compose.yaml` file on outside the root directery

11. Before make sure to change DB url on .env file and cross verify Dockerfile docker-compose.ymal file

12. run 
    `docker-compose up --build`

13. If you need down docker
    run `docker-compose down -v`

14. If any same post is running we can stop existing port fllow bellow command (ex:3005)
    -> lsof -i :3005
    -> kill -9 <PID> 


## Redis Setup

13. npm i ioredis

## performance monitoring
14. npm install prom-client

15. http://localhost:9090 promethuse URL

16. http://localhost:3001 Grafana URL usernam = admin , password = admin

## Application log

17. npm install winston express-winston
