import { DayEvents } from '../Types/types';

class DayViewModel {
    public dayEvents: DayEvents | null = null;
    constructor(dayEvents:  DayEvents | null) {
        this.dayEvents = dayEvents;
    }

    generateDay() {
        const hoursOfTheDay = [];
        for (let i = 0; i < 24; i++) {
            const h = i < 10 ? "0" + i : i;
            hoursOfTheDay.push(h + ":00:00");
        }
        return hoursOfTheDay;
    }
}

export default DayViewModel;