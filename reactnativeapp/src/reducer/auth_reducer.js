export const authInitialState = {
  isLoading: true,
  isSignOut: false,
  userToken: '',
};

export default function authReducer(state, action) {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        userToken: action.userToken,
        isSignOut: false,
        isLoading: false,
      };
    case 'SIGN_OUT':
      return {...state, isSignOut: true, userToken: '', isLoading: false};
    default:
      return authInitialState;
  }
}
