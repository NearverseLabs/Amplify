import React, { createContext, useContext, useState, useEffect, SetStateAction } from 'react';
import axios from 'axios';
import { Principal } from "@dfinity/principal";
import { useCurrentPrincipal } from "@/hooks/useCanisters.ts";

// Define a type for the user data
interface UserData {
  id: string;
  twitter_username: string;
  name: string;
  avatar_url: string;
}

// Define a type for the context value
interface UserContextValue {
  isLoading: boolean;
  user: UserData | null;
  setUser: React.Dispatch<UserData | null>;
  randomAvatar: string
  principal?: Principal
  isOwner: boolean
  setIsOwner: React.Dispatch<SetStateAction<boolean>>
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
  const [isOwner, setIsOwner] = useState(false)

  const principal = useCurrentPrincipal()

  function getRandomImageUrl(min: number, max: number) {
    const randonInt = Math.floor(Math.random() * (max - min) + min);
    return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${randonInt}`
  }

  return (
    <UserContext.Provider value={{ isLoading, user, setUser, randomAvatar: getRandomImageUrl(1, 100), principal, isOwner, setIsOwner }}>
      {children}
    </UserContext.Provider>
  );
};
