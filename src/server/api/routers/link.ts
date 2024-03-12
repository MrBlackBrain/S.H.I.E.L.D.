import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const linkRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        url: z.string().url(),
        icon: z.string().url(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call

      return ctx.db.link.create({
        data: {
          index: 0,
          column: 0,
          name: input.name,
          url: input.url,
          icon: input.icon,
          description: input.description,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.link.findMany({
      orderBy: { index: "desc" },
    });
  }),

  reorder: publicProcedure
    .input(
      z.array(
        z.object({
          id: z.number(),
          index: z.number(),
          column: z.number(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      for (const link of input) {
        await ctx.db.link.update({
          where: { id: link.id },
          data: { index: link.index, column: link.column },
        });
      }
    }),

  seed: publicProcedure.mutation(async ({ ctx }) => {
    const linkData = [
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

    const data = await Promise.all(
      linkData.map((u) => ctx.db.link.create({ data: u })),
    );

    return data;
  }),
});
