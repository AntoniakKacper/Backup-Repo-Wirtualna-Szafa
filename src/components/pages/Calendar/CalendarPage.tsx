import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import styled from "styled-components";
import { CalendarDialog } from "./CalendarDialog";

interface CalendarPageProps {}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

export const CalendarPage: React.FC<CalendarPageProps> = ({}) => {
  const [date, setDate] = useState<Date>();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Wrapper>
      <Calendar
        onClickDay={(value) => {
          setOpenDialog(true);
          setDate(value);
        }}
      />
      <CalendarDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        date={date}
      />
    </Wrapper>
  );
};
