import { sqlCreateBossesTable, sqlInsertBossesTable } from "../../constants/arkSql.js";
import { DBManager } from "../../services/dbManager.js";


export class BossesRepository {
    dbManager;

    constructor(dbManager = new DBManager()) {
        this.dbManager = dbManager
    }

    async createTable() {
        await this.dbManager.createTable(sqlCreateBossesTable)
    }

    async insert(boss) {
        const bossParameter = [boss.id, boss.name];
        await this.dbManager.insert(sqlInsertBossesTable, bossParameter);
    }

}

export default BossesRepository;