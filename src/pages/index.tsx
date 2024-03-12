import Head from "next/head";
import Link from "next/link";
import { Search } from "~/components/search";
import { ThemeToggle } from "~/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { UserNav } from "~/components/user-nav";

import { api } from "~/utils/api";
import { Reorder } from "framer-motion";
import { useState } from "react";

const LinkItem = ({
  link,
}: {
  link: {
    icon: string | undefined;
    id: number;
    url: string;
    name: string;
    description: string;
  };
}) => {
  return (
    <Card className="">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle>
            <Link href={link.url} passHref>
              {link.name}
            </Link>
          </CardTitle>
          <CardDescription>{link.description}</CardDescription>
        </div>
        <div className="flex">
          <img src={link.icon} className="h-16 w-16" />
        </div>
      </CardHeader>
    </Card>
  );
};

export default function Home() {
  const links = api.link.getAll.useQuery();

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Sonarr",
      url: "https://google.com",
      description: "Test",
      icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/sonarr.svg",
    },
    {
      id: 2,
      name: "Radarr",
      url: "https://google.com",
      description: "Test",
      icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/radarr.svg",
    },
    {
      id: 3,
      name: "Prowlarr",
      url: "https://google.com",
      description: "Test",
      icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/prowlarr.svg",
    },
    {
      id: 4,
      name: "Plex",
      url: "https://google.com",
      description: "Test",
      icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/plex.svg",
    },
    {
      id: 5,
      name: "Plex",
      url: "https://google.com",
      description: "Test",
      icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/plex.svg",
    },
  ]);

  return (
    <>
      <Head>
        <title>S.H.I.E.L.D.</title>
        <meta
          name="description"
          content="Self-Hosted Information and Entry Linking Dashboard"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                S.H.I.E.L.D.
              </h2>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <ThemeToggle />
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Reorder.Group
            axis="y"
            className="grid grid-rows-4 gap-4"
            values={items}
            onReorder={setItems}
          >
            {items.map((item) => (
              <Reorder.Item key={item.id} value={item}>
                <LinkItem link={item} />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </div>
    </>
  );
}
