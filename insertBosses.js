import fs from "fs";
import sqlite from "sqlite3";

const jsonFile = "./bosses.json";
const arkDB = "./ark.db";
const steamName = "Steam.svg";
const sqlCreateBossesTable = `CREATE TABLE bosses (id TEXT UNIQUE, name TEXT)`;
const sqlInsertBossesTable = `INSERT INTO bosses (id, name) VALUES(?, ?)`

const sqlite3 = sqlite.verbose();
let db = new sqlite3.Database(arkDB);

async function main() {
    const bossesJSON = fs.readFileSync(jsonFile);
    const allBosses = JSON.parse(bossesJSON);

    // db.run(sqlCreateBossesTable)

    const steamBosses = allBosses.filter(d => d.releases.includes(steamName));

    steamBosses.forEach(boss => {
        const bossParameter = [boss.id, boss.name]

        db.run(sqlInsertBossesTable, bossParameter, function (err) {
            if (err) {
                return console.log(err.message);
            }

            console.log(`A row has been inserted`);
        });
    });

    db.close();
}


main().then(() => console.log("Done!"))

