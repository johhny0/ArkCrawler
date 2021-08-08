import fs from "fs";

export class FileService {
    readJson(jsonFile) {
        const jsonStr = fs.readFileSync(jsonFile);
        const arrObject = JSON.parse(jsonStr);
        return arrObject
    }

    writeJson(jsonFile, arrObject) {
        const jsonStr = JSON.stringify(arrObject, null, 2);
        fs.writeFileSync(jsonFile, jsonStr);
        return true;
    }

}

export default FileService