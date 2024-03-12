import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const linkData: Prisma.LinkCreateInput[] = [
  {
    index: 0,
    column: 0,
    name: "Sonarr",
    description: "Test",
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/sonarr.svg",
    url: "https://sonarr.karabeyin.com",
  },
  {
    index: 1,
    column: 0,
    name: "Radarr",
    description: "Test",
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/radarr.svg",
    url: "https://radarr.karabeyin.com",
  },
  {
    index: 2,
    column: 0,
    name: "Prowlarr",
    description: "Test",
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/prowlarr.svg",
    url: "https://prowlarr.karabeyin.com",
  },
  {
    index: 3,
    column: 0,
    name: "Plex",
    description: "Test",
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/plex.svg",
    url: "https://plex.karabeyin.com",
  },
  {
    index: 4,
    column: 0,
    name: "Jellyfin",
    description: "Test",
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/jellfin.svg",
    url: "https://jellfin.karabeyin.com",
  },
];

async function main() {
  console.log(`Start seeding ...`);

  const data = await Promise.all(
    linkData.map((u) => prisma.link.create({ data: u })),
  );

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
