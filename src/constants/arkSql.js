export const sqlCreateWeaponsTable = 'CREATE TABLE IF NOT EXISTS weapons (id TEXT UNIQUE, name TEXT, category TEXT)';
export const sqlInsertWeaponsTable = 'INSERT INTO weapons (id, name, category) VALUES(?, ?, ?)';

export const sqlCreateBossesTable = 'CREATE TABLE IF NOT EXISTS bosses (id TEXT UNIQUE, name TEXT)';
export const sqlInsertBossesTable = 'INSERT INTO bosses (id, name) VALUES(?, ?)';

export const sqlCreateDinosTable = 'CREATE TABLE IF NOT EXISTS dinos (id TEXT UNIQUE, name TEXT, diet TEXT, temperament TEXT, tameable BOOLEAN, rideable BOOLEAN, breedable BOOLEAN, saddle TEXT)';
export const sqlInsertDinosTable = 'INSERT INTO dinos (id, name, diet, temperament, tameable, rideable, breedable, saddle) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';

export const sqlCreateArmorsTable = 'CREATE TABLE IF NOT EXISTS armors (id TEXT UNIQUE, name TEXT, type TEXT)';
export const sqlInsertArmorsTable = 'INSERT INTO armors (id, name, type) VALUES(?, ?, ?)';


export default {
    sqlCreateWeaponsTable,
    sqlInsertWeaponsTable,
    sqlCreateArmorsTable,
    sqlInsertArmorsTable,
    sqlCreateBossesTable,
    sqlInsertBossesTable,
    sqlCreateDinosTable,
    sqlInsertDinosTable
}
