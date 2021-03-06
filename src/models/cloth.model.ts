export interface Cloth {
  category: string;
  name: string;
  imageUrl: string;
  weather: string;
  userId: string;
  color: string;
  occasion: string;
}

export const weather = ["Cold", "Hot", "Warm", "Rain"];
export const occasions = [
  "Sport",
  "Elegant",
  "Casual",
  "Business",
  "Smart Casual",
];
export const categories = [
  "Accessories",
  "Cap",
  "Dress",
  "High-heels",
  "Hoodie",
  "Jacket",
  "Pant",
  "Shorts",
  "Skirt",
  "Sneakers",
  "Tshirt",
];
