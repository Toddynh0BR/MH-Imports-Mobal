import * as S from "./style";

import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

import { faArrowLeft, faCamera, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet } from "react-native";

import { TouchableOpacity, Alert, Text, View } from "react-native";

import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

import { MaskedTextInput } from 'react-native-mask-text';
import { MoneyInput } from "../../components/moneyInput";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { Menu } from "../../components/menu";
import { ScrollView } from 'react-native';

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
    loading: {
        alignSelf: 'center',
        marginTop: 250
    },
    label: {
      color: '#122569',
      marginBottom: 3
    },
    input: {
     width: '100%',
     height: 56,
     backgroundColor: '#f0f7fb',
     borderWidth: 2,
     borderColor: '#122569',
     borderRadius: 6,
     padding: 15,
     color: '#000517',
     marginBottom: 10
    }
});

export function Edit(props: Props){
    const [loading, setLoading] = useState(false);
    const [loadingDel, setLoadingDel] = useState(false);
    const [menu, setMenu] = useState(false);
    const id = props.route.params.itemId;

    const [name, setName] = useState('');
    const [high, setHigh] = useState('');
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState();
    const [category, setCategory] = useState('');
    const [promotion, setPromotion] = useState('');

    const [variations, setVariation] = useState([]);
    const [categories, setCategories] = useState([]);

    const [newImg1, setNew1] = useState(null);
    const [name1, setName1] = useState('');

    const [newImg2, setNew2] = useState(null);
    const [name2, setName2] = useState('');

    const [newImg3, setNew3] = useState(null);
    const [name3, setName3] = useState('');

    const [newImg4, setNew4] = useState(null);
    const [name4, setName4] = useState('');

    const [newImg5, setNew5] = useState(null);
    const [name5, setName5] = useState('');


    const [newVariation, setNewVariation] = useState('');
    
    function extractImageName(imagePath: any){
        return imagePath.slice(21)
    };

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
    
    function handleAddVariation() {
        if(!newVariation.trim()) return
  
        if (variations.some(item => item.name.trim() === newVariation.trim())) return Alert.alert('Erro', 'Essa variação já existe')
  
        setVariation(prevState => [...prevState, {name: newVariation}])
        setNewVariation('')
    };
  
    function handleRemoveVariation(name: string) {
      const filteredCategory = variations.filter(item => item.name != name)

      setVariation(filteredCategory)
    };

    async function handleSubmit() {
    const formData = new FormData();

    if (newImg1) formData.append('img1', {
        uri: newImg1,
        name: name1 || 'image1.jpg', 
        type: 'image/jpeg' 
    });
    if (newImg2) formData.append('img2', {
        uri: newImg2,
        name: name2 || 'image2.jpg', 
        type: 'image/jpeg' 
    });
    if (newImg3) formData.append('img3', {
        uri: newImg3,
        name: name3 || 'image3.jpg', 
        type: 'image/jpeg' 
    });
    if (newImg4) formData.append('img4', {
        uri: newImg4,
        name: name4 || 'image4.jpg', 
        type: 'image/jpeg' 
    });
    if (newImg5) formData.append('img5', {
        uri: newImg5,
        name: name5 || 'image5.jpg', 
        type: 'image/jpeg' 
    });

    let RealStatus
    let RealHigh

    if (high == 2){
        RealHigh == 0
    }else{
        RealHigh == 1
    }

    if (status == 2){
        RealStatus = 0
    } else {
        RealStatus = 1
    }

    formData.append('name', name);
    formData.append('high', RealHigh);
    formData.append('price', price);
    formData.append('status', RealStatus);
    formData.append('category', category);
    formData.append('promotion', promotion == 0 ? '' : promotion);
    formData.append('variation', JSON.stringify(variations));
 
      setLoading(true)
      try {
        
          await api.put(`/items/${id}`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          Alert.alert('Sucesso', "Item atualizado com sucesso!") 
          props.navigation.navigate('product')
      } catch (error) {
          console.error('Erro ao atualizar item:', error);
          if (error.response) {
            Alert.alert('Erro', error.response.data.message)
          } else {
            Alert.alert('Erro', "Erro ao atualizar item.")
        }
      } finally {
        setLoading(false)
      }
    };

    async function handleDelete() {
        Alert.alert(
            "Confirmar Deleção",
            "Tem certeza de que deseja deletar este item?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Deletar",
                    onPress: async () => {
                        setLoadingDel(true);
                        try {
                            await api.delete(`/items/${id}`); 
                            props.navigation.navigate('product')
                        } catch (error) {
                            console.log(error);
                        } finally {
                            setLoadingDel(false);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    async function fetchItem(id: any) {
        try {
          const response = await api.get(`/items/${id}`);
    
          const item = response.data.item;
          setName(item.name);
          setHigh(item.high == 0 ? 2 : 1);
          setPrice(item.price);
          setStatus(item.status == 0 ? 2 : 1);
          setCategory(item.category);
          setPromotion(item.promotion || 0);
    
          if (response.data.variations.length) {
            setVariation(response.data.variations.map(item => ({ name: item.name })));
          }
         
          if (item.img1) setName1(extractImageName(item.img1));
          if (item.img2) setName2(extractImageName(item.img2));
          if (item.img3) setName3(extractImageName(item.img3));
          if (item.img4) setName4(extractImageName(item.img4));
          if (item.img5) setName5(extractImageName(item.img5));
          
        } catch (error) {
          console.error('Erro ao buscar item:', error);
        }
    };
  
    useFocusEffect(
     React.useCallback(() => {
 
       const id = props.route.params.itemId;
       fetchItem(id)
       fetchCategories()
 
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

      <ScrollView keyboardShouldPersistTaps='handled'>
       <S.Main style={styles.shadow}>
        <S.Return onPress={()=>  props.navigation.goBack()}>
         <FontAwesomeIcon icon={faArrowLeft} size={20} color="#122569"/>
         <S.SmallText>
            Voltar
         </S.SmallText>
        </S.Return>

        <S.Title>Editar produto</S.Title>

        <S.ImageWrapper>
         <Button
          disabled={false}
          title={name1 ? name1 : 'Adicionar imagem 1'}
          onPress={() => pickImage(setNew1, setName1)}
         />
         
        <S.ImageInput onPress={() => pickImage(setNew1, setName1, true)}>
         <FontAwesomeIcon icon={faCamera}  size={20} color="#f0f7fb"/>
        </S.ImageInput>
    
       

        </S.ImageWrapper>

        <S.ImageWrapper>
         <Button
          disabled={false}
          title={name2 ? name2 : 'Adicionar imagem 2'}
          onPress={() => pickImage(setNew2, setName2)}
         />

  
          <S.ImageInput onPress={() => pickImage(setNew2, setName2, true)}>
           <FontAwesomeIcon icon={faCamera}  size={20} color="#f0f7fb"/>
          </S.ImageInput>
         
       
         
        </S.ImageWrapper>

        <S.ImageWrapper>
         <Button
          disabled={false}
          title={name3 ? name3 : 'Adicionar imagem 3'}
          onPress={() => pickImage(setNew3, setName3)}
         />
        

          <S.ImageInput onPress={() => pickImage(setNew3, setName3, true)}>
           <FontAwesomeIcon icon={faCamera}  size={20} color="#f0f7fb"/>
          </S.ImageInput>
         
       
         
        </S.ImageWrapper>

        <S.ImageWrapper>
         <Button
          disabled={false}
          title={name4 ? name4 : 'Adicionar imagem 4'}
          onPress={() => pickImage(setNew4, setName4)}
         />
        
 
          <S.ImageInput onPress={() => pickImage(setNew4, setName4, true)}>
           <FontAwesomeIcon icon={faCamera}  size={20} color="#f0f7fb"/>
          </S.ImageInput>
       
        </S.ImageWrapper>

        <S.ImageWrapper>
         <Button
          disabled={false}
          title={name5 ? name5 : 'Adicionar imagem 5'}
          onPress={() => pickImage(setNew5, setName5)}
         />
        

          <S.ImageInput onPress={() => pickImage(setNew5, setName5, true)}>
           <FontAwesomeIcon icon={faCamera}  size={20} color="#f0f7fb"/>
          </S.ImageInput>
         
       
        </S.ImageWrapper>

        <Input
         value={name}
         label="Nome do Produto"
         placeholder="Nome" 
         onChangeText={text => setName(text)}
        />

        <MoneyInput
         onChangeValue={setPrice}
         label="Preço do produto"
         placeholder="R$ 0,00"
         value={price}
        />

       <View >
        <Text style={styles.label}>Promoção</Text>
        <MaskedTextInput
          style={styles.input}
          mask="-%99" 
          value={promotion !== undefined ? String(promotion) : ''}
          onChangeText={(masked, unmasked) => setPromotion(unmasked)} 
          keyboardType="numeric"
          placeholder="-0%"
        />
       
       </View>

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

        <S.SelectView>
         <S.NewVariationText>
          Produto em estoque
         </S.NewVariationText>
         <S.SelectBox>
          <S.Select
           selectedValue={status}
           onValueChange={(itemValue) => setStatus(itemValue)} 
          >
            <Picker.Item label='Sim' value={1} />
            <Picker.Item label='Não' value={2} />
          </S.Select>
         </S.SelectBox>
        </S.SelectView>

        <S.SelectView>
         <S.NewVariationText>
          Produto em destaque
         </S.NewVariationText>
         <S.SelectBox>
          <S.Select
           selectedValue={high}
           onValueChange={(itemValue) => setHigh(itemValue)} 
          >
            <Picker.Item label='Sim' value={1} />
            <Picker.Item label='Não' value={2} />
          </S.Select>
         </S.SelectBox>
        </S.SelectView>

        <S.NewVariation>
         <S.NewVariationText>
          Nova variação
         </S.NewVariationText>

         <S.RowView>
          <S.NewVariationInput
           value={newVariation}
           placeholder="Nova Variação"
           placeholderTextColor="#475588"
           onChangeText={text => setNewVariation(text)}
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

        { variations.length ? 
          variations.map((item, index) => ( 
          <S.Variation key={index}>
           <S.VariationText>{item.name}</S.VariationText>
           <TouchableOpacity onPress={()=> handleRemoveVariation(item.name)}>
            <FontAwesomeIcon icon={faXmark} size={20} color="#f0f7fb"/>
           </TouchableOpacity>
          </S.Variation>
          ))
         :
         null
         }

        </S.Variations>

        <Button
         title={ loadingDel ? 'Deletando...' : 'Deletar'}
         onPress={handleDelete}
         disabled={loadingDel}
        />

        <Button
         title={ loading ? 'Salvando...' : 'Salvar'}
         onPress={handleSubmit}
         disabled={loading}
        />
       </S.Main>
      </ScrollView>
     </S.Container>
    )
};