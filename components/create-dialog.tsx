"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

import { Textarea } from "./ui/textarea";

export function CreateCommunityDialog() {
  const router = useRouter();
  const user = useQuery(api.users.viewer);
  const createNewCommunity = useMutation(api.community.create);
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState<File | null | undefined>(null);
  const [loading, setLoading] = useState(false);

  const handlePickLogo = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File change event", event.target.files?.[0]);
    const file = event.target.files?.[0];

    // Check if file exists
    if (!file) return;

    // Check file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setLogo(null);
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please select only JPGs, JPEGs or PNGs for profile image",
      });

      return;
    }

    // Check file size (2MB = 2 * 1024 * 1024 bytes)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      setLogo(null);
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please select a file smaller than 6MB",
      });

      return;
    }
    setLogo(file);
  };

  const handleCreateNewCommunity = async () => {
    setLoading(true);
    let url;
    try {
      // if (logo instanceof File) {
      // upload user profile image
      const formData = new FormData();
      if (logo instanceof File) {
        formData.append("file", logo);
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          toast({
            variant: "destructive",
            title: "File upload failed",
            description: "File could not be uploaded",
          });
        }
        const data = await response.json();
        url = data.url;
      } else {
        url = null;
      }

      const communityId = await createNewCommunity({
        name: name,
        leader: user?._id as Id<"users">,
        description: description,
        logoUrl: url,
      });
      if (communityId != null) {
        setLoading(false);
        toast({
          variant: "default",
          title: "New community created.",
          description: "Find it in /dashboard",
        });
        router.push("/dashboard");
        setName("");
        setDescription("");
        setLogo(null);
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Your community was not created.",
        });
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Project creation failed.",
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn("mt-4", "w-full shadow-sm active:shadow-none")}
        >
          <Plus className="h-5 w-5" />
          Create community
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new community</DialogTitle>
          <DialogDescription>
            Create a new community to manage
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3 mt-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              className="col-span-3 mt-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="">
            <Label htmlFor="logo" className="text-right">
              Logo
            </Label>

            <div className="mt-2 flex w-full items-center justify-center">
              <label
                htmlFor="dropzone-file"
                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:bg-gray-800"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 2MB)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/png,image/jpg,image/jpeg"
                  onChange={handlePickLogo}
                />
              </label>
            </div>
            {logo && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(logo)}
                  alt="Community logo"
                  className="h-16 w-16 rounded-lg object-cover"
                />
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={handleCreateNewCommunity}
            className="block bg-indigo-600 px-3 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
