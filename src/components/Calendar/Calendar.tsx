import React, { useState } from "react";
import MonthView from "./views/MonthView";
import "./styles/calendar.scss";
import { ActiveView, CalendarEvent, DayEvents } from "./Types/types";
import DayView from "./views/DayView";

const eventTypes = {
    0: "standard",
    1: "repeating",
    2: "unavailable",
    3: "canceled",
}

const fakeEvents = [
    {
        id: 42,
        startDate: new Date("2022-04-28"),
        endDate: new Date("2022-04-28"),
        startTime: "10:00:00",
        endTime: "14:00:00",
        dateRange: {
            fromDate: new Date("2022-04-10"),
            toDate: new Date("2022-05-28"),
        },
        eventTitle: "Available",
        eventType: 0,
    },
    {
        id: 43,
        startDate: new Date("2022-04-29"),
        endDate: new Date("2022-04-29"),
        startTime: "12:00:00",
        endTime: "16:00:00",
        dateRange: {
            fromDate: new Date("2022-04-29"),
            toDate: new Date("2022-05-20"),
        },
        eventTitle: "Unavailable",
        eventType: 2,
    },
    {
        id: 44,
        startDate: new Date("2022-04-29"),
        endDate: new Date("2022-04-29"),
        startTime: "12:00:00",
        endTime: "14:30:00",
        dateRange: {
            fromDate: new Date("2022-04-29"),
            toDate: new Date("2022-05-20"),
        },
        eventTitle: "Available",
        eventType: 0,
    }
];
const Calendar = () => {
    const [currentView, setCurrentView] = useState<ActiveView>("month");
    const [selectedDayEvents, setSelectedDayEvents] = useState<DayEvents | null>(null);

    const handleDayClick = (calendarEvent: DayEvents) => {
        setSelectedDayEvents(calendarEvent);
        if (currentView !== "day") {
            setCurrentView("day");
        }
    }
    return (
        <>
            <div className="header">
                <button type="button" onClick={() => currentView !== "month" && setCurrentView("month")}>MONTH VIEW</button>
            </div>
            {
                currentView === "month" && <MonthView 
                    calendarEvents={fakeEvents}
                    onDayClick={(calendarEvent: DayEvents) => handleDayClick(calendarEvent)}
                />
            }
            {currentView === "day" && <DayView dayEvents={selectedDayEvents}/>}
        </>
    )
}

export default Calendar;