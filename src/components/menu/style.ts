import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import styled from "styled-components/native";
import { Animated } from 'react-native';

interface GradientProps {
  isMenuOpen: boolean;
}

export const Container = styled.View`
  height: 100%;
  width: 100%;

  align-items: center;
  gap: 10px;

  padding-top: 30px;
`;

export const Image = styled.Image`
height: 150px;
width: 150px;

margin-bottom: 10px;
`

export const ListItem = styled(TouchableOpacity)`
align-items: center;
flex-direction: row;
gap: 5px;
`

export const Text = styled.Text`
font-size: 24px;
color: #f0f7fb;
`;

export const LogoutButton = styled(TouchableOpacity)`
position: absolute;
bottom: 30px;
`

export const List = styled.View`
height: fit-content;
width: 50%;

align-items: flex-start;
gap: 10px;
`

export const Gradient = styled(Animated.createAnimatedComponent(LinearGradient)).attrs(() => ({
  }))`
    height: 100%;
    width: 80%;
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
`;



