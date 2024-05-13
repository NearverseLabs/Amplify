import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "../buttons/Button";
import Input from "@/pages/CreateCampaign/UI/input";

const CommentModal = ({
  isOpen,
  setIsOpen,
  tweetId,
  reply,
  tweet,
  setComment,
  setText,
  onClose,
  text,
  comment,
}: {
  reply: boolean;
  tweet: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  comment: string;
  onClose: any;
  tweetId: any;
}) => {
  const handleSubmit = () => {
    onClose();
  };

  const dialogClasses = isOpen
    ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded"
    : "hidden";

  return (
    <div className={`${dialogClasses} z-50 w-full max-w-lg shadow-xl`}>
      <p className="mb-6 text-lg font-medium">We need additional details</p>
      {tweet && (
        <textarea
          value={text}
          className={`w-full rounded border border-[#b3b3b3] min-[2560px]:rounded-xl min-[2560px]:py-4 min-[2560px]:text-4xl`}
          placeholder="Your Retweet text..."
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      )}
      {reply && (
        <textarea
          value={comment}
          className={`w-full rounded border border-[#b3b3b3] min-[2560px]:rounded-xl min-[2560px]:py-4 min-[2560px]:text-4xl`}
          placeholder="Your Tweet Comment..."
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      )}

      <Button className="mt-4" variant="dark" onClick={handleSubmit}>
        Save
      </Button>
      <X
        size={22}
        className="absolute right-0 top-0 m-4 cursor-pointer"
        onClick={() => setIsOpen(false)}
      />
    </div>
  );
};

export default CommentModal;
