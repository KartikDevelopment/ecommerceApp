import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Cart from "./screens/Cart";
import ProductDetails from "./screens/ProductDetails";
import Profile from "./screens/Profile";
const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="home"
      >
        <Stack.Group>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="cart" component={Cart} />
          <Stack.Screen name="productdetails" component={ProductDetails} />
          <Stack.Screen name="profile" component={Profile} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainStack;
