import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import {
  deleteCloth,
  getAddedClothes,
} from "../../../../store/actions/clothActions";
import { Cloth } from "../../../../store/types/clothTypes";
import {
  ClicableIcon,
  ColorCircle,
  DeleteButton,
  DisplayColor,
  EditButton,
  ItemCard,
  ItemInfo,
} from "../../../../styles/Card";
import styled from "styled-components";
import { flexCenterXY } from "../../../../styles/shared-style";

interface DisplayClothesProps {}

export const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  margin: 0px 20px 96px 20px;

  & > h2 {
    padding-bottom: 20px;
  }
`;

export const DisplayClothes: React.FC<DisplayClothesProps> = ({}) => {
  const action = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { userClothes } = useSelector((state: RootState) => state.cloth);

  const handleDelete = (cloth: Cloth) => {
    action(deleteCloth(cloth));
  };

  useEffect(() => {
    user && action(getAddedClothes(user.id));
  }, []);

  return (
    <Wrapper>
      <h2>All clothes</h2>
      {userClothes &&
        userClothes.map((item: Cloth) => (
          <ItemCard key={item.id}>
            <img src={item.imageUrl} alt={item.name} />
            <ItemInfo>
              <p>
                <strong>Name:</strong> {item.name}
              </p>
              <p>
                <strong>Catergory:</strong> {item.category}
              </p>
              <p>
                <strong>Weather:</strong> {item.weather}
              </p>
              <p>
                <strong>Ocassion:</strong> {item.occasion}
              </p>
              <DisplayColor>
                <strong>Color:</strong>
                <ColorCircle color={item.color}></ColorCircle>
              </DisplayColor>
            </ItemInfo>
            <ClicableIcon>
              <EditButton />
            </ClicableIcon>
            <ClicableIcon>
              <DeleteButton onClick={() => handleDelete(item)} />
            </ClicableIcon>
          </ItemCard>
        ))}
    </Wrapper>
  );
};
