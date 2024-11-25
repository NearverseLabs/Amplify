import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "@/providers/UserProvider.tsx";
import ConnectICProvider from "@/providers/ConnectICProvider.tsx";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {WhiteListedTokensProvider} from "@/providers/WhiteListedTokensProvider.tsx";
import { SWRConfig } from 'swr'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
      <ConnectICProvider>
          <UserProvider>
              <WhiteListedTokensProvider>
                  <SWRConfig
                      value={{
                          fetcher: (resource: any, init: any) => fetch(resource, init).then(res => res.json())
                      }}
                  >
                      <App />
                      <ToastContainer />
                  </SWRConfig>
              </WhiteListedTokensProvider>
          </UserProvider>
      </ConnectICProvider>
  </BrowserRouter>,
);
