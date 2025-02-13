export const appEnv = {
  salt: process.env.SALT || 'no-salt',
  host: process.env.HOST || 'localhost',
  app_port: process.env.APP_PORT ? +process.env.APP_PORT : 3000,
  db_port: process.env.DB_PORT ? +process.env.DB_PORT : 3306,
  db_username: process.env.DB_USERNAME || 'root',
  db_pass: process.env.DB_PASS || '',
  db_name: process.env.DB_NAME || 'test',
};
