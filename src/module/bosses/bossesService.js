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

    insertAll(bosses = []) {
        const steamName = "Steam.svg";
        const allBossesLength = bosses.length;
        let insertedBosses = 0;

        bosses.forEach(boss => {
            if (boss.releases.includes(steamName)) {
                this.insert(boss);
            }

            const percent = (insertedBosses++ / allBossesLength) * 100
            console.log("Bosses:", percent.toFixed(2));
        });
    }

    insert(boss) {
        this.repository.insert(boss);
    }

    createTable() {
        this.repository.createTable();
    }
}

export default BossesService