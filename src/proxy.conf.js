const PROXY_CONFIG = [
  {
    context: [
      "/auth-service",
      "/orch-service",
      "/vrnaflow",
      "/intelligence-service",
      "/content-service",
      "/watchlist-service",
      "/support-service",
      "/payment-service",
      "/common-service",
      "/subscription-service",
      "/images",
      "/video",
      "/trailer",
    ],
    target: "http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/",
    secure: false,
    logLevel: "debug",
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
