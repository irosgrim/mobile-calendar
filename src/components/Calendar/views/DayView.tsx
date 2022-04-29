import { DayEvents } from "../Types/types";

type DayViewProps = {
    dayEvents: DayEvents | null;
}
const DayView = ({dayEvents}: DayViewProps) => {

    return (
        <div>
            {dayEvents && dayEvents.day.toLocaleDateString()}
        </div>
    );
}

export default DayView;