import { DBManager } from "../../services/dbManager.js";
import { WeaponsCrawler } from "./weaponsCrawler.js";
import WeaponsRepository from "./weaponsRepository.js";

export class WeaponsService {
    weaponsRepository = null;
    weaponsCrawler = null;

    constructor(dbManager = new DBManager()) {
        this.weaponsRepository = new WeaponsRepository(dbManager)
        this.weaponsCrawler = new WeaponsCrawler();
    }

    async getDataFromSite(){
        return await this.weaponsCrawler.handle();
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
        this.weaponsRepository.insert(weapon);
    }

    createTable() {
        this.weaponsRepository.createTable();
    }
}

export default WeaponsService