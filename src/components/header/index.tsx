import * as S from "./style";

import { Alert, TouchableOpacity } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear, faBars } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  openMenu: ()=> void;
  navigation: any;
}

export function Header({ openMenu, navigation }: HeaderProps){
  const showAlert = () => {
    Alert.alert('Título do Alerta', 'Esta é uma mensagem de alerta.', [
      { text: 'Cancelar', onPress: () => console.log('Cancelar pressionado'), style: 'cancel' },
      { text: 'OK', onPress: () => console.log('OK pressionado') },
    ]);
  };
    return(
     <S.Gradient
      colors= {['rgba(0,19,88,1)', 'rgba(30,52,131,1)']}
      start= {{x: 0.5, y: 0 }}
      end= {{ x: 0.5, y: 1 }} 
     >
      <S.Container>

      <TouchableOpacity onPress={openMenu}>
       <FontAwesomeIcon icon={faBars} size={25} color="#f0f7fb" />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> navigation.navigate('home')}>
       <S.Image 
        source={require("../../assets/Header.png")} 
       />
      </TouchableOpacity>

      <TouchableOpacity >
       <FontAwesomeIcon icon={faGear} size={-10} color="#f0f7fb" />
      </TouchableOpacity>
      </S.Container>
     </S.Gradient>
    )
}