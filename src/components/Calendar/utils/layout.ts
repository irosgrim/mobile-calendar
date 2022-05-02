import { CalendarEvent } from "../Types/types";

 // TODO: refactor this to calculate correctly the height ratio based on duration
export const sizeBasedOnDuration = (calendarEvent: CalendarEvent) => {
    let start = 0;
    let end = 0;
    if (calendarEvent.startTime && calendarEvent.endTime) {
        start = +calendarEvent.startTime.split(":").join("");
        console.log(start);
        end = +calendarEvent.endTime.split(":").join("");
    } else {
        start = +(new Date(calendarEvent.startDate).getHours() + "" + new Date(calendarEvent.startDate).getMinutes());
        end = +(new Date(calendarEvent.endDate).getHours() + "" + new Date(calendarEvent.endDate).getMinutes());
    }

    return Math.abs(end - start) / 10000 || 1;
}

export const handleEventStyle = (eventType: string | number) => {
    switch (eventType) {
        default:
        case 0:
            return "calendar-event standard";
        case 1:
            return "calendar-event repeating";
        case 2:
            return "calendar-event unavailable";
        case 3:
            return "calendar-event canceled";
    }
}