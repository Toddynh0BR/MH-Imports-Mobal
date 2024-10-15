import * as S from "./style";

import { useAuth } from "../../hooks/auth";
import { useState } from "react";

import { Alert } from "react-native";
import { Input } from "../../components/input"; 
import { Button } from "../../components/button";

import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

type Props = {
    navigation: any;
}

export function SignIn(props: Props){
    const { signIn } = useAuth();

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    async function handleLogin() {
        if (!email.trim() || !password.trim()) {
            return Alert.alert("Incompleto", "Preencha todos os campos"); 
        }
    
        try {
            setLoading(true);
            await signIn(email.trim(), password.trim());
           
        } catch (error) {
            
            if (error.response) {
                Alert.alert("Erro", error.response.data.message); 
            } else {
                Alert.alert("Erro", "Erro ao fazer login"); 
            }
        } finally {
            setLoading(false);
        }
      };

    return(
     <S.Container> 
      <S.Image
       source={require("../../assets/MH2.png")} 
      />
      <S.Title>Bem vindo a MH Imports</S.Title>
      <S.SubTitle>Faça login para adicionar produtos, ver histórico de compras e etc.</S.SubTitle>

      <Input
       placeholder="Digite seu email"
       keyboardType="email-address"
       iconName={faEnvelope} 
       label="Email"
       onChangeText={setEmail} 
      />

      <Input
       placeholder="Digite sua senha"
       secureTextEntry={true}
       iconName={faLock} 
       label="Senha"
       onChangeText={setPassword} 
      />

      <S.ForgotTouch onPress={()=>  props.navigation.navigate('forgot')}>
       <S.ForgotText>Esqueceu sua senha?</S.ForgotText>
      </S.ForgotTouch>
      <Button
       title={ loading ? 'Carregando...' : 'Login'}
       onPress={handleLogin}
       disabled={loading}
      />
     </S.Container>
    )
};