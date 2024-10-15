import styled from "styled-components/native";
import CurrencyInput from 'react-native-currency-input';


interface Props {
    placeholder: string; 
    label: string;
}

const Container = styled.View`
 margin-bottom: 10px;
`

const InputArea = styled.View`
    width: 100%;
    height: 56px;

    justify-content: space-between;
    flex-direction: row;
    align-items: center;

    background-color: #f0f7fb;
    border: 2px solid #122569;
    border-radius: 6px;
    padding: 15px;
`;

const Label = styled.Text`
color: #122569;
margin-bottom: 3px;
`

const InputMoney = styled(CurrencyInput)`
    flex: 1;
    color: #000517;
    margin-left: 10px;
`;


export function MoneyInput({ placeholder, label, ...rest}: Props) {
    return (
          <Container>
            <Label>{label}</Label>
           <InputArea> 
             <InputMoney
              prefix="$"
              delimiter=","
              separator="."
              precision={2}
              placeholderTextColor="#475588"
              placeholder={placeholder} 
              {...rest}
            />
           </InputArea>
          </Container>
    );
}
