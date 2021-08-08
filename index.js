import { config } from "dotenv";

import { weaponsFilePath } from "./src/constants/arkFilePath.js";
import { WeaponsService } from "./src/module/weapons/weaponsService.js";
import { DBManager } from "./src/services/dbManager.js";
import { FileService } from "./src/services/fileService.js";

const { parsed: env } = config();

async function main() {

    const dbManager = new DBManager(env.CONNECTION_DATABASE);
    const fileService = new FileService();

    // weaponsActions(dbManager, fileService)
    
    // GET DINOS
    // INSERT DINOS

    // GET BOSSES
    // INSERT BOSSES

    dbManager.close()
}

function weaponsActions(dbManager, fileService) {
    const weaponsService = new WeaponsService(dbManager);

    const weapons = await weaponsService.getDataFromSite();

    fileService.writeJson(weaponsFilePath, weapons)

    weaponsService.createTable();

    const weapons = fileService.readJson(weaponsFilePath);

    weaponsService.insertAll(weapons);
}


main().then(() => console.log("Done!"))