import moment from 'moment';
export const getDateRange = (selectedDate: string | null, timeRange: number[]) => {
  if (!selectedDate || !timeRange.length) return null;
  const dateStart = moment(selectedDate)
    .hour(timeRange[0])
    .minute(0)
    .second(0)
    .format('YYYY-MM-DDTHH:mm:ss');
  const dateEnd = moment(selectedDate)
    .hour(timeRange[1])
    .minute(0)
    .second(0)
    .format('YYYY-MM-DDTHH:mm:ss');
  return { dateStart, dateEnd };
};