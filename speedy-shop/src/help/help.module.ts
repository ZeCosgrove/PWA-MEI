import { Module } from '@nestjs/common';
import { HelpService } from './help.service';
import { HelpController } from './help.controller';
import { MongooseModule } from '@nestjs/mongoose';

import {Help, HelpSchema} from './schemas/help.schema';

@Module({
  controllers: [HelpController],
  providers: [HelpService],
  imports: [MongooseModule.forFeature([
    { name: Help.name, schema: HelpSchema }
  ])]
})
export class HelpModule {}
