import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import styled from "styled-components";

interface CalendarPageProps {}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

export const CalendarPage: React.FC<CalendarPageProps> = ({}) => {
  const [value, onChange] = useState(new Date());

  return (
    <Wrapper>
      <Calendar />
    </Wrapper>
  );
};
