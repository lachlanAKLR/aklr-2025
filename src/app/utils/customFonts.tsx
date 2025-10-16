import localFont from "next/font/local";

const herbikReg = localFont({
  src: "../fonts/Herbik-Regular.woff2",
  variable: "--font-herbik-reg",
  weight: "400",
  style: "normal",
});

const herbikIta = localFont({
  src: "../fonts/Herbik-RegularItalic.woff2",
  variable: "--font-herbik-italic",
  weight: "400",
  style: "normal",
});

const diaBold = localFont({
  src: "../fonts/ABCDiatype-Bold.otf",
  variable: "--font-dia-bold",
  weight: "400",
  style: "normal",
});

export { herbikReg, herbikIta, diaBold };
