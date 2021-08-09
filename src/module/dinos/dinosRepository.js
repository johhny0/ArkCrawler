import { sqlCreateDinosTable, sqlInsertDinosTable } from "../../constants/arkSql.js";
import { DBManager } from "../../services/dbManager.js";


export class DinosRepository {
    dbManager;

    constructor(dbManager = new DBManager()) {
        this.dbManager = dbManager
    }

    async createTable() {
        await this.dbManager.createTable(sqlCreateDinosTable)
    }

    async insert(dino) {
        const dinoParameter = [dino.id, dino.name, dino.diet, dino.temperament, dino.tameable, dino.rideable, dino.breedable, dino.saddle]
        await this.dbManager.insert(sqlInsertDinosTable, dinoParameter);
    }

}

export default DinosRepository;