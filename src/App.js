import React from "react";

import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { ProjectProvider } from "./appwrite/ProjectContext";
import { Router } from "./routes/Router";

const App = () => {
  return (
    <ProjectProvider>
        <Router />
    </ProjectProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default App;
