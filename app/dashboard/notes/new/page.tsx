"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewNotePage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/dashboard/notes");
    } else {
      alert("Failed to create note");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl space-y-4"
    >
      <h1 className="text-2xl font-bold">Create Note</h1>

      <Input placeholder="Title" {...register("title")} />
      <Textarea
        placeholder="Write your note..."
        rows={6}
        {...register("content")}
      />

      <Button type="submit">Save Note</Button>
    </form>
  );
}
