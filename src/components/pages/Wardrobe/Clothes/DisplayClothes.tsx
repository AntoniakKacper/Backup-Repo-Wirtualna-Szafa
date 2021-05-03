import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { getAddedClothes } from "../../../../store/actions/clothActions";
import { Cloth } from "../../../../store/types/clothTypes";
import {
  ClicableIcon,
  ColorCircle,
  DeleteButton,
  DisplayColor,
  EditButton,
  ItemCard,
  ItemInfo,
} from "../../Add/Clothes/styles/AddClothesStyles";

interface DisplayClothesProps {}

export const DisplayClothes: React.FC<DisplayClothesProps> = ({}) => {
  const action = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { userClothes } = useSelector((state: RootState) => state.cloth);

  useEffect(() => {
    user && action(getAddedClothes(user.id));
  }, []);

  return (
    <h1>
      All clothes
      {userClothes &&
        userClothes.map((item: Cloth) => (
          <ItemCard key={item.id}>
            <img src={item.imageUrl} alt={item.name} />
            <ItemInfo>
              <p>
                <span>Name:</span> {item.name}
              </p>
              <p>
                <span>Catergory:</span> {item.category}
              </p>
              <p>
                <span>Weather:</span> {item.weather}
              </p>
              <p>
                <span>Ocassion:</span> {item.occasion}
              </p>
              <DisplayColor>
                <span>Color:</span>
                <ColorCircle color={item.color}></ColorCircle>
              </DisplayColor>
            </ItemInfo>
            <ClicableIcon>
              <EditButton />
            </ClicableIcon>
            <ClicableIcon>
              <DeleteButton />
            </ClicableIcon>
          </ItemCard>
        ))}
    </h1>
  );
};
