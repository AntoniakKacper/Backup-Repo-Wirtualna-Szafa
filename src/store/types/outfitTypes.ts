import { Cloth } from "./clothTypes";

export interface Outfit{
    id: string;
    clothesList: Cloth[];
    name: string;
    userId: string;
    likesCount: number;
}
export interface MostUsedCloth {
    cloth: Cloth | null;
    count: number;
  }

export interface OutfitState{
    outfit: Outfit | null;
    outfits: Outfit[];
    mostUsedCloth: MostUsedCloth | null;
}