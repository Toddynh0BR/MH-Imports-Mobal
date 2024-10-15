import * as S from "./style";

import { useFocusEffect } from '@react-navigation/native';
import { api } from "../../services/api";
import React,{ useState } from "react";

import { faArrowLeft, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { TouchableOpacity, Alert, View } from "react-native";

import * as ImagePicker from 'expo-image-picker';

import { Header } from "../../components/header";
import { Menu } from "../../components/menu";
import { StyleSheet } from 'react-native';

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
     justifyContent: 'space-between',
     flexDirection: 'row',
     alignItems: 'center',
    }
});


export function Poster(props: Props){
    const [menu, setMenu] = useState(false);

    const [postersMobal, setMobalPoster] = useState([])
    const [posterDesk, setDeskPoster] = useState([])

    async function pickImage(isMobal: boolean) {
        try {
            let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
            if (permissionResult.granted === false) {
                Alert.alert('Permissão para acessar a galeria ou câmera é necessária!');
                return;
            }
    
            let result 

            if (isMobal){
             result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
             });
            } else {
             result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1200, 331],
                quality: 1,
             });
            }
    
            if (!result.canceled) {
                const selectedImageUri = result.assets[0].uri;
                const selectedImageName = result.assets[0].fileName || `image_${Date.now()}.jpg`;
    
                await HandleSave(isMobal, selectedImageUri, selectedImageName);
            }
        } catch (error) {
            Alert.alert("Erro ao selecionar a imagem", error.message);
        }
    }
    
    async function HandleSave(isMobal: boolean, imageUri: string, imageName: string) {
        try {
            if (!imageUri) {
                Alert.alert("Erro", "Nenhuma imagem selecionada.");
                return;
            }

            const fileForm = new FormData();
    
            fileForm.append("img", {
                uri: imageUri,
                name: isMobal ? `mobal_${imageName}` : imageName,
                type: 'image/jpeg',
            });
    
            const response = await api.post("/poster/", fileForm, {
                headers: {'Content-Type': 'multipart/form-data',}
             });
    
            if (response.status === 200) {
                Alert.alert("Sucesso", "Imagem salva com sucesso.");
                fetchPosters();  
            } else {
                Alert.alert("Erro", "Falha ao salvar a imagem.");
            }
        } catch (error) {
            Alert.alert("Erro ao salvar a imagem", error.message);
        }
    }

    async function fetchPosters(){
        const Response = await api.get("/poster")
     
        if (Response.data) {
        const MobalFilter = Response.data.filter(item => item.img.includes("mobal"));
        const DesktopFilter = Response.data.filter(item => !item.img.includes("mobal"));

        setDeskPoster(DesktopFilter.length ? DesktopFilter : []);
        setMobalPoster(MobalFilter.length ? MobalFilter : []);
        };
    };
    
    useFocusEffect(
        React.useCallback(() => {
    
            fetchPosters()
    
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

        <S.Title>Adicionar pôsteres</S.Title>

        <View style={styles.row}>
         <S.ListTitle>Pôsteres Mobile </S.ListTitle>
         <TouchableOpacity onPress={()=>  pickImage(true)}>
          <FontAwesomeIcon icon={faPlus} size={25} color="#122569"/>
         </TouchableOpacity>
        </View>

        <S.ListMobal
         horizontal={true} 
         data={postersMobal}
         keyExtractor={item => item.id}
         ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
         renderItem={({item})=> (
          <S.MobalListItem>
           <TouchableOpacity>
            <S.MobalImg
             source={{ uri: `${api.defaults.baseURL}/files/${item.img}`}}
            />
           </TouchableOpacity>
           
           <TouchableOpacity onPress={async()=> {
             await api.delete(`/poster/${item.id}`)

             Alert.alert('Sucesso', 'Poster removido')
             setTimeout(fetchPosters, 1000)
           }}>
            <FontAwesomeIcon icon={faTrash} size={35} color="#1e3483"/>
           </TouchableOpacity>
          </S.MobalListItem>
         )}
        />

        <View style={styles.row}>
         <S.ListTitle>Pôsteres Desktop/PC </S.ListTitle>
         <TouchableOpacity onPress={()=>  pickImage(false)}>
          <FontAwesomeIcon icon={faPlus} size={25} color="#122569"/>
         </TouchableOpacity>
        </View>
 
        <S.ListPc 
         data={posterDesk}
         keyExtractor={item => item.id}
         ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
         renderItem={({item}) => (
          <S.PcListItem key={item.id}>
           
             <S.PcImg
              source={{ uri: `${api.defaults.baseURL}/files/${item.img}`}}
             />
            

            <TouchableOpacity onPress={async()=> {
              await api.delete(`/poster/${item.id}`)

              Alert.alert('Sucesso', 'Poster removido')
              setTimeout(fetchPosters, 1000)
             }}>
             <FontAwesomeIcon icon={faTrash} size={20} color="#1e3483"/>
            </TouchableOpacity>
           
          </S.PcListItem>
         )}
        />


        </S.Main>
     </S.Container>
    )
};