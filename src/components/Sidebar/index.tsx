import { HelpCircle, LayoutDashboard, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Dashboard from "@/assets/svg/category.svg";
import LogOut from "@/assets/svg/log-out.svg";
import element1 from "@/assets/images/bg1.png";
import element2 from "@/assets/images/bg2.png";
import { useBalance, useConnect } from "@connect2ic/react";
import { useEffect, useState } from "react";
import { useBackend } from "@/hooks/useCanisters.ts";
import { useUserContext } from "@/providers/UserProvider";

const MenuList = [
  {
    name: "dashboard",
    icon: <LayoutDashboard />,
    selectedIcon: <Dashboard />,
    link: "/",
  },
  {
    name: "profile",
    icon: <User />,
    selectedIcon: <User />,
    link: "/profile",
  },
];
const Sidebar = ({ close }: any) => {
  const location = useLocation();
  const path = location.pathname;
  const { disconnect, principal } = useConnect();
  const [assets] = useBalance();
  const { isOwner, setIsOwner } = useUserContext();
  const [menuList, setMenuList] = useState(MenuList);
  const navigate = useNavigate();
  const [backend] = useBackend();

  const handleLogout = () => {
    disconnect();
    localStorage.removeItem("wallet_connected");
    navigate("/login");
  };

  useEffect(() => {
    const CheckIsOwner = async () => {
      try {
        const ownerStatus = await backend.is_owner();
        setIsOwner(ownerStatus);
        if (ownerStatus) {
          setMenuList((prevMenuList) => [
            ...prevMenuList,
            {
              name: "admin",
              icon: <User />,
              selectedIcon: <User />,
              link: "/admin",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    CheckIsOwner();
  }, []);

  return (
    <div className="flex h-full w-full flex-col justify-between px-8 py-4">
      <div>
        {menuList.map((m: any) => {
          return (
            <Link key={m.name} to={m.link} onClick={close}>
              <div
                className={`my-3.5 flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold min-[2560px]:py-4 min-[2560px]:text-4xl ${
                  path === m.link ? "bg-[#f3f3f3] text-black" : "text-[#808080]"
                }`}
              >
                <div className="h-6 w-6 min-[2560px]:h-12 min-[2560px]:w-12">
                  {m.icon}
                </div>
                <p className="capitalize">{m.name}</p>
              </div>
            </Link>
          );
        })}
        <div
          onClick={handleLogout}
          className={`} my-3.5 flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-[#808080] min-[2560px]:py-4 min-[2560px]:text-4xl`}
        >
          <div className="h-6 w-6 min-[2560px]:h-12 min-[2560px]:w-12">
            {/* <LogOut /> */}
            <img src={LogOut} alt="" />
          </div>
          <p className="capitalize">{"Logout"}</p>
        </div>
      </div>
      <div>
        <div className="relative rounded-lg bg-black px-2 py-3 text-center text-white min-[2560px]:rounded-xl min-[2560px]:px-6 min-[2560px]:py-8">
          <img src={element1} alt="ele-1" className="absolute left-0 top-0" />
          <img
            src={element2}
            alt="ele-2"
            className="absolute bottom-0 right-0"
          />
          <div className="mx-auto -mt-8 mb-8 w-fit rounded-full bg-black text-center shadow-[0_0_10px_rgba(0,0,0,0.5)] min-[2560px]:-mt-20 min-[2560px]:mb-20">
            <span className="block min-[2560px]:hidden">
              <HelpCircle size={50} />
            </span>
            <span className="hidden min-[2560px]:block">
              <HelpCircle size={100} />
            </span>
          </div>
          <h3 className="mb-2 text-lg font-semibold min-[2560px]:text-4xl">
            Support
          </h3>
          <p className="mb-8 text-sm font-medium min-[2560px]:text-2xl">
            Having Trouble? Please contact us for more questions.
          </p>
          <a
            href="https://amplify-docs.nearverselabs.com/support-and-useful-links"
            target="_blank"
            className="rounded-md bg-white px-3 py-2 text-xs font-semibold text-black min-[2560px]:text-2xl"
          >
            Get Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
