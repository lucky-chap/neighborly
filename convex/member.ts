import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

// check if a user is a member of any community at all
export const check = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const member = await ctx.db
      .query("member")
      .filter((q) => q.eq(q.field("email"), args.email))
      .unique();
    return member;
  },
});

// find members in a community
export const list = query({
  args: {
    communityId: v.optional(v.id("community")),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("member")
      .withIndex("communityId", (q) =>
        q.eq("communityId", args.communityId as Id<"community">)
      )
      .filter((q) => q.eq(q.field("communityId"), args.communityId))
      .order("desc")
      .paginate(args.paginationOpts);
    return members;
  },
});

// find unique member in a community
export const findOne = query({
  args: {
    email: v.string(),
    communityId: v.id("community"),
  },
  handler: async (ctx, args) => {
    const member = await ctx.db
      .query("member")
      .withIndex("email", (q) => q.eq("email", args.email))
      .filter((q) => q.eq(q.field("communityId"), args.communityId))
      .unique();
    return member;
  },
});

// add a new member to a community
export const add = mutation({
  args: {
    communityId: v.id("community"),
    name: v.optional(v.string()),
    email: v.string(),
    phone: v.optional(v.string()),
    image: v.optional(v.string()),
    role: v.optional(v.string()),
    occupation: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const member = await ctx.db.insert("member", args);
    return member;
  },
});
