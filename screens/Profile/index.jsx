import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  defaultImg,
} from "../../styles/styles";
import { Avatar, Button } from "react-native-paper";
import ButtonBox from "../../components/ButtonBox";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

const user = {
  name: "kartik",
  email: "kartik@example.com",
};

const logoutHandler = () => {
  console.log("sign out");
};

const Profile = ({ navigation, route }) => {
  const [avatar, setAvatar] = useState(defaultImg);
  const loading = false;

  const navigateHandler = (text) => {
    switch (text) {
      case "Profile":
        navigation.navigate("updateprofile");
        break;
      case "Password":
        navigation.navigate("changepassword");
        break;
      case "Sign Out":
        logoutHandler();
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    if (route.params?.image) {
      setAvatar(route.params?.image);
    }
  }, [route.params]);

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
        {/* Heading */}
        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Profile</Text>
        </View>

        {/* Loading */}
        {loading ? (
          <Loader />
        ) : (
          <>
            <View style={style.container}>
              <Avatar.Image
                source={{
                  uri: avatar,
                }}
                size={100}
                style={{ backgroundColor: colors.color1 }}
              />

              <TouchableOpacity>
                <Button textColor={colors.color2}>Change Photo</Button>
              </TouchableOpacity>

              <Text style={style.name}>{user?.name}</Text>
              <Text
                style={{
                  fontWeight: "300",
                  color: colors.color2,
                }}
              >
                {user?.email}
              </Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-between",
                }}
              >
                <ButtonBox
                  handler={navigateHandler}
                  text={"Profile"}
                  icon={"pencil"}
                />

                <ButtonBox
                  handler={navigateHandler}
                  text={"Password"}
                  icon={"pencil"}
                />
                <ButtonBox
                  handler={navigateHandler}
                  text={"Sign Out"}
                  icon={"exit-to-app"}
                />
              </View>
            </View>
          </>
        )}
      </View>

      <Footer />
    </>
  );
};

const style = StyleSheet.create({
  container: {
    elevation: 7,
    backgroundColor: colors.color3,
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    color: colors.color2,
  },
});

export default Profile;
