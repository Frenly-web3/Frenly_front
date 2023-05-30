import { IAddress } from "@shared/lib";

export interface ICollection {
  address: IAddress;
  name: string;
  imageUrl: string;
  previewFormat: string;
  previewUrl: string;
  totalBalance: number;
}

export interface ICollectionInfo
  extends Omit<ICollection, "previewUrl" | "previewFormat" | "totalBalance"> {
  description: string;
}
