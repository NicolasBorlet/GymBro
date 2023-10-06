import { View } from "react-native";
import { RecoilRoot } from "recoil";

const Layout = ({ children }: any) => {
  return (
    <RecoilRoot>
      {/* <Header /> */}
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: "#fff",
        }}
      >
        {children}
      </View>
      {/* <Footer /> */}
    </RecoilRoot>
  );
};

export default Layout;
