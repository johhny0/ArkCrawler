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

    async getDataFromSite(){
        return await this.crawler.handle();
    }

    insertAll(weapons = []) {
        const allWeaponsLength = weapons.length;
        let insertedWeapons = 0;

        weapons.forEach(weapon => {
            this.insert(weapon);

            const percent = (insertedWeapons++ / allWeaponsLength) * 100
            console.log("Weapons:", percent.toFixed(2));
        });
    }

    insert(weapon) {
        this.repository.insert(weapon);
    }

    createTable() {
        this.repository.createTable();
    }
}

export default WeaponsService