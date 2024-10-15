import * as S from "./style";

import { PanResponder, Alert, Animated, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { useAuth } from "../../hooks/auth";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage, faBook, faList, faCartShopping, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

interface MenuProps {
  isMenuOpen: boolean;
  onMove: () => void;
  navigation: any;
}

export function Menu({ isMenuOpen, navigation, onMove }: MenuProps) {
  const translateX = useRef(new Animated.Value(isMenuOpen ? 0 : -300)).current;
  const { logout } = useAuth();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 20; 
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -50) { 
          onMove(); 
          Animated.timing(translateX, {
            toValue: -300,
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else if (gestureState.dx > 50) { 
          Animated.timing(translateX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isMenuOpen ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isMenuOpen, translateX]);

  return (
    <S.Gradient 
     style={{ transform: [{ translateX }] }} {...panResponder.panHandlers}
     colors= {['rgba(0,19,88,1)', 'rgba(30,52,131,1)']}
     start= {{x: 0.5, y: 0 }}
     end= {{ x: 0.5, y: 1 }}
    >
      <S.Container>
        <S.Image source={require("../../assets/MH3.png")}/>

        <S.List>
         <S.ListItem onPress={()=> navigation.navigate('product')}>
          <FontAwesomeIcon icon={faCartShopping} size={20} color="#f0f7fb"/>
          <S.Text>Produtos</S.Text>
         </S.ListItem> 

         <S.ListItem onPress={()=> navigation.navigate('category')}>
          <FontAwesomeIcon icon={faList} size={20} color="#f0f7fb"/>
          <S.Text>Categorias</S.Text>
         </S.ListItem>

         <S.ListItem onPress={()=> navigation.navigate('historic')}>
          <FontAwesomeIcon icon={faBook} size={20} color="#f0f7fb"/>
          <S.Text>Histórico</S.Text>
         </S.ListItem>

         <S.ListItem onPress={()=> navigation.navigate('poster')}>
          <FontAwesomeIcon icon={faImage} size={20} color="#f0f7fb"/>
          <S.Text>Posters</S.Text>
         </S.ListItem>
        </S.List>

        <S.LogoutButton onPress={logout}>
         <S.ListItem onPress={logout}>
          <FontAwesomeIcon icon={faRightFromBracket} size={20} color="#f0f7fb"/>
          <S.Text>Sair</S.Text>
         </S.ListItem>
        </S.LogoutButton>

      </S.Container>
    </S.Gradient>
  );
};
