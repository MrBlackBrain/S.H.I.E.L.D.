import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const linkRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        url: z.string().url(),
        icon: z.string().url(),
        index: z.number(),
        description: z.string(),
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
          description: input.description,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.link.findMany({
      orderBy: { index: "desc" },
    });
  }),
});
