import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../../firebase/firebase.config';

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)



    const login = (email,password) => {
        setLoading(true)
        return  signInWithEmailAndPassword(auth,email,password)
    }

    const register = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const logOut  = () => {
        return signOut(auth)
    }

   useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
              setUser(currentUser);
              console.log('Current User:', currentUser);
  
              if (currentUser) {
                  const userInfo = { email: currentUser.email };
  
                  try {
                      const res = await fetch('http://localhost:5000/jwt', {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(userInfo)
                      });
  
                      const data = await res.json();
                      localStorage.setItem('matrimony-token', data.token);
                      console.log('JWT stored:', data.token);
                  } catch (error) {
                      console.error('Error fetching JWT:', error);
                  }
              } else {
                  localStorage.removeItem('matrimony-token');
              }
          });
  
          return () => unsubscribe();
      }, []);


    const userInfo = {
        user, loading,
        register,
        login,
        logOut,
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;