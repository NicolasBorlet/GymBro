import { View } from "react-native";
import Register from "../../src/Login/Register";
import Layout from "../../src/layout";

const register = () => {
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Register />
      </View>
    </Layout>
  );
};

export default register;
