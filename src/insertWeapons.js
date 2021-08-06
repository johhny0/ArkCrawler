import fs from "fs";
import sqlite from "sqlite3";

const jsonFile = "./src/data/weapons.json";
const arkDB = "./ark.db";
const steamName = "Steam.svg";
const sqlCreateWeaponsTable = `CREATE TABLE weapons (id TEXT UNIQUE, name TEXT, category TEXT)`;
const sqlInsertWeaponsTable = `INSERT INTO weapons (id, name, category) VALUES(?, ?, ?)`


const sqlite3 = sqlite.verbose();
let db = new sqlite3.Database(arkDB);

async function main() {
    const weaponsJSON = fs.readFileSync(jsonFile);
    const allWeapons = JSON.parse(weaponsJSON);

    // db.run(sqlCreateWeaponsTable)

    allWeapons.forEach(weapons => {
        const weaponsParameter = [weapons.id, weapons.name, weapons.category]

        db.run(sqlInsertWeaponsTable, weaponsParameter, function (err) {
            if (err) {
                return console.log(err.message);
            }

            console.log(`A row has been inserted`);
        });
    });

    db.close();
}


main().then(() => console.log("Done!"))

