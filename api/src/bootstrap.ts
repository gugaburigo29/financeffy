import path from "path";
import {createConnection} from "typeorm";
import {getConnection} from "typeorm/index";

export class Bootstrap {

    static async startDB() {
        return createConnection({
            "type": "sqlite",
            "database": "./data/data-dev.sqlite",
            "synchronize": true,
            "logging": false,
            "entities": [
                "src/entities/**/*.ts"
            ],
            "migrations": [
                "src/migrations/**/*.ts"
            ],
            "subscribers": [
                "src/subscriber/**/*.ts"
            ]
        })
    }

    static async runMigration() {
        const connection = getConnection();
        return await connection.runMigrations();
    }

}
