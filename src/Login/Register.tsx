import { router } from "expo-router";
import { View, Text, Pressable, Image, TextInput } from "react-native";
import { styles } from "./Login";
import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [number, setNumber] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const passwordInputRef = useRef<any>(null);
  const auth = getAuth();
  const db = getFirestore();

  const onSubmit = (value: any) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid; // Obtenez l'ID de l'utilisateur

        // Créez un document dans la collection "users" avec l'ID de l'utilisateur
        const userDocRef = doc(db, "user", userId);
        const userData = {
          id: userId,
          fullname: fullname, // Ajoutez d'autres données ici si nécessaire
        };

        // Utilisez setDoc pour créer le document
        setDoc(userDocRef, userData)
          .then(() => {
            router.push("/auth/profile");
          })
          .catch((error) => {
            console.error("Erreur lors de la création du document :", error);
          });
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
          <Text style={styles.h1}>Create an Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullname}
              onChangeText={(text) => setFullname(text)}
              keyboardType="default"
            />
            <Image
              style={styles.icon}
              source={require("../../assets/account-icon.png")}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={number}
              onChangeText={(text) => setNumber(text)}
              keyboardType="email-address"
            />
            <Image
              style={styles.icon}
              source={require("../../assets/phone.png")}
            />
          </View>
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
            <Text style={styles.loginText}>Register</Text>
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
            Already have an account?{" "}
            <Pressable onPress={() => router.push("/auth/login")}>
              <Text style={{ color: "#6B50F6" }}>Login</Text>
            </Pressable>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Register;
