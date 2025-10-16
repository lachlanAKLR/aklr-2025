"use client";

import Image, { ImageProps } from "next/image";

export default function FadeInImage(props: ImageProps) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...props}
      className={`opacity-0 transition-opacity duration-500 ease-out ${props.className ?? ""}`}
      onLoadingComplete={(img) => {
        img.style.opacity = "1";
      }}
    />
  );
}
