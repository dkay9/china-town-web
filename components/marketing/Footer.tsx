import Link from "next/link";
import { ArrowRight } from "lucide-react";

const footerLinks = {
  "Top Regions": ["North America", "Europe", "Middle East", "Asia Pacific"],
  Products: ["Surveillance Drones", "Cargo Vehicles", "AI Systems", "Custom Fleet"],
  Services: ["Fleet Management", "Pilot Training", "Maintenance", "Consulting"],
  Technology: ["Neural Cortex AI", "Telemetry API", "Obstacle Detection", "Navigation SDK"],
};

export default function Footer() {
  return (
    <footer className="relative z-10 bg-void border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-display text-2xl font-bold text-white tracking-tight"
            >
              CTOWN
            </Link>
            <p className="font-body text-sm text-text-secondary mt-3 mb-6 max-w-xs">
              Premium drone and AI technology for enterprises that demand precision.
            </p>
            <div className="flex gap-0">
              <input
                type="email"
                placeholder="Email..."
                className="bg-surface border border-border-subtle px-4 py-2.5 text-sm text-white placeholder:text-text-mono font-mono focus:outline-none focus:border-accent flex-1 max-w-[220px]"
              />
              <button className="bg-accent hover:bg-accent-hover px-4 py-2.5 transition-colors">
                <ArrowRight size={16} className="text-white" />
              </button>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-mono text-xs uppercase tracking-widest text-text-mono mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-sm text-text-secondary hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-text-mono">
            &copy; {new Date().getFullYear()} CTOWN Technologies. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-mono text-xs text-text-mono hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="font-mono text-xs text-text-mono hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
