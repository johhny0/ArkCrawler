import axios from "axios";
import cheerio from "cheerio";
import { v4 as uuid } from "uuid";

import { dinosUrl } from "../../constants/arkFandomUrl.js";
import { dinosPath } from "../../constants/arkCSSPath.js";
import dinoColumn from "../../constants/arkDinoColumnIndex.js";

export class DinosCrawler {
    async handle() {
        const res = await axios.get(dinosUrl);

        const $ = cheerio.load(res.data);

        const dinosArray = $(dinosPath).toArray();

        const totalDinosLength = dinosArray.length;

        const dinos = [];
        for (const dinoDOM of dinosArray) {

            const columns = $(dinoDOM).children()

            // COL NAME
            const nameRow = $(columns[dinoColumn.ColumnName]).find('a')[1]
            const name = $(nameRow).attr('title')

            // COL RELEASES
            let releases = []
            $(columns[dinoColumn.ColumnReleases]).children('img').each(function () {
                const releaseName = $(this).attr("data-image-name")
                releases.push(releaseName)
            })

            console.log("-------------------------------------------")
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

            const dino = {
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

            dinos.push(dino)

            const percent = (dinos.length / totalDinosLength) * 100
            console.log(`${name} --> ${dinos.length}/${totalDinosLength} = ${percent}`)
        }

        return dinos;
    }
}

export default DinosCrawler;