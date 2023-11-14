"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import Heading from "../Heading";

interface ListingInfoProps {
  title: string;
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  title,
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Heading title={title} />
        <hr />
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        ></div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>

      <div
        className="
      text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <hr />
    </div>
  );
};

export default ListingInfo;
