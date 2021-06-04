import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import styled from "styled-components";
import { CalendarDialog } from "./CalendarDialog";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { format, parseISO } from "date-fns";
import { Navbar } from "components/elements/Navbar";
import "styles/css/calendar.css";

interface CalendarPageProps {}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  flex-direction: column;
`;

const Dot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50px;
  background-color: #1f95f6;
`;

const CalendarPage: React.FC<CalendarPageProps> = () => {
  const [date, setDate] = useState<Date>();
  const [openDialog, setOpenDialog] = useState(false);
  const { outfits } = useSelector((state: RootState) => state.outfit);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleClick = (value: Date) => {
    setOpenDialog(true);
    setDate(value);
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    let isTrue = !!outfits
      .filter((outfit) => outfit.userId === user?.id)
      .find(
        (outfit) =>
          outfit.calendarDate ===
          format(parseISO(date.toISOString()), "MM/d/yyyy")
      );

    if (isTrue) {
      return view === "month" ? <Dot></Dot> : null;
    }
    return null;
  };

  return (
    <>
      <Navbar path="/home" />
      <Wrapper>
        <Calendar onClickDay={handleClick} tileContent={tileContent} />
        <CalendarDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          date={date}
        />
      </Wrapper>
    </>
  );
};

export default CalendarPage;
