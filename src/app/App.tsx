import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Profile, CreateCampaign, Login, RegisterUser } from "@/pages";
import Layout from "./Layout";
import Admin from "@/pages/Admin";
import { useUserContext } from "@/providers/UserProvider";

const App: FC = () => {
  const { isOwner } = useUserContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register-user" element={<RegisterUser />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
