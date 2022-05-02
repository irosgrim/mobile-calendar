import { CalendarEvent, LockedTime } from '../Types/types';
import { LOCALE } from "./constants";

export const formattedDate = (date: Date): string =>{
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export const getWeekdaysName = (locale = "en-EN", type: "short" | "long" = "short") => {
    const baseDate = new Date(Date.UTC(2022, 3, 4));
    const weekDays = [];
    for (let i = 0; i < 7; i++)
    {       
        weekDays.push(baseDate.toLocaleDateString(locale, { weekday: type }));
        baseDate.setDate(baseDate.getDate() + 1);       
    }
    return weekDays;
}
export const isToday = (date: Date) => {
    const today = new Date();
    date.setHours(0, 0, 0, 0); 
    today.setHours(0, 0, 0, 0);
    return date.getTime() === today.getTime();
}
export const isSameMonth = (baseDate: Date, currentDate: Date): boolean => {
    return baseDate.getMonth() === currentDate.getMonth() && baseDate.getFullYear() === currentDate.getFullYear();
}

export const getWeekNumber = (currentDate: Date) => {
    const date = new Date(currentDate.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

export const monthAndYear = (date: Date, locale = LOCALE) => {
    const formattedDate = new Intl.DateTimeFormat(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    return formattedDate;
}

export const eventIsLocked = (calendarEvent: CalendarEvent, lockedTimes: LockedTime[]) => {
    if (lockedTimes && lockedTimes.length) {
        const evStartTime = calendarEvent.startTime.split(":");
        const evEndTime = calendarEvent.endTime.split(":");
        calendarEvent.startDate.setHours(+evStartTime[0], +evStartTime[1], +evStartTime[2]);
        calendarEvent.endDate.setHours(+evEndTime[0], +evEndTime[1], +evEndTime[2]);
        let overlapping = false;
        for(const lockedTime of lockedTimes) {
            const lockStartTime = lockedTime.startTime.split(":");
            const lockEndTime = lockedTime.endTime.split(":");
            lockedTime.startDate.setHours(+lockStartTime[0], +lockStartTime[1], +lockStartTime[2]);
            lockedTime.endDate.setHours(+lockEndTime[0], +lockEndTime[1], +lockEndTime[2]);

            const dateIsOverlapping = (calendarEvent.startDate <= lockedTime.startDate && calendarEvent.endDate >= lockedTime.startDate) ||
                (calendarEvent.startDate <= lockedTime.endDate && calendarEvent.endDate >= lockedTime.endDate);
            if (dateIsOverlapping) {
                return true;
            }
        }

        return overlapping ? true: false;
    }
}