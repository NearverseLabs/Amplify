import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Define a type for the user data
interface UserData {
  id: number;
  email: string;
  avatar_url: string;
  name: string;
  // Add other properties as needed
}

// Define a type for the context value
interface UserContextValue {
  isLoading: boolean;
  user: UserData | null;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: any }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get('/user');
        setUser(data.user);
        setIsLoading(false);
      } catch (error: any) {
        console.error('Error fetching user:', error?.message);
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ isLoading, user }}>
      {children}
    </UserContext.Provider>
  );
};
