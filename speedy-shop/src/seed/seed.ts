import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { Seeder } from './script/seeder';
import { Logger } from '@nestjs/common';

async function seed() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  const logger = new Logger('Seeder');

  try {
    const seeder = app.get(Seeder);
    await seeder.seed(); // Implement this method in your Seeder class
    logger.log('Seeding completed successfully.');
  } catch (error) {
    logger.error(`Seeding failed: ${error}`);
  } finally {
    await app.close();
  }
}

seed();
