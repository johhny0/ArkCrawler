import { DBManager } from "../../services/dbManager.js";
import { WeaponsCrawler } from "./weaponsCrawler.js";
import WeaponsRepository from "./weaponsRepository.js";

export class WeaponsService {
    repository = null;
    crawler = null;

    constructor(dbManager = new DBManager()) {
        this.repository = new WeaponsRepository(dbManager)
        this.crawler = new WeaponsCrawler();
    }

    async getDataFromSite() {
        return await this.crawler.handle();
    }

    async insertAll(weapons = []) {
        const allWeaponsLength = weapons.length;
        let insertedWeapons = 0;

        for (const weapon of weapons) {
            await this.insert(weapon);

            const percent = (insertedWeapons++ / allWeaponsLength) * 100
            console.log(`PERSISTING WEAPONS -- ${percent.toFixed(2)}%`);
        }
    }

    async insert(weapon) {
        await this.repository.insert(weapon);
    }

    async createTable() {
        await this.repository.createTable();
    }
}

export default WeaponsService