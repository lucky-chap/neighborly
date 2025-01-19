import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

// find feedback for a community
export const list = query({
  args: {
    communityId: v.optional(v.id("community")),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const feedback = await ctx.db
      .query("feedback")
      .withIndex("communityId", (q) =>
        q.eq("communityId", args.communityId as Id<"community">)
      )
      .filter((q) => q.eq(q.field("communityId"), args.communityId))
      .order("desc")
      .paginate(args.paginationOpts);

    return feedback;
  },
});

// create a new feedback for a community
export const create = mutation({
  args: {
    communityId: v.id("community"),
    from: v.string(),
    type: v.string(),
    content: v.string(),
    status: v.string(),
    upvotes: v.number(),
  },
  handler: async (ctx, args) => {
    const feedback = await ctx.db.insert("feedback", args);
    return feedback;
  },
});
