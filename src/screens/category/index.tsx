import * as S from "./style";

import { useFocusEffect } from '@react-navigation/native';
import React,{ useState, useEffect } from "react";
import { api } from "../../services/api";

import { faArrowLeft, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
 
import { Alert, TouchableOpacity, StyleSheet } from "react-native";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
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
  }
});

export function Category(props: Props){
    const [menu, setMenu] = useState(false);

    const [categories, setCategories] = useState([]);
    const [category, setNew] = useState('');

    async function fetchCategories() {
        const Response = await api.get("/category")
  
        if (Response.data) {
          setCategories(Response.data)
        }
    };

    async function handleAddCategory() {
        if (!category.trim()) return 
   
        const exists = categories.some(item => item.name.trim() === category.trim());
   
        if (exists) return Alert.alert('Erro', 'Está categoria já existe!');  
   
        try {
         api.post("/category/", { name: category })
   
         setNew('') 
         setTimeout(fetchCategories, 500)
         Alert.alert('sucesso', 'Categoria adicionada')
   
        } catch(error) {
          console.error(error)
   
          if (error.response) {
           Alert.alert('Erro', error.response.data.message);  
          } else {
           Alert.alert('Erro', 'Erro ao adicionar categoria');
          }
        }
   
       };
   
    async function handleDeleteCategory(category_id: any) {
         try {
   
           await api.delete(`/category/${category_id}`)
          
           setTimeout(fetchCategories, 500) 
           Alert.alert('sucesso', 'Categoria removida')
   
         } catch (error) {
           console.error(error)
           if (error.response) {
            Alert.alert('Erro', error.response.data.message)
           } else {
            Alert.alert('Erro', "Erro ao remover categoria");
           }
         }
    };

    useFocusEffect(
      React.useCallback(() => {
  
        fetchCategories()
  
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

        <S.Title>Adicionar categorias</S.Title>

        <S.NewCategory>
         <S.NewCategoryText>
          Nova Categoria
         </S.NewCategoryText>

         <S.RowView>
          <S.NewCategoryInput
           value={category}
           placeholder="Nova Categoria"
           placeholderTextColor="#475588"
           onChangeText={text => setNew(text)}
          />
          <S.AddButton onPress={handleAddCategory}>
           <FontAwesomeIcon icon={faPlus}  size={20} color="#f0f7fb"/>
          </S.AddButton>
         </S.RowView>
        </S.NewCategory>

        <S.ListHeader>
            <S.SmallText>Categorias:</S.SmallText>
        </S.ListHeader>
        <S.List
         data={categories}            
         keyExtractor={item => item.id}
         renderItem={({ item }) => (
          <S.ListItem>
           <S.SmallText>{item.name}</S.SmallText>
           <TouchableOpacity onPress={()=> handleDeleteCategory(item.id)}>
            <FontAwesomeIcon icon={faXmark} size={20} color="#122569"/>
           </TouchableOpacity>
          </S.ListItem>
         )}    
        />
       </S.Main>
     </S.Container>
    )
}