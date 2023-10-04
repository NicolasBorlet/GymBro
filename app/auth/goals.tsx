import { Text, View } from "react-native";
import Goals from "../../src/Login/Goals";

const goals = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Goals />
    </View>
  );
};

export default goals;
