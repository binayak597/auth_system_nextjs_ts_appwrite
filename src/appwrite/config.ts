import { config } from "@/config/config";
import { Account, Client, ID } from "appwrite";

interface CreateUser {
  email: string;
  password: string;
  name: string;
}

interface LoginUser {
  email: string;
  password: string;
}

//initialize the client to communicate with appwrite
const client = new Client();

client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);

const account = new Account(client);

class AppwriteService {
  register = async ({ email, password, name }: CreateUser) => {
    try {
      const newUser = await account.create(ID.unique(), email, password, name);

      if (newUser) {
        return this.login({ email, password });
      } else {
        return newUser;
      }
    } catch (error) {
      throw error;
    }
  };

  login = async ({ email, password }: LoginUser) => {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  };

  isLoggedIn = async (): Promise<boolean> => {
    try {
      const data = await this.getCurrentUser();

      return Boolean(data);
    } catch (error) {
      throw error;
    }

    return false;
  };

  getCurrentUser = async () => {
    try {
      return await account.get();
    } catch (error) {
      console.log("get currentUser info -> ", error);
      throw error;
    }

    return null;
  };

  logout = async () => {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      console.log("logout error -> ", error);
      throw error;
    }
  };
}

const appWriteService = new AppwriteService();

export default appWriteService;
