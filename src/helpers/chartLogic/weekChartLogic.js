import { chunkArray, reduceDates } from '../utils';
import { getBackgroundColor, getMinutes, getWeekdays } from './chartLogic';
import { getWeekNumber } from '../logDataLogic';

export const getWeekData = (logData, index) => {
  // Combine all the days with the same date
  const reducedDates = reduceDates(logData);
  // Get groups of 5
  const week = chunkArray(reducedDates, 5)[index];
  // Use the first day of the week to get week number and year
  const weekNumber = getWeekNumber(week[0].date);
  const travelTimes = getMinutes(week);
  const backgroundColor = getBackgroundColor(week);
  const labels = getWeekdays(week);
  const maxForDisplay = Math.max(...travelTimes) * 1.2;
  const title = `TRAVEL TIMES WEEK ${weekNumber[1]} - ${weekNumber[0]}`;

  return {
    travelTimes,
    backgroundColor,
    labels,
    maxForDisplay,
    title,
  };
};