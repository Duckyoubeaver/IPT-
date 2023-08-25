import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase.js";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// import { auth } from '../firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // const createUser = (email, password) => {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (result) => {
        try {
          const ref = doc(db, "userinfo", result.user.uid);
          await setDoc(ref, {});
          // const docRef = await setDoc(ref, {}); //commented for warning
          alert("New user created sucessfully");
        } catch (e) {
          alert("Error adding document: ", e); //Security rule check
        }
      }
    );
  };

  const CreateAgent = (email, password, fullName, businessID, role) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        try {
          const userRef = doc(db, "userinfo", result.user.uid);
          const userDoc = {
            fullName,
            email,
            role,
            businessId: businessID,
            // Add any other user information you want to store
          };
          await setDoc(userRef, userDoc);

          // Update either admins or employees array based on the role
          const businessRef = doc(collection(db, "businesses"), businessID);
          if (role === "admin") {
            await updateDoc(businessRef, {
              admins: arrayUnion(result.user.uid),
            });
          } else {
            await updateDoc(businessRef, {
              employees: arrayUnion(result.user.uid),
            });
          }

          alert("Agent created successfully");
          console.log(fullName, businessID);
          // return { businessId: businessID, userId: result.user.uid };
        } catch (e) {
          alert("Error adding document: " + e.message);
        }
      })
      .catch((error) => {
        alert("Error creating agent: " + error.message);
        // Rethrow the error to handle it at the component level
        throw error;
      });
  };

  const CreateAdmin = (email, password, fullName, businessName) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        try {
          const businessRef = doc(collection(db, "businesses"));
          const businessDoc = {
            id: businessRef.id, // Use the auto-generated ID as the business ID
            name: businessName,
            admins: [], // Admins will be added later after creating the user
            employees: [], // Initialize the employees array as empty
            // Add any other business details you want to store
          };
          await setDoc(businessRef, businessDoc);

          const userRef = doc(db, "userinfo", result.user.uid);
          const userDoc = {
            fullName,
            email,
            role: "admin", // You can set the role here, in this case, it's an admin
            businessId: businessRef.id, // Add the business ID to the user document
            // Add any other user information you want to store
          };
          await setDoc(userRef, userDoc);

          // Update the admins array in the businesses collection
          await updateDoc(businessRef, {
            admins: [result.user.uid], // Add the user ID of the owner as the first admin
          });
          alert("New user and business created successfully");
          console.log(fullName, businessName);
          // return { businessId: businessRef.id, userId: result.user.uid };
        } catch (e) {
          alert("Error adding document: " + e.message);
        }
      })
      .catch((error) => {
        alert("Error creating user and business: " + error.message);
        // Rethrow the error to handle it at the component level
        throw error;
      });
  };
  //fetch info
  const fetchUserInfo = async () => {
    try {
      // Get the currently logged-in user
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "userinfo", currentUser.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          // Return the user information
          return userSnapshot.data();
        } else {
          console.log("User document not found");
        }
      } else {
        console.log("No user is currently logged in");
      }
    } catch (error) {
      console.log("Error fetching user information:", error.message);
    }
  };
  const fetchBusinessInfo = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "userinfo", currentUser.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          // Check if the user has the 'businessId' field in the document
          if (userSnapshot.data().businessId) {
            const businessRef = doc(
              db,
              "businesses",
              userSnapshot.data().businessId
            );
            const businessSnapshot = await getDoc(businessRef);

            if (businessSnapshot.exists()) {
              // Return the business information
              return businessSnapshot.data();
            } else {
              console.log("Business document not found");
              return null;
            }
          } else {
            console.log("User does not have a business affiliation");
            return null;
          }
        } else {
          console.log("User document not found");
          return null;
        }
      } else {
        console.log("No user is currently logged in");
        return null;
      }
    } catch (error) {
      console.log("Error fetching business information:", error.message);
      return null;
    }
  };

  const getUserInfo = async (userId) => {
    try {
      const userSnapshot = await getDoc(doc(db, "userinfo", userId));
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        return {
          id: userId,
          fullName: userData.fullName,
          role: userData.role,
        };
      } else {
        console.log(`User document for ID ${userId} not found`);
        return null;
      }
    } catch (error) {
      console.log(
        `Error fetching user information for ID ${userId}:`,
        error.message
      );
      return null;
    }
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logout,
        signIn,
        CreateAdmin,
        CreateAgent,
        fetchUserInfo,
        fetchBusinessInfo,
        getUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
