import * as S from "./style";

import { useFocusEffect } from '@react-navigation/native';
import React,{ useState } from "react";
import { api } from "../../services/api";

import { faArrowLeft, faPlus, faPen, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet } from "react-native";

import { TouchableOpacity, Alert, View } from "react-native";

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

export function Preview(props: Props){
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState(false);
    const { itemId } = props.route.params;
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [finalPrice, setFinal] = useState(0);
    const [category, setCategory] = useState('');
    const [promotion, setPromotion] = useState('');
    const [variation, setVariation] = useState([]);

    const [selectedImg, setImg] = useState<any>();
    const [img1, setImg1] = useState<any>();
    const [img2, setImg2] = useState<any>();
    const [img3, setImg3] = useState<any>();
    const [img4, setImg4] = useState<any>();
    const [img5, setImg5] = useState<any>();

    function formatarComoDecimal(valor: number) {
     return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(valor);
    };

    async function fetchItem(id: any) {
      try {
        const response = await api.get(`/items/${id}`);
  
        const item = response.data.item;
        setName(item.name);
        setPrice(item.price);
        setCategory(item.category);
        setPromotion(item.promotion || '');
  
        const newFinalPrice = item.promotion
          ? item.price - (item.price * item.promotion) / 100
          : item.price;
        setFinal(newFinalPrice);
  
        setVariation(response.data.variations || []);
      
        if (item.img1) setImg1({ uri: `${api.defaults.baseURL}/files/${item.img1}`});
        if (item.img2) setImg2({ uri: `${api.defaults.baseURL}/files/${item.img2}`});
        if (item.img3) setImg3({ uri: `${api.defaults.baseURL}/files/${item.img3}`});
        if (item.img4) setImg4({ uri: `${api.defaults.baseURL}/files/${item.img4}`});
        if (item.img5) setImg5({ uri: `${api.defaults.baseURL}/files/${item.img5}`});
        
        setImg({ uri: `${api.defaults.baseURL}/files/${item.img1}`});
        if (!item.img1) setImg({ uri: `${api.defaults.baseURL}/files/${item.img2}`});
        if (!item.img2 && !item.img1) setImg({ uri: `${api.defaults.baseURL}/files/${item.img3}`});
        if (!item.img3 && !item.img1) setImg({ uri: `${api.defaults.baseURL}/files/${item.img4}`});
        if (!item.img4 && !item.img1) setImg({ uri: `${api.defaults.baseURL}/files/${item.img5}`});
        
      } catch (error) {
        console.error('Erro ao buscar item:', error);
      }
    };

    useFocusEffect(
      React.useCallback(() => {
  
        const { itemId } = props.route.params;
        fetchItem(itemId)
  
        return () => {
          setMenu(false);
        };
      }, [])
    );

    if (!name) {
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

        <S.ImageBox>
         <S.SelectedImage source={selectedImg}/>
         <S.ImagesColumm>
          {
            img1 ?
            <TouchableOpacity onPress={()=> setImg(img1)}>
             <S.Images
              source={img1}
             />
            </TouchableOpacity>
          :
           null
          }

          {
            img2 ?
            <TouchableOpacity onPress={()=> setImg(img2)}>
             <S.Images
              source={img2}
             />
            </TouchableOpacity>
          :
           null
          }   

          {
            img3 ?
            <TouchableOpacity onPress={()=> setImg(img3)}>
             <S.Images
              source={img3}
             />
            </TouchableOpacity>
          :
           null
          }

          {
            img4 ?
            <TouchableOpacity onPress={()=> setImg(img4)}>
             <S.Images
              source={img4}
             />
            </TouchableOpacity>
          :
           null
          } 

          {
            img5 ?
            <TouchableOpacity onPress={()=> setImg(img5)}>
             <S.Images
              source={img5}
             />
            </TouchableOpacity>
          :
           null
          }          
         </S.ImagesColumm>
        </S.ImageBox>

        <View style={styles.rowTitle}>
         <S.Title>{name}</S.Title>
         <TouchableOpacity onPress={()=> props.navigation.navigate('edit', { itemId })}>
          <FontAwesomeIcon icon={faPen} size={20} color="#122569"/>
         </TouchableOpacity>
        </View>

       
         { promotion ?
          <View style={styles.row}>
           <S.Price>
             R${formatarComoDecimal(finalPrice)}
           </S.Price>
           <S.CutPrice>
             R${formatarComoDecimal(price)}
           </S.CutPrice>
           <S.Promotion>
            -%{promotion}
           </S.Promotion>
          </View>
         :
          <S.Price>
           R${formatarComoDecimal(finalPrice)}
          </S.Price>
         }


        <S.SmallText>
          Variações
        </S.SmallText>

        <S.List
         data={variation}
         keyExtractor={item => item.id}
         renderItem={({item})=> (
          <S.ListItem>
            <S.ListText>{item.name}</S.ListText>
          </S.ListItem>
         )}
        />
       </S.Main>
     </S.Container>
    )
};