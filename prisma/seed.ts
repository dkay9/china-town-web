import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);

  await prisma.user.upsert({
    where: { email: "admin@ctown.dev" },
    update: {},
    create: {
      email: "admin@ctown.dev",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const products = [
    {
      name: "Phantom X1",
      slug: "phantom-x1",
      category: "DRONE" as const,
      price: 250,
      priceUnit: "/day",
      description: "Professional-grade surveillance drone with 8K camera and 45-minute flight time.",
      features: ["8K Camera", "45min Flight", "AI Tracking", "Night Vision"],
      imageUrl: "/assets/drone-1.jpg",
      badge: "New",
      featured: true,
      order: 0,
    },
    {
      name: "Recon Sentinel",
      slug: "recon-sentinel",
      category: "DRONE" as const,
      price: 180,
      priceUnit: "/day",
      description: "Compact reconnaissance drone with stealth mode and obstacle avoidance.",
      features: ["4K Camera", "Stealth Mode", "Obstacle Avoidance", "GPS Lock"],
      imageUrl: "/assets/drone-2.jpg",
      badge: "AI-Powered",
      featured: true,
      order: 1,
    },
    {
      name: "Cargo Hauler V2",
      slug: "cargo-hauler-v2",
      category: "VEHICLE" as const,
      price: 320,
      priceUnit: "/day",
      description: "Heavy-lift autonomous vehicle for logistics and cargo delivery.",
      features: ["500kg Payload", "Autonomous Nav", "All-Terrain", "Fleet Ready"],
      imageUrl: "/assets/vehicle-1.jpg",
      featured: true,
      order: 2,
    },
    {
      name: "Neural Cortex AI",
      slug: "neural-cortex-ai",
      category: "AI_SYSTEM" as const,
      price: 450,
      priceUnit: "/day",
      description: "Enterprise AI system for fleet management and predictive analytics.",
      features: ["Fleet Management", "Predictive Analytics", "Real-time Telemetry", "API Access"],
      imageUrl: "/assets/ai-system-1.jpg",
      badge: "Enterprise",
      featured: true,
      order: 3,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  await prisma.heroSlide.deleteMany();
  await prisma.heroSlide.create({
    data: {
      headline: "Precision Beyond Horizon",
      subheadline: "AI-powered drones and autonomous vehicles for the next frontier",
      ctaLabel: "Explore Fleet",
      ctaHref: "#featured",
      imageUrl: "/assets/hero-bg.jpg",
      order: 0,
      active: true,
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
