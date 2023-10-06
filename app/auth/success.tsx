import { View } from "react-native";
import Success from "../../src/Login/Success";
import Layout from "../../src/layout";

const success = () => {
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Success />
      </View>
    </Layout>
  );
};

export default success;
