// import { api } from "@/convex/_generated/api";
// import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
// import { fetchQuery } from "convex/nextjs";

// import { UserMenu } from "@/components/UserMenu";
// import { Chat } from "@/app/product/Chat/Chat";
// import { ChatIntro } from "@/app/product/Chat/ChatIntro";

// export default async function ProductPage() {
//   const viewer = await fetchQuery(
//     api.users.viewer,
//     {},
//     { token: await convexAuthNextjsToken() }
//   );
//   console.log("Viewer on product page", viewer);
//   return (
//     <main className="flex max-h-screen grow flex-col overflow-hidden">
//       <div className="flex items-start justify-between border-b p-4">
//         <ChatIntro />
//         {viewer ? <UserMenu>{viewer.name}</UserMenu> : <div>Loading...</div>}
//       </div>
//       {viewer && <Chat viewer={viewer._id} />}
//     </main>
//   );
// }
