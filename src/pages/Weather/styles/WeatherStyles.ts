
import styled from "styled-components";
import { flexCenterXY } from "styles/shared-style";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import GrainIcon from "@material-ui/icons/Grain";

export const Wrapper = styled.div`
  ${flexCenterXY}
  width: 100%;
  padding-bottom: 69px;
  flex-direction: column;
`;

export const WeatherContianer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 320px;
  border-radius: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  & > h2 {
    padding-top: 30px;
    color: #757575;
  }
`;

export const DateInfo = styled.p`
  font-size: 12px;
  color: #757575;
`;

export const Degrees = styled.p`
  font-size: 48px;
  font-weight: bold;
  color: #757575;
  padding-top: 20px;
`;

export const CloudContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  padding-bottom: 30px;
  padding-top: 20px;
  align-items: center;
  & > p {
    color: #757575;
    font-weight: bold;
    font-size: 18px;
  }
`;

export const StyledPragraph = styled.p`
  color: #757575;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
`;


export const SunnyIcon = styled(WbSunnyIcon)`
  
  color: #ffe100;
  &&{
    width: 35px;
    height: 35px;
  }
`;

export const WarmIcon = styled(CloudQueueIcon)`
  color: #757575;
  &&{
    width: 35px;
    height: 35px;
  }
`;
export const ColdIcon = styled(AcUnitIcon)`
  color: #00bbff;
  &&{
    width: 35px;
    height: 35px;
  }
`;
export const RainIcon = styled(GrainIcon)`
  color: #00bbff;
  &&{
    width: 35px;
    height: 35px;
  }
`;
