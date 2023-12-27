import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';
import { InternalServerErrorException } from '@nestjs/common';

export const FileHandler = {
  readFileCsvForGradeStudent: async (
    file: Express.Multer.File,
  ): Promise<GradeStudent[]> => {
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
  readFileCsvForStudent: async (
    file: Express.Multer.File,
  ): Promise<Student[]> => {
    const readableStream = Readable.from([file.buffer.toString()]);
    return new Promise((resolve, reject) => {
      const results: Student[] = [];

      readableStream
        .pipe(
          csvParser({
            mapHeaders: ({ header }) => header.trim().replace(/'/g, ''),
          }),
        )
        .on('data', (data) => {
          if (data['StudentId'] === '') {
            return;
          }

          results.push({
            studentId: data['StudentId'],
            fullname: data['FullName'],
          });
        })
        .on('end', () => resolve(results))
        .on('error', () =>
          reject(new InternalServerErrorException('Internal server error')),
        );
    });
  },
  readFileCsvForGradeInSpecificAssignment: async (
    file: Express.Multer.File,
  ): Promise<GradeStudentInAssignment[]> => {
    const readableStream = Readable.from([file.buffer.toString()]);
    return new Promise((resolve, reject) => {
      const results: GradeStudentInAssignment[] = [];

      readableStream
        .pipe(
          csvParser({
            mapHeaders: ({ header }) => header.trim().replace(/'/g, ''),
          }),
        )
        .on('data', (data) => {
          if (data['StudentId'] === '') {
            return;
          }

          results.push({
            studentId: data['StudentId'],
            score: parseFloat(data['Score']),
          });
        })
        .on('end', () => resolve(results))
        .on('error', () =>
          reject(new InternalServerErrorException('Internal server error')),
        );
    });
  },
  readFileCsvForStudentId: async (file: Express.Multer.File): Promise<StudentIdUser[]> => {
    const readableStream = Readable.from([file.buffer.toString()]);
    return new Promise((resolve, reject) => {
      const results: StudentIdUser[] = [];

      readableStream
        .pipe(
          csvParser({
            mapHeaders: ({ header }) => header.trim().replace(/'/g, ''),
          }),
        )
        .on('data', (data) => {
          if (data['Email'] === '' || data['Email'] === undefined) {
            console.log(data['Email']);
            return;
          }
          let studentIdUser: StudentIdUser = {
            email: data['Email'],
            studentId: data['StudentId'],
            reasonFail: "",
          }
          results.push(studentIdUser);
        })
        .on('end', () => resolve(results))
        .on('error', () =>
          reject(new InternalServerErrorException('Internal server error')),
        );
    });
  }
};
