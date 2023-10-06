import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { Redirect } from "expo-router";
import { useFonts } from "expo-font";
import { auth } from "../firebaseConfig";

export default function Page() {
  const user = auth.currentUser;

  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (!user) {
    return <Redirect href="/auth/login" />;
  } else if (user) {
    return <Redirect href="/home" />;
  }

  useEffect(() => {
    const user = auth.currentUser;
    console.log(user);
  }, []);

  return (
    <View>
      <Text className="text-3xl font-extrabold">cdjksn</Text>
    </View>
  );
}
