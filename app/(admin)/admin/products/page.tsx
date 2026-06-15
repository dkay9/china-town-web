import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import ProductActions from "@/components/admin/ProductActions";

export default async function ProductsPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const products = await prisma.product.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-white">Products</h1>
        <Link
          href="/admin/products/new"
          className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-mono text-xs uppercase tracking-wider rounded-sm transition-colors"
        >
          Add Product
        </Link>
      </div>

      <div className="bg-surface-raised border border-border-subtle rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-text-mono">
                Name
              </th>
              <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-text-mono">
                Category
              </th>
              <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-text-mono">
                Price
              </th>
              <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-text-mono">
                Featured
              </th>
              <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-text-mono">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-border-subtle last:border-0"
              >
                <td className="px-4 py-3 text-sm text-white font-body">
                  {product.name}
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-accent/10 text-accent font-mono text-[10px] uppercase tracking-wider rounded">
                    {product.category.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary font-mono">
                  ${product.price}{product.priceUnit}
                </td>
                <td className="px-4 py-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      product.featured ? "bg-green-500" : "bg-text-mono"
                    }`}
                  />
                </td>
                <td className="px-4 py-3">
                  <ProductActions productId={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
