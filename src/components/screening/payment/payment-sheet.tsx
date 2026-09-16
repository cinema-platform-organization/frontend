"use client";

import { Seat } from "..";

import { Button } from "@/components/ui/button";

interface PaymentSheetProps {
	selectedSeats: Seat[];
	totalPrice: number;
	isPending: boolean;
	onCheckout: () => void;
}

export function PaymentSheet({
	selectedSeats,
	totalPrice,
	isPending,
	onCheckout,
}: PaymentSheetProps) {
	return (
		<div className="flex h-full flex-col">
			<div className="flex-1 overflow-auto">
				<h2 className="mb-4 text-xl font-semibold">Your Order</h2>

				<div className="space-y-2">
					{selectedSeats.map(seat => (
						<div
							key={seat.id}
							className="flex justify-between border-b border-gray-700 pb-2"
						>
							<span>
								Row {seat.row}, Seat {seat.number}
							</span>
							<span>{seat.price} UAH</span>
						</div>
					))}
				</div>
			</div>

			<div className="mt-4 border-t border-gray-800 pt-4">
				<div className="mb-4 flex justify-between text-lg font-semibold">
					<span>Total:</span>
					<span>{totalPrice} UAH</span>
				</div>

				<Button
					onClick={onCheckout}
					size="lg"
					className="w-full bg-rose-700 hover:bg-rose-800"
					disabled={isPending}
				>
					Proceed to Payment
				</Button>
			</div>
		</div>
	);
}
