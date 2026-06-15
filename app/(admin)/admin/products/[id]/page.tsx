import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { id } = await params;

  // "new" is handled by the /new route
  if (id === "new") redirect("/admin/products/new");

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold text-white mb-8">
        Edit Product
      </h1>
      <ProductForm
        product={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          category: product.category,
          price: product.price,
          priceUnit: product.priceUnit,
          description: product.description || "",
          features: product.features,
          imageUrl: product.imageUrl,
          badge: product.badge || "",
          featured: product.featured,
        }}
      />
    </div>
  );
}
