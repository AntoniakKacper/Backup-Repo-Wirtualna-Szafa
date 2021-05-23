import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { database } from "database/firebase";
import { RootState } from "store";
import {
  deleteOutfit,
  likeOutfit,
  unlikeOutfit,
} from "store/actions/outfitActions";
import { Outfit } from "store/types/outfitTypes";
import { OutfitDetalis } from "./OutfitDetalis";
import {
  DottedMenuButton,
  Heart,
  Info,
  LikeContainer,
  OutfitBottomBar,
  OutfitContainer,
  OutfitImagesContainer,
  StyledAvatar,
  StyledButton,
  StyledDeleteButton,
  StyledTypography,
  UserInfo,
  FilledHeart,
  HorizontalImage,
  Image2,
  Image3,
  DetailsButton,
} from "./styles/OutfitCardStyles";

interface OutfitCardProps {
  outfit: Outfit;
  myOutfits?: boolean;
  withLike: boolean;
}

export const OutfitCard: React.FC<OutfitCardProps> = ({
  outfit,
  myOutfits,
  withLike,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [username, setUsername] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const action = useDispatch();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    action(deleteOutfit(outfit));
    setAnchorEl(null);
  };

  const getData = (outfit: Outfit) => {
    try {
      database
        .collection("Users")
        .where("id", "==", outfit.userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            setUsername(doc.data()["username"]);
            setUserAvatar(doc.data()["imageUrl"]);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const isOutfitLiked = () => {
    if (outfit.likes) {
      if (user && outfit.likes.find((like) => like.userId === user.id)) {
        return true;
      } else {
        return false;
      }
    }
  };

  useEffect(() => {
    getData(outfit);

    return () => {
      setUsername("");
      setUserAvatar("");
    };
  }, []);

  return (
    <>
      <OutfitContainer key={outfit.id}>
        {
          <OutfitImagesContainer>
            <HorizontalImage
              key={outfit.clothesList[0].id}
              src={outfit.clothesList[0].imageUrl}
              alt={outfit.clothesList[0].name}
            />
            <Image2
              key={outfit.clothesList[1].id}
              src={outfit.clothesList[1].imageUrl}
              alt={outfit.clothesList[1].name}
            />
            <Image3
              key={outfit.clothesList[2].id}
              src={outfit.clothesList[2].imageUrl}
              alt={outfit.clothesList[2].name}
            />
          </OutfitImagesContainer>
        }

        <OutfitBottomBar>
          <Info>
            <UserInfo>
              <StyledAvatar alt={username} src={userAvatar} />
              <p>
                <strong>#{username}</strong>
              </p>
            </UserInfo>

            <p>
              <strong>Name:</strong> {outfit.name}
            </p>
            <LikeContainer>
              <p>
                <strong>Likes:</strong> {outfit.likesCount}
              </p>
            </LikeContainer>
          </Info>
          {myOutfits && (
            <StyledButton onClick={handleOpen}>
              <DottedMenuButton />
            </StyledButton>
          )}
          {withLike && (
            <>
              {isOutfitLiked() ? (
                <FilledHeart
                  color="secondary"
                  onClick={() => {
                    user && action(unlikeOutfit(outfit.id, user.id));
                    outfit.likesCount = outfit.likesCount - 1;
                  }}
                />
              ) : (
                <Heart
                  color="secondary"
                  onClick={() => {
                    user && action(likeOutfit(outfit.id, user.id));
                    outfit.likesCount = outfit.likesCount + 1;
                  }}
                />
              )}
            </>
          )}
        </OutfitBottomBar>
        <DetailsButton onClick={() => setOpenDialog(true)}>
          View details
        </DetailsButton>
      </OutfitContainer>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>
          <StyledEditButton fontSize="small" />
          <StyledTypography variant="inherit">Edit outfit</StyledTypography>
        </MenuItem> */}
        <MenuItem onClick={handleDelete}>
          <StyledDeleteButton fontSize="small" />
          <StyledTypography variant="inherit">Delete outfit</StyledTypography>
        </MenuItem>
      </Menu>
      <OutfitDetalis
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        outfit={outfit}
        username={username}
        userAvatar={userAvatar}
        likes={outfit.likesCount}
      />
    </>
  );
};
