"use client";
import { HomeRounded, MessageRounded } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardProps,
  Chip,
  Link,
  Stack,
  StackProps,
  Typography,
} from "@mui/joy";
import { FC } from "react";

export const SectionsList: FC<StackProps> = (props) => {
  return <Stack gap={1} {...props} />;
};

const SectionCard: FC<CardProps> = (props) => {
  return (
    <Card
      {...props}
      sx={{ borderLeftStyle: "solid", borderLeftWidth: 4, ...props.sx }}
    />
  );
};

export const ResidentsSection: FC = () => {
  return (
    <SectionCard
      sx={{
        borderLeftColor: "success.400",
      }}
    >
      <CardContent orientation="horizontal" sx={{ alignItems: "center" }}>
        <HomeRounded sx={{ color: "success.400" }} />
        <Typography level="title-lg">
          <Typography level="h2">12</Typography> Moradores
        </Typography>
      </CardContent>
    </SectionCard>
  );
};

export const OccurrencesSection: FC = () => {
  return (
    <SectionCard
      sx={{
        borderLeftColor: "warning.400",
      }}
    >
      <CardContent orientation="horizontal" sx={{ alignItems: "center" }}>
        <MessageRounded sx={{ color: "warning.400" }} />
        <Typography level="title-lg">
          <Typography level="h2">43</Typography> Ocorrências
        </Typography>
      </CardContent>
      <CardContent>
        <Stack gap={2}>
          <Card variant="soft">
            <CardContent sx={{ gap: 2 }}>
              <Typography level="title-md" noWrap overflow={"hidden"}>
                Título da ocorrência
              </Typography>
              <Typography level="body-sm" noWrap overflow={"hidden"}>
                Descrição Descrição Descrição Descrição Descrição Descrição
                Descrição
              </Typography>
              <Stack direction={"row"} gap={1}>
                <Chip variant="soft" color="danger">
                  Manutenção
                </Chip>
                <Chip variant="plain" color="neutral">
                  Aberto
                </Chip>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"flex-end"}
              >
                <Stack direction={"row"} gap={1} alignItems={"center"}>
                  <Avatar size="sm" variant="solid" src="" />
                  <div>
                    <Typography level="body-xs">José</Typography>
                    <Typography level="body-xs">Guilherme</Typography>
                  </div>
                </Stack>
                <Typography level="body-xs">Criado • 12hrs atrás</Typography>
              </Stack>
            </CardContent>
          </Card>
          <Card variant="soft">
            <CardContent sx={{ gap: 2 }}>
              <Typography level="title-md" noWrap overflow={"hidden"}>
                Título da ocorrência
              </Typography>
              <Typography level="body-sm" noWrap overflow={"hidden"}>
                Descrição Descrição Descrição Descrição Descrição Descrição
                Descrição
              </Typography>
              <Stack direction={"row"} gap={1}>
                <Chip variant="soft" color="primary">
                  Geral
                </Chip>
                <Chip variant="plain" color="success">
                  Resolvido
                </Chip>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"flex-end"}
              >
                <Stack direction={"row"} gap={1} alignItems={"center"}>
                  <Avatar size="sm" variant="solid" src="" />
                  <div>
                    <Typography level="body-xs">José</Typography>
                    <Typography level="body-xs">Guilherme</Typography>
                  </div>
                </Stack>
                <Typography level="body-xs">Criado • 13hrs atrás</Typography>
              </Stack>
            </CardContent>
          </Card>
          <Card variant="soft">
            <CardContent sx={{ gap: 2 }}>
              <Typography level="title-md" noWrap overflow={"hidden"}>
                Título da ocorrência
              </Typography>
              <Typography level="body-sm" noWrap overflow={"hidden"}>
                Descrição Descrição Descrição Descrição Descrição Descrição
                Descrição
              </Typography>
              <Stack direction={"row"} gap={1}>
                <Chip variant="soft" color="warning">
                  Aviso
                </Chip>
                <Chip variant="plain" color="success">
                  Resolvido
                </Chip>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"flex-end"}
              >
                <Stack direction={"row"} gap={1} alignItems={"center"}>
                  <Avatar size="sm" variant="solid" src="" />
                  <div>
                    <Typography level="body-xs">José</Typography>
                    <Typography level="body-xs">Guilherme</Typography>
                  </div>
                </Stack>
                <Typography level="body-xs">Criado • 14hrs atrás</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </CardContent>
      <CardActions>
        <Link level="body-sm" sx={{ marginLeft: "auto" }}>
          Ver Mais
        </Link>
      </CardActions>
    </SectionCard>
  );
};
