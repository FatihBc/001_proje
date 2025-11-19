require("dotenv").config();

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/db/dev.sqlite3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/migrations",
    },
    seeds: {
      directory: "./src/seeders",
    },
  },

  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: "./src/migrations",
    },
    seeds: {
      directory: "./src/seeders",
    },
  },
};
