import { sqlCreateBossesTable, sqlInsertBossesTable } from "../../constants/arkSql.js";
import { DBManager } from "../../services/dbManager.js";


export class BossesRepository {
    dbManager;

    constructor(dbManager = new DBManager()) {
        this.dbManager = dbManager
    }

    createTable() {
        this.dbManager.createTable(sqlCreateBossesTable)
    }

    insert(bosses) {
        const bossesParameter = [bosses.id, bosses.name];
        this.dbManager.insert(sqlInsertBossesTable, bossesParameter);
    }

}

export default BossesRepository;