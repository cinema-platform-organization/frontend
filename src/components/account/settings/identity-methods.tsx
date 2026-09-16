import { MailIcon, PencilIcon, PhoneIcon, PlusIcon } from "lucide-react";
import { ReactNode, useState } from "react";

import type { GetMeResponse } from "@/api/generated";
import { Button } from "@/components/ui/button";

import { ChangeEmailModal } from "./change-email-modal";
import { ChangePhoneModal } from "./change-phone-modal";

interface IdentityMethodsProps {
	user: GetMeResponse;
}

export function IdentityMethods({ user }: IdentityMethodsProps) {
	const [openEmail, setOpenEmail] = useState(false);
	const [openPhone, setOpenPhone] = useState(false);

	return (
		<div>
			<h2 className="mb-2 text-xl font-semibold">Account</h2>
			<div>
				<RowItem
					icon={<MailIcon className="size-6 text-neutral-300" />}
					label="Email"
					value={user?.email}
					onClick={() => setOpenEmail(true)}
				/>

				<div className="my-3 h-[0.8px] w-full bg-neutral-600" />

				<RowItem
					icon={<PhoneIcon className="size-6 text-neutral-300" />}
					label="Phone number"
					value={user?.phone}
					onClick={() => setOpenPhone(true)}
				/>
			</div>

			<ChangeEmailModal
				open={openEmail}
				onClose={() => setOpenEmail(false)}
				user={user}
			/>

			<ChangePhoneModal
				open={openPhone}
				onClose={() => setOpenPhone(false)}
				user={user}
			/>
		</div>
	);
}

interface RowItemProps {
	icon: ReactNode;
	label: string;
	value: string;
	onClick: () => void;
}

function RowItem({ icon, label, value, onClick }: RowItemProps) {
	const isMissing = !value;

	return (
		<div className="flex items-center justify-between px-4 py-4 transition-colors">
			<div className="flex items-center gap-4">
				<div className="flex size-12 items-center justify-center rounded-full bg-[#242730]">
					{icon}
				</div>

				<div>
					<p className="text-sm text-neutral-400">{label}</p>

					{isMissing ? (
						<p className="text-base font-medium text-red-400">
							Not linked
						</p>
					) : (
						<p className="text-base font-medium">{value}</p>
					)}
				</div>
			</div>
			<Button
				variant={isMissing ? "default" : "outline"}
				className="gap-2"
				onClick={onClick}
			>
				{isMissing ? (
					<>
						<PlusIcon className="size-4" /> Link
					</>
				) : (
					<>
						<PencilIcon className="size-4" /> Change
					</>
				)}
			</Button>
		</div>
	);
}
