import { Cloth } from "./clothTypes";

export interface Outfit{
    id: string;
    clothesList: Cloth[];
    name: string;
    userId: string;
    likesCount: number;
}

export interface OutfitState{
    outfit: Outfit | null;
    outfits: Outfit[];
}