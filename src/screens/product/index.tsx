import * as S from "./style";

import { useFocusEffect } from '@react-navigation/native';
import React,{ useState } from "react";
import { api } from "../../services/api";

import { faArrowLeft, faPlus, faPen, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet } from "react-native";

import { TouchableOpacity, Alert, View } from "react-native";

import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { Menu } from "../../components/menu";
import { ScrollView } from 'react-native';

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
        gap: 5
    }
});

export function Product(props: Props){
    const [products, setProducts] = useState([]);
    const [menu, setMenu] = useState(false);

    const [typingTimeout, setTypingTimeout] = useState<any>(null);
    const [results, setResults] = useState([]);
    const [index, setIndex] = useState('');

    async function fetchItems(){
        const Response = await api.post("/items/index")
     
        setProducts(Response.data)
    };

    function formatarComoDecimal(valor: any) {
     return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(valor);
    };

    async function handleSearch(value: string) {
      if (!value.trim()) return;
  
      Response = await api.post("/items/index", { index: value })
  
      if (Response.data) {
        const filteredResponse = Response.data.filter(item => item.status !== 0)
        setResults(filteredResponse)
      }
    };
  
    function handleInputChange(text: string) {
      const value = text
      if (!value.trim()) setResults([])
      setIndex(value);
  
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
  
      const newTimeout = setTimeout(() => {
        handleSearch(value);
      }, 500); 
  
      setTypingTimeout(newTimeout);
    };

    useFocusEffect(
      React.useCallback(() => {
        fetchItems()
  
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
         <Input
          onChangeText={text =>  handleInputChange(text)}
          placeholder="Pesquisar por produto"
          iconName={faMagnifyingGlass}
          label=""
         />
        </View>

        <View style={styles.row}>
         <S.Title>Produtos</S.Title>
         <TouchableOpacity onPress={()=>  props.navigation.navigate('add')}>
          <FontAwesomeIcon icon={faPlus} size={25} color="#122569"/>
         </TouchableOpacity>
        </View>

        <S.List
         data={results.length ? results : products}
         keyExtractor={item => item.id}
         ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
         renderItem={({item})=> (
           <TouchableOpacity onPress={()=> props.navigation.navigate('preview', { itemId: item.id })}>
            <S.ListItem>
             <S.ItemImage
              source={{ uri: `${api.defaults.baseURL}/files/${item.img1}`}}
             />
             <View>
              <S.SmallText>{item.name}</S.SmallText>
              { item.promotion ? 
               <View style={styles.row2}>
                <S.Price>R${formatarComoDecimal(item.price - (item.price * item.promotion) / 100)}</S.Price>
                <S.CutPrice>R${formatarComoDecimal(item.price)}</S.CutPrice>
                <S.Promotion>-%{item.promotion}</S.Promotion>
               </View>
              :
               <S.Price>R${formatarComoDecimal(item.price)}</S.Price>
              }
             </View>
             <S.Edit onPress={()=> props.navigation.navigate('edit', { itemId: item.id})}>
              <FontAwesomeIcon icon={faPen} size={20} color="#1e3483"/>
             </S.Edit>
            </S.ListItem>
           </TouchableOpacity>
         )}
         ListEmptyComponent={() => (
           <S.SmallText>Nenhum produto encontrado.</S.SmallText>
         )}
        />
       </S.Main>
     </S.Container>
    )
};