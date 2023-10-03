import { View } from "react-native";
import Login from "../../src/Login/Login";

const login = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Login />
    </View>
  );
};

export default login;
