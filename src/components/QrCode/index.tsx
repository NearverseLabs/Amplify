import { QRCodeSVG } from "qrcode.react";

const QrCode = ({
  className,
  size,
  value,
}: {
  className?: string;
  size?: number;
  value: string;
}) => {
  return (
    <div className={`${className} p-2 rounded-md shadow border`}>
      <QRCodeSVG value={value} size={size ? size : 150} />
    </div>
  );
};

export default QrCode;
