import { useEffect, useState } from "react";
import { MonthModel } from "../models/calendarModels";
import { CalendarEvent, MonthViewProps } from "../Types/types";
import { LOCALE } from "../utils/constants";
import { mapEventsToDay } from "../utils/dataStructures";
import { formattedDate, getWeekdaysName, getWeekNumber, isSameMonth, isToday, eventIsLocked } from "../utils/dateUtils";
import { handleEventStyle } from "../utils/layout";

const MonthView = ({currentDate = new Date(), calendarEvents = [], lockedTimes = [], useEventIcons = false, locale= LOCALE, onDayClick}: MonthViewProps) => {
    const initialCurrentDate = currentDate;
    const [mappedCalendarEvents, setMappedCalendarEvents] = useState<{[key: string]: CalendarEvent[]} | null>(null);

    useEffect(() => {
        const mappedEvents = mapEventsToDay(calendarEvents);
        setMappedCalendarEvents(mappedEvents);
    }, [calendarEvents]);

    const weekHeader = getWeekdaysName(locale);
    const [currentDateView, setCurrentDateView] = useState(initialCurrentDate);
    const [currentMonth, setCurrentMonth] = useState<any[][]>([]);
    const currentMonthModel = new MonthModel(currentDateView.getMonth(), currentDateView.getFullYear(), locale);

    useEffect(() => {
        const currMonth = currentMonthModel.createMonth(currentDateView.getMonth(), currentDateView.getFullYear());
        setCurrentMonth(currMonth);
    }, [currentDateView]);

    return (
        <div className="calendar-wrapper">
                <div className="calendar-nav">
                    <button onClick={() => setCurrentDateView(new Date(currentDateView.setMonth(currentDateView.getMonth() - 1)))}>PREV</button>
                    <h4>{currentMonthModel.getMonthNameAndYear()}</h4>
                    <button onClick={() => setCurrentDateView(new Date(currentDateView.setMonth(currentDateView.getMonth() + 1)))}>NEXT</button>
                </div>
                <div className="calendar">
                    <div className="week week-header">
                        <div></div>
                        {
                            weekHeader.map(d => (
                                <div className="day-cell" key={d}>{d}</div>
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
                                            className={isToday(day) ? "day-cell today" : "day-cell"}
                                            key={day.getTime()}
                                        >
                                            <div className={isSameMonth(currentDateView, day) ? "dd" : "dd disabled-day"}>
                                                <div className="day-number">{day.getDate()}</div>
                                                <div 
                                                    className="day-content"
                                                >
                                                    {
                                                        mappedCalendarEvents && (
                                                            <button 
                                                                type="button" 
                                                                className="transparent-btn"
                                                                onClick={() => onDayClick({ day: day, events: mappedCalendarEvents[formattedDate(day)] || []})}
                                                            >
                                                                {
                                                                    mappedCalendarEvents[formattedDate(day)] && mappedCalendarEvents[formattedDate(day)].map(cEvent => (
                                                                        <div  
                                                                            className={handleEventStyle(cEvent.eventType)}
                                                                            key={cEvent.id}
                                                                        >
                                                                            {
                                                                                !useEventIcons && cEvent.eventTitle
                                                                            }
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