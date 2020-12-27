import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

/**
 * 获取（当天、当周、当月、当年）的时间
 * @params {type = today|week|month|year}  默认：year
 * @return [startDate, endDate]
 */
export function getTimeDistance(type = 'year') {
  let now = dayjs();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    const start = now
      .hour(0)
      .minute(0)
      .second(0);
    return [start, dayjs(start.valueOf() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.get('day');
    day = day === 0 ? 6 : day - 1;
    now
      .hour(0)
      .minute(0)
      .second(0);

    const stratTime = now.valueOf() - day * oneDay;

    return [dayjs(stratTime), dayjs(stratTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.year();
    const month = now.month();
    const nextDate = dayjs(now).month(1);
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();
    const fixedZero = val => (val * 1 < 10 ? `0${val}` : val);

    return [
      dayjs(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      dayjs(`${nextYear}-${fixedZero(nextMonth + 1)}-01 23:59:59`),
    ];
  }

  const year = now.getFullYear();
  return [dayjs(`${year}-01-01 00:00:00`), dayjs(`${year}-12-31 23:59:59`)];
}

/* 格式化日期 */
export function formatTime(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format);
}

export function formatDate(date = new Date(), format = 'YYYY-MM-DD') {
  return dayjs(date).format(format);
}

export function getDateFormat(date = new Date()) {
  return formatDate(date);
}

export function getDate(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date, format);
}

/* 获取星期 */
export function getWeek(date = new Date()) {
  return formatTime(date, 'dddd');
}

export default {
  format: formatTime,
  formatDate,
  getTimeDistance,
  getDateFormat,
  getDate,
  getWeek,
};
