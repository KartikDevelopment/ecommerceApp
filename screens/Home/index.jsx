import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { colors, defaultStyle } from "../../styles/styles";
import Header from "../../components/Header";
import { Avatar, Button } from "react-native-paper";
import SearchModal from "../../components/SearchModal";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";
import Heading from "../../components/Heading";
import { GetClient } from "../../ApiHelper";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, GetList } from "../../Store/ProductList/actionType";
import { getProducts } from "../../ApiHelper/getCalls";

const categories = [
  { category: "jeans", id: 1 },
  { category: "pants", id: 2 },
  { category: "cap", id: 3 },
  { category: "shirts", id: 4 },
  { category: "shirts", id: 5 },
  { category: "shirts", id: 6 },
  { category: "shirts", id: 7 },
  { category: "shirts", id: 8 },
];
export const products = [
  {
    id: 1,
    title: "Sample",
    category: 8954695, // id of category
    price: 1999,
    stock: 12,
    images: [
      {
        url: "https://assets.sutori.com/user-uploads/image/d2b2b74d-8c49-4089-b709-27b4ef8afb26/17a21af7c77dda3c92f78a623a49274c.jpeg",
      },
    ],
  },
  {
    id: 2,
    title: "MacBook",
    category: 798645469,
    price: 1999,
    stock: 12,
    images: [
      {
        url: "https://assets.sutori.com/user-uploads/image/d2b2b74d-8c49-4089-b709-27b4ef8afb26/17a21af7c77dda3c92f78a623a49274c.jpeg",
      },
    ],
  },
];

const Home = () => {
  const [category, setCategory] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productList.productList);
  const cartList = useSelector((state) => state.productList.cartList);

  useEffect(() => {
    getProducts().then((res) => {
      dispatch({
        type: GetList,
        data: res.data,
      });
    });
  }, []);
  useEffect(() => {
    console.log("cartList", cartList);
  }, [cartList]);
  const categoryButtonHandler = (id) => {
    setCategory(id);
  };

  const addToCartHandler = (item) => {
    dispatch({
      type: AddToCart,
      data: item,
    });
  };

  return (
    <>
      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSearch={setActiveSearch}
          products={products}
        />
      )}

      <View style={{ ...defaultStyle, flex: 1 }}>
        {/* Header */}
        <Header />

        {/* Heading row */}
        <View
          style={{
            paddingTop: 70,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Main Heading */}
          <Heading text1={"Our"} text2={"Products"} />

          {/* Searchbar */}
          <View>
            <TouchableOpacity onPress={() => setActiveSearch((prev) => !prev)}>
              <Avatar.Icon
                icon={"magnify"}
                color="gray"
                size={50}
                style={{ backgroundColor: colors.color2, elevation: 12 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View
          style={{
            flexDirection: "row",
            height: 80,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
            }}
          >
            {categories.map((item, index) => (
              <Button
                key={item.id}
                style={{
                  backgroundColor:
                    category === item.id ? colors.color1 : colors.color5,
                  borderRadius: 100,
                  margin: 5,
                }}
                onPress={() => categoryButtonHandler(item.id)}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: category === item.id ? colors.color2 : "gray",
                  }}
                >
                  {item.category}
                </Text>
              </Button>
            ))}
          </ScrollView>
        </View>

        {/* Products */}
        <View style={{ flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map((item, index) => (
              <ProductCard
                key={item.id}
                id={item.id}
                i={index}
                item={item}
                title={item.title}
                price={item.price}
                image={item.image}
                addToCartHandler={() => addToCartHandler(item)}
                navigate={navigate}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <Footer activeRoute={"home"} />
    </>
  );
};

export default Home;
