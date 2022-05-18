import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

import CustomInput from "../components/Custominput";

export default function SignUpScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email,
              username,
              description,
              password,
              tom,
            }
          );
          console.log(response.data);
        } catch (error) {
          console.log(error);
          console.log(error.response.data);
          if (error.response.data) {
            setError(error.response.data.error);
          }
        }
      } else {
        setError("Vos mots de passe ne sont pas identiques");
      }
    } else {
      setError("Veuillez remplir tous les champs");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Image
        source={{
          uri: "https://logo-marque.com/wp-content/uploads/2020/07/Airbnb-Embleme.jpg",
        }}
        style={styles.logo}
      />
      <Text style={styles.title}>Sign Up</Text>
      <CustomInput placeholder="email" setState={setEmail} value={email} />
      <CustomInput
        placeholder="username"
        setState={setUsername}
        value={username}
      />
      <TextInput
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
        multiline={true}
        style={styles.bigInput}
        placeholder=" Describe yourself in a few words ..."
      />
      <CustomInput
        placeholder="password"
        setState={setPassword}
        value={password}
        password={true}
      />
      <CustomInput
        placeholder="confirm password"
        setState={setConfirmPassword}
        value={confirmPassword}
        password
      />
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text
          style={{
            color: "#717171",
          }}
        >
          Sign in
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Text style={{ color: "#717171", marginTop: 20 }}>
          Already have an account ? Sign in
        </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#727272",
    marginTop: 30,
  },
  bigInput: {
    width: "80%",
    marginTop: 30,
    borderColor: "#FFBAC0",
    borderWidth: 2,
    height: 80,
  },
  button: {
    borderColor: "#F9585D",
    borderWidth: 3,
    marginTop: 30,
    width: "50%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
