import {
  BackArrow,
  NavigationBar,
  SaveChangesButton,
} from "pages/Add/Clothes/styles/AddClothesStyles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";
//eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Cloth } from "models/cloth.model";

interface NavbarProps {
  addedClothes?: Cloth[];
  clothesList?: Cloth[];
  path: string;
  handleSave?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  addedClothes,
  handleSave,
  path,
  clothesList,
}) => {
  return (
    <NavigationBar>
      <BackArrow to={path}>
        <ArrowBackIosIcon />
      </BackArrow>
      {addedClothes && addedClothes!.length > 2 && addedClothes!.length <= 6 && (
        <Link to="/myOutfits">
          <SaveChangesButton onClick={handleSave}>Save</SaveChangesButton>
        </Link>
      )}
      {clothesList && clothesList.length !== 0 && (
        <SaveChangesButton onClick={handleSave}>Save</SaveChangesButton>
      )}
    </NavigationBar>
  );
};
