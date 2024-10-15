import styled from "styled-components/native";

import { TouchableOpacity, FlatList } from "react-native";
import { Picker } from '@react-native-picker/picker';

export const Container = styled.View`
flex: 1;
background-color: #d8f0fd;
`

export const Main = styled.View`
height: 80%;

padding: 45px 10px;
margin: 10px;
gap: 5px;

background-color: #f0f7fb;
border-radius: 5px;
`

export const Return = styled(TouchableOpacity)`
position: absolute;
left: 15px;
top: 10px;
flex-direction: row;
align-items: center;
gap: 10px;
`

export const OrderTitle = styled.Text`
font-size: 16px;
font-weight: bold;
color: #1e3483;
`

export const OrderInfo = styled.Text`
font-size: 15px;
color: #1e3483;
`

export const Select = styled(Picker)`
width: 100%;
height: 56px;

background-color: #d8f0fd;
color: #1e3483;

margin-bottom: 10px;
margin-top: 10px;
`

export const SmallText = styled.Text`
font-size: 17px;
color: #1e3483;
`

export const Title = styled.Text`
font-size: 25px;
color: #1e3483;
`

export const List = styled(FlatList)`
height: 150px;
width: 100%;

`

export const ListItem = styled.View`
height: 30px;
width: 100%;

border-bottom-color: #dad6d6c2;
border-bottom-width: 1px;
align-items: center;
flex-direction: row;
gap: 10px;
`

export const Total = styled.Text`
font-size: 13px;
font-weight: bold;
color: #40a9ff;
`

export const ListText = styled.Text`
font-size: 13px;
color: #1e3483; 

width: 120px;
`


export const Price = styled.Text`
font-size: 13px;
color: #40a9ff;
`

export const CutPrice = styled.Text`
font-size: 11px;
color: #40a9ff;

text-decoration: line-through;
opacity: .6;
`

export const Edit = styled(TouchableOpacity)`
height: fit-content;
width: fit-content;

position: absolute;
right: 10px;
`
