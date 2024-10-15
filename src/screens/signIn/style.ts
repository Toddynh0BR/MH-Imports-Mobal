import styled from "styled-components/native";

import { TouchableOpacity } from "react-native";

export const Container = styled.View`
align-items: center;
display: flex;
flex: 1;

padding: 100px 20px 20px;
`

export const Title = styled.Text`
font-weight: bold;
font-size: 23px;
color: #122569;
`

export const SubTitle = styled.Text`
font-size: 12px;
color: #000517;

margin-bottom: 20px;
text-align: center;
`

export const ForgotTouch = styled(TouchableOpacity)`
align-self: flex-start;
margin-top: -10px;
margin-bottom: 30px;
`

export const ForgotText = styled.Text`
color: #122569;
`

export const Image = styled.Image`
height: 100px;
width: 100px;
`