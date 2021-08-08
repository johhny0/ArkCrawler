import { sqlCreateWeaponsTable, sqlInsertWeaponsTable } from "../../constants/arkSql.js";
import { DBManager } from "../../services/dbManager.js";


export class WeaponsRepository {
    dbManager;

    constructor(dbManager = new DBManager()) {
        this.dbManager = dbManager
    }

    createTable() {
        this.dbManager.createTable(sqlCreateWeaponsTable)
    }

    insert(weapon) {
        const weaponParameter = [weapon.id, weapon.name, weapon.category];
        this.dbManager.insert(sqlInsertWeaponsTable, weaponParameter);
    }

}

export default WeaponsRepository;