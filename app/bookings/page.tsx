import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import BookingsClient from "./BookingsClient";

const BookingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="You aren't signed in" />;
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return <EmptyState title="You have no reservations" />;
  }

  return (
    <div>
      <BookingsClient reservations={reservations} currentUser={currentUser} />
    </div>
  );
};

export default BookingsPage;
