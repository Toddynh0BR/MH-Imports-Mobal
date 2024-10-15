import * as S from "./style";
import React from "react";

import { useFocusEffect } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Alert } from "react-native";

import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Menu } from "../../components/menu";

type Props = {
  navigation: any;
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  picker: {
    height: 50,
    width: 150,
  },
});

export function Home(props: Props) {
  const [completeds, setCompleteds] = useState(0);
  const [canceleds, setCanceleds] = useState(0);
  const [products, setProducts] = useState(0);
  const [pendents, setPendents] = useState(0);
  const [clients, setClients] = useState(0);

  const [isConnectedToWifi, setIsConnectedToWifi] = useState(false);
  const [status, setStatus] = useState<number | undefined>();
  const [menu, setMenu] = useState(false);

  async function fetchInfo() {
    try {
      const response = await api.get('/orders/historic');
      const storeResponse = await api.get("/store/");

      if (storeResponse.data) {
        let statusNow

        if (storeResponse.data.store.status == 0) {
            statusNow= 2
        } else {
            statusNow= 1
        }
        setStatus(statusNow);
      }

      if (response.data) {
        setCanceleds(response.data.CanceledOrders.length);
        setCompleteds(response.data.Realized.length);
        setPendents(response.data.Pendents.length);
        setClients(response.data.Clients.length);
        setProducts(response.data.Items.length);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as informações");
    }
  };

  async function handleStatus(status: number) {
    let statusNow 

    if (status === 2){
        statusNow = 0
    }else {
        statusNow = 1
    }

    setStatus(status)
    await api.post("/store", { status: statusNow });
  };

  useFocusEffect(
    React.useCallback(() => {

      fetchInfo();

      return () => {
        setMenu(false);
      };
    }, [])
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnectedToWifi(state.type === 'wifi' && state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <S.Container>
      <Header openMenu={() => setMenu(true)} navigation={props.navigation}/>
      <Menu isMenuOpen={menu} onMove={() => setMenu(false)} navigation={props.navigation}/>

      <S.Main style={styles.shadow}>
        <S.MainTitle>Minha loja</S.MainTitle>
        {isConnectedToWifi ? (
          <>
            <S.MainText>Produtos cadastrados: {products}</S.MainText>
            <S.MainText>Clientes cadastrados: {clients}</S.MainText>
            <S.MainText>Compras realizadas: {completeds}</S.MainText>
            <S.MainText>Compras canceladas: {canceleds}</S.MainText>
            <S.MainText>Pedidos pendentes: {pendents}</S.MainText>

            
            <S.MainTitle>Status da loja</S.MainTitle>
            <S.Select
              selectedValue={status}
              onValueChange={(itemValue) => handleStatus(Number(itemValue))} 
            >
              <Picker.Item label="Aberta" value={1} />
              <Picker.Item label="Fechada" value={2} />
            </S.Select>

            <S.MainTitle>Funções</S.MainTitle>
            <Button
             title="Adicionar produto" 
             onPress={()=> props.navigation.navigate('add')}
             disabled={false}
            />
            
            <Button
             title="Adicionar categoria" 
             onPress={()=> props.navigation.navigate('category')}
             disabled={false}
            />

            <Button
             title="Adicionar poster" 
             onPress={()=> props.navigation.navigate('poster')}
             disabled={false}
            />


          </>
        ) : (
          <>
            <S.ImageNoWifi source={require('../../assets/no-wifi.png')} />
            <S.TextNoWifi>Conecte-se ao Wifi para continuar</S.TextNoWifi>
          </>
        )}
      </S.Main>
    </S.Container>
  );
}
