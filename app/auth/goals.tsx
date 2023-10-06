import { Text, View } from "react-native";
import Goals from "../../src/Login/Goals";
import Layout from "../../src/layout";

const goals = () => {
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Goals />
      </View>
    </Layout>
  );
};

export default goals;
