import { DBManager } from "../../services/dbManager.js";
import { BossesCrawler } from "./bossesCrawler.js";
import { BossesRepository } from "./bossesRepository.js";

export class BossesService {
    repository = null;
    crawler = null;

    constructor(dbManager = new DBManager()) {
        this.repository = new BossesRepository(dbManager)
        this.crawler = new BossesCrawler();
    }

    async getDataFromSite() {
        return await this.crawler.handle();
    }

    async insertAll(bosses = []) {
        const steamName = "Steam.svg";
        const allBossesLength = bosses.length;
        let insertedBosses = 0;

        for (const boss of bosses) {
            if (boss.releases.includes(steamName)) {
                await this.insert(boss);
            }

            const percent = (insertedBosses++ / allBossesLength) * 100
            console.log(`PERSISTING BOSSES -- ${percent.toFixed(2)}%`);
        }

    }

    async insert(boss) {
        await this.repository.insert(boss);
    }

    async createTable() {
        await this.repository.createTable();
    }
}

export default BossesService