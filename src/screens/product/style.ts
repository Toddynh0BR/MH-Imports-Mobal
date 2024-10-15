import styled from "styled-components/native";

import { TouchableOpacity, FlatList } from "react-native";

export const Container = styled.View`
flex: 1;
background-color: #d8f0fd;
`

export const Main = styled.View`
height: 80%;

padding: 20px 10px;
margin: 10px;
gap: 0px;

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

export const SmallText = styled.Text`
font-size: 17px;
color: #1e3483;
`

export const Title = styled.Text`
font-size: 30px;
color: #1e3483;
margin-bottom: 10px;
`

export const List = styled(FlatList)`
height: 200px;
width: 100%;

`

export const ListItem = styled.View`
height: 60px;
width: 100%;

position: relative;

flex-direction: row;
align-items: center;
gap: 10px;

border: 1px solid #dad6d6c2;
padding: 2px 5px;
`

export const ItemImage = styled.Image`
height: 50px;
width: 50px;

border-radius: 2px;
`

export const Promotion = styled.Text`
font-size: 10px;
color: #40a9ff;
`

export const Price = styled.Text`
font-size: 14px;
color: #40a9ff;
`

export const CutPrice = styled.Text`
font-size: 13px;
color: #40a9ff;

text-decoration: line-through;
opacity: .8;
`

export const Edit = styled(TouchableOpacity)`
height: fit-content;
width: fit-content;

position: absolute;
right: 10px;
`
