import styled from "styled-components/native";

import { TouchableOpacity } from "react-native";

export const Container = styled.View`
align-items: center;
display: flex;
flex: 1;

padding: 150px 20px 20px;
`

export const Header = styled.View`
position: absolute;
top: 40px;

width: 100%;

justify-content: space-between;
flex-direction: row;
align-items: center;
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

export const ReturnButton = styled(TouchableOpacity)`
`

export const Image = styled.Image`
height: 100px;
width: 100px;
`

export const Completed = styled.View`
height: 200px;
width: 100%;

padding: 20px;
border-radius: 5px;

justify-content: center;
align-items: center;
gap: 5px;
`

export const Strong = styled.Text`
font-weight: bold;
color: #122569;
`