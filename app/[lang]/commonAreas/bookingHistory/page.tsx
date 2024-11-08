import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { ListItem } from "@/src/components/list/items";
import { List } from "@/src/components/list/list";
import { AppSnackbarDispatcher } from "@/src/components/snackbar/dispatcher";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { ReservationItem } from "@/src/features/page/commonAreas/bookingHistory/components/reservationItem/reservation-item";
import {
  BottomNavigationBookingHistory,
  BottomNavigationCommonAreas,
} from "@/src/features/page/commonAreas/components/bottom-navigation";
import { CommonAreasService } from "@/src/services/nextcondo/commonAreas/server";
import { WithLocale } from "@/src/types/with-locale";
import { FC } from "react";

const BookingHistoryPage: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);
  const result = await CommonAreasService.GetReservationsAsync();
  const reservations =
    result.success && result.hasData ? result.response.data : [];

  return (
    <Layout.RootWithBottomNav>
      <AppSnackbarDispatcher position="top" />
      <Layout.Header>
        <Header
          actionButton={<GoBackButton path="/" />}
          title={d.page["commonAreas/bookingHistory"].title}
        />
      </Layout.Header>
      <Layout.Main>
        <List>
          {reservations.map((reservation) => (
            <ListItem key={reservation.id}>
              <ReservationItem reservation={reservation} lang={lang} />
              <hr />
            </ListItem>
          ))}
        </List>
      </Layout.Main>
      <Layout.BottomNavigation>
        <BottomNavigationCommonAreas label={d.bottom_nav.common_areas} />
        <BottomNavigationBookingHistory
          label={d.bottom_nav.booking_history}
          selected
        />
      </Layout.BottomNavigation>
    </Layout.RootWithBottomNav>
  );
};

export default BookingHistoryPage;
