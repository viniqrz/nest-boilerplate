import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { default as databaseConfig } from '../config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [databaseConfig.KEY],
      useFactory: ({ database }: ConfigType<typeof databaseConfig>) => {
        let entitiesPath = `${process.cwd()}/dist/**/*.entity{.ts,.js}`;
        let migrationsPath = `${process.cwd()}/dist/**/migrations/*{.js,.ts}`;

        if (process.env.NODE_ENV === 'E2E') {
          entitiesPath = `${process.cwd()}/src/**/*.entity{.ts,.js}`;
          migrationsPath = `${process.cwd()}/src/**/migrations/*{.js,.ts}`;
        }

        return {
          type: 'postgres',
          entities: [entitiesPath],
          migrationsRun: false,
          synchronize: false,
          migrations: [migrationsPath],
          migrationsTableName: 'migrations',
          logger: 'advanced-console',
          logging: 'all',
          host: database.host,
          port: database.port,
          username: database.username,
          password: database.password,
          database: database.database,
        };
      },
    }),
  ],
  providers: [],
})
export class DatabaseModule {}
