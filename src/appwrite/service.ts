import { Account, Client, ID } from "appwrite";
import Config from "react-native-config";
import Snackbar from "react-native-snackbar";

const appWriteClient = new Client();
const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;

type CreateUserAccount = {
  email: string,
  password: string,
  name: string
}

type LoginUserAccount = {
  email: string,
  password: string,
}

class AppWriteService {
  account;

  constructor() {
    appWriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.account = new Account(appWriteClient);
  }

  //Create new record account
  async createAccount({ email, password, name }: CreateUserAccount) {
    try {
      const useAccount = await this.account.create(
        ID.unique(), email, password, name
      );
      if (useAccount) {
        //create user feature
        return this.login({ email, password });
      } else {
        return useAccount;
      }
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG
      });
      console.log("Appwrite service :: createAccount() :: " + error);
    }
  }

  async login({ password, email }: LoginUserAccount) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG
      });
      console.log("Appwrite service :: loginAccount() :: " + error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser() :: " + error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.log("Appwrite service :: logout() :: " + error);
    }
  }

  async getAllUsers() {
    try {
      return await this.account.listIdentities();
    } catch (error) {
      console.log("Appwrite service :: logout() :: " + error);

    }
  }
}

export default AppWriteService;
