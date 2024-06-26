import { organizationRouter } from "~/server/api/routers/organization";
import { membershipRouter } from "~/server/api/routers/membership";
import { inviteRouter } from "~/server/api/routers/invite";
import { userRouter } from "~/server/api/routers/user";
import { dealRouter } from "~/server/api/routers/deal";
import { commentRouter } from "~/server/api/routers/comment";
import { notificationRouter } from "~/server/api/routers/notification";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  organization: organizationRouter,
  membership: membershipRouter,
  invite: inviteRouter,
  user: userRouter,
  deal: dealRouter,
  comment: commentRouter,
  notification: notificationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
