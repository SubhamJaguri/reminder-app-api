const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist';
const logging = process.env.NODE_ENV === 'development' ? true : false;

module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'micromono',
  synchronize: true,
  logging: logging,
  entities: [rootDir + '/modules/**/*.model.{js,ts}'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
