"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductActions({ productId }: { productId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Delete this product?")) return;

    await fetch(`/api/products/${productId}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <Link
        href={`/admin/products/${productId}`}
        className="px-3 py-1 text-xs font-mono text-accent hover:text-accent-hover transition-colors"
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        className="px-3 py-1 text-xs font-mono text-red-400 hover:text-red-300 transition-colors"
      >
        Delete
      </button>
    </div>
  );
}
