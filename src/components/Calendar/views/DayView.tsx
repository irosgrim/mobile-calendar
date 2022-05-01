import DayViewModel from '../models/dayViewModel';
import { CalendarEvent, CalendarEventDictionary, DayEvents } from "../Types/types";
import "../styles/day-view.scss"

type DayViewProps = {
    dayEvents: DayEvents | null;
    locale?: string;
}
const DayView = ({dayEvents, locale = "en-GB"}: DayViewProps) => {
    const day = new DayViewModel(dayEvents);
    const hoursOfTheDay = day.generateDay();
    const dayTitle = () => {
        if (dayEvents && dayEvents.day) {
            const formattedDate = new Intl.DateTimeFormat(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(dayEvents.day);
            return formattedDate;
        }
        return "";
    }
    const mappedDayEvents = dayEvents && dayEvents.events.reduce((acc: CalendarEventDictionary, curr) => {
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

    const eventAtHour = (h: string) => {
        if (mappedDayEvents) {
            return mappedDayEvents[h.slice(0, 2)] || [];
        }
        return [];
    }

    const heightBasedOnDuration = (calendarEvent: CalendarEvent) => {
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

        return Math.abs(end - start)/10000 || 1;
    }
    return (
        <div>
            <h1>{dayTitle()}</h1>
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
                                    mappedDayEvents && mappedDayEvents[h.slice(0,2)] && mappedDayEvents[h.slice(0,2)].map((x, index) => (
                                        <div 
                                            key={x.id} 
                                            className="event"
                                            style={{
                                                left: index * 90 +"px",
                                                height: (heightBasedOnDuration(x) * 40) + "px",
                                                zIndex: 2,
                                            }}
                                        >
                                            {x.eventTitle}
                                        </div>
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