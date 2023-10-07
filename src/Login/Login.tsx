import { useState, useRef } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const passwordInputRef = useRef<any>(null);
  const auth = getAuth();

  const onSubmit = (value: any) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.h2}>Hey there,</Text>
          <Text style={styles.h1}>Welcome Back</Text>
        </View>
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              onSubmitEditing={() => passwordInputRef.current.focus()}
              keyboardType="email-address"
            />
            <Image
              style={styles.icon}
              source={require("../../assets/iconly-light-message.png")}
            />
          </View>
          <View>
            <Pressable onPress={() => setIsShowPassword(!isShowPassword)}>
              <Image
                style={styles.iconPassword}
                source={require("../../assets/hide-password.png")}
              />
            </Pressable>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              textContentType="password"
              secureTextEntry={!isShowPassword}
              ref={passwordInputRef}
            />
            <Image
              style={styles.icon}
              source={require("../../assets/iconly-light-lock.png")}
            />
          </View>
          <Pressable style={styles.titleContainer}>
            <Text>Forgot password?</Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 30,
        }}
      >
        <Pressable style={styles.pressableStyle} onPress={onSubmit}>
          <LinearGradient
            colors={["#CC8FED", "#6B50F6"]} // Définissez les couleurs de votre dégradé
            start={[0, 0.5]} // Définissez le point de départ du dégradé (0,0) = coin supérieur gauche
            end={[1, 0.5]} // Définissez le point de fin du dégradé (1,0) = coin supérieur droit
            style={styles.linearGradient}
          >
            <Image
              source={require("../../assets/button-iconly-bold-login.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text style={styles.loginText}>Login</Text>
          </LinearGradient>
        </Pressable>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            borderTopColor: "#DDDADA",
            borderTopWidth: 1,
            borderStyle: "solid",
            width: 315,
          }}
        >
          <Text
            style={{
              backgroundColor: "#FFFFFF",
              marginTop: -10,
              width: 34,
              textAlign: "center",
            }}
          >
            Or
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 30,
            width: 315,
          }}
        >
          <View>
            <Pressable
              style={{
                borderColor: "#DDDADA",
                borderWidth: 1,
                borderStyle: "solid",
                padding: 15,
                borderRadius: 14,
              }}
            >
              <Image
                source={require("../../assets/google-logo.png")}
                style={{ width: 20, height: 20 }}
              />
            </Pressable>
          </View>
          <View>
            <Pressable
              style={{
                borderColor: "#DDDADA",
                borderWidth: 1,
                borderStyle: "solid",
                padding: 15,
                borderRadius: 14,
              }}
            >
              <Image
                source={require("../../assets/facebook-logo.png")}
                style={{ width: 20, height: 20 }}
              />
            </Pressable>
          </View>
        </View>
        <View>
          <Text>
            Don’t have an account yet?{" "}
            <Pressable onPress={() => router.push("/auth/register")}>
              <Text style={{ color: "#6B50F6" }}>Register</Text>
            </Pressable>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40,
    paddingBottom: 40,
    textAlign: "center",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 30,
  },
  h2: {
    fontFamily: "Poppins",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 24,
  },
  h1: {
    fontFamily: "Poppins",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 30,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  input: {
    width: 315,
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F7F8F8",
    backgroundColor: "#F7F8F8",
    fontFamily: "Poppins",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 18,
    paddingLeft: 43,
  },
  icon: {
    position: "absolute",
    left: 15,
    top: 15,
    height: 20,
    width: 20,
  },
  iconPassword: {
    position: "absolute",
    right: 15,
    top: 15,
    height: 20,
    width: 20,
  },
  loginText: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 24,
    color: "#FFFFFF",
  },
  pressableStyle: {
    width: 315,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  linearGradient: {
    width: 315,
    height: 60,
    borderRadius: 99,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  forgotStyle: {
    fontFamily: "Poppins",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 18,
  },
});
