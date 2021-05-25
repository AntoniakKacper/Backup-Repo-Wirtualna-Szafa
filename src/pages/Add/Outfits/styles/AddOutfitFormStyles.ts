import styled from 'styled-components';
import Button from '@material-ui/core/Button'

export const OutfitForm = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  padding-top: 30px;
`;

export const SubmitButton = styled(Button)`
    &&{
        margin-top: 25px;
    }
`;