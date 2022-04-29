import { useEffect, useState } from "react";
import { MonthModel } from "./models/calendarModels";
import { CalendarEvent, MonthViewProps } from "./Types/types";
import { formattedDate, getWeekdaysName, getWeekNumber, isSameMonth } from "./utils/dateUtils";

const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

const MonthView = ({currentDate = new Date(), calendarEvents = [], useEventIcons = false, locale= "en-En", onDayClick}: MonthViewProps) => {
    const initialCurrentDate = currentDate;
    const [mappedCalendarEvents, setMappedCalendarEvents] = useState<{[key: string]: CalendarEvent[]} | null>(null);

    useEffect(() => {
        const mappedEvents = calendarEvents.reduce((acc : {[key: string]: CalendarEvent[]}, curr: CalendarEvent) => {
            const startDate = formattedDate(curr.startDate);
            acc[startDate] = [...(acc[startDate] || []), curr];
            return acc;
        }, {});
        setMappedCalendarEvents(mappedEvents);
    }, [calendarEvents]);

    const weekHeader = getWeekdaysName(locale);
    const [currentDateView, setCurrentDateView] = useState(initialCurrentDate);
    const [currentMonth, setCurrentMonth] = useState<any[][]>([]);
    const currentMonthModel = new MonthModel(currentDateView.getMonth(), currentDateView.getFullYear(), MONTH_NAMES);

    useEffect(() => {
        const currMonth = currentMonthModel.createMonth(currentDateView.getMonth(), currentDateView.getFullYear());
        setCurrentMonth(currMonth);
    }, [currentDateView]);

    const handleEventStyle = (eventType: string | number) => {
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
    return (
        <div className="calendar-wrapper">
                <div className="calendar-nav">
                    <button onClick={() => setCurrentDateView(new Date(currentDateView.setMonth(currentDateView.getMonth() - 1)))}>PREV</button>
                    <h4>{currentMonthModel.getMonthName()} - {currentMonthModel.year}</h4>
                    <button onClick={() => setCurrentDateView(new Date(currentDateView.setMonth(currentDateView.getMonth() + 1)))}>NEXT</button>
                </div>
                <div className="calendar">
                    <div className="week week-header">
                        <div></div>
                        {
                            weekHeader.map(d => (
                                <div className="day" key={d}>{d}</div>
                            ))
                        }
                    </div>
                    {
                        currentMonth.map((week, index) => (
                            <div className="week" key={"w_" + index}>
                                <div className="week-number">{getWeekNumber(week[1])}</div>
                                {
                                    week.map(day => (
                                        <div 
                                            className="day"
                                            key={day.getTime()}
                                        >
                                            <div className={isSameMonth(currentDateView, day) ? "" : "disabled-day"}>
                                                <div className="day-number">{day.getDate()}</div>
                                                <div 
                                                className="day-content"
                                                >
                                                    {
                                                        mappedCalendarEvents && (
                                                            <button 
                                                                type="button" 
                                                                className="transparent-btn"
                                                                onClick={() => onDayClick(mappedCalendarEvents[formattedDate(day)])}
                                                            >
                                                                {
                                                                    mappedCalendarEvents[formattedDate(day)] && mappedCalendarEvents[formattedDate(day)].map(cEvent => (
                                                                        <div  
                                                                            className={handleEventStyle(cEvent.eventType)}
                                                                            key={cEvent.id}
                                                                        >
                                                                            {!useEventIcons && cEvent.eventTitle}
                                                                        </div>
                                                                    ))
                                                                }
                                                                {
                                                                    !mappedCalendarEvents[formattedDate(day)] && (<>&nbsp;</>)
                                                                }
                                                            </button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
    )
}

export default MonthView;