export const sqlCreateWeaponsTable = `CREATE TABLE weapons (id TEXT UNIQUE, name TEXT, category TEXT)`;
export const sqlInsertWeaponsTable = `INSERT INTO weapons (id, name, category) VALUES(?, ?, ?)`;

export default {
    sqlCreateWeaponsTable,
    sqlInsertWeaponsTable
}
