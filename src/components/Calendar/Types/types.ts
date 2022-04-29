
export type CalendarEvent = {
    id: string | number;
    startDate: Date;
    endDate: Date;
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
    onDayClick: (calendarEvents: {day: Date; events: CalendarEvent[]}) => void;
}

export  type DayEvents = {
    day: Date;
    events: CalendarEvent[];
}