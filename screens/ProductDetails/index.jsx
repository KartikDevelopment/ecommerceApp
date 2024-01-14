import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import React, { useRef, useState } from "react";
import { colors, defaultStyle } from "../../styles/styles";
import Header from "../../components/Header";
import Carousel from "react-native-snap-carousel";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { Avatar, Button } from "react-native-paper";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useDispatch, useSelector } from "react-redux";
import { RemoveFromCart, AddToCart } from "../../Store/ProductList/actionType";
import { useNavigation } from "@react-navigation/native";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;

export const iconOptions = {
  size: 20,
  style: {
    borderRadius: 5,
    backgroundColor: colors.color5,
    height: 25,
    width: 25,
  },
};

const ProductDetails = ({ route: { params } }) => {
  const isCarousel = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const name = params.item.title;
  const price = params.item.price;
  const description = params.item.description;
  const navigation = useNavigation();
  const cartList = useSelector((state) => state.productList.cartList);
  function findObjectIndexById(array, idToCheck) {
    const index = array.findIndex((obj) => obj?.id === idToCheck);
    const found = index !== -1;
    return { found, index };
  }
  const getQuantity = () => {
    const { found, index } = findObjectIndexById(cartList, params.item.id);
    if (found) {
      return cartList[index].count;
    } else {
      return 0;
    }
  };
  const incrementQty = () => {
    dispatch({
      type: AddToCart,
      data: params.item,
    });
  };
  const decrementQty = () => {
    dispatch({
      type: RemoveFromCart,
      data: params.item,
    });
  };

  const addToCartHandler = () => {
    navigation.navigate("cart");
  };

  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
        backgroundColor: colors.color2,
      }}
    >
      <Header back={true} />

      {/* carousel */}
      <Carousel
        layout="stack"
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        ref={isCarousel}
        data={[{ id: 1, url: params.item.image }]}
        renderItem={CarouselCardItem}
      />
      <View
        style={{
          backgroundColor: colors.color2,
          padding: 35,
          flex: 1,
          marginTop: -380,
          borderTopLeftRadius: 55,
          borderTopRightRadius: 55,
        }}
      >
        <Text numberOfLines={2} style={{ fontSize: 25 }}>
          {name}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "900" }}>₹{price}</Text>
        <Text
          style={{ letterSpacing: 1, lineHeight: 20, marginVertical: 15 }}
          numberOfLines={8}
        >
          {description}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ color: colors.color3, fontWeight: "100" }}>
            Quantity
          </Text>
          <View
            style={{
              width: 80,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={decrementQty}>
              <Avatar.Icon icon={"minus"} {...iconOptions} />
            </TouchableOpacity>
            <Text style={style.quantity}>{getQuantity()}</Text>
            <TouchableOpacity onPress={incrementQty}>
              <Avatar.Icon icon={"plus"} {...iconOptions} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={style.btn}
          activeOpacity={0.9}
          onPress={addToCartHandler}
        >
          <Button icon={"cart"} textColor={colors.color2}>
            Add To Cart
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={style.container} key={index}>
      <Image source={{ uri: item.url }} style={style.image} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.color1,
    width: ITEM_WIDTH,
    paddingVertical: 40,
    height: 380,
  },
  image: {
    width: ITEM_WIDTH,
    resizeMode: "contain",
    height: 250,
  },
  quantity: {
    backgroundColor: colors.color4,
    width: 25,
    height: 25,
    textAlignVertical: "center",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.color5,
  },
  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    padding: 5,
    marginVertical: 35,
  },
});

export default ProductDetails;
