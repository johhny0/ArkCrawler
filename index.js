import { config } from "dotenv";

import filePath from "./src/constants/arkFilePath.js";
import BossesService from "./src/module/bosses/bossesService.js";
import DinosService from "./src/module/dinos/dinosService.js";
import { WeaponsService } from "./src/module/weapons/weaponsService.js";
import { DBManager } from "./src/services/dbManager.js";
import { FileService } from "./src/services/fileService.js";

const { parsed: env } = config();

async function main() {

    const dbManager = new DBManager(env.CONNECTION_DATABASE);
    const fileService = new FileService();

    await dbManager.restart(['dinos', 'bosses', 'weapons'])

    await weaponsActions(dbManager, fileService)

    await bossesActions(dbManager, fileService)

    await dinosActions(dbManager, fileService)

    dbManager.close()
}

async function dinosActions(dbManager, fileService) {
    const service = new DinosService(dbManager);

    const arrFromSite = await service.getDataFromSite();

    fileService.writeJson(filePath.dinosFilePath, arrFromSite)

    await service.createTable();

    const arrFromJson = fileService.readJson(filePath.dinosFilePath);

    await service.insertAll(arrFromJson);
}

async function bossesActions(dbManager, fileService) {
    const service = new BossesService(dbManager);

    const arrFromSite = await service.getDataFromSite();

    fileService.writeJson(filePath.bossesFilePath, arrFromSite)

    await service.createTable();

    const arrFromJson = fileService.readJson(filePath.bossesFilePath);

    await service.insertAll(arrFromJson);
}

async function weaponsActions(dbManager, fileService) {
    const service = new WeaponsService(dbManager);

    const arrFromSite = await service.getDataFromSite();

    fileService.writeJson(filePath.weaponsFilePath, arrFromSite)

    await service.createTable();

    const arrFromJson = fileService.readJson(filePath.weaponsFilePath);

    await service.insertAll(arrFromJson);
}


main()