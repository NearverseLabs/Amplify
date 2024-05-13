import React from "react";
import DotedImage from "@/assets/images/Frame 2.png";
import AmplifyLog from "@/assets/svg/amplify-logo-icon.png";
import BannerLeft from "@/assets/svg/banner-left.png";
import BannerRight from "@/assets/svg/banner-right.png";
import { X } from "lucide-react";

const Banner = ({ setShow }: { setShow: (value: boolean) => void }) => {
  const textContent =
    "Help us get the word about Amplify on X. Early supporters will be airdropped $AMPL";

  const twitterPostMessage = encodeURIComponent("Let's get social and earn rewards in $ICP and other ICRC tokens with @Amplify_ICP. \n \n  PS: Early supporters will eligible for $AMPL airdrop.🪂 \n \n")

  const hashtags =  encodeURIComponent("ICP,SocialFi,E2E")

  const intentHandler = () => {
    window.open(`https://twitter.com/intent/tweet?text=${twitterPostMessage}&hashtags=${hashtags}`);
  };

  return (
      <div className={'relative'}>
      <span
          onClick={() => setShow(false)}
          className="absolute right-1 top-1 cursor-pointer md:right-2 md:top-2 z-10"
      >
        <X />
      </span>
        <div
            className={`relative flex h-full md:h-[100px] w-full items-center justify-between overflow-hidden border-b border-black bg-[#FFF] py-2.5  md:py-0 `}
        >
          <img src={BannerLeft} className={'h-full hidden lg:block'} />
          <div className="">
            <div className={"flex flex-col md:flex-row gap-2 items-center justify-center p-2"}>
              <img src={AmplifyLog} className={'h-auto w-20'} />
              <div className={'max-w-[400px]'}>
                <div className="text-neutral-950 text-3xl font-bold font-['Plus Jakarta Sans']">
                  Early Supporter Rewards
                </div>
                <div className="">
                  {textContent}
                </div>
              </div>
              <button onClick={intentHandler} className="relative">
                <div className="py-3 px-8 bg-zinc-800 rounded-md shadow text-white uppercase justify-center items-center flex" >
                  Tweet NOW
                </div>
              </button>
            </div>
          </div>
          <img src={BannerRight} className={'h-full hidden lg:block'} />
        </div>
      </div>
  );
};

export default Banner;
