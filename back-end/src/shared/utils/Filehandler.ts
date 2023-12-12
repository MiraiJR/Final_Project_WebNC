import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';
import { InternalServerErrorException } from '@nestjs/common';

export const FileHandler = {
  readFileCsv: async (file: Express.Multer.File): Promise<GradeStudent[]> => {
    const readableStream = Readable.from([file.buffer.toString()]);
    return new Promise((resolve, reject) => {
      const results: GradeStudent[] = [];

      readableStream
        .pipe(
          csvParser({
            mapHeaders: ({ header }) => header.trim().replace(/'/g, ''),
          }),
        )
        .on('data', (data) => {
          if (data['studentId'] === '') {
            return;
          }

          let gradeStudent: GradeStudent = {
            studentId: data.studentId,
            scores: [],
          };
          const scores = [];

          for (const key in data) {
            if (key === 'studentId') {
              continue;
            }

            scores.push(parseFloat(data[key]));
          }

          gradeStudent.scores = scores;
          results.push(gradeStudent);
        })
        .on('end', () => resolve(results))
        .on('error', () =>
          reject(new InternalServerErrorException('Internal server error')),
        );
    });
  },
};
