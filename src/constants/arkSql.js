export const sqlCreateWeaponsTable = `CREATE TABLE weapons (id TEXT UNIQUE, name TEXT, category TEXT)`;
export const sqlInsertWeaponsTable = `INSERT INTO weapons (id, name, category) VALUES(?, ?, ?)`;

export const sqlCreateBossesTable = `CREATE TABLE bosses (id TEXT UNIQUE, name TEXT)`;
export const sqlInsertBossesTable = `INSERT INTO bosses (id, name) VALUES(?, ?)`;

export default {
    sqlCreateWeaponsTable,
    sqlInsertWeaponsTable,
    sqlCreateBossesTable,
    sqlInsertBossesTable
}
