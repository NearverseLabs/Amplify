import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

const ClientOnlyContent: React.FC<PropsWithChildren> = ({ children }) => (
  <>{children}</>
);

const ClientOnly = dynamic(() => Promise.resolve(ClientOnlyContent), {
  ssr: false,
});

export default ClientOnly;
