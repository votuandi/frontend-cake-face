/** @type import("next").NextConfig */
module.exports = {
  i18n: {
    locales: ['vi-VN', 'en-US'],
    defaultLocale: "vi-VN",
  },
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales")
      : "/locales",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
