import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const [productCount, heroCount, recentProducts] = await Promise.all([
    prisma.product.count(),
    prisma.heroSlide.count({ where: { active: true } }),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const stats = [
    { label: "Total Products", value: productCount },
    { label: "Active Hero Slides", value: heroCount },
    { label: "Featured", value: await prisma.product.count({ where: { featured: true } }) },
  ];

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-raised border border-border-subtle rounded-lg p-6"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-text-mono mb-2">
              {stat.label}
            </div>
            <div className="font-display text-4xl font-bold text-white">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-display text-xl font-semibold text-white mb-4">
        Recent Products
      </h2>
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
            </tr>
          </thead>
          <tbody>
            {recentProducts.map((product) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
