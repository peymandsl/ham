const nextConfig = {
  reactStrictMode: false,
  env: {
    SMS_PANEL_USER: "peymandsl",
    SMS_PANEL_PASSWORD: "Pb@156548pb",
    KYC_TOKEN: "F3JsG2pJdUZ4wHwPFEWECw4QRaV",
  },
  experimental: {
    modularizeImports: {
      // lodash: {
      //   transform: "lodash/{{member}}",
      // },
      "@mui/material": {
        transform: "@mui/material/{{member}}",
      },
      "@mui/lab": {
        transform: "@mui/lab/{{member}}",
      },
      "@mui/icons-material/?(((\\w*)?/?)*)": {
        transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
      },
    },
    // forceSwcTransforms: true,
  },
};

module.exports = nextConfig;

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// module.exports = withBundleAnalyzer({
//   env: {
//     NEXT_PUBLIC_ENV: "PRODUCTION",
//     reactStrictMode: false,
//     env: {
//       SMS_PANEL_USER: "peymandsl",
//       SMS_PANEL_PASSWORD: "Pb@156548pb",
//       KYC_TOKEN: "F3JsG2pJdUZ4wHwPFEWECw4QRaV",
//     },
//     experimental: {
//       modularizeImports: {
//         lodash: {
//           transform: "lodash/{{member}}",
//         },
//         "@mui/material": {
//           transform: "@mui/material/{{member}}",
//         },
//         "@mui/lab": {
//           transform: "@mui/lab/{{member}}",
//         },
//         "@mui/icons-material/?(((\\w*)?/?)*)": {
//           transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
//         },
//       },
//       forceSwcTransforms: true,
//     },

//   },
// });
