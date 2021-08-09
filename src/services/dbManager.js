import sqlite from "sqlite3";


export class DBManager {
    db = null;

    constructor(database) {

        const { Database } = sqlite.verbose();

        this.db = new Database(database);
    }

    close() {
        this.db.close()
    }

    createTable(sql = "") {
        return new Promise((resolve, reject) => {
            return this.db.run("DROP TABLE IF EXISTS DINOS;", () => {
                return this.db.run(sql, err => this.promiseResolve(reject, resolve, err));
            });
        });
    }

    insert(sql = "", params = []) {
        return new Promise((resolve, reject) => {
            return this.db.run(sql, params, err => this.promiseResolve(reject, resolve, err));
        });
    }

    promiseResolve(reject, resolve, err) {
        if (err) { return reject(err) }
        return resolve()
    }
}

export default DBManager;