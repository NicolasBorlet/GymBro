import { ScrollView, View } from "react-native";

const layout = ({ children }: any) => {
  return (
    <View>
      {/* <Header /> */}
      <ScrollView>{children}</ScrollView>
      {/* <Footer /> */}
    </View>
  );
};

export default layout;
