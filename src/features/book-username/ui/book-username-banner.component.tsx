import { Image, clsx } from "@mantine/core";
import { AdaptiveModal, Button, Input } from "@shared/ui";
import * as React from "react";
import { useBookUsername } from "../model";

export interface IBookUsernameBannerProps {
	classNames?: {
		root?: string;
	};
}

export function BookUsernameBanner(props: IBookUsernameBannerProps) {
	const { classNames } = props;

	const [isVisibleModal, setIsVisibleModal] = React.useState(false);

	const [username, setUsername] = React.useState("");

	const { sendUsernameInfo, isHaveFrenProfile } = useBookUsername();

	const sendUsernameHandle = () => {
		sendUsernameInfo({ username });
		setIsVisibleModal(false);
	};

	if (isHaveFrenProfile) return null;
	return (
		<div
			className={clsx(
				"bg-white md:rounded-[2rem] md:w-60 w-full md:px-6 px-4 py-4 flex md:flex-col max-md:justify-between gap-y-4",
				classNames?.root ?? ""
			)}
		>
			<p className="font-rounded font-semibold max-md:text-sm">
				grab your <span className="text-main">.fren</span> username now
			</p>
			<button
				onClick={() => setIsVisibleModal(true)}
				className="font-rounded rounded-[2rem] px-2 bg-main text-white"
			>
				let's get it
			</button>
			<AdaptiveModal
				title={
					<div className="flex items-center gap-x-3">
						<Image
							alt={"logo"}
							width={20}
							src={"/assets/icons/feed-frenly.svg"}
						/>
						<p className="font-rounded font-semibold leading-10">
							grab your <span className="text-main">.fren</span> username now
						</p>
					</div>
				}
				opened={isVisibleModal}
				onClose={() => setIsVisibleModal(false)}
			>
				<div className="flex flex-col items-center gap-y-4">
					<div className="flex items-center w-64">
						<Input
							placeholder="vitalik"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							classNames={{
								input:
									"placeholder:font-rounded placeholder:font-semibold font-rounded font-bold",
							}}
						/>
						<span className="text-main font-rounded font-bold whitespace-nowrap">
							.fren
						</span>
					</div>
					<div className="w-48 rounded-full overflow-hidden">
						<Button onClick={sendUsernameHandle}>let's get it</Button>
					</div>
				</div>
			</AdaptiveModal>
		</div>
	);
}
