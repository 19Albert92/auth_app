import React, {createContext, useContext,useState} from "react";
import AppWriteService from "./service";

const ProjectContext = createContext({
  appwrite: new AppWriteService(),
  isLoggedIn: false,
  setIsLoggedIn: () => {}
});

const ProjectProvider = ({children}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const appwrite = new AppWriteService();

  const defaultValue = {
    appwrite,
    isLoggedIn,
    setIsLoggedIn,
  }

  return (
    <ProjectContext.Provider value={defaultValue}>
      {children}
    </ProjectContext.Provider>
  );
};

const useProject = () => useContext(ProjectContext)

export { ProjectProvider, useProject };
