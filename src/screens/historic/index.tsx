import * as S from "./style";

import { useFocusEffect } from '@react-navigation/native';
import React,{ useState } from "react";
import { api } from "../../services/api";

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from "react-native";

import { TouchableOpacity, Alert, View } from "react-native";

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
    row: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    row2: {
        flexDirection: 'row', 
        alignItems: 'center',
        gap: 5
    },
    font: {
      fontSize: 18
    }
});

export function Historic(props: Props){
    const [orders, setOrders] = useState([]);
    const [menu, setMenu] = useState(false);

    async function fetchHistoric() {
      const Response = await api.get("/orders/historic");
     
      if (Response.data) {
       setOrders(Response.data.orderItems)
      }
    };

    function formatarComoDecimal(valor: any) {
     return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(valor);
    };

    useFocusEffect(
      React.useCallback(() => {
        fetchHistoric()
        return () => {
          setMenu(false);
        };
      }, [])
    );

    return(
     <S.Container>
      <Header openMenu={() => setMenu(true)}  navigation={props.navigation}/>
      <Menu isMenuOpen={menu} onMove={() => setMenu(false)} navigation={props.navigation}/>
      

       <S.Main style={styles.shadow}>
        <S.Return onPress={()=>  props.navigation.goBack()}>
         <FontAwesomeIcon icon={faArrowLeft} size={20} color="#122569"/>
         <S.SmallText>
            Voltar
         </S.SmallText>
        </S.Return>

        <View style={styles.row}>
         <S.Title>Pedidos</S.Title>
        </View>

        <S.List
         data={orders}
         keyExtractor={item => item.info.id}
         ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
         renderItem={({item})=> (
           <TouchableOpacity onPress={()=> props.navigation.navigate('order', { itemId: item.info.id})}>
            <S.ListItem>
             <View style={styles.row}>
              <S.ListId>#{String(item.info.id).padStart(5, '0')}</S.ListId>
              
              <S.ListUser numberOfLines={1} ellipsizeMode="tail">
                { item.user ? item.user.name : 'Usuário não cadastrado.'}
              </S.ListUser>
              
              <S.ListStatus>{item.info.status}</S.ListStatus>
             </View>
             
             <View style={styles.row}>
              <S.ListNumber>{item.items.length}x Items</S.ListNumber>
              <S.ListDate>{item.info.created_at}</S.ListDate>
              <S.ListPrice>R${formatarComoDecimal(item.info.total)}</S.ListPrice>
             
             </View>
             <S.ListPayment>Forma de pagamento: {item.info.payment}</S.ListPayment>
  
            </S.ListItem>
           </TouchableOpacity>
         )}
         ListEmptyComponent={() => (
           <S.SmallText>Nenhum pedido feito ainda.</S.SmallText>
         )}
        />
       </S.Main>
     </S.Container>
    )
};