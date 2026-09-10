import * as dotenv from "dotenv";
dotenv.config();

const config = {
    port: process.env.PORT || "3000",
    dbName: process.env.DB_NAME,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbDialect: process.env.DB_DIALECT,
    dbPort: process.env.DB_PORT || "5432",
}

export default config;