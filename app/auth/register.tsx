import { View } from "react-native";
import Register from "../../src/Login/Register";

const register = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Register />
    </View>
  );
};

export default register;
