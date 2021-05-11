export interface Cloth {
    id: string;
    category: string;
    name: string;
    imageUrl: string;
    weather: string;
    userId: string;
    color: string;
    occasion: string;
  }

 
  export interface ClothState{
      cloth: Cloth | null;
      clothesList: Cloth[] | [];
      userClothes: Cloth[] | [];
      
  }

  export interface Clothes{
      clothes: Cloth[];
  }