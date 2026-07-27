import type { StaticImageData } from "next/image";

import heroCone from "./assets/images/hero-cone.jpg";
import softServeCup from "./assets/images/soft-serve-cup.png";
import chocolateTexture from "./assets/images/chocolate-texture.jpg";
import sundae from "./assets/images/sundae.jpg";
import dessertCup from "./assets/images/dessert-cup.png";
import flavourMint from "./assets/images/flavour-mint.jpg";
import flavourChocolate from "./assets/images/flavour-chocolate.jpg";
import flavourStrawberry from "./assets/images/flavour-strawberry.jpg";
import flavourVanilla from "./assets/images/flavour-vanilla.png";
import aboutFactory from "./assets/images/about-factory.jpg";
import aboutPlace from "./assets/images/about-place.jpg";
import eventCart from "./assets/images/event-cart.jpg";

const assets: Record<string, StaticImageData> = {
  "hero-cone": heroCone,
  "flavours-wide": chocolateTexture,
  "soft-serve-cup": softServeCup,
  "chocolate-texture": chocolateTexture,
  "sundae": sundae,
  "dessert-cup": dessertCup,
  "flavour-mint": flavourMint,
  "flavour-chocolate": flavourChocolate,
  "flavour-strawberry": flavourStrawberry,
  "flavour-vanilla": flavourVanilla,
  "about-factory": aboutFactory,
  "about-place": aboutPlace,
  "event-cart": eventCart
};

export function imageSource(value: string): string | StaticImageData {
  return assets[value] ?? value;
}
