"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Option = {
  title: string;
  additionalPrice: number;
};

type Inputs = {
  title: string;
  desc: string;
  img: string;
  catSlug: string;
  price: string;
};

type Category = {
  id: number;
  title: string;
  slug: string;
};

const AddProductPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    img: "",
    catSlug: "",
    price: "",
  });

  const [isFeatured, setIsFeatured] = useState(false);

  const [optionInput, setOptionInput] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();

  const [categories, setCategories] = useState<Category[]>([]);

  // جلب الكاتيجوريز
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");

        if (!res.ok) throw new Error("Failed to fetch categories");

        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  // حماية الصفحة
  if (status === "loading") return <p>Loading...</p>;

  if (status === "unauthenticated" || !session?.user?.isAdmin) {
    router.push("/");
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "price"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionInput((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "additionalPrice"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const addOption = () => {
  if (!optionInput.title.trim()) {
    toast.error("Enter option title");
    return;
  }

  if (!optionInput.additionalPrice && optionInput.additionalPrice !== 0) {
    toast.error("Price is required");
    return;
  }

  if (optionInput.additionalPrice <= 0) {
    toast.error("Price must be greater than 0");
    return;
  }

  setOptions((prev) => [...prev, optionInput]);

  setOptionInput({
    title: "",
    additionalPrice: 0,
  });
};

  const removeOption = (index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  };

  const upload = async () => {
    if (!file) return "";

    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", "BossBurger");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/g1kckxqw/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    if (!res.ok) {
      throw new Error("Cloudinary upload failed");
    }

    const result = await res.json();
    return result.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.price || Number(inputs.price) <= 0) {
  toast.error("Price is required and must be greater than 0");
  return;
}

    try {
      setLoading(true);

      const imageUrl = await upload();

      const product = {
        ...inputs,
        price: Number(inputs.price),
        img: imageUrl,
        isFeatured,
        options,
      };

      const res = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to add product");
      }

      toast.success("Product added successfully!");

      setInputs({
        title: "",
        desc: "",
        img: "",
        catSlug: "",
        price: "",
      });

      setOptions([]);
      setOptionInput({ title: "", additionalPrice: 0 });
      setIsFeatured(false);
      setFile(undefined);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-zinc-950 flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10">

        <div className="mb-10 text-center">
          <PlusCircle className="mx-auto mb-4 text-yellow-500" size={55} />

          <h1 className="text-4xl font-black text-white">
            Add New Product
          </h1>

          <p className="mt-3 text-zinc-400">
            Create a new burger, pizza or drink.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            value={inputs.title}
            onChange={handleInputChange}
            name="title"
            placeholder="Product Name"
            required
            className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none"
          />

          <textarea
            value={inputs.desc}
            onChange={handleInputChange}
            name="desc"
            placeholder="Description"
            required
            rows={4}
            className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none resize-none"
          />

          <input
            onChange={handleChangeImage}
            type="file"
            className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none"
          />

          <div className="grid md:grid-cols-2 gap-5">
            <input
            value={inputs.price}
            onChange={handleInputChange}
            type="number"
            name="price"
            placeholder="Base Price"
            required
            min={1}
            className="rounded-xl bg-zinc-800 p-4 text-white outline-none"
          />

            {/* CATEGORY DROPDOWN */}
            <select
              name="catSlug"
              value={inputs.catSlug}
              onChange={handleInputChange}
              required
              className="rounded-xl bg-zinc-800 p-4 text-white outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          {/* OPTIONS */}
         {/* OPTIONS */}
<div className="rounded-2xl border border-zinc-700 p-5">
  <h2 className="mb-4 text-xl font-bold text-white">
    Product Options
  </h2>

  <div className="grid md:grid-cols-3 gap-4">

    {/* SIZE SELECT */}
    <select
      value={optionInput.title}
      onChange={(e) =>
        setOptionInput((prev) => ({
          ...prev,
          title: e.target.value,
        }))
      }
      className="rounded-xl bg-zinc-800 p-4 text-white outline-none"
    >
      <option value="">Select Size</option>
      <option value="Small">Small</option>
      <option value="Medium">Medium</option>
      <option value="Large">Large</option>
      <option value="Family Size">Family Size</option>
    </select>

    {/* PRICE */}
    <input
      value={optionInput.additionalPrice}
      onChange={handleOptionChange}
      name="additionalPrice"
      type="number"
      placeholder="Additional Price"
      className="rounded-xl bg-zinc-800 p-4 text-white outline-none"
    />

    {/* ADD BUTTON */}
    <button
      type="button"
      onClick={() => {
        if (!optionInput.title) {
          toast.error("Select size first");
          return;
        }

        const exists = options.some(
          (o) => o.title === optionInput.title
        );

        if (exists) {
          toast.error("This size already exists");
          return;
        }

        setOptions((prev) => [...prev, optionInput]);

        setOptionInput({
          title: "",
          additionalPrice: 0,
        });
      }}
      disabled={!optionInput.title}
      className="rounded-xl bg-yellow-500 font-bold text-black hover:bg-yellow-400 disabled:opacity-40"
    >
      Add Option
    </button>
  </div>

  {/* OPTIONS LIST */}
  <div className="mt-6 space-y-3">
    {options.map((option, index) => (
      <div
        key={index}
        className="flex items-center justify-between rounded-xl bg-zinc-800 p-4"
      >
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-yellow-500 px-3 py-1 text-black text-sm font-bold">
            {option.title}
          </span>

          <span className="text-white">
            +${option.additionalPrice}
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            setOptions((prev) =>
              prev.filter((_, i) => i !== index)
            )
          }
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    ))}
  </div>
</div>

          {/* FEATURED */}
          <div className="flex items-center gap-3">
            <input
              id="featured"
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-5 w-5 accent-yellow-500"
            />

            <label htmlFor="featured" className="text-white">
              Featured Product
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-yellow-500 py-4 font-bold text-black hover:bg-yellow-400 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Submit"}
          </button>

        </form>

      </div>
    </section>
  );
};

export default AddProductPage;