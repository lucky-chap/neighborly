"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

export function NewFeedbackDialog() {
  const router = useRouter();
  const pathname = usePathname();
  const communityId = pathname.split("/")[2];
  const user = useQuery(api.users.viewer);
  const createNewFeedback = useMutation(api.feedback.create);
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState("");

  const handleAddNewFeedback = async () => {
    setLoading(true);
    try {
      const feedbackId = await createNewFeedback({
        communityId: communityId as Id<"community">,
        from: user?.name as string,
        type,
        content,
        status: "pending",
        upvotes: 1,
      });
      if (feedbackId != null) {
        setLoading(false);
        toast({
          variant: "default",
          title: "New feedback created.",
          description: "Your feedback was created successfully.",
        });
        setType("");
        setContent("");
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Your feedback was not created.",
        });
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Feedback creation failed.",
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-2 mt-5 block bg-indigo-600 px-3 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Add new feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new feedback</DialogTitle>
          <DialogDescription>
            Create a new feedback for this community
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="w-full">
            <Label htmlFor="email" className="">
              Type
            </Label>
            <Select value={type} onValueChange={(value) => setType(value)}>
              <SelectTrigger className="mt-2 w-full border-zinc-200 focus:ring-blue-500">
                <SelectValue placeholder="Select a feedback type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Feedback types</SelectLabel>
                  <SelectItem value="idea">Idea</SelectItem>
                  <SelectItem value="issue">Issue</SelectItem>
                  <SelectItem value="compliment">Compliment</SelectItem>
                  <SelectItem value="other">other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="mt-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea
                id="content"
                placeholder="Enter feedback content"
                className="col-span-3 mt-2"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={handleAddNewFeedback}
            className="block bg-indigo-600 px-3 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
