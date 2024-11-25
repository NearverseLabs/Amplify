import React, { useMemo, useState } from "react";
import { X, Copy } from "lucide-react";
import Button from "../buttons/Button";
import QrCode from "../QrCode";
import Input from "@/pages/CreateCampaign/UI/input";
import { RewardToken } from "@/hooks/useRewardToken";
import { useIcpConnection } from "@/hooks/useCanisters";
import { AccountIdentifier } from "@dfinity/ledger-icp";

const QrSection = ({
  className,
  value,
  title,
  subText,
}: {
  className?: string;
  value: string;
  title: string;
  subText?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={`flex w-full flex-row items-center gap-3 ${className}`}>
      <QrCode value={value} />
      <div className="flex w-full flex-col items-start">
        <p className="my-2 text-left text-sm font-medium lg:text-base">
          {title}
        </p>
        <p className="mb-3 text-left text-xs text-gray-400">{subText}</p>
        <div className="relative flex w-full items-center gap-2">
          <Input
            containerClass="w-full"
            className="text-ellipsis text-sm"
            defaultValue={value}
            readOnly
          />
          <Copy
            size={30}
            strokeWidth={1.3}
            className=" transform cursor-pointer text-gray-500 transition-all duration-100 hover:scale-110"
            onClick={handleCopyAddress}
          />
          {copied && (
            <span className="absolute -top-5 right-0 text-xs font-medium text-blue-600">
              Copied!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const DepositModal = ({
  isOpen,
  setIsOpen,
  onClose,
  token,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  token: RewardToken;
}) => {
  const { principal } = useIcpConnection();
  const accountId = useMemo(
    () =>
      principal ? AccountIdentifier.fromPrincipal({ principal }) : undefined,
    [principal],
  );

  const handleDeposit = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 mx-4 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 transform rounded bg-white p-8 pb-6 shadow-xl">
        <p className=" text-center text-lg font-semibold xl:text-xl">Deposit</p>
        <p className="mb-6 mt-1 text-center text-xs text-gray-500">
          {"Scan this QR or Copy address to deposit."}
        </p>
        <QrSection
          title={"Account ID"}
          value={accountId?.toHex() ?? "-"}
          subText={`This is the account ID for your wallet. You can use this account ID to receive ${token.token_type} to your wallet.`}
        />
        <div className="mx-auto my-5 w-full  border-t-[0.5px]"></div>
        <QrSection
          className=""
          title={"Principal ID"}
          value={principal?.toString() ?? "-"}
          subText={`This is the principal ID for your wallet. Use this Principal to receive ${token.token_type} to your wallet.`}
        />
        <div className="flex w-full flex-row justify-center">
          <Button className="mt-6" variant="dark" onClick={handleDeposit}>
            Deposit
          </Button>
        </div>

        <X
          size={22}
          className="absolute right-0 top-0 m-4 cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      </div>
    </>
  );
};

export default DepositModal;
