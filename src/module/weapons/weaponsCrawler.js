import axios from "axios";
import cheerio from "cheerio";
import { v4 as uuid } from "uuid";

import { weaponsUrl, fandomBaseUrl } from "../../constants/arkFandomUrl.js";
import { weaponsPath, weaponTypePath } from "../../constants/arkCSSPath.js";

export class WeaponsCrawler {
    async handle() {
        const res = await axios.get(weaponsUrl);

        const $ = cheerio.load(res.data);

        const weaponsArray = $(weaponsPath).toArray();
        const totalWeaponsLength = weaponsArray.length;

        const weapons = [];
        for (const weaponDOM of weaponsArray) {
            const weaponName = $(weaponDOM).text().trim();

            const weaponUrl = fandomBaseUrl + $(weaponDOM).attr("href");
            const { data } = await axios.get(weaponUrl);
            const weaponQuery = cheerio.load(data);
            const weaponTypeQuery = weaponQuery(weaponTypePath)

            const weaponCategory = weaponTypeQuery.attr("title")?.replace('Category:', '').trim();
            const weaponType = weaponTypeQuery.text()?.trim();

            const weapon = {
                id: uuid(),
                name: weaponName,
                category: weaponCategory,
                type: weaponType,
            };
            
            weapons.push(weapon);

            const percent = (weapons.length / totalWeaponsLength) * 100
            console.log(`${weaponName} --> ${weapons.length}/${totalWeaponsLength} = ${percent.toFixed(2)}`)
        }

        return weapons;
    }
}