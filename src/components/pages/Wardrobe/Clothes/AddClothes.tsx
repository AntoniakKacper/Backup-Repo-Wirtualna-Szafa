import React from "react";
import { RouteComponentProps } from "react-router";

interface AddClothesProps extends RouteComponentProps<{ category: string }> {}

export const AddClothes: React.FC<AddClothesProps> = ({ match }) => {
  return <h1>{match.params.category}</h1>;
};
