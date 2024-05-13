import React from "react";

import Logo from "@/assets/images/Amplify_Logo.png";

import { useNavigate } from "react-router-dom";
import Input from "@/components/Input";
import Button from "@/components/buttons/Button";
import { toast } from "react-toastify";
import { useBackend, useIcpConnection } from "@/hooks/useCanisters.ts";

const RegisterUser = () => {
  const [userName, setUserName] = React.useState("");
  const [twitterUserName, setTwitterUserName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const [backend, { loading, error }] = useBackend();
  const { isConnected, principal, setUser, disconnect } = useIcpConnection();
  console.log("isConnected", isConnected, error, principal?.toString());
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

  return (
    <div className="w-full">
      <div className="flex w-full flex-wrap p-6 md:h-screen">
        <div className="flex h-full w-full max-w-md flex-col justify-between gap-10 rounded-3xl bg-black p-8 md:w-2/5 lg:w-1/4">
          <div className="md:mt-16">
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
        <div className="flex w-full flex-col items-center justify-center pt-8 md:w-3/5 md:pt-0 lg:w-3/4">
          <div className="w-full max-w-[500px]">
            <img src={Logo} alt="logo" className="w-full" />
          </div>
          <div className="flex w-full max-w-[400px] justify-center ">
            <Button
              onClick={RegisterUserHandler}
              className="mt-4 px-8 py-4"
              variant="dark"
              isLoading={isLoading}
            >
              Login in Twitter
            </Button>
          </div>
          <Button
            onClick={() => {
              disconnect();
              navigate("/login");
            }}
            className="mt-4 px-8 py-4"
            variant="light"
            isLoading={isLoading}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
