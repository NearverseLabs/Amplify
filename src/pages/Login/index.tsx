import { useEffect, useState } from "react";

import Logo from "@/assets/images/Amplify_Logo.png";
import { Loader2 } from "lucide-react";
import { ConnectButton } from "@connect2ic/react";
import { useNavigate } from "react-router-dom";
import {
  useBackend,
  useCustomCanister,
  useIcpConnection,
} from "@/hooks/useCanisters.ts";
import { useUserContext } from "@/providers/UserProvider.tsx";
import { _SERVICE } from "@/declarations/amplify_sc_rust_backend/amplify_sc_rust_backend.did";
import * as React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { isConnected, principal, disconnect, activeProvider } =
    useIcpConnection();
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const [backend] = useBackend();

  const RegisterUserHandler = async () => {
    if (!principal) {
      toast.error("Please connect wallet first");
      navigate("/login");
      return;
    }
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/twitter/redirect/${principal?.toString()}`;
  };

  useEffect(() => {
    console.log("backend", backend, activeProvider);
    if (!isConnected) {
      setIsLoading(false);
      return disconnect();
    }
    if (isConnected && principal && activeProvider && backend) {
      const fetchUser = async () => {
        setIsLoading(true);
        try {
          await backend.get_settings();
        } catch (e) {
          alert(`Error from ${activeProvider.meta.name}: ${e}`);
          return;
        }
          if (principal.toText()) {
            navigate("/profile");
          } else {
            return;
          }
      };
      fetchUser().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [isConnected, backend, activeProvider, principal]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex w-full flex-wrap p-6 md:h-screen">
        <div className="flex h-full w-full flex-col justify-between gap-10 rounded-3xl bg-black p-8 md:w-2/5 ">
          <div className="md:mt-40">
            <h2 className="mb-6 text-4xl font-bold text-white">
              Speak to the <br className="hidden md:block" /> right audience{" "}
            </h2>
            <p className="text-base text-light-gray">
              Targeted engagement for creators on ICP{" "}
              <br className="hidden md:block" /> and rewards for users
            </p>
          </div>
          <p className="text-sm text-light-gray">
            Powered by Nearverse Labs Pvt Ltd
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center pt-8 md:w-3/5 md:pt-0 ">
          <div className="mb-4 w-full max-w-[500px]">
            <img src={Logo} alt="logo" className="w-full" />
          </div>
          <ConnectButton
            onConnect={() => {
              // localStorage.setItem("wallet_connected", "true");
              // navigate("/");
            }}
          >
            {/* <ConnectButton> */}
            <div className="cursor-pointer rounded-lg border-2 border-black1 bg-light-gray px-16 py-2.5 font-bold shadow-btn-shadow outline-0">
              Login with ICP
            </div>
          </ConnectButton>
          {/*<ConnectDialog />*/}
        </div>
      </div>
    </div>
  );
};

export default Login;
