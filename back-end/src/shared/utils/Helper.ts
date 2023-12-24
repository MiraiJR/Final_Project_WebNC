import * as moment from 'moment';

export const Helper = {
  formatDate: (date: Date): string => {
    const momentDate = moment(date);
    return momentDate.format('DD/MM/YYYY HH:mm');
  },
  addDate: (startedDate: Date, duration: number): string => {
    const momentStartedDate = moment(startedDate);
    const endDate = momentStartedDate.add(duration, 'days');
    return Helper.formatDate(endDate.toDate());
  },
};
