import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Avatar } from "react-native-paper";
import { iconOptions } from "../screens/ProductDetails";
import { useNavigation } from "@react-navigation/native";
const CartItem = ({
  title,
  price,
  id,
  stock,
  imgSrc,
  index,
  quantity,
  count,
  incrementHandler,
  decrementHandler,
  navigate,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 100,
        marginVertical: 20,
      }}
    >
      <View
        style={{
          width: "40%",
          backgroundColor: index % 2 === 0 ? colors.color1 : colors.color3,
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
        }}
      >
        <Image source={{ uri: imgSrc }} style={styles.img} />
      </View>
      <View
        style={{
          width: "40%",
          paddingHorizontal: 25,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontSize: 17,
          }}
          onPress={() => navigate.navigate("productdetails", { id })}
        >
          {title}
        </Text>
        <Text numberOfLines={1} style={{ fontSize: 17, fontWeight: "900" }}>
          ₹{price}
        </Text>
      </View>

      <View style={styles.qtyContainer}>
        <TouchableOpacity onPress={() => decrementHandler()}>
          <Avatar.Icon icon={"minus"} {...iconOptions} />
        </TouchableOpacity>
        <Text style={styles.qtyText}>{count}</Text>

        <TouchableOpacity onPress={() => incrementHandler()}>
          <Avatar.Icon icon={"plus"} {...iconOptions} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: 200,
    height: "100%",
    resizeMode: "contain",
    top: "-20%",
    left: "10%",
  },
  qtyText: {
    height: 25,
    width: 25,
    textAlignVertical: "center",
    textAlign: "center",
    color: colors.color3,
    borderColor: colors.color5,
  },
  qtyContainer: {
    alignItems: "center",
    width: "20%",
    height: 80,
    justifyContent: "space-between",
    alignSelf: "center",
  },
});
export default CartItem;
