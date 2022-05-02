export type CalendarEventDictionary = {
    [key: string] : CalendarEvent[];
}
export type CalendarEvent = {
    id: string | number;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    dateRange: {
        fromDate: Date;
        toDate: Date;
    }
    eventTitle: string;
    eventType: number;
};

export type MonthViewProps = {
    currentDate?: Date;
    calendarEvents?: CalendarEvent[];
    useEventIcons?: boolean;
    locale?: string;
    lockedTimes?: LockedTime[];
    onDayClick: (calendarEvents: {day: Date; events: CalendarEvent[]}) => void;
}

export  type DayEvents = {
    day: Date;
    events: CalendarEvent[];
}

export type LockedTime = {
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
}

export type ActiveView = "day" | "week" | "month";