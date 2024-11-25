import React, { createContext, useEffect, useState } from 'react'
import { app } from '../../config/firebase.init';
import { getAuth,GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import axios from 'axios';
export const AuthContext=createContext();


const Authprovider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loader,setLoader]=useState(true)
    const [error,setError]=useState('');
    const auth= getAuth(app)

    // sign up user
    const signUp= async (email,password)=>{
        try
        {
            setLoader(true);
            return await createUserWithEmailAndPassword(auth,email,password)
        }
        catch(error)
        {
            setError(error.code)
            throw error
        }
    }

// login user

const login=async (email,password)=>
{
    try
    {
        setLoader(true);
        return await signInWithEmailAndPassword(auth, email, password)
    }
    catch(error)
    {
        setError(error.code)
            throw error
    }
}

// logout

const logout=async () =>
{
    try {
        return await signOut(auth)
    } catch (error) {
        setError(error.code)
        throw error 
    }
}

// update user profile

const updateUserProfile= async (name,photo)=>
{
    try {
        await updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
          setUser(auth.currentUser)

    } catch (error) {
        setError(error.code)
        throw error 
    }
}

// using google login 
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email'); // Ensure to add this line

const googleLogin = async () => {
    try {
        setLoader(true);
        const userCredential = await signInWithPopup(auth, googleProvider);
        const user = userCredential.user;

        // Log user info for debugging
        console.log("User Info:", user);
        console.log("Email:", user.email || "Email not provided");
        console.log("Display Name:", user.displayName || "No display name");
        console.log("Photo URL:", user.photoURL || "No photo URL");

        return user; // Ensure the user object is returned
    } catch (error) {
        console.error("Authentication Error:", error);
        setError(error.message); // Set a clearer error message
        throw error; // Rethrow the error to handle it in the component
    } finally {
        setLoader(false); // Stop loader regardless of success or error
    }
};
// observer for users
useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
        if (user) {
            axios.post('http://localhost:4000/api/set-token', { email: user.email, name: user.displayName })
                .then((response) => {
                    if (response.data.token) {
                        localStorage.setItem('token', response.data.token);
                    }
                })
                .catch((error) => {
                    console.error("Error setting token:", error);
                })
                .finally(() => setLoader(false)); // Ensure loader is stopped in both success and error cases
        } else {
            localStorage.removeItem('token');
            setLoader(false);
        }
    });

    return () => unsubscribe();
}, []);



    const contextvalue= {user,signUp,login,logout,updateUserProfile,googleLogin,error,setError,loader,setLoader}
  return (
   <AuthContext.Provider value={contextvalue}>
    {children}
   </AuthContext.Provider>
  )
}

export default Authprovider
