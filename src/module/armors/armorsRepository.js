import { sqlCreateArmorsTable, sqlInsertArmorsTable } from "../../constants/arkSql.js";
import { DBManager } from "../../services/dbManager.js";


export class ArmorsRepository {
    dbManager;

    constructor(dbManager = new DBManager()) {
        this.dbManager = dbManager
    }

    async createTable() {
        await this.dbManager.createTable(sqlCreateArmorsTable)
    }

    async insert(armor) {
        const armorParameter = [armor.id, armor.name, armor.diet, armor.temperament, armor.tameable, armor.rideable, armor.breedable, armor.saddle]
        await this.dbManager.insert(sqlInsertArmorsTable, armorParameter);
    }

}

export default ArmorsRepository;