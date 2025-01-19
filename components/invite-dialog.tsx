"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { useToast } from "./ui/use-toast";

export default function InviteDialog({
  communityName,
  invitedByEmail,
  invitedByUsername,
  inviteLink,
}: {
  communityName: string;
  invitedByEmail: string;
  invitedByUsername: string;
  inviteLink: string;
}) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  // const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSendInvite = async () => {
    if (email.trim() === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email and role are required",
      });
      return;
    }
    setLoading(true);
    const res = await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        recipientEmail: email,
        recipientRole: "member",
        communityName,
        invitedByEmail,
        invitedByUsername,
        inviteLink,
      }),
    });

    if (res.ok) {
      setLoading(false);
      setEmail("");
      // setRole("");
      toast({
        title: "Success",
        description: "Invite sent successfully",
      });
    } else {
      console.error("Failed to send invite", await res.json());
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send invite",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add new member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite</DialogTitle>
          <DialogDescription>
            Invite a new member to your community
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col items-start">
          <div className="w-full">
            <Label htmlFor="email" className="">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          {/* <div className="mt-4 w-full">
            <Label htmlFor="email" className="">
              Role
            </Label>
            <Select value={role} onValueChange={(value) => setRole(value)}>
              <SelectTrigger className="w-full border-zinc-200 focus:ring-blue-500">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}
        </div>
        <DialogFooter className="w-full sm:justify-start">
          <Button
            type="button"
            disabled={loading}
            variant="secondary"
            className="w-full"
            onClick={handleSendInvite}
          >
            {loading ? "Sending invite..." : "Send invite"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
