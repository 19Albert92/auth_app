import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useProject } from "../appwrite/ProjectContext";
import Snackbar from "react-native-snackbar";

const Register = ({ navigation }) => {

  const { appwrite, setIsLoggedIn } = useProject();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleSignUp = () => {
    if (formData.name === "" && formData.email === "" && formData.password === "" && formData.repeatPassword === "") {
      setError("All fields are required!");
    } else if (formData.password !== formData.repeatPassword) {
      setError("Password do not match");
    } else {
      const user = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      appwrite.createAccount(user)
        .then(response => {
          if (response) {
            Snackbar.show({
              text: "Signup success",
              duration: Snackbar.LENGTH_SHORT,
            });
            setIsLoggedIn(true);
          }
        })
        .catch(e => {
          console.log(e);
          setError(e.message);
        });
    }
  };

  const changeForm = (field, value) => {
    setError("");
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Auth</Text>

        <TextInput
          value={formData.name}
          onChangeText={text => changeForm("name", text)}
          placeholder={"Enter your name"}
          placeholderTextColor={"#AEAEAE"}
          style={styles.input}
        />

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

        <TextInput
          value={formData.repeatPassword}
          onChangeText={text => changeForm("repeatPassword", text)}
          placeholder={"Enter your repeat password"}
          placeholderTextColor={"#AEAEAE"}
          secureTextEntry={true}
          style={styles.input}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable
          onPress={handleSignUp}
          style={[styles.btn, { marginTop: error ? 10 : 20 }]}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("login")}
          style={styles.loginContainer}
        >
          <Text style={styles.btnText}>Already have an account? {" "}
            <Text style={styles.loginLabel}>Login</Text>
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
    shadowColor: "#000",
    marginTop: 20,

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
  loginContainer: {
    marginTop: 60,
  },
  haveAccountLabel: {
    color: "#484848",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  loginLabel: {
    color: "#1d9bf0",
  },
});

export default Register;
