import styled from "styled-components/native";

import { TouchableOpacity, FlatList } from "react-native";

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

export const ImageBox = styled.View`
height: 300px;
width: 100%;

justify-content: space-between;
flex-direction: row;
gap: 10px;
`

export const ImagesColumm = styled.View`
height: 100%;
flex: 1;

gap: 12px;
`

export const SelectedImage = styled.Image`
height: 100%;
width: 80%;

background-size: cover;
border-radius: 5px;
`

export const Images = styled.Image`
height: 50px;
width: 50px;

border-radius: 2px;
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
width: 200px;

`

export const ListItem = styled.View`
height: 25px;
width: 100%;


`

export const ListText = styled.Text`
font-size: 14px;
color: #1e3483; 
`

export const Promotion = styled.Text`
font-size: 14px;
color: #40a9ff;
`

export const Price = styled.Text`
font-size: 18px;
color: #40a9ff;
`

export const CutPrice = styled.Text`
font-size: 16px;
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
