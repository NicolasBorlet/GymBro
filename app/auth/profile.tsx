import { View, Text } from "react-native";
import Profile from "../../src/Login/Profile";
import Layout from "../../src/layout";

const profile = () => {
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Profile />
      </View>
    </Layout>
  );
};

export default profile;
