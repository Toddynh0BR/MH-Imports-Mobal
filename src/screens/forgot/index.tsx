import * as S from "./style";

import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import { useState } from "react";

import { faArrowLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { StyleSheet } from "react-native";

import { Button } from "../../components/button";
import { Input } from "../../components/input"; 
import { Alert } from "react-native";

type Props = {
    navigation: any;
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },

});

export function Forgot(props: Props){
    const { signIn } = useAuth();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [stage, setStage] = useState(1);

    async function handleRedefine() {
        if (!email.trim()) return Alert.alert('Incompleto', "Digite seu email para continuar.")
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     
        if (!emailRegex.test(email)) return Alert.alert('Inválido', 'Digite um email válido para continuar.')

        try {
         setLoading(true)
         await api.post("/usersinfo/forgot", { email });
         setStage(2); 

        } catch (error) {
          setStage(1); 
          if (error.response) {
            Alert.alert('Erro', error.response.data.message)
          } else {
            Alert.alert('Erro', 'Erro ao redefinir senha.')
          }
        } finally {
          setLoading(false)
        }     
    };

    return(
     <S.Container> 
      <S.Header>
       <S.ReturnButton onPress={()=>  props.navigation.goBack()}>
        <FontAwesomeIcon icon={faArrowLeft} size={20} color="#122569"/>
       </S.ReturnButton>
       <S.Title>Esqueceu a senha</S.Title>
       <FontAwesomeIcon icon={faArrowLeft} size={20} color="#f0f7fb"/>
      </S.Header>
    
      <S.Image
       source={require("../../assets/MH2.png")} 
      />
      
      { stage == 1 ?
       <>
        <S.Title>Redefinir senha</S.Title>
        <S.SubTitle>Digite seu email para redefinir sua senhas</S.SubTitle>

        <Input
         placeholder="Digite seu email"
         keyboardType="email-address"
         iconName={faEnvelope} 
         label="Email"
         onChangeText={setEmail} 
        />

        <Button
         title={ loading ? 'Carregando...' : 'Pronto'}
         onPress={handleRedefine}
         disabled={loading}
        />
       </>
      : 

      <S.Completed style={styles.shadow}>
        <FontAwesomeIcon icon={faEnvelope} size={40} color="#122569"/>
       <S.SubTitle>Um email de redefinição foi enviado para <S.Strong>{email}</S.Strong>. Por favor verifique-o!</S.SubTitle>
      </S.Completed>
      }
      
     </S.Container>
    )
};