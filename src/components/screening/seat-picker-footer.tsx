import type { Seat } from ".";

import { Button } from "@/components/ui/button";

interface SeatPickerFooterProps {
	totalPrice: number;
	selectedSeats: Seat[];
	onCheckout: () => void;
	isLoading: boolean;
}

export function SeatPickerFooter({
	totalPrice,
	selectedSeats,
	onCheckout,
	isLoading,
}: SeatPickerFooterProps) {
	return (
		<div className="fixed bottom-0 left-0 flex w-full items-center justify-between border-t border-gray-800 bg-[#1A1C24] px-6 py-4">
			<div>
				<p className="text-sm text-neutral-400">
					Selected seats: {selectedSeats.length}
				</p>
				<p className="text-lg font-semibold">{totalPrice} UAH</p>
			</div>
			<Button
				onClick={onCheckout}
				size="lg"
				className="bg-rose-700 hover:bg-rose-800"
				disabled={isLoading}
			>
				Proceed to payment
			</Button>
		</div>
	);
}
