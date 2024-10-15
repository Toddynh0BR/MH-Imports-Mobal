import * as S from "./style";

import { useFocusEffect } from '@react-navigation/native';
import React,{ useState } from "react";
import { api } from "../../services/api";

import { faArrowLeft, faPlus, faPen, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet } from "react-native";

import { TouchableOpacity, Alert, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Header } from "../../components/header";
import { Menu } from "../../components/menu";


type Props = {
    navigation: any;
    route: any;
}

const styles = StyleSheet.create({
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 6,
    },
    rowTitle: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    loading: {
      alignSelf: 'center',
      marginTop: 250
    }
});

export function Order(props: Props){
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState(false);
    
    const [status, setStatus] = useState('');
    const [items, setItems] = useState([{"id": 1, "item_id": 2, "item_price": 80, "item_promotion": 12, "name": "Caixa de som", "order_id": 1, "quantity": 2, "total": 140.8}, {"id": 3, "item_id": 4, "item_price": 50, "item_promotion": "", "name": "Caixa de som", "order_id": 1, "quantity": 1, "total": 50}]);
    const [order, setOrder] = useState();

    const { itemId } = props.route.params;

    async function fetchHistoric(id: any) {
      const Response = await api.get("/orders/historic");
     
      if (Response.data) {
       const filteredResponse = Response.data.orderItems.filter(item => item.info.id == id)
 
       setOrder(filteredResponse[0])
       setItems(filteredResponse[0].items)
       setStatus(filteredResponse[0].info.status)
      }
    };

    function handleUpdateOrder(status: any, id: any) {
      setStatus(status)
      api.put(`/orders/update/${id}`, { status })
  
      setTimeout(fetchHistoric, 3000);
    };

    function formatarComoDecimal(valor: number) {
     return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(valor);
    };

    useFocusEffect(
      React.useCallback(() => {
        const { itemId } = props.route.params;
  
        fetchHistoric(itemId)

        return () => {
          setMenu(false);
        };
      }, [])
    );

    if (!order) {
      return (     
       <S.Container>
        <Header openMenu={() => setMenu(true)}  navigation={props.navigation}/>
        <Menu isMenuOpen={menu} onMove={() => setMenu(false)} navigation={props.navigation}/>
        
           <S.Title style={styles.loading}>Carregando...</S.Title>

       </S.Container>);
    }

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

        <View>
        <S.OrderTitle>Usuário: </S.OrderTitle>
         <S.OrderInfo> { order.user ? order.user.name : 'Não cadastrado'}</S.OrderInfo>
        </View>

        <View>
         <S.OrderTitle>Realizado em:</S.OrderTitle>
         <S.OrderInfo> {order.info.created_at}</S.OrderInfo>
        </View>

        <View>
         <S.OrderTitle>Ultima atualização em:</S.OrderTitle>
         <S.OrderInfo> {order.info.created_at}</S.OrderInfo>
        </View>
        
        <View>
         <S.OrderTitle>Forma de pagamento:</S.OrderTitle>
         <S.OrderInfo> {order.info.payment}</S.OrderInfo>
        </View>

        <View>
         <S.OrderTitle>Total do pedido:</S.OrderTitle>
         <S.OrderInfo> R${formatarComoDecimal(order.info.total)}</S.OrderInfo>
        </View>

        <S.Select
           selectedValue={status}
           onValueChange={(itemValue) => handleUpdateOrder(itemValue, itemId)} 
        >
         <Picker.Item label="Finalizado" value="finalizado"/>
         <Picker.Item label="Pronto" value="pronto"/>
         <Picker.Item label="Preparando" value="preparando"/>
         <Picker.Item label="Pendente" value="pendente"/>
         <Picker.Item label="Cancelado" value="cancelado"/>

        </S.Select>

        <S.SmallText>Items:</S.SmallText>

        <S.List
         data={items}
         keyExtractor={item=> item.id}
         renderItem={({item})=> (
          <S.ListItem>
            <S.ListText numberOfLines={1} ellipsizeMode="tail">{item.quantity}x {item.name}</S.ListText>

            <S.Total>R${formatarComoDecimal(item.total)}</S.Total>
          
            {
              item.item_promotion ?
               <View style={styles.row}>
               <S.Price>R${formatarComoDecimal( item.item_price - (item.item_price * item.item_promotion) / 100)}</S.Price>
               <S.CutPrice>R${formatarComoDecimal(item.item_price)}</S.CutPrice>
               </View>
              :
              <S.Price>R${formatarComoDecimal(item.item_price)}</S.Price>
            }

            
          </S.ListItem>
         )}
        />
   
       </S.Main>
     </S.Container>
    )
};