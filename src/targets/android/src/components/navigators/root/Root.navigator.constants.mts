const WEB_APP_URL = process.env.WEB_APP_URL;

export const LINKING = {
  prefixes: [WEB_APP_URL],
  config: {
    screens: {
      home: "",
      counter: "counter",
    },
  },
};
