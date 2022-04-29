export interface Month {
    weeksOfTheMonth: Date[][];
    createMonth: (month: number, year: number) => void;
}

export class WeekOfMonth {
    week: Date[] = [];
    constructor(week: Date[] = []) {
        this.week = week;
    }
    setWeek(week: Date[]) {
        this.week = week;
    }
    addDay(day: Date) {
        this.week = [...this.week, day];
    }
    removeDay(dayToRemove: Date) {
        this.week = [...this.week.filter(day => day.getDate() !== dayToRemove.getDate())];
    }
    getAllDaysOfTheWeek() {
        return this.week;
    }
    removeAllDays() {
        this.week = [];
    }
}

export class MonthModel implements Month {
    private locale: string = "";
    private month: number;
    public year: number;
    public weeksOfTheMonth: Date[][] = [];
    public monthNames: {[key: string]: string} | null = {}
    public fullDate: Date;
    constructor(month: number, year: number, locale: string = "en-US", monthNames?: string[]) {
        this.createMonth(month, year);
        this.mapMonthNames(monthNames);
        this.month = month;
        this.year = year;
        this.fullDate = new Date(year, month + 1);
        this.locale = locale || "en-US";
    }

    private mapMonthNames(monthNames: string[] | undefined) {
        if (monthNames && monthNames.length) {
            this.monthNames = monthNames.reduce((acc, curr, index) => {
                acc[index] = curr;
                return acc;
            }, {} as {[key: string]: string});
        } else {
            this.monthNames = null;
        }

    }

    createMonth (month: number, year: number) {
        this.month = month;
        this.year = year;
        const lastDayOfMonth = new Date(year, month + 1, 0);
        this.fullDate = new Date(year, month + 1);
        const weeksOfMonth:Array<Date[]> = [];
        const daysOfWeek = new WeekOfMonth();
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const thisDay = new Date(year, month, day);
            daysOfWeek.addDay(thisDay);
            if (thisDay.getDay() === 0) {
                weeksOfMonth.push([...daysOfWeek.getAllDaysOfTheWeek()]);
                daysOfWeek.removeAllDays();
            } else if (thisDay.getDate() >= lastDayOfMonth.getDate()) {
                weeksOfMonth.push([...daysOfWeek.getAllDaysOfTheWeek()]);
            }
        }
        const firstWeek = weeksOfMonth[0];
        if (firstWeek.length < 7) {
            const emptyDays = 7 - firstWeek.length;
            const originalWeek = [...firstWeek];
            let previousMonthLastDays: Date[] = [];

            for(let i = emptyDays - 1; i >= 0; i--) {
                const lastDayOfPreviousMonth = new Date(year, month, 0);
                lastDayOfPreviousMonth.setDate(lastDayOfPreviousMonth.getDate() - i);
                previousMonthLastDays.push(lastDayOfPreviousMonth);
            }

            weeksOfMonth[0] = [
                ...previousMonthLastDays,
                ...originalWeek
            ];
        }
        
        const lastWeek = weeksOfMonth[weeksOfMonth.length - 1];
        if (lastWeek.length < 7) {
            const emptyDays = 7 - lastWeek.length;
            const originalWeek = [...lastWeek];
            let nextMonthFirstDays: Date[] = [];

            for(let i = 0; i < emptyDays; i++) {
                const firstDayOfNextMonth = new Date(year, month + 1, 1);
                firstDayOfNextMonth.setDate(firstDayOfNextMonth.getDate() + i);
                nextMonthFirstDays.push(firstDayOfNextMonth);
            }
            weeksOfMonth[weeksOfMonth.length - 1] = [...originalWeek, ...nextMonthFirstDays];
        }

        const weeks = [...weeksOfMonth];
        const lastWeekOfMonth: Date[] = [];
        if (weeks.length < 6) {
            for(let i = 1; i < 8; i++) { 
                const lastWeek = weeks[weeks.length - 1];
                const lastWeekLastDay = lastWeek[lastWeek.length - 1];
                const newDay = new Date(lastWeekLastDay);
                newDay.setDate(newDay.getDate() + i);
                lastWeekOfMonth.push(newDay);
            }
            weeks.push(lastWeekOfMonth);
        }
        this.weeksOfTheMonth = weeks;
        return weeks;
    }

    getMonthName() {
        if (this.monthNames) {
            return this.monthNames[this.month] || ""
        }
        const intlMonthName = new Intl.DateTimeFormat([this.locale, "en-US"], { month: "long" }).format(new Date(this.year, this.month));
        return intlMonthName;
    }

    getMonthNameAndYear() {
        if (this.monthNames) {
            return this.monthNames[this.month] + ", " + this.year || ""
        }
        const intlMonthName = new Intl.DateTimeFormat([this.locale, "en-US"], { month: "long", year: "numeric" }).format(new Date(this.year, this.month));
        return intlMonthName;
    }

    getDateAsString() {
        return new Intl.DateTimeFormat([this.locale, "sv-SE"]).format(new Date(this.year, this.month));
    }

}