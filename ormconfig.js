module.exports = {
  type: "postgres",
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  username: process.env.PGUSERNAME,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
  entities: ["src/modules/**/entities/*.ts", "build/entities/**/*.js"],
  migrations: ["src/migration/**/*.ts", "build/migration/**/*.js"],
  subscribers: ["src/subscriber/**/*.ts", "build/subscriber/**/*.js"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
