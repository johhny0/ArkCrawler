import { sqlCreateWeaponsTable, sqlInsertWeaponsTable } from "../../constants/arkSql.js";
import { DBManager } from "../../services/dbManager.js";


export class WeaponsRepository {
    dbManager;

    constructor(dbManager = new DBManager()) {
        this.dbManager = dbManager
    }

    async createTable() {
        await this.dbManager.createTable(sqlCreateWeaponsTable)
    }

    async insert(weapon) {
        const weaponParameter = [weapon.id, weapon.name, weapon.category];
        await this.dbManager.insert(sqlInsertWeaponsTable, weaponParameter);
    }

}

export default WeaponsRepository;