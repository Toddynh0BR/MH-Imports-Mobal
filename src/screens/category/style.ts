import styled from "styled-components/native";

import { TouchableOpacity, TextInput, FlatList } from "react-native";

export const Container = styled.View`
flex: 1;
background-color: #d8f0fd;
`

export const Main = styled.View`
min-height: 500px;

padding: 45px 10px;
margin: 10px;
gap: 10px;

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

export const NewCategory = styled.View`
height: fit-content;
width: 100%;

`

export const NewCategoryText = styled.Text`
color: #122569;
margin-bottom: 3px;
`

export const RowView = styled.View`
width: 100%;
height: 56px;

flex-direction: row;
gap: 10px;
`

export const NewCategoryInput = styled(TextInput)`
 height: 56px;
 width: 100%;
 flex: 2;

 background-color: #f0f7fb;
 border: 2px solid #122569;
 border-radius: 6px;
 padding: 15px;
`

export const AddButton = styled(TouchableOpacity)`
height: 56px;
width: 56px;

justify-content: center;
align-items: center;

background-color:  #122569;
border: 2px solid #f0f7fb;
border-radius: 6px;
margin-bottom: 10px;
`

export const List = styled(FlatList)`
height: 350px;
width: 100%;
`

export const ListItem = styled.View`
justify-content: space-between;
flex-direction: row;

width: 100%;
padding: 3px 0px;
border-bottom-width: 1px;
border-bottom-color: #1e3483;
`

export const ListHeader = styled.View`
width: 100%;
padding-bottom: 5px;


`