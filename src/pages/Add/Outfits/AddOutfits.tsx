import { Navbar } from "components/elements/Navbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { RootState } from "store";
import {
  addUserCloth,
  getAddedClothes,
  removeClothFromUserList,
} from "store/actions/clothActions";
import { Cloth } from "store/types/clothTypes";
import { Info, Wrapper } from "../Clothes/styles/AddClothesStyles";
import {
  ClickableIcon,
  DeleteButton,
} from "../Outfits/styles/AddOutfitsStyles";
import { AddOutfitForm } from "./AddOutfitForm";
import { OwnedClothes } from "./OwnedClothes";
import {
  ClothImage,
  GridContainer,
  GridItem,
  Line,
} from "./styles/AddOutfitsStyles";

interface AddOutfitsProps extends RouteComponentProps<{ category: string }> {}

const AddOutfits: React.FC<AddOutfitsProps> = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const action = useDispatch();
  const { userClothes } = useSelector((state: RootState) => state.cloth);
  const [addedClothes, setAddedClothes] = useState<Cloth[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [count, setCount] = useState(3);

  useEffect(() => {
    user && action(getAddedClothes(user.id));

    return () => {
      setAddedClothes([]);
    };
  }, [user, action]);

  const addClothToOutfit = (cloth: Cloth) => {
    setAddedClothes([...addedClothes, cloth]);
    action(removeClothFromUserList(cloth));
    setCount(count - 1);
  };

  const removeClothFromOutfit = (cloth: Cloth) => {
    setAddedClothes(addedClothes.filter((item) => item.id !== cloth.id));
    action(addUserCloth(cloth));
    setCount(count + 1);
  };

  const ClothCount = () => {
    switch (true) {
      case count <= 0 && count > -3:
        return <Info>You can save your outfit</Info>;
      case count === 1:
        return <Info>You need to add {count} more item</Info>;
      case count === -3:
        return <Info>Outfit can contain maximum 6 items</Info>;
      default:
        return <Info>You need to add {count} more items</Info>;
    }
  };

  return (
    <>
      <Navbar path="/add" />
      <Wrapper>
        <h2>Add Outfit</h2>
        <AddOutfitForm
          selectedDate={selectedDate}
          addedClothes={addedClothes}
          setSelectedDate={setSelectedDate}
        />

        <GridContainer>
          {addedClothes.length > 0 &&
            addedClothes.map((cloth) => (
              <GridItem key={cloth.id}>
                <ClothImage src={cloth.imageUrl} alt={cloth.name} />
                <ClickableIcon>
                  <DeleteButton onClick={() => removeClothFromOutfit(cloth)} />
                </ClickableIcon>
              </GridItem>
            ))}
        </GridContainer>
        <ClothCount />
        <Line />

        <OwnedClothes
          addClothToOutfit={addClothToOutfit}
          clothes={userClothes}
          addedClothes={addedClothes}
        />
      </Wrapper>
    </>
  );
};

export default AddOutfits;
