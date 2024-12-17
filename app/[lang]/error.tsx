"use client";
import { Header } from "@/src/components/header/header";
import { Layout } from "@/src/components/layout/layout";
import { Link } from "@/src/components/link/link";
import { Typography } from "@/src/components/typography/typography";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <Layout.Root>
      <Layout.Header>
        <Header title={"error"} />
      </Layout.Header>
      <Layout.Main>
        <br />
        <Typography color="danger">{error.message}</Typography>
        <br />
        <Link href={"/"} variant="solid" color="primary">
          Try again
        </Link>
      </Layout.Main>
    </Layout.Root>
  );
}
