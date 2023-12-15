import React, { useState } from "react";
import { useProject } from "../appwrite/ProjectContext";
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import Snackbar from "react-native-snackbar";

const Login = ({ navigation }) => {

  const { appwrite, setIsLoggedIn } = useProject();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = () => {

    if (formData.email === "" && formData.password === "") {
      setError("All fields are required!");
      return false;
    }

    if (formData.email === "") {
      setError("Field 'email' required!");
      return false;
    }

    if (formData.password === "") {
      setError("Field 'password' required!");
      return false;
    }

    const user = {
      email: formData.email,
      password: formData.password,
    };

    appwrite.login(user)
      .then(response => {
        if (response) {
          setIsLoggedIn(true);
          Snackbar.show({
            text: "Success login",
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch(e => {
        setError(e.message);
      });
  };


  const changeForm = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    setError('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Login</Text>

        <TextInput
          value={formData.email}
          onChangeText={text => changeForm("email", text)}
          placeholder={"Enter your email"}
          placeholderTextColor={"#AEAEAE"}
          style={styles.input}
        />

        <TextInput
          value={formData.password}
          onChangeText={text => changeForm("password", text)}
          placeholder={"Enter your password"}
          placeholderTextColor={"#AEAEAE"}
          secureTextEntry={true}
          style={styles.input}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable
          onPress={handleLogin}
          style={[styles.btn, { marginTop: error ? 10 : 20 }]}
        >
          <Text style={styles.btnText}>Login</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("register")}
          style={styles.loginContainer}
        >
          <Text style={styles.noAccountLabel}>Don`t have an account? {" "}
            <Text style={styles.signUpLabel}>Create an account</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formContainer: {
    justifyContent: "center",
    alignContent: "center",
    height: "100%",
  },
  appName: {
    color: "#f02e65",
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    color: "#000",
    backgroundColor: "#fef8fa",
    padding: 10,
    height: 40,
    alignSelf: "center",
    borderRadius: 5,
    width: "80%",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 1,
  },
  errorText: {
    color: "red",
    alignSelf: "center",
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#ffffff",
    padding: 10,
    height: 45,
    alignSelf: "center",
    borderRadius: 5,
    width: "80%",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },
  btnText: {
    color: "#484848",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  signUpContainer: {
    marginTop: 80,
  },
  noAccountLabel: {
    color: "#484848",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 20
  },
  signUpLabel: {
    color: "#1d9bf0",
  },
});

export default Login;
