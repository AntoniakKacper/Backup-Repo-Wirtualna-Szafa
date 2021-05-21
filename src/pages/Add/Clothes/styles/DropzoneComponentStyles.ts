import styled from 'styled-components';

import { Download } from "@styled-icons/boxicons-regular/Download";
import { Times } from "@styled-icons/fa-solid/Times";
import CircularProgress from "@material-ui/core/CircularProgress";

export const DropzoneContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DropzoneInput = styled.div<{
  isDragAccept: boolean;
  isDragReject: boolean;
  isDragActive: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px;
  width: 100%;

  cursor: pointer;
  border: 4px dashed
    ${({ isDragActive, isDragAccept, isDragReject }) =>
      isDragActive
        ? (isDragAccept && `#11f519`) || (isDragReject && `#eb4034`)
        : `#b1b1b1`};

  border-radius: 20px;
  margin-bottom: 20px;
  & > p {
    text-align: center;
    width: 200px;
    color: #b1b1b1;
    font-size: 14px;
  }
`;

export const Icon = styled(Download)`
  height: 45px;
  color: #b1b1b1;
  margin-bottom: 10px;
`;

export const PreviewImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 20px;

  background: #e0e0e0;
  box-shadow: 12px 12px 24px #d7d7d7, -12px -12px 24px #e9e9e9;
  margin-bottom: 20px;
`;

export const DeleteButton = styled(Times)`
  color: red;
  height: 20px;
  margin-top: -15px;
  margin-right: -15px;

  &&:hover {
    cursor: pointer;
  }
`;

export const StyledProgress = styled(CircularProgress)`
  margin-bottom: 20px;
`;