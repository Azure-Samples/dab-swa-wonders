export interface Wonder {
  id?: string;
  name: string;
  type: Type;
  latitude: string;
  location: string;
  longitude: string;
  country: string;
  wikipedia_link?: string;
  picture_link?: string;
  build_in_year: string;
}

export enum Type {
  NewSevenWonders = "USA Today's New Seven Wonders",
  Medieval = "Medieval",
  Civil = "Civil",
}
