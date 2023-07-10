import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user
          }
        : {
            isLoading: false
          })
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      const token = window.localStorage.getItem('token');
      // console.log("Auth token: ", token)
      if (token) {
        // Check with your server to validate the token and fetch user data
        const response = await axios.get('http://localhost:4000/api/v1/social-worker/getMe', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // console.log("response: ",response)
        // console.log("Status: ", response.status === 200)

        isAuthenticated = response.status === 200;
        initialState.isAuthenticated=isAuthenticated
        if (isAuthenticated) {
          dispatch({
            type: HANDLERS.INITIALIZE,
            payload: response.data.user
          });
        }
      }
    } catch (err) {
      console.error(err);
    }

    if (!isAuthenticated) {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(() => {
    initialize();
    console.log()
  }, []);

  const signIn = async (email, password) => {
    try {
      // Send a request to your server to authenticate the user and get a token
      const response = await axios.post('http://localhost:4000/api/v1/users/login', {
        email,
        password
      });
      const token = response.data.token;
      console.log("Response: ", response)
      if (token) {
        window.localStorage.setItem('token', token);
        
        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: response.data.data.user
        });
      } else {
        throw new Error('Invalid token');
      }
    } catch (err) {
      console.error(err);
      throw new Error('Please check your email and password');
    }
  };

  const signOut = () => {
    console.log("This is saaad: ",window.localStorage.getItem('token'))
    window.localStorage.removeItem('token');
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        // signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
