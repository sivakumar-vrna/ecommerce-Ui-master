const PROXY_CONFIG = [
  {
    context: [
      "/user-service",
      "/orchestration-service",
      "/event",
      "/intelligence-service",
      "/book-service",
      "/customer-service",
      "/support-service",
      "/payment-service",
      "/common-service",
      "/subscription-service",
      "/images",
      "/video",
      "/trailer",
    ],
    target: "http://170.187.138.204:8089",
    secure: false,
    logLevel: "debug",
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
