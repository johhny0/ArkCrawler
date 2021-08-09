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

    insert(boss) {
        const bossParameter = [boss.id, boss.name];
        this.dbManager.insert(sqlInsertBossesTable, bossParameter);
    }

}

export default BossesRepository;