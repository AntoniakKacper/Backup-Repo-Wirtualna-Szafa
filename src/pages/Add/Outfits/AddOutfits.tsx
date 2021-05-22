import DateFnsUtils from "@date-io/date-fns";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { format, parseISO } from "date-fns";
import { ReactComponent as OutfitImage } from "images/outfit.svg";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { RootState } from "store";
//eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
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
  BackArrow,
  Info,
  NavigationBar,
  NoItemsAdded,
  SaveChangesButton,
  Wrapper,
} from "../Clothes/styles/AddClothesStyles";
import {
  AddedClothesContainer,
  Line,
  OutfitForm,
  OwnedClothesContainer,
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

  useEffect(() => {
    user && action(getAddedClothes(user.id));

    return () => {
      setAddedClothes([]);
      setName("");
    };
  }, []);

  const HandleSave = () => {
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
    };

    action(addOutfit(initialState));
  };

  const AddClothToOutfit = (cloth: Cloth) => {
    setAddedClothes([...addedClothes, cloth]);
    action(removeClothFromUserList(cloth));
    setCount(count - 1);
  };

  const RemoveClothFromOutfit = (cloth: Cloth) => {
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
      <NavigationBar>
        <BackArrow to="/add">
          <ArrowBackIosIcon fontSize="large" />
        </BackArrow>

        {addedClothes.length > 2 && addedClothes.length <= 6 && (
          <Link to="/myOutfits">
            <SaveChangesButton onClick={() => HandleSave()}>
              Save
            </SaveChangesButton>
          </Link>
        )}
      </NavigationBar>
      <AddedClothesContainer>
        <h2>Add Outfit</h2>
        {addedClothes.length > 2 && addedClothes.length <= 6 && (
          <OutfitForm>
            <StyledInput
              label="Name"
              variant="outlined"
              onChange={(event) => setName(event.target.value)}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                label="Add this outfit to calendar"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </OutfitForm>
        )}
        {addedClothes.length > 0 ? (
          addedClothes.map((item: Cloth) => (
            <AddedClothItem
              key={item.id}
              cloth={item}
              handleDelete={RemoveClothFromOutfit}
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

      <OwnedClothesContainer>
        <h2>Owned clothes</h2>
        {userClothes.map((item: Cloth) => (
          <AddedClothItem
            cloth={item}
            handleDelete={AddClothToOutfit}
            addButton={true}
            key={item.id}
          />
        ))}
      </OwnedClothesContainer>
    </Wrapper>
  );
};

export default AddOutfits;
