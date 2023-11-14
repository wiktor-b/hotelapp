"use client";

import Image from "next/image";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import FavButton from "../FavButton";

interface ListingHeadProps {
  title: string;
  location: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  location,
  imageSrc,
  id,
  currentUser,
}) => {
  return (
    <>
      <Heading title={location} />
      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <FavButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
