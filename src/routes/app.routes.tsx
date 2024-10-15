import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Historic } from "../screens/historic";
import { Category } from "../screens/category";
import { Preview } from "../screens/preview";
import { Product } from "../screens/product";
import { Poster } from "../screens/poster";
import { Order } from "../screens/order";
import { Home } from "../screens/home";
import { Edit } from "../screens/edit";
import { Add } from "../screens/add";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes(){
    return(
     <Navigator screenOptions={{headerShown: false}}>
      <Screen 
       name="home"
       component={Home}
      />

      <Screen 
       name="add"
       component={Add}
      />

      <Screen 
       name="edit"
       component={Edit}
      /> 

      <Screen 
       name="order"
       component={Order}
      /> 

      <Screen 
       name="category"
       component={Category}
      />

      <Screen 
       name="historic"
       component={Historic}
      />

      <Screen 
       name="poster"
       component={Poster}
      />

      <Screen 
       name="product"
       component={Product}
      />

      <Screen 
       name="preview"
       component={Preview}
      /> 
     </Navigator>
    )
};