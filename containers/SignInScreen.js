import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import {
  // Dimension,
  // Platform,
  // SafeAreaView,
  // ScrollView,
  // StatusBar,
  // StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import CustomInput from "../components/Custominput";

export default function SignInScreen({ setToken, setId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (email && password) {
      if (errorMessage !== null) {
        setErrorMessage(null);
      }
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email,
            password,
          }
        );
        if (response.data.token && response.data.id) {
          setToken(response.data.token);
          setId(response.data.id);
          navigation.navigate("Home");
        } else {
          setError("Identifiants incorrects");
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setErrorMessage("Please fill all fields");
    }
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <Image
          source={{
            uri: "https://logo-marque.com/wp-content/uploads/2020/07/Airbnb-Embleme.jpg",
          }}
          style={{ height: 100, marginTop: 50 }}
          resizeMode="contain"
        />
        <Text
          style={{
            marginLeft: 153,
            marginTop: 20,
            fontSize: 20,
            color: "#717171",
            fontWeight: "bold",
          }}
        >
          Sign in
        </Text>

        <View style={{ padding: 30 }} onSubmit={handleLogin}>
          <CustomInput placeholder="email" setState={setEmail} value={email} />
          <CustomInput
            placeholder="password"
            setState={setPassword}
            value={password}
            password={true}
          />

          <TouchableOpacity
            style={{ backgroundColor: "white", alignItems: "center" }}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text
              style={{
                color: "#717171",
                borderWidth: 2,
                borderRadius: 25,
                borderColor: "red",
                marginLeft: 60,
                marginRight: 60,
                padding: 15,
                paddingHorizontal: 60,
                marginTop: 100,
              }}
            >
              Sign in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={{ color: "#848484", fontSize: 10, marginTop: 15 }}>
              No account ? Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
