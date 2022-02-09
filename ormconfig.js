const rootDir = "src";

const migrations =
  process.env.NODE_ENV === "production"
    ? ["dist/migration/*.js"]
    : ["migration/*.ts"];

module.exports = {
  type: "postgres",
  host: process.env.DB_URL || "localhost",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "discord_bot",
  logging: false,
  entities: [`${rootDir}/entity/**/!(*.test.*)`],
  subscribers: [`${rootDir}/subscriber/**/!(*.test.*)`],
  migrations,
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "migration",
  },
  synchronize: true,
  extra: {
    max: 300,
  },
};
