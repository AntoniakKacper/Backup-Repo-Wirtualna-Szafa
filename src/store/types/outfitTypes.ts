import { Cloth } from "./clothTypes";

export interface LikesArray {
    userId: string;
}
export interface Outfit{
    id: string;
    clothesList: Cloth[];
    name: string;
    userId: string;
    likesCount: number;
    likes: LikesArray[];
    calendarDate: string;
}
export interface MostUsedCloth {
    cloth: Cloth | null;
    count: number;
  }

export interface OutfitState{
    outfits: Outfit[];
    mostUsedCloth: MostUsedCloth | null;

}