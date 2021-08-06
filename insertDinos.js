import fs from "fs";
import sqlite from "sqlite3";

const jsonFile = "./dinos.json";
const arkDB = "./ark.db";
const steamName = "Steam.svg";
const sqlCreateDinosTable = `CREATE TABLE dinos (id TEXT UNIQUE, name TEXT, diet TEXT, temperament TEXT, tameable BOOLEAN, rideable BOOLEAN, breedable BOOLEAN, saddle TEXT)`;
const sqlInsertDinosTable = `INSERT INTO dinos (id, name, diet, temperament, tameable, rideable, breedable, saddle) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`

const sqlite3 = sqlite.verbose();
let db = new sqlite3.Database(arkDB);

async function main() {
    const dinosJSON = fs.readFileSync(jsonFile);
    const allDinos = JSON.parse(dinosJSON);

    // db.run(sqlCreateDinosTable)

    const steamDinos = allDinos.filter(d => d.releases.includes(steamName));

    steamDinos.forEach(dino => {
        const dinoParameter = [dino.id, dino.name, dino.diet, dino.temperament, dino.tameable, dino.rideable, dino.breedable, dino.saddle]
        
        db.run(sqlInsertDinosTable, dinoParameter, function (err) {
            if (err) {
                return console.log(err.message);
            }

            console.log(`A row has been inserted`);
        });
    });

    db.close();
}


main().then(() => console.log("Done!"))

