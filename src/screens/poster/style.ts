import styled from "styled-components/native";

import { TouchableOpacity, FlatList } from "react-native";

export const Container = styled.View`
flex: 1;
background-color: #d8f0fd;
`

export const Main = styled.View`
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
margin-bottom: 0px;
`

export const ListTitle = styled.Text`
font-size: 20px;
color: #1e3483;
`

export const ListMobal = styled(FlatList)`
border: 1px solid #dad6d6c2;
border-radius: 5px;
padding: 10px;

height: 200px;
`

export const MobalListItem = styled.View`
height: 100%;
width: 110px;


align-items: center;
gap: 20px;

border: 1px solid #dad6d6c2;
padding-bottom: 20px;
border-radius: 5px;
padding-top: 5px;
`

export const MobalImg = styled.Image`
width: 100px;
height: 100px;

`

export const ListPc = styled(FlatList)`
border: 1px solid #dad6d6c2;
border-radius: 5px;
padding: 10px;

height: 200px;
`

export const PcListItem = styled.View`
height: 130px;
width: 100%;

align-items: center;
gap: 10px;

border: 1px solid #dad6d6c2;
border-radius: 5px;
padding: 5px;
`

export const PcImg = styled.Image`
height: 85px;
width: 100%;
`
