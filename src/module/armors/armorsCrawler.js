import axios from "axios";
import cheerio from "cheerio";
import { v4 as uuid } from "uuid";
import { armorsUrl, fandomBaseUrl } from "../../constants/arkFandomUrl.js";
import { armorsPath, armorsNamePath, armorsTypePath } from "../../constants/arkCSSPath.js";

export class ArmorsCrawler {
    async handle() {
        const res = await axios.get(armorsUrl);

        const $ = cheerio.load(res.data);

        const armorsArray = $(armorsPath).toArray();
        const piecesByArmor = 5;
        const totalArmorsLength = armorsArray.length * piecesByArmor;
        console.log("totalArmorsLength", totalArmorsLength)

        const armors = [];
        for (const armorDOM of armorsArray) {
            const armorUrl = fandomBaseUrl + $(armorDOM).attr("href");
            const { data } = await axios.get(armorUrl);
            const armorQuery = cheerio.load(data);

            const armorPieces = armorQuery(".wds-tab__content").toArray();

            for (const armorPiece of armorPieces) {

                const armorNameQuery = armorQuery(armorPiece).find(armorsNamePath).first();
                const armorName = armorNameQuery.text().trim();

                const armorTypeQuery = armorQuery(armorPiece).find(armorsTypePath).first();
                const armorType = armorTypeQuery.text().trim();

                const armor = {
                    id: uuid(),
                    name: armorName,
                    type: armorType,
                };

                armors.push(armor);
                const percent = (armors.length / totalArmorsLength) * 100
                console.log(`CRAWLING ARMORS -- ${percent.toFixed(2)}%`)
            }
        }

        return armors;
    }
}