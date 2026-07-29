import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { isTemplateData, type TemplateData } from "@/lib/template-data";

import barberConfig from "../templates/barber-website/config.json";
import barberEditable from "../templates/barber-website/editable.json";
import cakeConfig from "../templates/cake-website/config.json";
import cakeEditable from "../templates/cake-website/editable.json";
import dentistConfig from "../templates/dentist-website/config.json";
import dentistEditable from "../templates/dentist-website/editable.json";
import electricianConfig from "../templates/electrician-website/config.json";
import electricianEditable from "../templates/electrician-website/editable.json";
import gymConfig from "../templates/gym-website/config.json";
import gymEditable from "../templates/gym-website/editable.json";
import burgerLightConfig from "../templates/burger-light-clean/config.json";
import burgerLightEditable from "../templates/burger-light-clean/editable.json";
import cleaningAgencyConfig from "../templates/cleaning-agency-premium/config.json";
import cleaningAgencyEditable from "../templates/cleaning-agency-premium/editable.json";
import roofingAgencyConfig from "../templates/roofing-agency-premium/config.json";
import roofingAgencyEditable from "../templates/roofing-agency-premium/editable.json";
import lumenHouseDesignConfig from "../templates/lumen-house-design/config.json";
import lumenHouseDesignEditable from "../templates/lumen-house-design/editable.json";
import cakeBakeryConfig from "../templates/cake-bakery-premium/config.json";
import cakeBakeryEditable from "../templates/cake-bakery-premium/editable.json";
import inkConfig from "../templates/ink-and-iron/config.json";
import inkEditable from "../templates/ink-and-iron/editable.json";
import premiumCoffeeConfig from "../templates/premium-coffee-website/config.json";
import premiumCoffeeEditable from "../templates/premium-coffee-website/editable.json";
import farmShopConfig from "../templates/farm-shop-website/config.json";
import farmShopEditable from "../templates/farm-shop-website/editable.json";
import bakeryWebsiteConfig from "../templates/bakery-website/config.json";
import bakeryWebsiteEditable from "../templates/bakery-website/editable.json";
import carpenterConfig from "../templates/carpenter-website/config.json";
import carpenterEditable from "../templates/carpenter-website/editable.json";
import premiumConstructionConfig from "../templates/premium-construction/config.json";
import premiumConstructionEditable from "../templates/premium-construction/editable.json";
import industrialConstructionConfig from "../templates/industrial-construction/config.json";
import industrialConstructionEditable from "../templates/industrial-construction/editable.json";
import alderSlateRoofingConfig from "../templates/alder-slate-roofing/config.json";
import alderSlateRoofingEditable from "../templates/alder-slate-roofing/editable.json";
import burgerDarkConfig from "../templates/burger-dark-premium/config.json";
import burgerDarkEditable from "../templates/burger-dark-premium/editable.json";
import crownlineRoofworksConfig from "../templates/crownline-roofworks/config.json";
import crownlineRoofworksEditable from "../templates/crownline-roofworks/editable.json";
import iceCreamConfig from "../templates/ice-cream-website/config.json";
import iceCreamEditable from "../templates/ice-cream-website/editable.json";
import noirHouseDesignConfig from "../templates/noir-house-design/config.json";
import noirHouseDesignEditable from "../templates/noir-house-design/editable.json";
import northcrestRoofingConfig from "../templates/northcrest-roofing/config.json";
import northcrestRoofingEditable from "../templates/northcrest-roofing/editable.json";
import secondFurnitureConfig from "../templates/second-furniture-website/config.json";
import secondFurnitureEditable from "../templates/second-furniture-website/editable.json";
import secondPlumberConfig from "../templates/second-plumber-website/config.json";
import secondPlumberEditable from "../templates/second-plumber-website/editable.json";
import velvetScoopConfig from "../templates/velvet-scoop/config.json";
import velvetScoopEditable from "../templates/velvet-scoop/editable.json";
import fastFoodChickenTacosConfig from "../templates/fast-food-chicken-tacos/config.json";
import fastFoodChickenTacosEditable from "../templates/fast-food-chicken-tacos/editable.json";
import cateringCompanyConfig from "../templates/catering-company-premium/config.json";
import cateringCompanyEditable from "../templates/catering-company-premium/editable.json";
import coffeeWebsiteConfig from "../templates/coffee-website/config.json";
import coffeeWebsiteEditable from "../templates/coffee-website/editable.json";
import forgepointConstructionConfig from "../templates/forgepoint-construction/config.json";
import forgepointConstructionEditable from "../templates/forgepoint-construction/editable.json";
import pastriesSnacksConfig from "../templates/pastries-snacks-premium/config.json";
import pastriesSnacksEditable from "../templates/pastries-snacks-premium/editable.json";
import pizzaLightConfig from "../templates/pizza-light-clean/config.json";
import pizzaLightEditable from "../templates/pizza-light-clean/editable.json";
import premiumRestaurantConfig from "../templates/premium-restaurant/config.json";
import premiumRestaurantEditable from "../templates/premium-restaurant/editable.json";


export type TemplateConfig = {
  id: string;
  name: string;
  category: string;
  image: string;
  previewImages?: string[];
};
export type TemplateEntry = {
  config: TemplateConfig;
  component: ComponentType<{ data: TemplateData }>;
  defaultData: TemplateData;
};

function normalizeData(value: unknown): TemplateData {
  if (!isTemplateData(value)) return {};
  return isTemplateData(value.siteContent) ? value.siteContent : value;
}

const components = {
  "barber-website": dynamic<{ data: TemplateData }>(() => import("../templates/barber-website/template")),
  "cake-website": dynamic<{ data: TemplateData }>(() => import("../templates/cake-website/template")),
  "dentist-website": dynamic<{ data: TemplateData }>(() => import("../templates/dentist-website/template")),
  "electrician-website": dynamic<{ data: TemplateData }>(() => import("../templates/electrician-website/template")),
  "gym-website": dynamic<{ data: TemplateData }>(() => import("../templates/gym-website/template")),
  "burger-light-clean": dynamic<{ data: TemplateData }>(() => import("../templates/burger-light-clean/template")),
  "cleaning-agency-premium": dynamic<{ data: TemplateData }>(() => import("../templates/cleaning-agency-premium/template")),
  "roofing-agency-premium": dynamic<{ data: TemplateData }>(() => import("../templates/roofing-agency-premium/template")),
  "lumen-house-design": dynamic<{ data: TemplateData }>(() => import("../templates/lumen-house-design/template")),
  "cake-bakery-premium": dynamic<{ data: TemplateData }>(() => import("../templates/cake-bakery-premium/template")),
  "ink-and-iron": dynamic<{ data: TemplateData }>(() => import("../templates/ink-and-iron/template")),
  "premium-coffee-website": dynamic<{ data: TemplateData }>(() => import("../templates/premium-coffee-website/template")),
  "farm-shop-website": dynamic<{ data: TemplateData }>(() => import("../templates/farm-shop-website/template")),
  "bakery-website": dynamic<{ data: TemplateData }>(() => import("../templates/bakery-website/template")),
  "carpenter-website": dynamic<{ data: TemplateData }>(() => import("../templates/carpenter-website/template")),
  "premium-construction": dynamic<{ data: TemplateData }>(() => import("../templates/premium-construction/template")),
  "industrial-construction": dynamic<{ data: TemplateData }>(() => import("../templates/industrial-construction/template")),
  "alder-slate-roofing": dynamic<{ data: TemplateData }>(() => import("../templates/alder-slate-roofing/template")),
  "burger-dark-premium": dynamic<{ data: TemplateData }>(() => import("../templates/burger-dark-premium/template")),
  "crownline-roofworks": dynamic<{ data: TemplateData }>(() => import("../templates/crownline-roofworks/template")),
  "ice-cream-website": dynamic<{ data: TemplateData }>(() => import("../templates/ice-cream-website/template")),
  "noir-house-design": dynamic<{ data: TemplateData }>(() => import("../templates/noir-house-design/template")),
  "northcrest-roofing": dynamic<{ data: TemplateData }>(() => import("../templates/northcrest-roofing/template")),
  "second-furniture-website": dynamic<{ data: TemplateData }>(() => import("../templates/second-furniture-website/template")),
  "second-plumber-website": dynamic<{ data: TemplateData }>(() => import("../templates/second-plumber-website/template")),
  "velvet-scoop": dynamic<{ data: TemplateData }>(() => import("../templates/velvet-scoop/template")),
  "fast-food-chicken-tacos": dynamic<{ data: TemplateData }>(() => import("../templates/fast-food-chicken-tacos/template")),
  "catering-company-premium": dynamic<{ data: TemplateData }>(() => import("../templates/catering-company-premium/template")),
  "coffee-website": dynamic<{ data: TemplateData }>(() => import("../templates/coffee-website/template")),
  "forgepoint-construction": dynamic<{ data: TemplateData }>(() => import("../templates/forgepoint-construction/template")),
  "pastries-snacks-premium": dynamic<{ data: TemplateData }>(() => import("../templates/pastries-snacks-premium/template")),
  "pizza-light-clean": dynamic<{ data: TemplateData }>(() => import("../templates/pizza-light-clean/template")),
  "premium-restaurant": dynamic<{ data: TemplateData }>(() => import("../templates/premium-restaurant/template")),

} satisfies Record<string, ComponentType<{ data: TemplateData }>>;

export const TEMPLATE_REGISTRY: Record<string, TemplateEntry> = {

  "cake-bakery-premium": { config: cakeBakeryConfig, component: components["cake-bakery-premium"], defaultData: normalizeData(cakeBakeryEditable) },
  "gym-website": { config: gymConfig, component: components["gym-website"], defaultData: normalizeData(gymEditable) },
  "premium-coffee-website": { config: premiumCoffeeConfig, component: components["premium-coffee-website"], defaultData: normalizeData(premiumCoffeeEditable) },
  "industrial-construction": { config: industrialConstructionConfig, component: components["industrial-construction"], defaultData: normalizeData(industrialConstructionEditable) },
  "cleaning-agency-premium": { config: cleaningAgencyConfig, component: components["cleaning-agency-premium"], defaultData: normalizeData(cleaningAgencyEditable) },
  "burger-light-clean": { config: burgerLightConfig, component: components["burger-light-clean"], defaultData: normalizeData(burgerLightEditable) },
  "premium-construction": { config: premiumConstructionConfig, component: components["premium-construction"], defaultData: normalizeData(premiumConstructionEditable) },
  "carpenter-website": { config: carpenterConfig, component: components["carpenter-website"], defaultData: normalizeData(carpenterEditable) },
  "roofing-agency-premium": { config: roofingAgencyConfig, component: components["roofing-agency-premium"], defaultData: normalizeData(roofingAgencyEditable) },
  "bakery-website": { config: bakeryWebsiteConfig, component: components["bakery-website"], defaultData: normalizeData(bakeryWebsiteEditable) },
  "lumen-house-design": { config: lumenHouseDesignConfig, component: components["lumen-house-design"], defaultData: normalizeData(lumenHouseDesignEditable) },
  "barber-website": { config: barberConfig, component: components["barber-website"], defaultData: normalizeData(barberEditable) },
  "cake-website": { config: cakeConfig, component: components["cake-website"], defaultData: normalizeData(cakeEditable) },
  "dentist-website": { config: dentistConfig, component: components["dentist-website"], defaultData: normalizeData(dentistEditable) },
  "electrician-website": { config: electricianConfig, component: components["electrician-website"], defaultData: normalizeData(electricianEditable) },
  "farm-shop-website": { config: farmShopConfig, component: components["farm-shop-website"], defaultData: normalizeData(farmShopEditable) },
  "ink-and-iron": { config: inkConfig, component: components["ink-and-iron"], defaultData: normalizeData(inkEditable) },
  "alder-slate-roofing": { config: alderSlateRoofingConfig, component: components["alder-slate-roofing"], defaultData: normalizeData(alderSlateRoofingEditable) },
  "burger-dark-premium": { config: burgerDarkConfig, component: components["burger-dark-premium"], defaultData: normalizeData(burgerDarkEditable) },
  "crownline-roofworks": { config: crownlineRoofworksConfig, component: components["crownline-roofworks"], defaultData: normalizeData(crownlineRoofworksEditable) },
  "ice-cream-website": { config: iceCreamConfig, component: components["ice-cream-website"], defaultData: normalizeData(iceCreamEditable) },
  "noir-house-design": { config: noirHouseDesignConfig, component: components["noir-house-design"], defaultData: normalizeData(noirHouseDesignEditable) },
  "northcrest-roofing": { config: northcrestRoofingConfig, component: components["northcrest-roofing"], defaultData: normalizeData(northcrestRoofingEditable) },
  "second-furniture-website": { config: secondFurnitureConfig, component: components["second-furniture-website"], defaultData: normalizeData(secondFurnitureEditable) },
  "second-plumber-website": { config: secondPlumberConfig, component: components["second-plumber-website"], defaultData: normalizeData(secondPlumberEditable) },
  "velvet-scoop": { config: velvetScoopConfig, component: components["velvet-scoop"], defaultData: normalizeData(velvetScoopEditable) },
  "fast-food-chicken-tacos": { config: fastFoodChickenTacosConfig, component: components["fast-food-chicken-tacos"], defaultData: normalizeData(fastFoodChickenTacosEditable) },
  "catering-company-premium": { config: cateringCompanyConfig, component: components["catering-company-premium"], defaultData: normalizeData(cateringCompanyEditable) },
  "coffee-website": { config: coffeeWebsiteConfig, component: components["coffee-website"], defaultData: normalizeData(coffeeWebsiteEditable) },
  "forgepoint-construction": { config: forgepointConstructionConfig, component: components["forgepoint-construction"], defaultData: normalizeData(forgepointConstructionEditable) },
  "pastries-snacks-premium": { config: pastriesSnacksConfig, component: components["pastries-snacks-premium"], defaultData: normalizeData(pastriesSnacksEditable) },
  "pizza-light-clean": { config: pizzaLightConfig, component: components["pizza-light-clean"], defaultData: normalizeData(pizzaLightEditable) },
  "premium-restaurant": { config: premiumRestaurantConfig, component: components["premium-restaurant"], defaultData: normalizeData(premiumRestaurantEditable) },
};

export function getTemplate(id: string): TemplateEntry | undefined {
  return TEMPLATE_REGISTRY[id];
}

export function getAllTemplates(): TemplateConfig[] {
  return Object.values(TEMPLATE_REGISTRY).map((template) => template.config);
}
