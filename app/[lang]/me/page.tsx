import { Locale } from "@/i18n-config";
import { Avatar } from "@/src/components/avatar/avatar";
import { Layout } from "@/src/components/layout/layout";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { redirect } from "next/navigation";
import { FC } from "react";
import styles from "./styles.module.scss";
import { EditMeForm } from "@/src/features/page/me/components/form/server";

const MePage: FC<{ params: { lang: Locale } }> = async ({
  params: { lang },
}) => {
  const user = await UsersService.GetMeAsync();
  if (!user) {
    redirect("/login");
  }
  return (
    <Layout.Main>
      <div className={styles["avatar-container"]}>
        <Avatar name={user.fullName} size="profile" />
      </div>
      <hr />
      <EditMeForm lang={lang} className={styles["edit-me-form"]} />
    </Layout.Main>
  );
};

export default MePage;
