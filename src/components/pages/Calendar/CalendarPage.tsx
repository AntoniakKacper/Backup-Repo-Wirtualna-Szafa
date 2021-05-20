import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import styled from "styled-components";
import { CalendarDialog } from "./CalendarDialog";
import { useDispatch, useSelector } from "react-redux";
import { getOutfitsByDate } from "store/actions/outfitActions";
import { RootState } from "store";
import { format, parseISO } from "date-fns";

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
  const { outfits } = useSelector((state: RootState) => state.outfit);
  const { user } = useSelector((state: RootState) => state.auth);
  const action = useDispatch();

  const handleClick = (value: Date) => {
    setOpenDialog(true);
    setDate(value);
    action(getOutfitsByDate(value));
  };

  useEffect(() => {});

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    let isTrue = !!outfits
      .filter((outfit) => outfit.userId === user?.id)
      .find(
        (outfit) =>
          outfit.calendarDate ===
          format(parseISO(date.toISOString()), "MM/d/yyyy")
      );
    //console.log(isTrue);

    if (isTrue) {
      return view === "month" ? <p>.</p> : null;
    }
    return null;
  };

  return (
    <Wrapper>
      <Calendar onClickDay={handleClick} tileContent={tileContent} />
      <CalendarDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        date={date}
      />
    </Wrapper>
  );
};
