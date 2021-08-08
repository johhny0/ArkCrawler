import sqlite from "sqlite3";


export class DBManager {
    db = null;

    constructor(database) {

        const { Database } = sqlite.verbose();

        this.db = new Database(database);
    }

    open() {
        this.db.open()
    }

    close() {
        this.db.close()
    }

    createTable(sql = "") {
        this.db.run(sql)
    }

    insert(sql = "", params = []) {
        this.db.run(sql, params);
    }
}

export default DBManager;