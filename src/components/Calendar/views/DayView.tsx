import DayViewModel from '../models/dayViewModel';
import { CalendarEventDictionary, DayEvents, LockedTime } from "../Types/types";
import "../styles/day-view.scss"
import { sizeBasedOnDuration } from '../utils/layout';
import { mapEventsToHour } from '../utils/dataStructures';
import { monthAndYear } from '../utils/dateUtils';
import { useEffect, useState } from 'react';
import { LOCALE } from '../utils/constants';

type DayViewProps = {
    lockedTimes?: LockedTime[];
    dayEvents: DayEvents | null;
    locale?: string;
}
const DayView = ({dayEvents, locale = LOCALE, lockedTimes}: DayViewProps) => {
    const [mappedDayEvents, setMappedDayEvents] = useState<CalendarEventDictionary | null>(null);
    const day = new DayViewModel(dayEvents);
    const hoursOfTheDay = day.createDay();
    const dayTitle = dayEvents && dayEvents.day ? monthAndYear(dayEvents.day, locale) : "";
    
    useEffect(() => setMappedDayEvents(dayEvents ? mapEventsToHour(dayEvents.events) : null ), [dayEvents]);
    const eventAtHour = (h: string) => {
        if (mappedDayEvents) {
            return mappedDayEvents[h.slice(0, 2)] || [];
        }
        return [];
    };
    return (
        <div>
            <h1>{dayTitle}</h1>
            <div className="day-grid">
                {
                    hoursOfTheDay.map(h => (
                        <div className="hour" key={h}>
                            <div key={h}>
                                {h.slice(0, 5)}
                            </div>
                            <div className="calendar-events-wrapper">
                                <div className="calendar-events">
                                    {
                                    mappedDayEvents && eventAtHour(h).map((x, index) => (
                                        <button
                                            type="button" 
                                            key={x.id} 
                                            className="event"
                                            style={{
                                                left: index * 90 +"px",
                                                height: (sizeBasedOnDuration(x) * 40) + "px",
                                                zIndex: 2,
                                                backgroundColor: x.eventType === 1 ? "gray" : x.eventType === 2 ? "rgba(255, 192, 203, 0.603)" : "rgba(122, 217, 230, 0.603)",
                                            }}
                                        >
                                            {x.eventTitle}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default DayView;