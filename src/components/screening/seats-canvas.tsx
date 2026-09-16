import type { Seat } from ".";
import type { Dispatch, SetStateAction } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

interface SeatsCanvasProps {
	seats?: Seat[];
	selectedSeats: Seat[];
	setSelectedSeats: Dispatch<SetStateAction<Seat[]>>;
}

export function SeatsCanvas({
	seats = [],
	selectedSeats,
	setSelectedSeats,
}: SeatsCanvasProps) {
	function groupSeatsByRow(seatsList: Seat[]) {
		const grouped: Record<number, Seat[]> = {};
		const safeSeats = Array.isArray(seatsList) ? seatsList : [];

		safeSeats.forEach(seat => {
			if (!grouped[seat.row]) grouped[seat.row] = [];
			grouped[seat.row].push(seat);
		});
		Object.values(grouped).forEach(r =>
			r.sort((a, b) => a.number - b.number),
		);

		return grouped;
	}

	const groupedByRow = groupSeatsByRow(seats);

	function toggleSeat(seat: Seat) {
		if (seat.status === "reserved") {
			return;
		}

		setSelectedSeats(prev =>
			prev.some(s => s.id === seat.id)
				? prev.filter(s => s.id !== seat.id)
				: [...prev, seat],
		);
	}

	return (
		<div className="flex w-full flex-col items-center pb-64 text-white">
			<TransformWrapper
				initialScale={1}
				minScale={0.8}
				maxScale={2.5}
				doubleClick={{ disabled: true }}
				wheel={{ step: 0.01 }}
			>
				<TransformComponent>
					<div className="flex flex-col items-center gap-6">
						<div className="mb-6 flex flex-col items-center select-none">
							<svg
								viewBox="0 0 300 80"
								className="w-[70vw] max-w-3xl opacity-90"
							>
								<path
									d="M10,60 Q150,10 290,60"
									stroke="white"
									strokeWidth="4"
									fill="none"
									strokeLinecap="round"
								/>
							</svg>
							<div className="-mt-16 text-xl font-semibold tracking-[0.35em] text-white">
								S C R E E N
							</div>
						</div>

						<div className="flex items-start gap-6">
							<div className="flex flex-col gap-3 text-right text-sm opacity-80 select-none">
								{Object.values(groupedByRow).map((row, idx) => (
									<div
										key={idx}
										className="flex h-10 items-center pr-2"
									>
										Row {row[0].row}
									</div>
								))}
							</div>

							<div className="flex flex-col items-center gap-3">
								{Object.values(groupedByRow).map(
									(row, rowIdx) => (
										<div
											key={rowIdx}
											className="flex justify-center gap-2"
										>
											{row.map(seat => {
												const isSelected =
													selectedSeats.some(
														s => s.id === seat.id,
													);

												const base =
													"h-10 w-10 rounded-md text-sm font-medium flex items-center justify-center transition-all duration-150 select-none";

												let color = "";
												let cursor = "";

												// 1. Reserved seats take precedence
												if (
													seat.status === "reserved"
												) {
													color =
														"bg-rose-950/60 text-rose-400 opacity-60 border border-rose-900";
													cursor =
														"cursor-not-allowed";
												}
												// 2. Selected seats get a bright glowing yellow highlight
												else if (isSelected) {
													color =
														"bg-yellow-400 text-black font-bold shadow-[0_0_15px_rgba(250,204,21,0.8)]";
													cursor = "cursor-pointer";
												}
												// 3. Color based on seat type using yellow and rose tones
												else {
													cursor = "cursor-pointer";
													switch (seat.type) {
														case "vip":
															color =
																"bg-yellow-400 hover:bg-yellow-300 text-black font-semibold shadow-sm";
															break;
														case "premium":
															color =
																"bg-rose-600 hover:bg-rose-500 text-white font-medium border border-rose-500/50";
															break;
														case "standard":
														default:
															color =
																"bg-rose-950/40 hover:bg-rose-900/50 text-rose-200/90 border border-rose-900/40";
															break;
													}
												}

												const label = seat.number;

												return (
													<div
														key={seat.id}
														className="flex flex-col items-center"
													>
														<button
															onClick={() =>
																toggleSeat(seat)
															}
															disabled={
																seat.status ===
																"reserved"
															}
															className={`${base} ${color} ${cursor}`}
														>
															{label}
														</button>
													</div>
												);
											})}
										</div>
									),
								)}
							</div>
						</div>
					</div>
				</TransformComponent>
			</TransformWrapper>
		</div>
	);
}
