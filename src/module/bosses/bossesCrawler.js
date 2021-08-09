import axios from "axios";
import cheerio from "cheerio";
import { v4 as uuid } from "uuid";

import { bossesUrl } from "../../constants/arkFandomUrl.js";
import { bossesPath } from "../../constants/arkCSSPath.js";
import dinoColumn from "../../constants/arkDinoColumnIndex.js";

export class BossesCrawler {
    async handle() {
        const res = await axios.get(bossesUrl);

        const $ = cheerio.load(res.data);

        const bossesArray = $(bossesPath).toArray();

        const totalBossesLength = bossesArray.length;

        const bosses = [];
        for (const bossDOM of bossesArray) {

            const columns = $(bossDOM).children()

            // COL NAME
            const nameRow = $(columns[dinoColumn.ColumnName]).find('a')[1]
            const name = $(nameRow).attr('title')

            // COL RELEASES
            let releases = []
            $(columns[dinoColumn.ColumnReleases]).children('img').each(function () {
                const releaseName = $(this).attr("data-image-name")
                releases.push(releaseName)
            })

            // COL DIET
            const diet = $(columns[dinoColumn.ColumnDiet]).text().trim()

            // COL TEMPERAMENT
            const temperament = $(columns[dinoColumn.ColumnTemperament]).text().trim()

            // COL TAMEABLE
            const tameable = $(columns[dinoColumn.ColumnTameable]).text().trim() === "Yes"

            // COL RIDEABLE
            const rideable = $(columns[dinoColumn.ColumnRideable]).text().trim() === "Yes"

            // COL BREEDABLE
            const breedable = $(columns[dinoColumn.ColumnBreedable]).text().trim() === "Yes"

            // COL SADDLE
            const saddle = $(columns[dinoColumn.ColumnSaddle]).text().trim()

            const boss = {
                id: uuid(),
                name,
                releases,
                diet,
                temperament,
                tameable,
                rideable,
                breedable,
                saddle
            }

            bosses.push(boss)

            const percent = (bosses.length / totalBossesLength) * 100
            console.log(`CRAWLING BOSSES -- ${percent.toFixed(2)}%`)
        }

        return bosses;
    }
}

export default BossesCrawler;