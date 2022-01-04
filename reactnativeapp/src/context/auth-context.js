import {createContext} from 'react';

interface AuthContextInterface {
  userToken: null;
  signIn: () => undefined;
  signOut: () => undefined;
}

const AuthContext = createContext({
  userToken: null,
  signIn: async () => undefined,
  signOut: async () => undefined,
});

export default AuthContext;
