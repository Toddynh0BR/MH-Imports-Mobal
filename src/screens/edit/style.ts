import styled from "styled-components/native";

import { TouchableOpacity, TextInput } from "react-native";
import { Picker } from '@react-native-picker/picker';

export const Container = styled.View`
flex: 1;
background-color: #d8f0fd;
`

export const Main = styled.View`
min-height: 1000px;

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

export const ImageWrapper = styled.View`
height: fit-content;
width: 100%;

flex-direction: row;
gap: 10px;

padding-right: 74px;
`

export const ImageInput = styled(TouchableOpacity)`
height: 56px;
width: 56px;

justify-content: center;
align-items: center;

background-color:  #122569;
border: 2px solid #f0f7fb;
border-radius: 6px;
margin-bottom: 10px;
`

export const SelectView = styled.View`
height: fit-content;
width: fit-content;

margin-bottom: 5px;
`

export const SelectBox = styled.View`
height: fit-content;
width: fit-content;

border: 2px solid #122569;
border-radius: 6px;
overflow: hidden;
`

export const Select = styled(Picker)`
width: 100%;
height: 56px;

background-color: #f0f7fb;
color: #1e3483;
`

export const NewVariation = styled.View`
height: fit-content;
width: 100%;

`

export const NewVariationText = styled.Text`
color: #122569;
margin-bottom: 3px;
`

export const RowView = styled.View`
width: 100%;
height: 56px;

flex-direction: row;
gap: 10px;
`

export const NewVariationInput = styled(TextInput)`
 height: 56px;
 width: 100%;
 flex: 2;

 background-color: #f0f7fb;
 border: 2px solid #122569;
 border-radius: 6px;
 padding: 15px;
`

export const Variations = styled.View`
 min-height: 112px;
 width: 100%;

 background-color: #f0f7fb;
 border: 2px solid #122569;
 border-radius: 6px;
 padding: 5px;
 margin-top: -10px;

 flex-direction: row;
 align-items: center;
 flex-wrap: wrap;
 display: flex;
 gap: 10px;
`

export const Variation = styled.View`
height: 45px;

background-color:  #122569;
border-radius: 10px;
padding: 10px;

justify-content: center;
flex-direction: row;
align-items: center;
gap: 5px;
`

export const VariationText = styled.Text`
color: #f0f7fb;
`