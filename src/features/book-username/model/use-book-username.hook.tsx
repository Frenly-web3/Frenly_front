import { googleApi } from "@shared/api";
import { IAddress, useCheckFrenProfile } from "@shared/lib";
import { useCallback } from "react";
import { useAccount } from "wagmi";

export const useBookUsername = () => {
	const { address } = useAccount();
	const isHaveFrenProfile = useCheckFrenProfile({
		address: address as IAddress,
	});
	const [sendUsernameInfo] = googleApi.useSendUsernameInfoMutation();

	return {
		isHaveFrenProfile,
		sendUsernameInfo: useCallback(
			({ username }: { username: string }) => {
				sendUsernameInfo({ address: address as IAddress, username });
			},
			[address]
		),
	};
};
