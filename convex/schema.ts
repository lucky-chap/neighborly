import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
export default defineSchema({
  ...authTables,
  member: defineTable({
    communityId: v.id("community"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    image: v.optional(v.string()),
    role: v.optional(v.string()), // member or moderator
    occupation: v.optional(v.string()),
  })
    .index("email", ["email"])
    .index("communityId", ["communityId"]),
  community: defineTable({
    name: v.string(),
    description: v.string(),
    leader: v.id("users"),
    logoUrl: v.optional(v.string()),
  })
    .index("leader", ["leader"])
    .searchIndex("search_name", {
      // https://docs.convex.dev/search/text-search
      searchField: "name",
    }),
  feedback: defineTable({
    communityId: v.id("community"),
    from: v.string(),
    type: v.string(), // issue, idea, compliment, other
    content: v.string(),
    status: v.string(), // pending or resloved
    upvotes: v.optional(v.number()), // remove
  })
    .index("communityId", ["communityId"])
    .index("status", ["status"]),
  invite: defineTable({
    senderEmail: v.string(),
    recipientEmail: v.string(),
    recipientRole: v.string(),
    communityId: v.id("community"),
  }).index("recipient", ["recipientEmail"]),
});
