import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

// import { checkUserId } from "./helpers";

export const searchcommunity = query({
  args: {
    searchTerm: v.string(),
    paginationOpts: paginationOptsValidator,
    userId: v.any(),
  },
  handler: async (ctx, args) => {
    const searchResults = await ctx.db
      .query("community")
      .withSearchIndex("search_name", (q) => q.search("name", args.searchTerm))
      .filter((q) => q.eq(q.field("leader"), args.userId))
      .paginate(args.paginationOpts);

    return searchResults;
  },
});

// find one community where the current user is the leader
export const find = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const community = await ctx.db
      .query("community")
      .withIndex("leader", (q) => q.eq("leader", args.userId))
      .filter((q) => q.eq(q.field("leader"), args.userId))
      .order("desc")
      .take(1);

    return community;
  },
});

// fetch single community by id
export const findOne = query({
  args: {
    id: v.optional(v.id("community")),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    if (!id) return null;
    const community = await ctx.db.get(id);
    return community;
  },
});

// Create a new community
export const create = mutation({
  args: {
    name: v.string(),
    leader: v.id("users"),
    description: v.string(),
    logoUrl: v.string(),
  },
  handler: async (ctx, { name, leader, description, logoUrl }) => {
    const communityId = await ctx.db.insert("community", {
      name,
      leader,
      description,
      logoUrl,
    });

    return communityId;
  },
});

// Update an community
export const updateCommunity = mutation({
  args: {
    communityId: v.id("community"),
    name: v.string(),
    description: v.string(),
    logoUrl: v.string(),
  },
  handler: async (ctx, { communityId, name, description, logoUrl }) => {
    await ctx.db.patch(communityId, {
      name,
      description,
      logoUrl,
    });
    return "updated";
  },
});

// Delete a community & all of its feedback
export const deletecommunity = mutation({
  args: {
    communityId: v.id("community"),
  },
  handler: async (ctx, args) => {
    const deletedcommunity = await ctx.db.delete(args.communityId);
    return deletedcommunity;
  },
});
