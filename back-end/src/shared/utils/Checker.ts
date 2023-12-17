import { BadRequestException } from '@nestjs/common';

export const Checker = {
  checkCsvFile: (file: Express.Multer.File, type: string): void => {
    if (file.mimetype !== type) {
      throw new BadRequestException('Invalid file type! Must be csv');
    }
  },
};
