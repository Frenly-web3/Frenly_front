import { Author, useGetFrenInfo } from "@entities/user";
import { IUserWalletDto } from "@shared/api";
import { AdaptiveModal, EditButton, Input } from "@shared/ui";
import * as React from "react";
import { UploadAvatar } from "./upload-avatar.component";
import { SocialBadgeList } from "@widgets/user-profile/ui/social-badge-list.component";
import { Select, Textarea } from "@mantine/core";
import { useEditProfile } from "../model";

export interface IEditModalProps {
  userWallet: IUserWalletDto;
}

export function EditModal(props: IEditModalProps) {
  const { userWallet } = props;

  const { socials: frenSocials, description: frenDescription } = useGetFrenInfo(
    { address: userWallet.walletAddress }
  );

  const { addLink, changeDescription, descriptionLoading, linkLoading } =
    useEditProfile();

  const [description, setDescription] = React.useState<string>(
    frenDescription ?? ""
  );

  const [link, setLink] = React.useState<{ type: string; value: string }>({
    type: "",
    value: "",
  });

  const [isVisibleEdit, setIsVisibleEdit] = React.useState(false);

  React.useEffect(() => {
    setDescription(frenDescription ?? "");
  }, [frenDescription]);

  const changeLinkSelectHandler = (value: string) => {
    setLink((prev) => ({ ...prev, type: value }));
  };

  const changeLinkInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {


    setLink((prev) => ({ ...prev, value: e.target.value }));
  };

  return (
    <div className="absolute right-4 top-4">
      <EditButton editType="edit" onClick={() => setIsVisibleEdit(true)} />
      <AdaptiveModal
        opened={isVisibleEdit}
        classNamesDrawer={{ drawer: "h-full" }}
        title={<Author postOwner={userWallet} classNames={{ avatar: "w-6" }} />}
        onClose={() => setIsVisibleEdit(false)}
      >
        <div className="flex flex-col items-center gap-y-6">
          <UploadAvatar
            address={userWallet.walletAddress}
            usernameType={userWallet.ensType}
            className="w-32"
          />
          <div className="flex flex-col gap-y-4">
            <Textarea
              classNames={{
                input:
                  "font-rounded pl-0 pb-1 border-b-2 border-b-black/20 border-t-0 border-l-0 border-r-0 rounded-none",
                label: "font-bold text-black",
                // root: 'border-b-2 border-b-black/20'
              }}
              label={"description"}
              onChange={(e) => setDescription(e.target.value)}
              value={description?.toLowerCase()}
              placeholder="type description"
              error={
                (description?.length as number) > 280
                  ? "max length 280 symbol"
                  : ""
              }
            />
            <EditButton
              editType="save"
              onClick={() => changeDescription({ description })}
              isLoading={descriptionLoading}
            />
          </div>

          <div className="">
            <Select
              data={[{ label: "twitter", value: "com.twitter" }]}
              onChange={changeLinkSelectHandler}
              value={link.type}
              placeholder="choose type"
            />
            <Input
              classNames={{
                input:
                  "font-rounded pl-0 pb-1 border-b-2 border-b-black/20 border-t-0 border-l-0 border-r-0 rounded-none",
                label: "font-bold text-black",
                // root: 'border-b-2 border-b-black/20'
              }}
              label={"link"}
              onChange={changeLinkInputHandler}
              value={link.value}
              placeholder="type link"
            />
          </div>
          <div className="max-md:mb-4">
            <SocialBadgeList
              socials={frenSocials as [string, string | undefined][]}
            >
              <EditButton
                editType="add"
                onClick={() => addLink(link)}
                isLoading={linkLoading}
              />
            </SocialBadgeList>
          </div>
        </div>
      </AdaptiveModal>
    </div>
  );
}
