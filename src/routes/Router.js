import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useProject } from "../appwrite/ProjectContext";
import { AppNavigate } from "./AppStack";
import { AuthNavigate } from "./AuthStack";
import { Loading } from "../views";

export const Router = () => {

  const { isLoggedIn, setIsLoggedIn, appwrite } = useProject();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    appwrite
      .getCurrentUser()
      .then(response => {
        setIsLoading(false);
        if (response) {
          setIsLoggedIn(true);
        }
      })
      .catch(_ => {
        setIsLoading(false);
        setIsLoggedIn(false);
      })
  }, [appwrite, setIsLoggedIn]);

  if (isLoading) {
    return <Loading/>
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigate /> : <AuthNavigate />}
    </NavigationContainer>
  );
};
