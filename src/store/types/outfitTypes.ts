import { Cloth } from "./clothTypes";

export interface LikesArray {
    username: string;
    outfitId: string;
}
export interface Outfit{
    id: string;
    clothesList: Cloth[];
    name: string;
    userId: string;
    likesCount: number;
    likes: LikesArray[];
}
export interface MostUsedCloth {
    cloth: Cloth | null;
    count: number;
  }

export interface OutfitState{
    outfits: Outfit[];
    userOutfits: Outfit[];
    mostUsedCloth: MostUsedCloth | null;
}