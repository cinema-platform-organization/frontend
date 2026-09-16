"use client";

import { useEffect, useRef } from "react";

interface DropdownMenuProps {
	items: string[];
	onSelect: (item: string) => void;
	onClose: () => void;
}

export function DropdownMenu({ items, onSelect, onClose }: DropdownMenuProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClose();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose]);

	return (
		<div
			ref={ref}
			className="absolute top-full left-0 z-50 mt-2 w-64 overflow-hidden rounded-lg bg-zinc-800 shadow-lg"
		>
			<div className="custom-scrollbar max-h-80 overflow-y-auto">
				{items.map((item, index) => (
					<button
						key={index}
						className="w-full cursor-pointer px-4 py-3 text-left font-semibold text-zinc-400 transition-colors hover:text-white"
						onClick={() => onSelect(item)}
					>
						{item}
					</button>
				))}
			</div>
		</div>
	);
}
