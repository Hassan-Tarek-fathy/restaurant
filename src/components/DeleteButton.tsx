"use client";

import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated" || !session?.user?.isAdmin) {
    return null;
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      toast.success("Product deleted successfully!");

      router.push("/menu");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="
        group
        flex items-center justify-center
        w-14 h-14
        rounded-full
        bg-gradient-to-br from-red-500 to-red-700
        shadow-lg shadow-red-500/30
        transition-all duration-300
        hover:scale-110
        hover:shadow-red-500/60
        active:scale-95
      "
      title="Delete Product"
    >
      <Trash2
        size={24}
        className="text-white transition-transform duration-300 group-hover:rotate-12"
      />
    </button>
  );
};

export default DeleteButton;