"use client";

import { SafeListing, SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import FavButton from "../FavButton";
import Button from "../Button";
import getListings from "@/app/actions/getListings";

interface ListingCardProps {
  data: Awaited<ReturnType<typeof getListings>>[number];
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  secondaryButton?: boolean;
  secondaryButtonLabel?: string;
  onSecondaryAction?: (id: string) => void;
  secondaryActionId?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
  secondaryButton = false,
  secondaryButtonLabel,
  onSecondaryAction,
  secondaryActionId = "",
}) => {
  const router = useRouter();
  const { location, title } = data;

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const handleSecondaryAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onSecondaryAction?.(secondaryActionId);
    },
    [onSecondaryAction, secondaryActionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing photo"
            src={data.imageSrc}
            className="object-cover w-full h-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 left-3">
            <FavButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">Gdańsk</div>
        <div className="font-light text-neutral-500">
          {reservationDate || title}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">${price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
        {secondaryButton && (
          <Button
            disabled={disabled}
            small
            label={secondaryButtonLabel || ""}
            onClick={handleSecondaryAction}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
