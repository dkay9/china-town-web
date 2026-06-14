import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold text-white mb-8">
        New Product
      </h1>
      <ProductForm />
    </div>
  );
}
