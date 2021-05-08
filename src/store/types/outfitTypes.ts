import { Cloth } from "./clothTypes";

export interface Outfit{
    id: string;
    clothesList: Cloth[];
    name: string;
    userId: string;
}

export interface OutfitState{
    outfit: Outfit | null;
    userOutfits: Outfit[];
}