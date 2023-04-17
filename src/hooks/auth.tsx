import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  userInfo: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signout(): Promise<void>;
  userStorageLoading: boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(false);

  const userKeyStorage = "@gofinance:user";

  async function loadUserStorageData() {
    const userInfoStoraged = await AsyncStorage.getItem(userKeyStorage);
    if (!userInfoStoraged) return;

    const userInfoConverted: User = JSON.parse(userInfoStoraged);
    setUserInfo(userInfoConverted);
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  async function signout() {
    await AsyncStorage.removeItem(userKeyStorage);
    setUserInfo({} as User);
  }

  async function signInWithGoogle() {
    try {
      setUserStorageLoading(true);
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      const { params, type } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type !== "success") return;

      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        { method: "get" }
      );
      const data = await response.json();
      const userLogged = {
        id: data.id,
        email: data.email,
        name: data.given_name,
        photo: data.picture,
      };

      setUserInfo(userLogged);
      await AsyncStorage.setItem(userKeyStorage, JSON.stringify(userLogged));
      setUserStorageLoading(false);
    } catch (error: any) {
      console.log(error);
      throw new Error();
    }
  }

  async function signInWithApple() {
    try {
      setUserStorageLoading(true);
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential) return;

      const name = credential.fullName?.givenName!;
      const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;
      const userLogged = {
        id: String(credential.user),
        email: credential.email!,
        name,
        photo,
      };

      setUserInfo(userLogged);
      await AsyncStorage.setItem(userKeyStorage, JSON.stringify(userLogged));
      setUserStorageLoading(false);
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao autenticar com conta Apple");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        signInWithGoogle,
        signInWithApple,
        signout,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
