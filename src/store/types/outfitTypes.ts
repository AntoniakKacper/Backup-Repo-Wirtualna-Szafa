import { Cloth } from "./clothTypes";

export interface LikesArray {
  userId: string;
}
export interface Outfit {
  id: string;
  clothesList: Cloth[];
  name: string;
  userId: string;
  likesCount: number;
  likes: LikesArray[];
  calendarDate: string;
  weather: string;
}
export interface MostUsedCloth {
  cloth: Cloth | null;
  count: number;
}

export interface OutfitState {
  outfits: Outfit[];
  mostUsedCloth: MostUsedCloth | null;
  calendarOutfits: Outfit[];
  userOutfits: Outfit[];
  mostLikableOutfit: Outfit | null;
}
