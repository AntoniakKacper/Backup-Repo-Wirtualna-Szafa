import React from "react";
import styled from "styled-components";
import { flexCenterXY } from "../../../styles/shared-style";
import {
  OutfitCard,
  OutfitName,
  Outfit,
  Cloth,
  ClothImage,
  Username,
} from "../../styledComponents/FavoritesStyles";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
  })
);

interface FavoritesProps {}

const Wrapper = styled.div`
  ${flexCenterXY}
  min-height: 600px;
  min-width: 370px;
  flex-direction: column;
  padding-bottom: 76px;
`;

export const Favorites: React.FC<FavoritesProps> = ({}) => {
  const Outfit1 = [
    {
      kategoria: "Czapka",
      imageUrl:
        "https://pamami.pl/pol_pl_Zimowa-czapka-dla-kobiet-i-mezczyzn-w-norweskie-wzory-10996_2.jpg",
    },
    {
      kategoria: "Buty",
      imageUrl:
        "https://www.eobuwie.com.pl/media/catalog/product/cache/image/650x650/0/0/0000206693174_02_kk.jpg",
    },

    {
      kategoria: "Koszulka",
      imageUrl:
        "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Ff5%2Fc4%2Ff5c4939114fcc731acfada4ebb68f1da42cad909.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_shortsleeve%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    },
    {
      kategoria: "Spodnie",
      imageUrl:
        "https://sklep.sport-max.pl/pol_pl_OLIMP-LIVE-FIGHT-OLIMP-TEAM-Meskie-spodnie-dresowe-20215_2.png",
    },
    {
      kategoria: "Bluza",
      imageUrl:
        "https://ideashirt.pl/static/img/store/product/dzban-supreme/bluza-meska/bialy.jpg",
    },
  ];
  const Outfit2 = [
    {
      kategoria: "Czapka",
      imageUrl:
        "https://pamami.pl/pol_pl_Zimowa-czapka-dla-kobiet-i-mezczyzn-w-norweskie-wzory-10996_2.jpg",
    },
    {
      kategoria: "Bluza",
      imageUrl:
        "https://ideashirt.pl/static/img/store/product/dzban-supreme/bluza-meska/bialy.jpg",
    },
    {
      kategoria: "Koszulka",
      imageUrl:
        "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Ff5%2Fc4%2Ff5c4939114fcc731acfada4ebb68f1da42cad909.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_shortsleeve%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    },
    {
      kategoria: "Spodnie",
      imageUrl:
        "https://sklep.sport-max.pl/pol_pl_OLIMP-LIVE-FIGHT-OLIMP-TEAM-Meskie-spodnie-dresowe-20215_2.png",
    },
    {
      kategoria: "Buty",
      imageUrl:
        "https://www.eobuwie.com.pl/media/catalog/product/cache/image/650x650/0/0/0000206693174_02_kk.jpg",
    },
    {
      kategoria: "Skarpety",
      imageUrl:
        "https://a.allegroimg.com/s1024/0c2e2f/eb10bea44c04a815a50ff8e45af2",
    },
    {
      kategoria: "Majty",
      imageUrl:
        "https://a.allegroimg.com/s512/11c2cd/e8f44e5b4497a8db0ed6254dafd3/4XL-SLIPY-MESKIE-COTTON-WORLD-majtki-XXXXL-120cm",
    },
  ];

  const Outfits = [Outfit1, Outfit2];
  const classes = useStyles();

  return (
    <Wrapper>
      <OutfitCard>
        <OutfitName>Nazwa Stylizacji</OutfitName>
        <Outfit>
          {Outfit1.map((item) => {
            return (
              <Cloth key={item.kategoria}>
                {/* <p>{item.kategoria}</p> */}
                <ClothImage src={item.imageUrl} alt={item.kategoria} />
              </Cloth>
            );
          })}
        </Outfit>
        <Username>#Nazwa użytkownika</Username>
        <button>Like</button>
      </OutfitCard>
      <OutfitCard>
        <OutfitName>Nazwa Stylizacji</OutfitName>
        <Outfit>
          {Outfit2.map((item) => {
            return (
              <Cloth key={item.kategoria}>
                {/* <p>{item.kategoria}</p> */}
                <ClothImage src={item.imageUrl} alt={item.kategoria} />
              </Cloth>
            );
          })}
        </Outfit>
        <Username>#Nazwa użytkownika</Username>
        <button>Like</button>
      </OutfitCard>

      <OutfitCard>
        <Outfit>
          {Outfit2.map((item) => {
            return (
              <Cloth key={item.kategoria}>
                {/* <p>{item.kategoria}</p> */}
                <ClothImage src={item.imageUrl} alt={item.kategoria} />
              </Cloth>
            );
          })}
        </Outfit>
      </OutfitCard>
      {/* 
      <OutfitCard>
        <GridList cellHeight={160} cols={3}>
          {Outfit1.map((item, index) => (
            <GridListTile
              key={item.imageUrl}
              cols={index === 4 || index === 0 ? 2 : 1 || 1}
            >
              <img src={item.imageUrl} alt={item.kategoria} />
            </GridListTile>
          ))}
        </GridList>
      </OutfitCard> */}
    </Wrapper>
  );
};
