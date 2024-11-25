import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "../buttons/Button";
import Input from "@/pages/CreateCampaign/UI/input";
import { RewardToken } from "@/hooks/useRewardToken";
import {
  useWithdrawICP,
  useWithdrawIcrc1Tokens,
} from "@/hooks/useCanisters.ts";
import { toast } from "react-toastify";
import { toSmallestUnit } from "@/lib/utils";

const WithdrawModal = ({
  isOpen,
  setIsOpen,
  token,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  token: RewardToken;
}) => {
  const [amount, setAmount] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [errors, setErrors] = useState<{ amount?: string; address?: string }>({
    amount: "",
    address: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const availableFund =
    Number(token.balance || 0) / 10 ** Number(token.decimal || 8);

  const [withdrawIcp] = useWithdrawICP();
  const [withdrawIcrc1Token] = useWithdrawIcrc1Tokens(token?.token?.toString());

  const validateAmount = (value: string) => {
    if (!value) return "Amount is required.";
    if (Number(value) > availableFund)
      return `Amount cannot exceed (${availableFund} ${token.symbol}).`;
    return "";
  };

  const validateAddress = (value: string) => {
    if (!value) return "Address is required.";
    return "";
  };

  const handleBlur = (field: "amount" | "address", value: string) => {
    let errorMessage = "";
    if (field === "amount") errorMessage = validateAmount(value);
    if (field === "address") errorMessage = validateAddress(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));
  };

  const onClose = () => {
    setIsOpen(false);
    setAddress("");
    setAmount("");
  };

  const handleWithdrawTokens = async () => {
    const newErrors = {
      amount: validateAmount(amount),
      address: validateAddress(address),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;
    setLoading(true);
    try {
      const nativeAmount = toSmallestUnit(amount, token.decimal);
      const trimmedAddress = address.trim();
      let response;
      if (token.token_type === "icp") {
        response = await withdrawIcp({
          amount: nativeAmount,
          address: trimmedAddress,
        });
      } else {
        response = await withdrawIcrc1Token({
          amount: nativeAmount,
          address: trimmedAddress,
        });
      }
      console.log(response);
      onClose();
    } catch (error) {
      toast.error("Token transferred Failed !");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={onClose}
      />

      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded bg-white p-6 shadow-xl">
        <p className="mb-6 text-center text-lg font-semibold xl:text-xl">
          Withdraw
        </p>
        <X
          size={22}
          className="absolute right-0 top-0 m-4 cursor-pointer"
          onClick={onClose}
        />
        {/* Address Input */}
        <div className="relative mb-4 text-left">
          <p className="mb-1 text-sm font-medium">{"To send"}</p>
          <Input
            value={address}
            className="w-full rounded border border-[#b3b3b3] text-sm"
            placeholder={"Enter Principal Id"}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={(e) => handleBlur("address", e.target.value)}
          />
          {errors.address && (
            <div className="text-left text-xs text-red-400">
              {errors.address}
            </div>
          )}
          <div className="mt-1 text-xs text-gray-400">
            Enter the{"  "}
            <span className="font-sm font-bold text-black">
              {"Principal Id"}
            </span>
            {"  "}
            you want to send
          </div>
        </div>
        {/* Amount Input */}
        <div className="relative text-left">
          <p className="mb-1 text-sm font-medium">{"Amount"}</p>
          <Input
            value={amount}
            className="w-full rounded border border-[#b3b3b3] text-sm"
            placeholder="Amount"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            onBlur={(e) => handleBlur("amount", e.target.value)}
          />
          <span className="absolute right-3 top-8 text-sm font-medium text-gray-500">
            {token.symbol}
          </span>
        </div>
        {errors.amount && (
          <div className=" text-left text-xs text-red-400">{errors.amount}</div>
        )}
        <div className="mb-4 mt-1 text-left text-xs text-gray-400">
          {`Available Funds :`}
          <span className="font-medium">
            {availableFund} {token.symbol}
          </span>
        </div>

        <div className="mt-6 flex w-full flex-row justify-center">
          <Button
            className="text-white"
            variant="dark"
            onClick={handleWithdrawTokens}
            disabled={loading || Object.values(errors).some((err) => err)}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default WithdrawModal;
