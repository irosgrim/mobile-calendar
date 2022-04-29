import React, { useState } from "react";
import MonthView from "../MonthView";
import "../styles/calendar.scss";
import { CalendarEvent } from "../Types/types";
import DayView from "./DayView";

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
        dateRange: {
            fromDate: new Date("2022-04-29"),
            toDate: new Date("2022-05-20"),
        },
        eventTitle: "Available",
        eventType: 0,
    }
];
const Calendar = () => {
    const handleDayClick = (calendarEvent: CalendarEvent[]) => {
        console.log(calendarEvent);
    }
    return (
        <>
            <div className="header">
                MONTH VIEW | WEEK VIEW
            </div>
            <MonthView 
                calendarEvents={fakeEvents}
                onDayClick={(calendarEvent: CalendarEvent[]) => handleDayClick(calendarEvent)}
            />
            {false && <DayView />}
        </>
    )
}

export default Calendar;