import { View } from "react-native";
import Success from "../../src/Login/Success";

const success = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Success />
    </View>
  );
};

export default success;
