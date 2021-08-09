
import { DBManager } from "../../services/dbManager.js";
import { DinosCrawler } from "./dinosCrawler.js";
import { DinosRepository } from "./dinosRepository.js";

export class DinosService {
    repository = null;
    crawler = null;

    constructor(dbManager = new DBManager()) {
        this.repository = new DinosRepository(dbManager)
        this.crawler = new DinosCrawler();
    }

    async getDataFromSite() {
        return await this.crawler.handle();
    }

    async insertAll(dinos = []) {
        const steamName = "Steam.svg";
        const allDinosLength = dinos.length;
        let insertedDinos = 0;

        for (const dino of dinos) {
            if (dino.releases.includes(steamName)) {
                await this.insert(dino);
            }

            const percent = (insertedDinos++ / allDinosLength) * 100
            console.log(`PERSISTING DINOS -- ${percent.toFixed(2)}%`);
        }
    }

    async insert(dino) {
        await this.repository.insert(dino);
    }

    async createTable() {
        await this.repository.createTable();
    }
}

export default DinosService