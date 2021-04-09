import React from "react";
import { Link } from "react-router-dom";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HomeIcon from "@material-ui/icons/Home";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import styled from "styled-components";
import { ReactComponent as Tshirt } from "../../images/menuTshirt.svg";

interface BottomNavbarProps {}

interface ListOfButtonTypes {
  value: string;
  label: string;
  icon: React.ReactElement<SvgIconProps>;
}

const StyledBottomNavigation = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export const BottomNavbar: React.FC<BottomNavbarProps> = ({}) => {
  const [value, setValue] = React.useState("recents");
  const ListOfButtons: ListOfButtonTypes[] = [
    {
      value: "home",
      label: "Home",
      icon: <HomeIcon />,
    },
    {
      value: "wardrobe",
      label: "Wardrobe",
      icon: <Tshirt width="24px" height="24px" color="#757575" />,
    },
    {
      value: "add",
      label: "Add",
      icon: <AddCircleIcon />,
    },
    {
      value: "favorites",
      label: "Favorites",
      icon: <FavoriteIcon />,
    },

    {
      value: "settings",
      label: "Settings",
      icon: <SettingsIcon />,
    },
  ];

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };
  return (
    <StyledBottomNavigation value={value} onChange={handleChange}>
      {ListOfButtons.map((button) => {
        return (
          <BottomNavigationAction
            key={button.value}
            component={Link}
            to={`/${button.value}`}
            label={button.label}
            value={button.value}
            icon={button.icon}
          />
        );
      })}
    </StyledBottomNavigation>
  );
};
