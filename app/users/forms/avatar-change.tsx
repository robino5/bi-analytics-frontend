"use client";

import { Input } from "@/components/ui/input";
import { IUser } from "@/types/user";
import { Session } from "next-auth";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  user: IUser;
  session: Session;
}

export function ChangeProfileImageForm({ user, session }: Props) {
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const { register } = useForm({
    defaultValues: {
      image: user.profile.image,
    },
  });

  function handleChange(e: FormEvent<HTMLInputElement>) {
    const files = e.currentTarget.files;

    if (!files || files.length === 0) {
      return; // No file selected
    }

    const file = files[0]; // Assuming only single file selection

    const formData = new FormData();
    formData.append("image", file);

    fetch(
      `${process.env.NEXT_PUBLIC_V1_APIURL}/auth/profiles/${user.username}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: formData,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Upload failed");
        }
        // TODO: Show Sonner here
        console.log("Upload successful");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  }
  // Function to handle loading of existing image
  const handleImageLoad = () => {
    // Fetch existing image from server (replace with actual fetch logic)
    const profileImage = user.profile.image;
    profileImage && setExistingImage(profileImage);
  };
  return (
    <div className="w-full">
      {/* Existing image */}
      {existingImage && (
        <img
          src={existingImage}
          alt="Existing Profile"
          onLoad={handleImageLoad}
          onLoadCapture={handleImageLoad}
        />
      )}
      <Input
        {...register("image")}
        type="file"
        multiple={false}
        onChange={handleChange}
      />
    </div>
  );
}
