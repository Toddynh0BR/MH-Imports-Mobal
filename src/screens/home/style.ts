import { Picker } from '@react-native-picker/picker';
import styled from "styled-components/native";

export const Container = styled.View`
 width: 100%;
 height: 100%;
 background-color: #d8f0fd;

 align-items: center;
`

export const ImageNoWifi = styled.Image`
height: 200px;
width: 200px;

margin: auto;
margin-top: 10px;
margin-bottom: 5px;
`

export const TextNoWifi = styled.Text`
font-weight: 400;
font-size: 16px;
color: #1e3483;

margin: auto;
margin-top: 5px;
`

export const Main = styled.View`
height: 80%;
width: 90%;

background-color: #f0f7fb;
border-radius: 5px;
margin-top: 15px;
padding: 10px;

gap: 5px;
`

export const MainTitle = styled.Text`
font-weight: bold;
font-size: 23px;
color: #1e3483;

border-bottom-color: #dad6d6c2;
border-bottom-width: 1px;

margin-bottom: 5px;
padding: 0 0 5px 0;
`

export const MainText = styled.Text`
font-weight: 400;
font-size: 16px;
color: #1e3483;


`

export const Select = styled(Picker)`
width: 100%;
height: 45px;

background-color: #d8f0fd;
border-radius: 5px;
color: #1e3483;

margin-bottom: 20px;
`

