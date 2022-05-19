import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const {
    TYPEORM_DATABASE_TYPE,
    NODE_ENV,
    TYPEORM_HOST,
    TYPEORM_PORT,
    TYPEORM_USERNAME,
    TYPEORM_PASSWORD,
    TYPEORM_DATABASE,
    TYPEORM_LOGGING,
  } = process.env;

  return {
    environment: NODE_ENV || 'development',
    database: {
      databaseType: TYPEORM_DATABASE_TYPE,
      host: TYPEORM_HOST,
      port: Number(TYPEORM_PORT),
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DATABASE,
      logging: TYPEORM_LOGGING,
    },
  };
});
