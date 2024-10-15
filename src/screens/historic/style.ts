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
height: 85px;
width: 100%;

position: relative;

justify-content: center;
align-items: center;
gap: 5px;

border: 1px solid #dad6d6c2;
padding: 2px 4px;
`

export const ListId = styled.Text`
font-size: 14px;
color: #1e3483;
font-weight: bold;
`

export const ListUser = styled.Text`
font-size: 12px;
color: #1e3483;

 width: 150px;
 white-space: nowrap;
`

export const ListStatus = styled.Text`
width: 95px;

font-size: 12px;
color: #1e3483;

text-transform: uppercase;
padding-left: 5px;
`

export const ListNumber = styled.Text`
font-size: 13px;
color: #1e3483;
`

export const ListPrice = styled.Text`
font-size: 13px;
color: #40a9ff;

padding-left: 5px;
width: 95px;
`

export const ListDate = styled.Text`
width: 150px;
font-size: 12px;
color: #1e3483;

text-align: center;
`

export const ListPayment = styled.Text`
width: 100%;
font-size: 13px;
color: #1e3483;
`


export const Edit = styled(TouchableOpacity)`
height: fit-content;
width: fit-content;

position: absolute;
right: 10px;
`
