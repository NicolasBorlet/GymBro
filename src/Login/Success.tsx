import { View, Text, Image, Pressable } from "react-native";
import { styles } from "./Login";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const Success = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          display: "flex",
          gap: 45,
        }}
      >
        <View
          style={{
            height: 350,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/man-girl-success.png")}
            style={{
              width: 188,
              height: 290,
            }}
          />
          <Image
            source={require("../../assets/bg-success.png")}
            style={{
              width: 278,
              height: 293,
              position: "absolute",
              zIndex: -1,
            }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            display: "flex",
            gap: 15,
          }}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.h1}>Welcome, Name</Text>
            <Text style={styles.h2}>
              You are all set now, let’s reach your goals together with us
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 15,
        }}
      >
        <Pressable
          style={styles.pressableStyle}
          onPress={() => router.push("/home")}
        >
          <LinearGradient
            colors={["#CC8FED", "#6B50F6"]} // Définissez les couleurs de votre dégradé
            start={[0, 0.5]} // Définissez le point de départ du dégradé (0,0) = coin supérieur gauche
            end={[1, 0.5]} // Définissez le point de fin du dégradé (1,0) = coin supérieur droit
            style={styles.linearGradient}
          >
            <Text style={styles.loginText}>Go To Home</Text>
            <Image
              source={require("../../assets/arrow-right.png")}
              style={{ width: 15, height: 15 }}
            />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

export default Success;
