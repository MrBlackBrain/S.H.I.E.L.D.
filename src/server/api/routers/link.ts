import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const linkRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        url: z.string().url(),
        icon: z.string(),
        index: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call

      return ctx.db.link.create({
        data: {
          index: input.index,
          name: input.name,
          url: input.url,
          icon: input.icon,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.link.findMany({
      orderBy: { index: "desc" },
    });
  }),
});
