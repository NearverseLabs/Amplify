import Button from "@/components/buttons/Button";
import { Check, Loader2, X } from "lucide-react";
import { Campaign } from "@/declarations/amplify_sc_rust_backend/amplify_sc_rust_backend.did";
import React, { useEffect, useState } from "react";
import { useBackend } from "@/hooks/useCanisters.ts";
import { PaginatedCampaign } from "@/hooks/useCampaignsReducer.ts";
import { convertXToTwitter } from "@/lib/utils";
import moment from "moment";
import CommentModal from "../CommentModal";
import axios from "axios";
import { toast } from "react-toastify";
import { useConnect } from "@connect2ic/react";
import { useNavigate } from "react-router-dom";

const CheckUncheckIcon = ({ type }: { type: boolean }) => {
  if (type) {
    return (
      <div className="flex w-fit items-center justify-center rounded-full bg-green-400 p-1 text-white">
        <Check size={14} />
      </div>
    );
  }
  return (
    <div className="flex w-fit items-center justify-center rounded-full bg-red-600 p-1 text-white">
      <X size={14} />
    </div>
  );
};

interface IProps {
  setOpenCampaign: (value: boolean) => void;
  campaign: PaginatedCampaign;
  onEnter: () => void;
}

const twitterRegexPattern =
  /^(https:\/\/(?:www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/[0-9]+)(\?s=\d+)?$/;

const CampaignDetails = ({ setOpenCampaign, campaign, onEnter }: IProps) => {
  const [isloading, setIsloading] = React.useState<boolean>(false);
  const [isParticipated, setIsParticipated] = React.useState<boolean>(false);
  const [reply, setReply] = React.useState<string>("");
  const [openCommentPopup, setOpenCommentPopup] =
    React.useState<boolean>(false);
  const [backend] = useBackend();
  const [comment, setComment] = useState("");
  const [text, setText] = useState("");
  const { disconnect, principal } = useConnect();
  const navigate = useNavigate();

  const praticipateHandler = async () => {
    // if (
    //   (campaign.requirements.tweet_reply && !comment) ||
    //   (campaign.requirements.quote_retweet && !text)
    // ) {
    //   setOpenCommentPopup(true);
    //   return;
    // }
    setOpenCommentPopup(false);
    if (isloading) return;
    setIsloading(true);
    try {
      await backend.participate_in_campaign(BigInt(campaign.campaign_id));
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/participate`, {
        campaign_id: Number(campaign.id),
        user_id: principal?.toString(),
        text: text,
        reply: comment,
      });
      onEnter();
    } catch (e: any) {
      if (e?.response?.status === 403 || e?.response?.status === 401) {
        disconnect();
        localStorage.removeItem("wallet_connected");
        navigate("/login");
      }
      console.log("Error in participate", e);
      toast.error(e?.response?.data || e?.message || "Something Went Wrong");
      setIsloading(false);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    const fetchParticipation = async () => {
      const have_i_participated = await backend.have_i_participated(
        BigInt(campaign.campaign_id),
      );
      if ("Ok" in have_i_participated) {
        setIsParticipated(have_i_participated.Ok);
      }
    };
    fetchParticipation();
  }, [campaign.id]);

  const handleParentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className="md:top-15 fixed bottom-0 z-40 h-[calc(100vh_-_4.5rem)] overflow-y-auto rounded-sm bg-white p-4 shadow-[0_0_10px_rgba(0,0,0,0.2)] sm:right-[0.5rem] sm:max-w-sm">
        <div className="h-full w-full">
          <X
            size={18}
            className="absolute right-6 top-4 cursor-pointer"
            onClick={() => setOpenCampaign(false)}
          />
          <p className="mb-2 text-xl font-bold">{campaign.project_name}</p>
          <p className="text-xl font-normal">Campaign Details</p>
          <div
            onClick={handleParentClick}
            className="my-4 w-full border-t py-4"
          >
            {campaign.tweet_id &&
              twitterRegexPattern.test(campaign.tweet_id) && (
                <iframe
                  height="300"
                  width="100%"
                  src={`https://twitframe.com/show?url=${convertXToTwitter(
                    campaign.tweet_id,
                  )}`}
                ></iframe>
              )}
          </div>
          <p className="text-xs">
            Amplify will verify the following activities (in green)
          </p>
          <div className="my-3 flex items-center justify-between text-sm">
            <p className="underline">{"1) Join Group"}</p>
            <CheckUncheckIcon type={campaign.requirements.join_group} />
          </div>
          <div className="my-3 flex items-center justify-between text-sm">
            <p className="underline">{"2) Join Community"}</p>
            <CheckUncheckIcon type={campaign.requirements.join_community} />
          </div>
          <div className="my-3 flex items-center justify-between text-sm">
            <p className="underline">{"3) Be Active in Community"}</p>
            <CheckUncheckIcon
              type={campaign.requirements.active_in_community_time}
            />
          </div>
          <div className="my-3 flex items-center justify-between text-sm">
            <p className="underline">{"4) Be Active in Group"}</p>
            <CheckUncheckIcon
              type={campaign.requirements.active_in_group_time}
            />
          </div>
          <div className="my-3 flex items-center justify-between text-sm">
            <p className="underline">{"5) Message in Community"}</p>
            <CheckUncheckIcon
              type={campaign.requirements.messages_in_community}
            />
          </div>
          <div className="my-3 flex items-center justify-between text-sm">
            <p className="underline">{"6) Message in Group"}</p>
            <CheckUncheckIcon type={campaign.requirements.messages_in_group} />
          </div>
          <div className="mt-5 flex items-center justify-between gap-4">
            {/* <Button
              onClick={() => {
                window.open(campaign.tweet_id, "_blank");
              }}
              variant="dark"
              // disabled={!isParticipated}
            >
              Go to Tweet
            </Button> */}
            {moment(campaign.ends_at).isAfter(moment()) && (
              <Button
                isLoading={isloading}
                onClick={praticipateHandler}
                variant="dark"
                disabled={campaign.participated || isloading}
              >
                Participate
              </Button>
            )}
          </div>
          <div className="h-4" />
        </div>
      </div>
      <CommentModal
        comment={comment}
        text={text}
        setComment={setComment}
        setText={setText}
        onClose={praticipateHandler}
        reply={false}
        tweet={false}
        tweetId={campaign.tweet_id}
        isOpen={openCommentPopup}
        setIsOpen={setOpenCommentPopup}
      />
    </>
  );
};

export default CampaignDetails;
