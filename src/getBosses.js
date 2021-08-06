import axios from "axios";
import cheerio from "cheerio";
import { v4 as uuid } from "uuid";
import fs from "fs";
const url = "https://ark.fandom.com/wiki/Bosses";
const jsonFile = './bosses.json';

async function getData() {
    const dinos = [];
    const res = await axios.get(url);

    const $ = cheerio.load(res.data);

    $("tr[align=left]").each(function () {
        const columns = $(this).children()

        // COL NAME
        const nameRow = $(columns[0]).find('a')[1]
        const name = $(nameRow).attr('title')

        // COL RELEASES
        let releases = []
        $(columns[1]).children('img').each(function () {
            const releaseName = $(this).attr("data-image-name")
            releases.push(releaseName)
        })

        // COL DIET
        const diet = $(columns[2]).text().trim()

        // COL TEMPERAMENT
        const temperament = $(columns[3]).text().trim()

        // COL TAMEABLE
        const tameable = $(columns[4]).text().trim() === "Yes"

        // COL RIDEABLE
        const rideable = $(columns[5]).text().trim() === "Yes"

        // COL BREEDABLE
        const breedable = $(columns[6]).text().trim() === "Yes"

        // COL SADDLE
        const saddle = $(columns[7]).text().trim()

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
    });

    return dinos
}


getData()
    .then(dinos => fs.writeFileSync(jsonFile, JSON.stringify(dinos, null, 2)))