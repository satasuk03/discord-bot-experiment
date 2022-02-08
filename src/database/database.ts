import { readFile, writeFile } from "fs/promises";

export const readXp = async (id: string) => {
  const rawdata = await readFile("./database.json", "utf-8");
  const database = JSON.parse(rawdata);
  if (!database[id]) {
    return 0;
  }
  return database[id] as number;
};

export const writeXp = async (id: string, amount: number) => {
  const rawdata = await readFile("./database.json", "utf-8");
  const database = JSON.parse(rawdata);
  database[id] = amount;
  const data = JSON.stringify(database);
  await writeFile("punishmenthistory.json", data);
  return true;
};
