"use server";

import { Session } from "@supabase/supabase-js";
import { fetchNextCondoApi } from "./utils";
import { EditUser } from "./user.types";

export const registerUser = async (session: Session, user: EditUser) => {
  const token = session.access_token;

  return await fetchNextCondoApi({
    endpoint: "Users",
    token,
    body: user,
    options: {
      method: "PUT",
    },
  });
};
