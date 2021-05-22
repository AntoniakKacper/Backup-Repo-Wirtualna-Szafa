import { Navbar } from "components/elements/Navbar";
import { format, parseISO } from "date-fns";
import { ReactComponent as OutfitImage } from "images/outfit.svg";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { RootState } from "store";
import {
  addUserCloth,
  getAddedClothes,
  removeClothFromUserList,
} from "store/actions/clothActions";
import { addOutfit } from "store/actions/outfitActions";
import { Cloth } from "store/types/clothTypes";
import { Outfit } from "store/types/outfitTypes";
import AddedClothItem from "../Clothes/AddedClothItem";
import {
  Info,
  NoItemsAdded,
  Wrapper,
} from "../Clothes/styles/AddClothesStyles";
import { AddOutfitForm } from "./AddOutfitForm";
import { OwnedClothes } from "./OwnedClothes";
import {
  AddedClothesContainer,
  Line,
  StyledInput,
} from "./styles/AddOutfitsStyles";

interface AddOutfitsProps extends RouteComponentProps<{ category: string }> {}

const AddOutfits: React.FC<AddOutfitsProps> = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const action = useDispatch();
  const { userClothes } = useSelector((state: RootState) => state.cloth);
  const [addedClothes, setAddedClothes] = useState<Cloth[]>([]);
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [count, setCount] = useState(3);
  const [weather, setWeather] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setWeather(event.target.value as string);
  };

  useEffect(() => {
    user && action(getAddedClothes(user.id));

    return () => {
      setAddedClothes([]);
      setName("");
      setWeather("");
    };
  }, []);

  const handleSave = () => {
    const initialState: Outfit = {
      id: "",
      clothesList: addedClothes,
      name: name,
      userId: user!.id,
      likesCount: 0,
      likes: [],
      calendarDate: selectedDate
        ? format(parseISO(selectedDate!.toISOString()), "MM/d/yyyy")
        : "",
      weather: weather,
    };

    action(addOutfit(initialState));
  };

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

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const ClothCount = () => {
    switch (true) {
      case count <= 0 && count > -4:
        return <Info>You can save your outfit</Info>;
      case count === 1:
        return <Info>You need to add {count} more item</Info>;
      case count <= -4:
        return <Info>Outfit can contain maximum 6 items</Info>;
      default:
        return <Info>You need to add {count} more items</Info>;
    }
  };

  return (
    <Wrapper>
      <Navbar addedClothes={addedClothes} path="/add" handleSave={handleSave} />
      <AddedClothesContainer>
        <h2>Add Outfit</h2>
        <StyledInput
          label="Name"
          variant="outlined"
          onChange={(event) => setName(event.target.value)}
        />
        {addedClothes.length > 2 && addedClothes.length <= 6 && (
          <AddOutfitForm
            handleDateChange={handleDateChange}
            selectedDate={selectedDate}
            handleChange={handleChange}
            weather={weather}
          />
        )}
        {addedClothes.length > 0 ? (
          addedClothes.map((item: Cloth) => (
            <AddedClothItem
              key={item.id}
              cloth={item}
              handleDelete={removeClothFromOutfit}
              xButton={true}
            />
          ))
        ) : (
          <NoItemsAdded>
            <OutfitImage width="70px" height="70px" />
          </NoItemsAdded>
        )}
        <ClothCount />
      </AddedClothesContainer>

      <Line />

      <OwnedClothes addClothToOutfit={addClothToOutfit} clothes={userClothes} />
    </Wrapper>
  );
};

export default AddOutfits;
