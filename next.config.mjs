import bundleAnalyzer from "@next/bundle-analyzer";

// Wrap the Next.js config with the bundle analyzer
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true", // Enable analyzer only if ANALYZE=true
  analyzerMode: "static", // Generate a static report
  openAnalyzer: false // Do not open the report automatically
});

const nextConfig = {
  output: "standalone", // For deployment with a standalone server
  webpack(config) {
    config.stats = "detailed"; // Provide detailed build stats
    return config;
  }
};

export default withBundleAnalyzer(nextConfig);
