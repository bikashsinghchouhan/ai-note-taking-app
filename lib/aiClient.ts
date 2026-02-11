import toast from "react-hot-toast";

type AIType = "summary" | "improve" | "tags";

export async function callAI(
  type: AIType,
  content: string
): Promise<string> {
  const toastId = toast.loading(
    type === "summary"
      ? "Generating summary..."
      : type === "improve"
      ? "Improving note..."
      : "Generating tags..."
  );

  try {
    const res = await fetch(`/api/ai/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) throw new Error("AI failed");

    const data = await res.json();

    toast.success("Done ✨", { id: toastId });

    // normalize response
    return (
      data.summary ||
      data.improved ||
      data.tags ||
      ""
    );
  } catch (err) {
    toast.error("AI processing failed ❌", { id: toastId });
    throw err;
  }
}
