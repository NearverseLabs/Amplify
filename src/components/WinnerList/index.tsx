import { Participant } from "@/declarations/amplify_sc_rust_backend/amplify_sc_rust_backend.did";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Divide,
  Loader2,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useBackend } from "@/hooks/useCanisters.ts";
import Button from "components/buttons/Button.tsx";
import { walletNameTrimmer } from "@/lib/utils.ts";
import Pagination from "@/components/Pagination";
import { PaginatedCampaign } from "@/hooks/useCampaignsReducer";
import axios from "axios";

interface Iprops {
  setOpenWinnerList: (value: boolean) => void;
  campaign: PaginatedCampaign;
}
export interface PaginatedWinners {
  meta: Meta;
  data: Datum[];
}

export interface Datum {
  id: number;
  user_id: string;
  campaign_id: string;
  requirements: string;
  winner: boolean;
  submitted: boolean;
  created_at: Date;
  updated_at: Date;
  claimed: boolean;
  user?: {
    username: string;
    address: string;
  };
}

export interface Meta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: null;
  previous_page_url: null;
}

const WinnerList = ({ setOpenWinnerList, campaign }: Iprops) => {
  const [winners, setWinners] = useState<PaginatedWinners["data"]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [backend] = useBackend();

  const fetchWinners = () => {
    if (campaign.id) {
      setIsLoading(true);
      try {
        axios
          .get<PaginatedWinners>(`/api/winners/${campaign.id}`)
          .then(({ data }) => {
            console.log("winners data", data, campaign.winners);
            setWinners(data.data);
            setIsLoading(false);
          });
        // backend
        //   .paginate_winners(BigInt(campaign.campaign_id), {
        //     page_size: BigInt(10),
        //     page_number: BigInt(pageNumber),
        //   })
        //   .then((data) => {
        //     console.log("winners data", data, campaign.winners);
        //     setWinners(data);
        //     setIsLoading(false);
        //   });
      } catch (e) {
        setIsLoading(false);
        console.log("Campaigns Fetch error", e);
      }
    }
  };

  useEffect(() => {
    fetchWinners();
  }, [pageNumber]);

  console.log("isLoading", isLoading);

  return (
    <div className="fixed bottom-0 right-0 z-40 h-[calc(100vh_-_5.3rem)] w-full overflow-y-auto rounded-sm bg-white p-4 shadow-md max-[300px]:right-1 max-[300px]:w-[260px] sm:w-[480px]">
      <div className="h-full w-full">
        <X
          size={26}
          className="absolute right-8 top-4 cursor-pointer"
          onClick={() => setOpenWinnerList(false)}
        />
        <p className="mb-3 text-2xl font-bold">{campaign.project_name}</p>
        <div className="flex items-center gap-4">
          <p className="text-xl font-semibold">Winners</p>
          {/*<Copy className="cursor-pointer text-gray-400" />*/}
        </div>
        <div className="my-4 border-t" />
        <div>
          <table className="w-full table-auto border">
            <thead className="rounded-xl bg-light-gray">
              <tr className="text-base font-normal capitalize ">
                <th className="px-4 py-4 text-left">ID</th>
                <th className="px-4 py-4 text-left">Principal</th>
                <th className="px-4 py-4 text-left">Claimed</th>
                <th className="px-4 py-4 text-left">Username</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner, index) => (
                <tr key={index} className="my-12">
                  <td className="px-4 py-4 text-left font-normal">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 text-left font-normal">
                    {walletNameTrimmer(winner?.user?.address?.toString())}
                  </td>
                  <td className="px-4 py-4 text-left font-normal">
                    {winner.claimed ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-4 text-left font-normal">
                    {winner.user?.username || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading && (
            <div className=" my-3 flex items-center justify-center">
              <Loader2 className="animate-spin	" />
            </div>
          )}
          {/* Pagination */}
          <Pagination
            currentPage={pageNumber}
            pageSize={10}
            totalItems={100}
            onPageChange={setPageNumber}
            hideLegand={true}
          />
        </div>
      </div>
    </div>
  );
};

export default WinnerList;
