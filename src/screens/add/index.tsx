import * as S from "./style";

import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

import { faArrowLeft, faCamera, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet } from "react-native";

import { TouchableOpacity, Alert } from "react-native";

import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

import { MoneyInput } from "../../components/moneyInput";
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
    }
});

export function Add(props: Props){
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState(false);

    const [img1, setImg1] = useState(null);
    const [name1, setName1] = useState("");
    const [img2, setImg2] = useState(null);
    const [name2, setName2] = useState("");
    const [img3, setImg3] = useState(null);
    const [name3, setName3] = useState("");
    const [img4, setImg4] = useState(null);
    const [name4, setName4] = useState("");
    const [img5, setImg5] = useState(null);
    const [name5, setName5] = useState("");

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [Variations, setVariations] = useState([]);
    const [NewVariation, setNew] = useState('');

    const [categories, setCategories] = useState([]);

    async function pickImage(setImage: any, setName: any, useCamera = false) {
        let permissionResult;
        if (useCamera) {
            permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        } else {
            permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        }
    
        if (permissionResult.granted === false) {
            alert('Permissão para acessar a galeria ou câmera é necessária!');
            return;
        }
    
        let result;
        if (useCamera) {
            result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1], 
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1], 
                quality: 1,
            });
        }
    
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setName(result.assets[0].fileName);
        }
    };
      
    async function fetchCategories() {
      const Response = await api.get("/category")

      if (Response.data) {
        setCategories(Response.data)
      }
    };

    async function handleSaveItem() {
        if (!name || !price || !category) {
            return Alert.alert('Incompleto', "Preencha todos os campos!");  
        }
        
        if (!img1 && !img2 && !img3 && !img4 && !img5) {
            return Alert.alert('Incompleto', "Adicione pelo menos uma imagem");   
        }
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);    
       
        if (img1) formData.append('img1', {
            uri: img1,
            name: name1 || 'image1.jpg', 
            type: 'image/jpeg' 
        });
        if (img2) formData.append('img2', {
            uri: img2,
            name: name2 || 'image2.jpg', 
            type: 'image/jpeg' 
        });
        if (img3) formData.append('img3', {
            uri: img3,
            name: name3 || 'image3.jpg', 
            type: 'image/jpeg' 
        });
        if (img4) formData.append('img4', {
            uri: img4,
            name: name4 || 'image4.jpg', 
            type: 'image/jpeg' 
        });
        if (img5) formData.append('img5', {
            uri: img5,
            name: name5 || 'image5.jpg', 
            type: 'image/jpeg' 
        });
    
        if (Variations.length) {
            formData.append('variation', JSON.stringify(Variations));
        };
    
        setLoading(true);
        try {
            const response = await api.post('/items/', formData, {
               headers: {'Content-Type': 'multipart/form-data',}
            });
    
            if (response.status === 201) {
                Alert.alert('Sucesso', "Item adicionado com sucesso!");
                props.navigation.navigate('product')
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                
                console.error('Response data:', error.response.data);
                Alert.alert('Erro', error.response.data.message);
            } else if (error.request) {
                
                console.error('Request:', error.request);
                Alert.alert('Erro', 'Nenhuma resposta do servidor');
            } else {
                
                console.error('Error message:', error.message);
                Alert.alert('Erro', error.message);
            }
        } finally {
            setLoading(false);
        }
    }
    
    function handleAddVariation() {
     if(!NewVariation.trim()) return 
  
     if (Variations.some(item => item.trim() === NewVariation.trim())) return   
  
     setVariations(prevState => [...prevState, NewVariation])
     setNew('')
    };
  
    function handleRemoveVariation(name: string) {
     const filteredCategory = Variations.filter(item => item != name)
  
     setVariations(filteredCategory)
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

      <ScrollView keyboardShouldPersistTaps='handled'>
       <S.Main style={styles.shadow}>
        <S.Return onPress={()=>  props.navigation.goBack()}>
         <FontAwesomeIcon icon={faArrowLeft} size={20} color="#122569"/>
         <S.SmallText>
            Voltar
         </S.SmallText>
        </S.Return>

        <S.Title>Adicionar produto</S.Title>

        <S.ImageWrapper>
         <Button
          disabled={false}
          title={name1 ? name1 : 'Adicionar imagem 1'}
          onPress={() => pickImage(setImg1, setName1)}
         />

         { img1 ? 
          <S.ImageInput onPress={() => {setImg1(null); setName1('')}}>
           <FontAwesomeIcon icon={faXmark}  size={20} color="#f0f7fb"/>
          </S.ImageInput>
         :
          <S.ImageInput onPress={() => pickImage(setImg1, setName1, true)}>
           <FontAwesomeIcon icon={faCamera}  size={20} color="#f0f7fb"/>
          </S.ImageInput>
         }
       

        </S.ImageWrapper>

        <S.ImageWrapper>
         <Button
          disabled={false}
          title={name2 ? name2 : 'Adicionar imagem 2'}
          onPress={() => pickImage(setImg2, setName2)}
         />

        { img2 ? 
          <S.ImageInput onPress={() => {setImg2(null); setName2('')}}>
           <FontAwesomeIcon icon={faXmark}  size={20} color="#f0f7fb"/>
          </S.ImageInput>
         :
          <S.ImageInput onPress={() => pickImage(setImg2, setName2, true)}>
           <FontAwesomeIcon icon={faCamera}  size={20} color="#f0f7fb"/>
          </S.ImageInput>
         }
       
         
        </S.ImageWrapper>

        <S.ImageWrapper>
         <Button
          disabled={false}
          title={name3 ? name3 : 'Adicionar imagem 3'}
          onPress={() => pickImage(setImg3, setName3)}
         />
        
        { img3 ? 
          <S.ImageInput onPress={() => {setImg3(null); setName3('')}}>
           <FontAwesomeIcon icon={faXmark}  size={20} color="#f0f7fb"/>
          </S.ImageInput>
         :
          <S.ImageInput onPress={() => pickImage(setImg3, setName3, true)}>
           <FontAwesomeIcon icon={faCamera}  size={20} color="#f0f7fb"/>
          </S.ImageInput>
         }
       
         
        </S.ImageWrapper>

        <S.ImageWrapper>
         <Button
          disabled={false}
          title={name4 ? name4 : 'Adicionar imagem 4'}
          onPress={() => pickImage(setImg4, setName4)}
         />
        
        { img4 ? 
          <S.ImageInput onPress={() => {setImg4(null); setName4('')}}>
           <FontAwesomeIcon icon={faXmark}  size={20} color="#f0f7fb"/>
          </S.ImageInput>
         :
          <S.ImageInput onPress={() => pickImage(setImg4, setName4, true)}>
           <FontAwesomeIcon icon={faCamera}  size={20} color="#f0f7fb"/>
          </S.ImageInput>
         }
       
        </S.ImageWrapper>

        <S.ImageWrapper>
         <Button
          disabled={false}
          title={name5 ? name5 : 'Adicionar imagem 5'}
          onPress={() => pickImage(setImg5, setName5)}
         />
        
        { img5 ? 
          <S.ImageInput onPress={() => {setImg5(null); setName5('')}}>
           <FontAwesomeIcon icon={faXmark}  size={20} color="#f0f7fb"/>
          </S.ImageInput>
         :
          <S.ImageInput onPress={() => pickImage(setImg5, setName5, true)}>
           <FontAwesomeIcon icon={faCamera}  size={20} color="#f0f7fb"/>
          </S.ImageInput>
         }
       
        </S.ImageWrapper>

        <Input
         label="Nome do Produto"
         placeholder="Nome" 
         value={name}
         onChangeText={text => setName(text)}
        />

        <MoneyInput
         onChangeValue={setPrice}
         label="Preço do produto"
         placeholder="R$ 0,00"
         value={price}
        />

        <S.SelectView>
         <S.NewVariationText>
          Categoria do produto
         </S.NewVariationText>
         <S.SelectBox>
          <S.Select
           selectedValue={category}
           onValueChange={(itemValue) => setCategory(itemValue)} 
          >
           <Picker.Item label="Categorias" value={0}/>
           { categories.length ? 
            categories.map(item=> (
             <Picker.Item label={item.name} value={item.name} key={item.id}/>
            ))
           :
            null 
           }
          </S.Select>
         </S.SelectBox>
        </S.SelectView>

        <S.NewVariation>
         <S.NewVariationText>
          Nova variação
         </S.NewVariationText>

         <S.RowView>
          <S.NewVariationInput
           value={NewVariation}
           placeholder="Nova Variação"
           placeholderTextColor="#475588"
           onChangeText={text => setNew(text)}
          />
          <S.ImageInput onPress={handleAddVariation}>
           <FontAwesomeIcon icon={faPlus}  size={20} color="#f0f7fb"/>
          </S.ImageInput>
         </S.RowView>
        </S.NewVariation>

        <S.NewVariationText>
         Variações
        </S.NewVariationText>

        <S.Variations>

         { Variations.length ? 
          Variations.map((item, index) => ( 
          <S.Variation key={index}>
           <S.VariationText>{item}</S.VariationText>
           <TouchableOpacity onPress={()=> handleRemoveVariation(item)}>
            <FontAwesomeIcon icon={faXmark} size={20} color="#f0f7fb"/>
           </TouchableOpacity>
          </S.Variation>
          ))
         :
         null
         }

        </S.Variations>

        <Button
         title={ loading ? 'Salvando...' : 'Salvar'}
         onPress={handleSaveItem}
         disabled={loading}
        />
       </S.Main>
      </ScrollView>
     </S.Container>
    )
};