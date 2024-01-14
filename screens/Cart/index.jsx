import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header";
import Heading from "../../components/Heading";
import { colors, defaultStyle } from "../../styles/styles";
import { Button } from "react-native-paper";
import CartItem from "../../components/CartItem";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { UseDispatch } from "react-redux";
import { AddToCart, RemoveFromCart } from "../../Store/ProductList/actionType";
const Cart = () => {
  const navigate = useNavigation();
  const cartList = useSelector((state) => state.productList.cartList);
  const dispatch = useDispatch();
  const incrementHandler = (item) => {
    dispatch({
      type: AddToCart,
      data: item,
    });
  };
  const decrementHandler = (item) => {
    dispatch({
      type: RemoveFromCart,
      data: item,
    });
  };

  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >
      <Header emptyCart={true} back={true} />
      {/* Heading  */}
      <Heading
        text1={"Shopping"}
        text2={"Cart"}
        containerStyle={{ marginLeft: 35, paddingTop: 70 }}
      />

      <View
        style={{
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {cartList.map((item, index) => (
            <CartItem
              navigate={navigate}
              key={item.id}
              id={item.id}
              title={item.title}
              stock={item.count}
              price={item.price}
              imgSrc={item.image}
              index={index}
              description={item.description}
              count={item.count}
              incrementHandler={() => incrementHandler(item)}
              decrementHandler={() => decrementHandler(item)}
            />
          ))}
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 35,
        }}
      >
        <Text>{cartList.length} Items</Text>
        <Text>
          {cartList
            .reduce((accum, item) => accum + item.price * item.count, 0)
            .toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: colors.color3,
          borderRadius: 100,
          padding: 5,
          margin: 30,
        }}
        activeOpacity={0.9}
      >
        <Button textColor={colors.color2} icon={"cart"}>
          Checkout
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;
