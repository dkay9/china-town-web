export interface ProductData {
  id: string;
  name: string;
  year: string;
  category: string;
  slug: string;
  shortDescription: string;
  image: string;
  specs: Record<string, string>;
  features: string[];
}

const unsplashUrl = (id: string, q = 85) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=${q}`;

export const products: ProductData[] = [
  {
    id: "1",
    name: "Apex Neural Drive",
    year: "2024",
    category: "Performance AI System",
    slug: "apex-neural-drive",
    shortDescription:
      "Real-time vehicle dynamics AI. Processes 2,000 sensor inputs per second for adaptive torque vectoring and predictive suspension.",
    image: unsplashUrl("photo-1503376780353-7e6692767b70"),
    specs: {
      "Processing Speed": "2,000 inputs/sec",
      Latency: "0.3ms",
      Compatibility: "All EV platforms",
      Integration: "CAN bus + OBD-II",
      "AI Model": "Edge neural network",
      Certifications: "ISO 26262 ASIL-D",
    },
    features: [
      "Predictive torque vectoring across all four wheels independently",
      "Adaptive suspension tuning updated 500 times per second",
      "Driver behaviour learning — personalises over 30 driving sessions",
      "Crash prediction and pre-tensioner activation 180ms before impact",
      "Over-the-air model updates with rollback protection",
    ],
  },
  {
    id: "2",
    name: "Vantage Vision Pro",
    year: "2024",
    category: "Autonomous Vision",
    slug: "vantage-vision-pro",
    shortDescription:
      "Multi-spectrum ADAS camera array with onboard AI inference. 360° object detection at 120fps in all lighting conditions.",
    image: unsplashUrl("photo-1544636331-e26879cd4d9b"),
    specs: {
      Cameras: "12 × 8MP sensors",
      "Frame Rate": "120fps",
      Range: "280m forward, 80m lateral",
      "Night Vision": "Active IR + thermal",
      "AI Chip": "Custom 45 TOPS NPU",
      Standards: "SAE Level 3 capable",
    },
    features: [
      "360° semantic segmentation — identifies 247 object classes",
      "Dual-mode night vision: active infrared and thermal overlay",
      "Lane-level HD map fusion with real-time deviation alerts",
      "Pedestrian trajectory prediction 3.5 seconds ahead",
      "Redundant fail-safe with sub-50ms hardware fallback",
    ],
  },
  {
    id: "3",
    name: "Cortex Fleet OS",
    year: "2023",
    category: "Fleet Intelligence",
    slug: "cortex-fleet-os",
    shortDescription:
      "Cloud-native AI operating system for vehicle fleets. Unified telemetry, predictive maintenance, and route optimisation at scale.",
    image: unsplashUrl("photo-1568605117036-5fe5e7bab0b7"),
    specs: {
      "Fleet Size": "Up to 50,000 vehicles",
      "Data Latency": "<200ms global",
      "Uptime SLA": "99.97%",
      Integrations: "SAP, Salesforce, OEM APIs",
      Deployment: "Cloud + on-premise hybrid",
      Compliance: "ISO 27001, SOC 2 Type II",
    },
    features: [
      "Predictive maintenance — flags component failure 14 days in advance",
      "AI route optimisation reducing fleet fuel consumption by up to 23%",
      "Live video telemetry with edge-compressed streaming",
      "Driver scoring and coaching integrated into fleet dashboard",
      "Geofencing with automated policy enforcement per zone",
    ],
  },
  {
    id: "4",
    name: "Kinetic Ride Control",
    year: "2024",
    category: "Active Suspension AI",
    slug: "kinetic-ride-control",
    shortDescription:
      "Electromagnetic active suspension with terrain-predictive AI. Road surface scanned 25 metres ahead using forward lidar.",
    image: unsplashUrl("photo-1494976388531-d1058494cdd8"),
    specs: {
      "Scan Range": "25m forward",
      Sensor: "Solid-state LiDAR",
      "Response Time": "2ms per corner",
      "G-load Reduction": "Up to 68% cabin isolation",
      "Power Draw": "180W peak",
      Retrofit: "Available for 2018+ platforms",
    },
    features: [
      "Pre-emptive corner-by-corner adjustment before the wheel reaches the surface",
      "AI terrain classification: tarmac, gravel, wet, cobblestone, off-road",
      "Dynamic roll control — cornering body movement reduced 71%",
      "Comfort and Sport mode with instant AI personality switch",
      "Fully reversible retrofit — OEM suspension restored in under 4 hours",
    ],
  },
  {
    id: "5",
    name: "Phantom Pro X1",
    year: "2024",
    category: "Surveillance Drone",
    slug: "phantom-pro-x1",
    shortDescription:
      "Long-range autonomous surveillance drone with 4K thermal imaging. 45-minute flight time, 12km range.",
    image: unsplashUrl("photo-1473968512647-3e447244af8f"),
    specs: {
      "Flight Time": "45 minutes",
      "Max Speed": "72 km/h",
      Camera: "4K 60fps + thermal",
      Range: "12 km",
      Weight: "1.8 kg",
      Certifications: "IP54, CE, FCC",
    },
    features: [
      "Autonomous waypoint navigation with real-time rerouting",
      "Onboard edge AI with 12 TOPS processing",
      "Sub-10cm GPS landing precision",
      "Encrypted live telemetry feed",
      "45-minute endurance on single charge",
    ],
  },
  {
    id: "6",
    name: "Stealth EV Module",
    year: "2024",
    category: "Vehicle AI Retrofit",
    slug: "stealth-ev-module",
    shortDescription:
      "Retrofit AI co-pilot for electric vehicles. Adaptive cruise, lane logic, and hazard prediction in one module.",
    image: unsplashUrl("photo-1593941707882-a5bba14938c7"),
    specs: {
      "Target Platform": "EV, 2016+",
      "Install Time": "6 hours",
      "AI Functions": "ADAS Level 2+",
      Connectivity: "5G + V2X",
      Updates: "OTA, monthly",
      Warranty: "3 years",
    },
    features: [
      "Plug-and-play installation — no chassis modifications required",
      "Adaptive cruise with stop-and-go in traffic up to 130km/h",
      "Emergency brake assist with cyclist and pedestrian detection",
      "V2X communication: receives hazard data from other equipped vehicles",
      "Driver attention monitoring with microsleep detection",
    ],
  },
];

export function getProductBySlug(slug: string): ProductData | undefined {
  return products.find((p) => p.slug === slug);
}
