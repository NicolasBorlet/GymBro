import React from "react";
import { Text, View } from "react-native";
import Test from "../src/Test";
import { Redirect } from "expo-router";
import { useFonts } from "expo-font";
import { auth } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Page() {
  const user = auth.currentUser;
  const asyncStorage = AsyncStorage.getItem("login-key");

  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (!user) {
    return <Redirect href="auth/login" />;
  } else if (user) {
    return <Redirect href="/home" />;
  }

  return (
    <View>
      <View>
        <Test />
        <Text className="text-3xl font-extrabold">cdjksn</Text>
      </View>
    </View>
  );
}
