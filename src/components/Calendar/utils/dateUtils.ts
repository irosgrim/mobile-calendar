export const formattedDate = (date: Date): string =>{
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export const getWeekdaysName = (locale = "en-EN", type: "short" | "long" = "short") => {
    const baseDate = new Date(Date.UTC(2022, 3, 4));
    const weekDays = [];
    for (let i = 0; i < 7; i++)
    {       
        weekDays.push(baseDate.toLocaleDateString(locale, { weekday: type }));
        baseDate.setDate(baseDate.getDate() + 1);       
    }
    return weekDays;
}
export const isToday = (date: Date) => {
    const today = new Date();
    date.setHours(0, 0, 0, 0); 
    today.setHours(0, 0, 0, 0);
    return date.getTime() === today.getTime();
}
export const isSameMonth = (baseDate: Date, currentDate: Date): boolean => {
    return baseDate.getMonth() === currentDate.getMonth() && baseDate.getFullYear() === currentDate.getFullYear();
}

export const getWeekNumber = (currentDate: Date) => {
    const date = new Date(currentDate.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}
