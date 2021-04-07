import styled from "styled-components";
import { flexCenterXY } from "../../styles/shared-style";

export const Wrapper = styled.div`
  ${flexCenterXY}
  min-height: 600px;
  min-width: 370px;
  flex-direction: column;
  padding-bottom: 76px;
`;

export const OutfitCard = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  background-color: wheat;
  margin-top: 40px;
  border-radius: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const OutfitName = styled.p`
  padding-top: 10px;
`;

export const Outfit = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 0.5rem;

  margin: 5px;
  border-radius: 20px;
  padding: 10px;
  object-fit: contain;
`;

export const Cloth = styled.div`
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export const ClothImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Username = styled.p`
  font-size: 10px;
`;

// export const Wrapper = styled.div`
//   ${flexCenterXY}
//   min-height: 600px;
//   min-width: 370px;
//   flex-direction: column;
//   padding-bottom: 76px;
// `;

// export const OutfitCard = styled.div`
//   ${flexCenterXY}
//   flex-direction: column;
//   background-color: wheat;
//   margin-top: 40px;
//   border-radius: 20px;
//   margin-left: 20px;
//   margin-right: 20px;
//   overflow: hidden;
//   max-height: 500px;
//   border: 1px solid;
  
// `;

// export const OutfitName = styled.p`
//   padding-top: 10px;
// `;

// export const Outfit = styled.div`
//   display: flex;
//   flex-wrap: wrap
  
  
// `;

// export const Cloth = styled.div`

// `;

// export const ClothImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

// export const Username = styled.p`
//   font-size: 10px;
// `;