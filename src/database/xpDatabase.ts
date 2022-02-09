import { readFile, writeFile } from "fs/promises";

export const readXpLevel = async (id: string) => {
  const rawdata = await readFile("./src/database/database.json", "utf-8");
  const database = JSON.parse(rawdata);
  if (!database[id]) {
    return { xp: 0, level: 1 };
  }
  return { xp: database[id].xp as number, level: database[id].level };
};

export const writeXpLevel = async (id: string, xp: number, level: number) => {
  const rawdata = await readFile("./src/database/database.json", "utf-8");
  const database = JSON.parse(rawdata);
  database[id].xp = xp;
  database[id].level = level;
  const data = JSON.stringify(database);
  await writeFile("./src/database/database.json", data);
  return true;
};
