import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { useProject } from "../appwrite/ProjectContext";
import Snackbar from "react-native-snackbar";
import { FAB, Button } from "@rneui/themed";

const Home = ({navigation}) => {
  const { setIsLoggedIn, appwrite } = useProject();

  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    appwrite.logout()
      .then(() => {
        setIsLoggedIn(false);
        Snackbar.show({
          text: "Logout Successful",
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };

  useEffect(() => {
    appwrite.getCurrentUser()
      .then(response => {
        if (response) {
          setUserData({
            name: response.name,
            email: response.email,
          });
        }
      });
  }, [appwrite]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          style={styles.successfulImage}
          source={{
            uri: "https://static-00.iconduck.com/assets.00/alert-success-icon-1024x1024-aobtkid4.png",
            cache: "default",
          }}
          resizeMode={"cover"}
        />
        <Text style={styles.message}>
          Build Fast. Scale Big. All in One Place
        </Text>
        {userData &&
          <View style={styles.userContainer}>
            <Text style={styles.userDetails}>Name: {userData.name}</Text>
            <Text style={styles.userDetails}>Email: {userData.email}</Text>
          </View>
        }
      </View>
      <Button
        size={'lg'}
        title={'Get All users'}
        onPress={() => navigation.navigate('users')}
      />
      <FAB
        placement={"right"}
        color={"#f02e65"}
        size={"large"}
        title={"Logout"}
        icon={{ name: "logout", color: "#fff" }}
        onPress={handleLogout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0B0D32",
    flex: 1,
  },
  successfulImage: {
    marginVertical: 30,
    width: 200,
    height: 200
  },
  welcomeContainer: {
    padding: 12,
    flex: 1,
    alignItems: "center",
  },
  message: {
    fontSize: 26,
    fontWeight: "500",
    color: "#fff",
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: "#fff",
  },
});

export default Home;
