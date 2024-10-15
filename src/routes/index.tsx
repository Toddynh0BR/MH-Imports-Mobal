import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useAuth } from "../hooks/auth";

export function Routes(){
    const { user } = useAuth();

    return(
     <View style={{flex: 1, backgroundColor: '#f0f7fb'}}>
      <NavigationContainer>
       {user && user.isadmin ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
     </View>
    )
}