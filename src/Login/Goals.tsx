import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { styles } from "./Login";
import Carousel from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { router } from "expo-router";
import { useRecoilState } from "recoil";
import { UserDataAtoms } from "../Atoms/UserAtoms";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

const Goals = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const width = Dimensions.get("window").width;

  const carouselData = [
    {
      title: "Improve Shap",
      description:
        "I have a low amount of body fat and need / want to build more muscle",
      img: require("../../assets/goal-perso-1.png"),
    },
    {
      title: "Lean & Tone",
      description:
        "I’m “skinny fat”. look thin but have no shape. I want to add learn muscle in the right way",
      img: require("../../assets/goal-perso-2.png"),
    },
    {
      title: "Lose a Fat",
      description:
        "I have over 20 lbs to lose. I want to drop all this fat and gain muscle mass",
      img: require("../../assets/goal-perso-3.png"),
    },
  ];

  async function onSubmit() {
    const user = auth.currentUser;

    if (user && activeIndex != undefined) {
      const userRef = doc(db, "user", user.uid);

      await updateDoc(userRef, {
        profile: activeIndex,
      });

      console.log("Document successfully updated!");
      router.push("/auth/success");
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.h1}>What is your goal ?</Text>
          <Text
            style={
              styles.h2 && {
                textAlign: "center",
              }
            }
          >
            It will help us to choose the best program for you
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Carousel
          loop
          width={width}
          height={550}
          autoPlay={false}
          mode="parallax"
          data={carouselData}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => setActiveIndex(index)}
          renderItem={({ item }) => (
            <LinearGradient
              colors={["#EEA4CE", "#C150F6"]}
              style={{
                flex: 1,
                borderRadius: 22,
                padding: 15,
                height: 550,
                width: width - 30,
                justifyContent: "center",
              }}
              start={[0, 0.5]}
              end={[1, 0.5]}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  paddingBottom: 30,
                  paddingTop: 30,
                  paddingLeft: 30,
                  paddingRight: 30,
                }}
              >
                <View>
                  <Image
                    source={item.img}
                    style={{
                      width: 220,
                      height: 300,
                      alignSelf: "center",
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <View
                  style={{
                    display: "flex",
                    gap: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      gap: 3,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 30,
                        color: "#FFFFFF",
                      }}
                    >
                      {item.title}
                    </Text>
                    <View
                      style={{
                        width: 50,
                        height: 1,
                        backgroundColor: "#FFFFFF",
                      }}
                    ></View>
                  </View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      color: "#FFFFFF",
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          )}
        />
      </View>
      <Pressable style={styles.pressableStyle} onPress={onSubmit}>
        <LinearGradient
          colors={["#CC8FED", "#6B50F6"]} // Définissez les couleurs de votre dégradé
          start={[0, 0.5]} // Définissez le point de départ du dégradé (0,0) = coin supérieur gauche
          end={[1, 0.5]} // Définissez le point de fin du dégradé (1,0) = coin supérieur droit
          style={styles.linearGradient}
        >
          <Text style={styles.loginText}>Confirm</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default Goals;
