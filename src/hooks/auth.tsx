import React from "react";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import { useContext } from "react";
import { createContext } from "react";
import { CLIENT_ID_GOOGLE, REDIRECT_URI_GOOGLE, USER_KEY } from "../keys";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

type AuthorizationResponse = {
  params: {
    access_token: string;
  };
  type: string;
};

type UserResponse = {
  email: string;
  given_name?: string;
  id: string;
  locale?: string;
  name: string;
  picture?: string;
  verified_email: boolean;
};

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContext {
  user: User;
  isLoading: boolean;
  userStorageLoading: boolean;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  logOutUser(): Promise<void>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  async function signInWithGoogle() {
    setIsLoading(true);

    try {
      const CLIENT_ID = CLIENT_ID_GOOGLE;
      const REDIRECT_URI = REDIRECT_URI_GOOGLE;
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = (await response.json()) as UserResponse;

        const userLogged = {
          name: userInfo.name,
          email: userInfo.email,
          id: String(userInfo.id),
          photo: userInfo.picture,
        };

        setUser(userLogged);

        setIsLoading(false);

        await AsyncStorage.setItem(USER_KEY, JSON.stringify(userLogged));
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    setIsLoading(true);

    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const userLogged = {
          id: String(credential.user),
          email: credential.email,
          name: credential.fullName.givenName,
          photo: undefined,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(userLogged));
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  }

  async function logOutUser() {
    await AsyncStorage.removeItem(USER_KEY);
    setUser({} as User);
  }

  useEffect(() => {
    async function loadUser() {
      const data = await AsyncStorage.getItem(USER_KEY);
      const userData: User = data ? JSON.parse(data) : {};

      if (data) {
        setUser(userData);
      }

      setUserStorageLoading(false);
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        isLoading,
        signInWithApple,
        logOutUser,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, AuthContext, useAuth };
