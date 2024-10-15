import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Forgot } from "../screens/forgot";
import { SignIn } from "../screens/signIn"

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes(){
    return(
     <Navigator screenOptions={{headerShown: false}}>
      <Screen 
       name="signin"
       component={SignIn}
      />

      <Screen 
       name="forgot"
       component={Forgot}
      />
     </Navigator>
    )
}