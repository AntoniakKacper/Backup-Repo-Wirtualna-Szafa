import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import { CirclePicker } from "react-color";
import styled from "styled-components";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { ColorCircle } from "../styles/AddClothesStyles";

const StyledCirclePicker = styled(CirclePicker)`
  display: flex;
  justify-content: center;
`;

const Popper = styled("div")<{ bottom: boolean }>`
  position: absolute;
  background-color: white;
  left: 0px;
  top: ${(props) => props.bottom && "42px"};
  bottom: ${(props) => !props.bottom && "42px"};
  padding: 16px 5px;
  border-radius: 8px;
  border: 1px solid #ececec;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),
    0px 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 2;
`;

const ColorPickerAction = styled.div`
  max-width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ColorPickerProps {
  placement?: "bottom" | "top";
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  setFieldValue,
  placement,
}) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("");

  const handleColorChange = (color: any) => {
    setColor(color.hex);
    setFieldValue("color", color.hex);
  };

  return (
    <div style={{ position: "relative" }}>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <ColorPickerAction>
          <Button onClick={() => setOpen(!open)} color="primary">
            Choose color
          </Button>
          <ColorCircle color={color}></ColorCircle>
          {open && (
            <Popper bottom={placement === "bottom" && true}>
              <StyledCirclePicker
                circleSize={25}
                circleSpacing={12}
                onChangeComplete={handleColorChange}
                onChange={() => setOpen(false)}
              />
            </Popper>
          )}
        </ColorPickerAction>
      </ClickAwayListener>
    </div>
  );
};
