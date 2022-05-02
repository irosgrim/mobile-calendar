import { CalendarEvent, CalendarEventDictionary, LockedTime } from "../Types/types";
import { formattedDate } from "./dateUtils";

export const mapEventsToHour = (dayEvents: CalendarEvent[]) => {
    const mapped = dayEvents.reduce((acc: CalendarEventDictionary, curr) => {
        if (curr.startTime) {
            acc[curr.startTime.slice(0, 2)] = [...(acc[curr.startTime.slice(0, 2)] || []), curr];
        } else {
            let d = null
            if (curr.startDate instanceof Date) {
                d = curr.startDate;
            } else {
                d = new Date(curr.startDate);
            }
            const hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
            acc[hours] = [...(acc[hours] || []), curr];
        }
        return acc;
    }, {});
    return mapped;
}

export const mapEventsToDay = (calendarEvents: CalendarEvent[]) => {
    const mapped = calendarEvents.reduce((acc : CalendarEventDictionary, curr: CalendarEvent) => {
        const startDate = formattedDate(curr.startDate);
        acc[startDate] = [...(acc[startDate] || []), curr];
        return acc;
    }, {});
    return mapped;
}