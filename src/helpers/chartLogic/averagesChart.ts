import type { LogDate } from '../../models/Logdata';
import { getWeekNumber } from '../dateLogic';
import { chunkArray, reduceDates } from '../utils';

// STEP LINE CHART, average travel time per week
export const getAveragePerWeekData = (
  logData: LogDate[]
): {
  averages: number[];
  labels: string[];
  maxForDisplay: number;
  title: string;
} => {
  // Combine all the days with the same date
  const reducedDates = reduceDates(logData);
  // Get groups of 5
  const weeks = chunkArray<LogDate>(reducedDates, 5);
  const averages = weeks.map((week) => getAveragePerWeek(week));
  const labels = weeks.map((a) => `w${getWeekNumber(a[0].date)[1]}`);
  const maxForDisplay = Math.max(...averages) * 1.2;
  const title = `AVERAGE TRAVEL TIMES PER WEEK`;

  return {
    averages,
    labels,
    maxForDisplay,
    title,
  };
};

export const getAveragePerWeek = (week: LogDate[]): number => {
  // Use .flatMap for type safe filtering
  const weekWithoutDayOff = week.flatMap((day) =>
    day.statusOfDay !== 'day off' ? [day] : []
  );

  const average =
    weekWithoutDayOff.length > 0
      ? weekWithoutDayOff
          .map((day) => day.durationTrip)
          .reduce((a, b) => a + b) / weekWithoutDayOff.length
      : 0;

  return average;
};
