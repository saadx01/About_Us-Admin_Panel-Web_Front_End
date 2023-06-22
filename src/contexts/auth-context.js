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
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
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

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: '5e86809283e28b96d2d38537',
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Anika Visser',
        email: 'anika.visser@devias.io'
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // const skip = () => {
  //   try {
  //     window.sessionStorage.setItem('authenticated', 'true');
  //   } catch (err) {
  //     console.error(err);
  //   }

  //   const user = {
  //     id: '5e86809283e28b96d2d38537',
  //     avatar: '/assets/avatars/avatar-anika-visser.png',
  //     name: 'Saad ur Rehman',
  //     email: 'saad123@gmail.com'
  //   };

  //   dispatch({
  //     type: HANDLERS.SIGN_IN,
  //     payload: user
  //   });
  // };

  // const signIn = async (email, password) => {
  //   if (email !== 'saad123@gmail.com' || password !== 'Password123!') {
  //     throw new Error('Please check your email and password');
  //   }

  //   try {
  //     window.sessionStorage.setItem('authenticated', 'true');
  //   } catch (err) {
  //     console.error(err);
  //   }

  //   const user = {
  //     id: '5e86809283e28b96d2d38537',
  //     avatar: '/assets/avatars/avatar-anika-visser.png',
  //     name: 'Saad ur Rehman',
  //     email: 'saad123@gmail.com'
  //   };

  //   dispatch({
  //     type: HANDLERS.SIGN_IN,
  //     payload: user
  //   });
  // };





const signIn = async (email, password) => {
  try {
    const data = JSON.stringify({
      email,
      password
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/api/v1/users/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    const response = await axios.request(config);

    // console.log(response.data)
    const { user } = response.data.data;
    // console.log(user)

    
    window.sessionStorage.setItem('authenticated', response.data.data);


    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  } catch (err) {
    console.error(err);
    throw new Error('An error occurred during sign-in. Please check your email and password');
    // throw new Error('Please check your email and password');
  }
};

// const signOut = async () => {
//   try {
//     const config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: 'http://localhost:4000/api/v1/users/logout', // Replace with your backend logout endpoint
//       headers: {
//         'Content-Type': 'application/json',
//         'Cookie': 'jwt=...' // Replace with the appropriate cookie value
//       }
//     };

//     await axios.request(config);

//     dispatch({
//       type: HANDLERS.SIGN_OUT
//     });
//   } catch (err) {
//     console.error(err);
//     throw new Error('An error occurred during sign-out');
//   }
// };


  const signUp = async (email, name, password) => {
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        // skip,
        signIn,
        signUp,
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













// import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
// import PropTypes from 'prop-types';
// import axios from 'axios';

// const HANDLERS = {
//   INITIALIZE: 'INITIALIZE',
//   SIGN_IN: 'SIGN_IN',
//   SIGN_OUT: 'SIGN_OUT'
// };

// const initialState = {
//   isAuthenticated: false,
//   isLoading: true,
//   user: null
// };

// const handlers = {
//   [HANDLERS.INITIALIZE]: (state, action) => {
//     const user = action.payload;

//     return {
//       ...state,
//       ...(user
//         ? {
//             isAuthenticated: true,
//             isLoading: false,
//             user
//           }
//         : {
//             isLoading: false
//           })
//     };
//   },
//   [HANDLERS.SIGN_IN]: (state, action) => {
//     const user = action.payload;

//     return {
//       ...state,
//       isAuthenticated: true,
//       user
//     };
//   },
//   [HANDLERS.SIGN_OUT]: (state) => {
//     return {
//       ...state,
//       isAuthenticated: false,
//       user: null
//     };
//   }
// };

// const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

// export const AuthContext = createContext(undefined);

// export const AuthProvider = (props) => {
//   const { children } = props;
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const initialized = useRef(false);

//   const initialize = async () => {
//     if (initialized.current) {
//       return;
//     }

//     initialized.current = true;

//     let isAuthenticated = false;

//     try {
//       isAuthenticated = Boolean(window.localStorage.getItem('token'));
//     } catch (err) {
//       console.error(err);
//     }

//     if (isAuthenticated) {
//       const user = {
//         id: '5e86809283e28b96d2d38537',
//         avatar: '/assets/avatars/avatar-anika-visser.png',
//         name: 'Anika Visser',
//         email: 'anika.visser@devias.io'
//       };

//       dispatch({
//         type: HANDLERS.INITIALIZE,
//         payload: user
//       });
//     } else {
//       dispatch({
//         type: HANDLERS.INITIALIZE
//       });
//     }
//   };

//   useEffect(() => {
//     initialize();
//   }, []);

//   const signIn = async (email, password) => {
//     try {
//       const data = JSON.stringify({
//         email,
//         password
//       });

//       const config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: 'http://localhost:4000/api/v1/users/login',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         data: data
//       };

//       const response = await axios.request(config);
//       // const { token, user } = response.data.data;
//       const token = response.data.token;
//       const user = response.data.data;
//       // console.log(token, user)

//       window.localStorage.setItem('token', token);

//       dispatch({
//         type: HANDLERS.SIGN_IN,
//         payload: user
//       });
//     } catch (err) {
//       console.error(err);
//       throw new Error('An error occurred during sign-in. Please check your email and password');
//     }
//   };

//   const signOut = () => {
//     window.localStorage.removeItem('token');

//     dispatch({
//       type: HANDLERS.SIGN_OUT
//     });
//   };

//   const signUp = async (email, name, password) => {
//     throw new Error('Sign up is not implemented');
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         ...state,
//         signIn,
//         signUp,
//         signOut
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthProvider.propTypes = {
//   children: PropTypes.node
// };

// export const AuthConsumer = AuthContext.Consumer;

// export const useAuthContext = () => useContext(AuthContext);
