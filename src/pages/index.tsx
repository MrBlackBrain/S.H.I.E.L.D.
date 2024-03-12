import Head from "next/head";
import { Search } from "~/components/search";
import { ThemeToggle } from "~/components/theme-toggle";
import { UserNav } from "~/components/user-nav";

import { api } from "~/utils/api";
import Board from "~/components/board";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function Home() {
  const links = api.link.getAll.useQuery();

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
              <Link href="/add">
                <Button variant="outline" size="icon">
                  <Plus className="h-6 w-6 cursor-pointer" />
                </Button>
              </Link>
              <ThemeToggle />
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="h-screen w-full ">
          {links.data && <Board links={links.data} />}
        </div>
      </div>
    </>
  );
}
