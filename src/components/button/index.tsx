import styled from "styled-components/native";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { TouchableOpacity } from "react-native";


interface Props {
    title: string;
    disabled: boolean;
    onPress: ()=> void;
}



const Container = styled(TouchableOpacity)`
 width: 100%;
 height: 56px;

 justify-content: center;
 align-items: center;

 
 background-color:  #122569;
 border: 2px solid #f0f7fb;
 border-radius: 6px;
 padding: 10px;
`;

const TextButton = styled.Text`
 margin-bottom: 3px;
 color: #f0f7fb;
 text-overflow: ellipsis;       
`



export function Button({ title, onPress, disabled, ...rest}: Props) {
    return (
         
          <Container {...rest} disabled={disabled} onPress={disabled ? undefined : onPress}>
           <TextButton numberOfLines={1}>{title}</TextButton>
          </Container>
         
    );
}
