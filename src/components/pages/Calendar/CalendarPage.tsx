import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import styled from "styled-components";
import { CalendarDialog } from "./CalendarDialog";
import { useDispatch } from "react-redux";
import { getOutfitsByDate } from "store/actions/outfitActions";

interface CalendarPageProps {}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

export const CalendarPage: React.FC<CalendarPageProps> = () => {
  const [date, setDate] = useState<Date>();
  const [openDialog, setOpenDialog] = useState(false);
  const action = useDispatch();

  const handleClick = (value: Date) => {
    setOpenDialog(true);
    setDate(value);
    action(getOutfitsByDate(value));
  };

  return (
    <Wrapper>
      <Calendar onClickDay={handleClick} />
      <CalendarDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        date={date}
      />
    </Wrapper>
  );
};
