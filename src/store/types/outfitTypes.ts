import { Cloth } from "./clothTypes";

export interface Outfit{
    clothesList: Cloth[];
    name: string;
    userId: string;
}