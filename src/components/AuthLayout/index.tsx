import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useBackend, useIcpConnection } from "@/hooks/useCanisters.ts";
import Banner from "./Banner";
import { Loader2 } from "lucide-react";
import { useTimeout } from "usehooks-ts";
import axios from "axios";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const [backend] = useBackend();
  const { isConnected, isConnecting, principal, setUser, user } =
    useIcpConnection();
  const location = useLocation();
  const [search, setSearch] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  // const fetchUserData = async () => {
  //   if (user) {
  //     setIsLoading(false);
  //     return;
  //   }
  //   if (isConnected && !location.pathname.includes("login")) {
  //     if (principal) {
  //       try {
  //         const {
  //           data: { user: data },
  //         } = await axios.get<{
  //           user: {
  //             name: string;
  //             username: string;
  //             address: string;
  //             avatar_url: string;
  //           };
  //         }>(`${import.meta.env.VITE_BACKEND_URL}/user`);
  //         if (data.address === principal.toText()) {
  //           setUser({
  //             id: principal.toText(),
  //             name: data.name,
  //             twitter_username: data.username,
  //             avatar_url: data.avatar_url,
  //           });
  //         } else {
  //           // navigate("/login");
  //         }
  //         // const user = await backend.get_user(principal);
  //         // if ("Ok" in user) {
  //         //   let data = undefined
  //         //   try {
  //         //      const d  = await axios.get<{user_avatar: string}>(`${import.meta.env.VITE_BACKEND_URL}twitter/user/${user.Ok.twitter_username}`)
  //         //     data = d.data
  //         //   } catch (e) {}
  //         //   setUser({
  //         //     name: user.Ok.name,
  //         //     twitter_username: user.Ok.twitter_username,
  //         //     id: user.Ok.id.toText(),
  //         //     avatar_url: data?.user_avatar || `https://unavatar.io/twitter/${user.Ok.twitter_username}`,
  //         //   });
  //         // } else {
  //         //   setIsLoading(false);
  //         //   navigate("/login");
  //         //   return;
  //         // }
  //         setIsLoading(false);
  //         return;
  //       } catch (e) {
  //         setIsLoading(false);
  //         // navigate("/login");
  //         return;
  //       }
  //     }
  //   }
  //   setIsLoading(false);
  //   // navigate("/login");
  // };

  // useEffect(() => {
  //   if (!isLoading) fetchUserData();
  // }, [isConnected, isLoading]);

  // useTimeout(fetchUserData, user || isConnected ? 0 : 3000);

  // if (isLoading) {
  //   return (
  //     <div className="flex h-screen w-full items-center justify-center">
  //       <Loader2 className="h-10 w-10 animate-spin" />
  //     </div>
  //   );
  // }
  return (
    <>
      <Header isToggle={() => setIsOpen(!isOpen)} isSidebar={isOpen} />
      {search.has("register") && (
        <Banner
          setShow={() => {
            search.delete("register");
            navigate(location.pathname, {
              replace: true,
            });
          }}
        />
      )}
      <div className="flex h-[calc(100vh_-_73px)] min-[2560px]:h-[calc(100vh_-_128px)]">
        <div
          className={`${
            isOpen
              ? "fixed bottom-0 z-10 block h-[calc(100vh_-_72px)] w-full bg-white"
              : "hidden"
          } lg:block lg:h-full lg:max-w-[300px]`}
        >
          <Sidebar close={() => setIsOpen(false)} />
        </div>
        <div className="h-full w-full overflow-y-auto bg-gray1 p-4">
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
