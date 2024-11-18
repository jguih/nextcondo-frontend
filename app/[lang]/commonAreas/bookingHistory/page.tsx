import { GoBackButton } from "@/src/components/header/go-back-button";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { AppSnackbarDispatcher } from "@/src/components/snackbar/dispatcher";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { ReservationsList } from "@/src/features/page/commonAreas/bookingHistory/components/reservationsList/server";
import {
  BottomNavigationBookingHistory,
  BottomNavigationCommonAreas,
} from "@/src/features/page/commonAreas/components/bottom-navigation";
import { WithLocale } from "@/src/types/with-locale";
import { FC } from "react";

const BookingHistoryPage: FC<WithLocale> = async ({ params: { lang } }) => {
  const d = await getDictionary(lang);

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
        <ReservationsList d={d} />
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
