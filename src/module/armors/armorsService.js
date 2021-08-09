
import { DBManager } from "../../services/dbManager.js";
import { ArmorsCrawler } from "./armorsCrawler.js";
import { ArmorsRepository } from "./armorsRepository.js";

export class ArmorsService {
    repository = null;
    crawler = null;

    constructor(dbManager = new DBManager()) {
        this.repository = new ArmorsRepository(dbManager)
        this.crawler = new ArmorsCrawler();
    }

    async getDataFromSite() {
        return await this.crawler.handle();
    }

    async insertAll(armors = []) {
        const allArmorsLength = armors.length;
        let insertedArmors = 0;

        for (const armor of armors) {
            await this.insert(armor);

            const percent = (insertedArmors++ / allArmorsLength) * 100
            console.log(`PERSISTING ARMORS -- ${percent.toFixed(2)}%`);
        }
    }

    async insert(armor) {
        await this.repository.insert(armor);
    }

    async createTable() {
        await this.repository.createTable();
    }
}

export default ArmorsService