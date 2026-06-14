"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductData {
  id?: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  priceUnit: string;
  description: string;
  features: string[];
  imageUrl: string;
  badge: string;
  featured: boolean;
}

const defaultProduct: ProductData = {
  name: "",
  slug: "",
  category: "DRONE",
  price: 0,
  priceUnit: "/day",
  description: "",
  features: [],
  imageUrl: "",
  badge: "",
  featured: false,
};

export default function ProductForm({ product }: { product?: ProductData }) {
  const router = useRouter();
  const [data, setData] = useState<ProductData>(product || defaultProduct);
  const [featureInput, setFeatureInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const isEdit = !!product?.id;

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleNameChange = (name: string) => {
    setData((d) => ({
      ...d,
      name,
      slug: isEdit ? d.slug : generateSlug(name),
    }));
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setData((d) => ({ ...d, features: [...d.features, featureInput.trim()] }));
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    setData((d) => ({
      ...d,
      features: d.features.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const json = await res.json();
    if (json.url) {
      setData((d) => ({ ...d, imageUrl: json.url }));
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const url = isEdit ? `/api/products/${product!.id}` : "/api/products";
    const method = isEdit ? "PATCH" : "POST";

    const { id, ...body } = data;
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSaving(false);
    router.push("/admin/products");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-xs text-text-mono uppercase tracking-wider block mb-1.5">
            Name
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full bg-surface border border-border-subtle px-4 py-2.5 text-sm text-white font-body rounded-sm focus:outline-none focus:border-accent"
            required
          />
        </div>
        <div>
          <label className="font-mono text-xs text-text-mono uppercase tracking-wider block mb-1.5">
            Slug
          </label>
          <input
            type="text"
            value={data.slug}
            onChange={(e) => setData((d) => ({ ...d, slug: e.target.value }))}
            className="w-full bg-surface border border-border-subtle px-4 py-2.5 text-sm text-white font-mono rounded-sm focus:outline-none focus:border-accent"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="font-mono text-xs text-text-mono uppercase tracking-wider block mb-1.5">
            Category
          </label>
          <select
            value={data.category}
            onChange={(e) => setData((d) => ({ ...d, category: e.target.value }))}
            className="w-full bg-surface border border-border-subtle px-4 py-2.5 text-sm text-white font-body rounded-sm focus:outline-none focus:border-accent"
          >
            <option value="DRONE">Drone</option>
            <option value="VEHICLE">Vehicle</option>
            <option value="AI_SYSTEM">AI System</option>
          </select>
        </div>
        <div>
          <label className="font-mono text-xs text-text-mono uppercase tracking-wider block mb-1.5">
            Price
          </label>
          <input
            type="number"
            value={data.price}
            onChange={(e) =>
              setData((d) => ({ ...d, price: parseFloat(e.target.value) || 0 }))
            }
            className="w-full bg-surface border border-border-subtle px-4 py-2.5 text-sm text-white font-mono rounded-sm focus:outline-none focus:border-accent"
            min={0}
            step={0.01}
          />
        </div>
        <div>
          <label className="font-mono text-xs text-text-mono uppercase tracking-wider block mb-1.5">
            Price Unit
          </label>
          <input
            type="text"
            value={data.priceUnit}
            onChange={(e) => setData((d) => ({ ...d, priceUnit: e.target.value }))}
            className="w-full bg-surface border border-border-subtle px-4 py-2.5 text-sm text-white font-mono rounded-sm focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="font-mono text-xs text-text-mono uppercase tracking-wider block mb-1.5">
          Description
        </label>
        <textarea
          value={data.description}
          onChange={(e) => setData((d) => ({ ...d, description: e.target.value }))}
          rows={3}
          className="w-full bg-surface border border-border-subtle px-4 py-2.5 text-sm text-white font-body rounded-sm focus:outline-none focus:border-accent resize-none"
        />
      </div>

      <div>
        <label className="font-mono text-xs text-text-mono uppercase tracking-wider block mb-1.5">
          Features
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
            className="flex-1 bg-surface border border-border-subtle px-4 py-2 text-sm text-white font-body rounded-sm focus:outline-none focus:border-accent"
            placeholder="Add feature..."
          />
          <button
            type="button"
            onClick={addFeature}
            className="px-4 py-2 bg-surface-raised border border-border-subtle text-sm text-white font-mono rounded-sm hover:bg-accent/20 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.features.map((f, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-accent/10 text-accent font-mono text-xs rounded flex items-center gap-2"
            >
              {f}
              <button
                type="button"
                onClick={() => removeFeature(i)}
                className="text-accent/60 hover:text-accent"
              >
                x
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-xs text-text-mono uppercase tracking-wider block mb-1.5">
            Badge
          </label>
          <input
            type="text"
            value={data.badge}
            onChange={(e) => setData((d) => ({ ...d, badge: e.target.value }))}
            className="w-full bg-surface border border-border-subtle px-4 py-2.5 text-sm text-white font-body rounded-sm focus:outline-none focus:border-accent"
            placeholder="e.g. New, AI-Powered"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.featured}
              onChange={(e) =>
                setData((d) => ({ ...d, featured: e.target.checked }))
              }
              className="w-4 h-4 accent-accent"
            />
            <span className="font-mono text-xs text-text-secondary uppercase tracking-wider">
              Featured
            </span>
          </label>
        </div>
      </div>

      <div>
        <label className="font-mono text-xs text-text-mono uppercase tracking-wider block mb-1.5">
          Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="text-sm text-text-secondary font-body"
        />
        {uploading && (
          <p className="text-xs text-accent font-mono mt-1">Uploading...</p>
        )}
        {data.imageUrl && (
          <div className="mt-2">
            <img
              src={data.imageUrl}
              alt="Preview"
              className="h-24 rounded border border-border-subtle object-cover"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-8 py-3 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white font-mono text-sm uppercase tracking-wider rounded-sm transition-colors"
      >
        {saving ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
}
