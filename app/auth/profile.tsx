import { View, Text } from "react-native";
import Profile from "../../src/Login/Profile";

const profile = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Profile />
    </View>
  );
};

export default profile;
