import { ScheduleSlider } from "./schedule-slider";

interface ScheduleListProps {
	schedule: any[];
}

export function ScheduleList({ schedule }: ScheduleListProps) {
	if (!schedule || schedule.length === 0) {
		return (
			<p className="text-center text-lg text-neutral-400">
				No sessions available for the selected date yet 😔
			</p>
		);
	}

	return (
		<div className="space-y-10">
			{schedule.map((theater, index) => {
				return <ScheduleSlider key={index} theater={theater} />;
			})}
		</div>
	);
}
