"use client";
import { Clock3, CheckCircle2, ChefHat, Edit } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderType } from "@/types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";




const statusStyle = (status: string) => {
  switch (status) {
    case "Delivered":
      return {
        color: "text-green-400",
        bg: "bg-green-500/10",
        icon: <CheckCircle2 size={18} />,
      };

    case "Preparing":
      return {
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        icon: <ChefHat size={18} />,
      };

    default:
      return {
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        icon: <Clock3 size={18} />,
      };
  }
};

const OrdersPage = () => {
  const [openedOrder, setOpenedOrder] = useState<string | null>(null);
  const {data:session,status} = useSession();
  const router = useRouter();
  if (status==="unauthenticated") {
    router.push("/");
  }
  const { data, isLoading, error } = useQuery<OrderType[]>({
    queryKey: ["orders"],
    queryFn: () => fetch(`/api/orders`).then((res) => res.json()),
  });

     const queryClient = useQueryClient();

  if (error) return <h1>Error</h1>;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mutation = useMutation({
  mutationFn: async ({
    id,
    status,
  }: {
    id: string;
    status: string;
  }) => {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      throw new Error("Failed to update order");
    }

    return status;
  },

  onSuccess: (status) => {
    queryClient.invalidateQueries({
      queryKey: ["orders"],
    });

    switch (status) {
      case "Delivered":
        toast.success("✅ Order has been delivered successfully!");
        break;

      case "Preparing":
        toast.info("👨‍🍳 Order is now preparing.");
        break;

      case "On the way":
        toast.warning("🚚 Order is on the way.");
        break;

      default:
        toast.success("Order updated successfully!");
    }
  },

  onError: (error) => {
    toast.error(`❌ ${error.message}`);
  },
});
  const handleUpdate = (
  e: React.FormEvent<HTMLFormElement>,
  orderId: string
) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const status = formData.get("status") as string;

  mutation.mutate({
    id: orderId,
    status,
  });
};

  if (isLoading || status === "loading") return <h1>Loading...</h1>;

  return (
    <section className="min-h-[calc(100vh-6rem)] bg-zinc-950 py-16 px-6 lg:px-20">
      {/* Header */}
      <div className="mb-12">
        <p className="uppercase tracking-[5px] text-yellow-500 text-sm">
          Boss Burger
        </p>

        <h1 className="mt-3 text-5xl font-black text-white">
          My Orders
        </h1>

        <p className="mt-4 text-zinc-400 max-w-2xl">
          Track your latest orders and view your order history.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-3xl border border-zinc-800 bg-zinc-900">
        <table className="w-full min-w-[900px]">
          <thead className="bg-zinc-800 text-zinc-300">
            <tr>
              <th className="px-8 py-5 text-left">Order ID</th>
              <th className="px-8 py-5 text-left">Date</th>
              <th className="px-8 py-5 text-left">Products</th>
              <th className="px-8 py-5 text-left">Total</th>
              <th className="px-8 py-5 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item : OrderType) => {
              const style = statusStyle(item.status);

              return (
                <tr
                  key={item.id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
                >
                  <td className="px-8 py-6 font-semibold text-yellow-500">
                    {item.id}
                  </td>

                  <td className="px-8 py-6 text-zinc-300">
                    {item.createdAt.toString().slice(0, 10)}
                  </td>

                <td className="px-8 py-6">
  <div className="w-72">
    <button
      onClick={() =>
        setOpenedOrder(
          openedOrder === item.id ? null : item.id
        )
      }
      className="flex w-full items-center justify-between rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white transition hover:border-yellow-500"
    >
      <span>
        {item.products.length} Product
        {item.products.length > 1 && "s"}
      </span>

      {openedOrder === item.id ? (
        <ChevronUp size={18} />
      ) : (
        <ChevronDown size={18} />
      )}
    </button>

    {openedOrder === item.id && (
      <div className="mt-3 space-y-3 rounded-2xl border border-zinc-700 bg-zinc-900 p-4">
        {item.products.map((product: any, index: number) => (
          <div
            key={index}
            className="rounded-xl bg-zinc-800 p-4"
          >
            <h3 className="font-bold text-white">
              {product.title}
            </h3>

            <div className="mt-2 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-400">
                Qty: {product.quantity}
              </span>

              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-blue-400">
                {product.optionTitle?.length
                  ? product.optionTitle
                      .map((o: any) => o.title)
                      .join(", ")
                  : "Standard"}
              </span>
            </div>

            <p className="mt-3 font-bold text-yellow-500">
              ${(product.price * product.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
</td>
                  <td className="px-8 py-6 text-white font-bold">
                    {item.price}
                  </td>
<td className="px-8 py-6">
  {session?.user?.isAdmin ? (
   <form
  className="flex items-center gap-3"
  onSubmit={(e) => handleUpdate(e, item.id)}
>
      <select
        name="status"
        defaultValue={item.status}
        className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-white focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        <option value="Preparing">Preparing</option>
        <option value="On the way">On the way</option>
        <option value="Delivered">Delivered</option>
      </select>

      <button
  type="submit"
  disabled={mutation.isPending}
  className="rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-50"
>
  {mutation.isPending ? "Saving..." : "Save"}
</button>
    </form>
  ) : (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${style.bg} ${style.color}`}
    >
      {style.icon}
      {item.status}
    </span>
  )}
</td>
                 
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrdersPage;