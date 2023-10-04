import { createElement, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { styles } from "./Login";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import { router } from "expo-router";

const Profile = () => {
  const [date, setDate] = useState(new Date(Date.now()));
  const [show, setShow] = useState(false);
  const [genderValue, setGenderValue] = useState<any>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [weight, setWeight] = useState<any>(undefined);
  const [height, setHeight] = useState<any>(undefined);
  const [weightUnit, setWeightUnit] = useState<any>("KG");
  const [heightUnit, setHeightUnit] = useState<any>("CM");

  const auth = getAuth();
  const db = getFirestore();

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    console.log(currentDate);
  };

  const data = [
    { label: "Man", value: "man" },
    { label: "Woman", value: "woman" },
  ];

  const MyWebDatePicker = () => {
    return createElement("input", {
      type: "date",
      value: date.toISOString().split("T")[0],
      onChange: (event) => {
        setDate(new Date(event.target.value));
      },
      style: {
        height: 30,
        padding: 5,
        border: "2px solid #677788",
        borderRadius: 5,
        width: 250,
        zIndex: 1000,
      },
    });
  };

  const ConvertWeight = (weight: any, weightUnit: any) => {
    if (weight) {
      if (weightUnit === "KG") {
        return weight;
      } else if (weightUnit === "LBS") {
        return weight * 0.453592;
      }
    }
  };

  const ConvertHeight = (height: any, heightUnit: any) => {
    if (height) {
      if (heightUnit === "CM") {
        return height;
      } else if (heightUnit === "FT") {
        return height * 30.48;
      }
    }
  };

  async function onSubmit() {
    const user = auth.currentUser;

    if (
      user &&
      genderValue != null &&
      date != new Date(Date.now()) &&
      weight != undefined &&
      height != undefined
    ) {
      const userRef = doc(db, "user", user.uid);

      await updateDoc(userRef, {
        gender: genderValue,
        birthdate: date,
        weight: weight,
        height: height,
      });

      console.log("Document successfully updated!");
      router.push("/auth/goals");
    }
  }

  return (
    <ScrollView>
      <View
        style={{
          height: 350,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/girl-ballon.png")}
          style={{
            width: 194,
            height: 250,
          }}
        />
        <Image
          source={require("../../assets/bg-profile.png")}
          style={{
            width: 349,
            height: 263,
            position: "absolute",
            zIndex: -1,
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          gap: 15,
        }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.h1}>Let’s complete your profile</Text>
          <Text style={styles.h2}>It will help us to know more about you!</Text>
        </View>
        <View
          style={{
            width: 315,
            height: 50,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: "#F7F8F8",
            backgroundColor: "#F7F8F8",
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Dropdown
            style={[isFocus && { borderColor: "blue" }]}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Choose Gender" : "..."}
            value={genderValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setGenderValue(item.value);
              setIsFocus(false);
            }}
            itemContainerStyle={{
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "#F7F8F8",
              backgroundColor: "#F7F8F8",
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
            containerStyle={{
              marginTop: 15,
              shadowOpacity: 0,
              borderWidth: 0,
            }}
            renderLeftIcon={() => (
              <View>
                <Image
                  source={require("../../assets/gender-icon.png")}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 10,
                  }}
                />
              </View>
            )}
          />
        </View>
        <View>
          <Pressable onPress={() => setShow(!show)}>
            {Platform.OS === "web" ? (
              <View
                style={{
                  width: 315,
                  height: 50,
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: "#F7F8F8",
                  backgroundColor: "#F7F8F8",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 10,
                    }}
                    source={require("../../assets/calendar-icon.png")}
                  />
                  <Text>
                    {date === new Date(1598051730000)
                      ? "Date of Birth"
                      : date.toLocaleDateString()}
                  </Text>
                </View>
                {show && (
                  <View
                    style={{
                      position: "absolute",
                      top: 50,
                    }}
                  >
                    <MyWebDatePicker />
                  </View>
                )}
              </View>
            ) : (
              <View
                style={{
                  width: 315,
                  height: 50,
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: "#F7F8F8",
                  backgroundColor: "#F7F8F8",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 10,
                    }}
                    source={require("../../assets/calendar-icon.png")}
                  />
                  <Text>
                    {date === new Date(Date.now())
                      ? "Date of Birth"
                      : date.toLocaleDateString()}
                  </Text>
                </View>
                {show && (
                  <View
                    style={{
                      position: "absolute",
                      top: 50,
                    }}
                  >
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode="date"
                      is24Hour={true}
                      onChange={onChange}
                      display="spinner"
                      disabled={false}
                    />
                  </View>
                )}
              </View>
            )}
          </Pressable>
        </View>
        <View
          style={{
            width: 315,
            height: 50,
            display: "flex",
            flexDirection: "row",
            gap: 15,
          }}
        >
          <View
            style={{
              width: 250,
              height: 50,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "#F7F8F8",
              backgroundColor: "#F7F8F8",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                }}
                source={require("../../assets/weight-icon.png")}
              />
              <TextInput
                keyboardType="numeric"
                style={{
                  width: 200,
                }}
                placeholder="Your Weight"
                onChangeText={(text) => setWeight(text)}
                value={weight}
              />
            </View>
          </View>
          <Pressable
            onPress={() => {
              setWeight(ConvertWeight(weight, weightUnit));
              setWeightUnit(weightUnit === "KG" ? "LBS" : "KG");
            }}
          >
            <LinearGradient
              colors={["#EEA4CE", "#C150F6"]} // Définissez les couleurs de votre dégradé
              start={[0, 0.5]} // Définissez le point de départ du dégradé (0,0) = coin supérieur gauche
              end={[1, 0.5]} // Définissez le point de fin du dégradé (1,0) = coin supérieur droit
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>{weightUnit}</Text>
            </LinearGradient>
          </Pressable>
        </View>
        <View
          style={{
            width: 315,
            height: 50,
            display: "flex",
            flexDirection: "row",
            gap: 15,
          }}
        >
          <View
            style={{
              width: 250,
              height: 50,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "#F7F8F8",
              backgroundColor: "#F7F8F8",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                }}
                source={require("../../assets/height-icon.png")}
              />
              <TextInput
                keyboardType="numeric"
                style={{
                  width: 200,
                }}
                placeholder="Your Weight"
                onChangeText={(text) => setHeight(text)}
                value={height}
              />
            </View>
          </View>
          <Pressable
            onPress={() => {
              setHeight(ConvertHeight(height, heightUnit));
              setHeightUnit(heightUnit === "CM" ? "FT" : "CM");
            }}
          >
            <LinearGradient
              colors={["#EEA4CE", "#C150F6"]} // Définissez les couleurs de votre dégradé
              start={[0, 0.5]} // Définissez le point de départ du dégradé (0,0) = coin supérieur gauche
              end={[1, 0.5]} // Définissez le point de fin du dégradé (1,0) = coin supérieur droit
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>{heightUnit}</Text>
            </LinearGradient>
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 15,
          }}
        >
          <Pressable style={styles.pressableStyle} onPress={onSubmit}>
            <LinearGradient
              colors={["#CC8FED", "#6B50F6"]} // Définissez les couleurs de votre dégradé
              start={[0, 0.5]} // Définissez le point de départ du dégradé (0,0) = coin supérieur gauche
              end={[1, 0.5]} // Définissez le point de fin du dégradé (1,0) = coin supérieur droit
              style={styles.linearGradient}
            >
              <Text style={styles.loginText}>Next</Text>
              <Image
                source={require("../../assets/arrow-right.png")}
                style={{ width: 15, height: 15 }}
              />
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
