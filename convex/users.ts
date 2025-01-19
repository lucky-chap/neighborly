import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { query } from "./_generated/server";
import { auth } from "./auth";

// export const viewer = query({
//   args: {},
//   handler: async (ctx) => {
//     const userId = await getAuthUserId(ctx);
//     if (userId === null) {
//       return null;
//     }
//     const user = await ctx.db.get(userId);
//     if (user === null) {
//       return null;
//     }
//     return user;
//   },
// });

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    // TODO: update to current API
    const userId = await auth.getUserId(ctx);
    return userId !== null ? ctx.db.get(userId) : null;
  },
});

export const getUser = query({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id);
  },
});
