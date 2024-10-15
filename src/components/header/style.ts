import { LinearGradient } from 'expo-linear-gradient';
import styled from "styled-components/native";

export const Container = styled.View`
height: 100px;
width: 100%;

transition: .3s ease-in-out;

padding: 15px 20px 0px 20px;
justify-content: space-between;
align-items: center;
flex-direction: row;
display: flex;
`

export const Image = styled.Image`
width: 200px;
height: 26px;
`

export const Title = styled.Text`
font-weight: bold;
font-size: 24px;
color: #FFFFFF;

z-index: 10;
`

export const Gradient = styled(LinearGradient).attrs(() => ({
}))`
 height: fit-content;
 width: 100%;
`;