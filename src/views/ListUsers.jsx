import React, { useEffect } from "react";

import { Text, View, StyleSheet } from "react-native";
import { useProject } from "../appwrite/ProjectContext";

const ListUsers = () => {

  const {appwrite} = useProject();

  useEffect(() => {
    appwrite.getAllUsers()
      .then(response => {
        if (response) {
          console.log(response);
        }
      })
  }, [appwrite])

  return (
    <View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ListUsers;
