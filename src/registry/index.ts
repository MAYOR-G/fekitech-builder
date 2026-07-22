import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { isTemplateData, type TemplateData } from "@/lib/template-data";

import barberConfig from "../templates/barber-website/config.json";
import barberEditable from "../templates/barber-website/editable.json";
import cakeConfig from "../templates/cake-website/config.json";
import cakeEditable from "../templates/cake-website/editable.json";
import cateringConfig from "../templates/catering-website/config.json";
import cateringEditable from "../templates/catering-website/editable.json";
import coffeeConfig from "../templates/coffee-website/config.json";
import coffeeEditable from "../templates/coffee-website/editable.json";
import dentistConfig from "../templates/dentist-website/config.json";
import dentistEditable from "../templates/dentist-website/editable.json";
import electricianConfig from "../templates/electrician-website/config.json";
import electricianEditable from "../templates/electrician-website/editable.json";
import gymConfig from "../templates/gym-website/config.json";
import gymEditable from "../templates/gym-website/editable.json";
import burgerDarkConfig from "../templates/burger-dark-premium/config.json";
import burgerDarkEditable from "../templates/burger-dark-premium/editable.json";
import burgerLightConfig from "../templates/burger-light-clean/config.json";
import burgerLightEditable from "../templates/burger-light-clean/editable.json";
import pizzaDarkConfig from "../templates/pizza-dark-premium/config.json";
import pizzaDarkEditable from "../templates/pizza-dark-premium/editable.json";
import pizzaLightConfig from "../templates/pizza-light-clean/config.json";
import pizzaLightEditable from "../templates/pizza-light-clean/editable.json";
import cleaningAgencyConfig from "../templates/cleaning-agency-premium/config.json";
import cleaningAgencyEditable from "../templates/cleaning-agency-premium/editable.json";
import roofingAgencyConfig from "../templates/roofing-agency-premium/config.json";
import roofingAgencyEditable from "../templates/roofing-agency-premium/editable.json";
import inkConfig from "../templates/ink-and-iron/config.json";
import inkEditable from "../templates/ink-and-iron/editable.json";
import premiumCoffeeConfig from "../templates/premium-coffee-website/config.json";
import premiumCoffeeEditable from "../templates/premium-coffee-website/editable.json";
import restaurantConfig from "../templates/restaurant-website/config.json";
import restaurantEditable from "../templates/restaurant-website/editable.json";
import secondFurnitureConfig from "../templates/second-furniture-website/config.json";
import secondFurnitureEditable from "../templates/second-furniture-website/editable.json";
import secondPlumberConfig from "../templates/second-plumber-website/config.json";
import secondPlumberEditable from "../templates/second-plumber-website/editable.json";

export type TemplateConfig = { id: string; name: string; category: string; image: string };
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
  "catering-website": dynamic<{ data: TemplateData }>(() => import("../templates/catering-website/template")),
  "coffee-website": dynamic<{ data: TemplateData }>(() => import("../templates/coffee-website/template")),
  "dentist-website": dynamic<{ data: TemplateData }>(() => import("../templates/dentist-website/template")),
  "electrician-website": dynamic<{ data: TemplateData }>(() => import("../templates/electrician-website/template")),
  "gym-website": dynamic<{ data: TemplateData }>(() => import("../templates/gym-website/template")),
  "burger-dark-premium": dynamic<{ data: TemplateData }>(() => import("../templates/burger-dark-premium/template")),
  "burger-light-clean": dynamic<{ data: TemplateData }>(() => import("../templates/burger-light-clean/template")),
  "pizza-dark-premium": dynamic<{ data: TemplateData }>(() => import("../templates/pizza-dark-premium/template")),
  "pizza-light-clean": dynamic<{ data: TemplateData }>(() => import("../templates/pizza-light-clean/template")),
  "cleaning-agency-premium": dynamic<{ data: TemplateData }>(() => import("../templates/cleaning-agency-premium/template")),
  "roofing-agency-premium": dynamic<{ data: TemplateData }>(() => import("../templates/roofing-agency-premium/template")),
  "ink-and-iron": dynamic<{ data: TemplateData }>(() => import("../templates/ink-and-iron/template")),
  "premium-coffee-website": dynamic<{ data: TemplateData }>(() => import("../templates/premium-coffee-website/template")),
  "restaurant-website": dynamic<{ data: TemplateData }>(() => import("../templates/restaurant-website/template")),
  "second-furniture-website": dynamic<{ data: TemplateData }>(() => import("../templates/second-furniture-website/template")),
  "second-plumber-website": dynamic<{ data: TemplateData }>(() => import("../templates/second-plumber-website/template")),
} satisfies Record<string, ComponentType<{ data: TemplateData }>>;

export const TEMPLATE_REGISTRY: Record<string, TemplateEntry> = {
  "barber-website": { config: barberConfig, component: components["barber-website"], defaultData: normalizeData(barberEditable) },
  "premium-coffee-website": { config: premiumCoffeeConfig, component: components["premium-coffee-website"], defaultData: normalizeData(premiumCoffeeEditable) },
  "gym-website": { config: gymConfig, component: components["gym-website"], defaultData: normalizeData(gymEditable) },
  "burger-dark-premium": { config: burgerDarkConfig, component: components["burger-dark-premium"], defaultData: normalizeData(burgerDarkEditable) },
  "burger-light-clean": { config: burgerLightConfig, component: components["burger-light-clean"], defaultData: normalizeData(burgerLightEditable) },
  "pizza-dark-premium": { config: pizzaDarkConfig, component: components["pizza-dark-premium"], defaultData: normalizeData(pizzaDarkEditable) },
  "pizza-light-clean": { config: pizzaLightConfig, component: components["pizza-light-clean"], defaultData: normalizeData(pizzaLightEditable) },
  "cleaning-agency-premium": { config: cleaningAgencyConfig, component: components["cleaning-agency-premium"], defaultData: normalizeData(cleaningAgencyEditable) },
  "roofing-agency-premium": { config: roofingAgencyConfig, component: components["roofing-agency-premium"], defaultData: normalizeData(roofingAgencyEditable) },
  "second-furniture-website": { config: secondFurnitureConfig, component: components["second-furniture-website"], defaultData: normalizeData(secondFurnitureEditable) },
  "cake-website": { config: cakeConfig, component: components["cake-website"], defaultData: normalizeData(cakeEditable) },
  "catering-website": { config: cateringConfig, component: components["catering-website"], defaultData: normalizeData(cateringEditable) },
  "coffee-website": { config: coffeeConfig, component: components["coffee-website"], defaultData: normalizeData(coffeeEditable) },
  "dentist-website": { config: dentistConfig, component: components["dentist-website"], defaultData: normalizeData(dentistEditable) },
  "electrician-website": { config: electricianConfig, component: components["electrician-website"], defaultData: normalizeData(electricianEditable) },
  "ink-and-iron": { config: inkConfig, component: components["ink-and-iron"], defaultData: normalizeData(inkEditable) },
  "restaurant-website": { config: restaurantConfig, component: components["restaurant-website"], defaultData: normalizeData(restaurantEditable) },
  "second-plumber-website": { config: secondPlumberConfig, component: components["second-plumber-website"], defaultData: normalizeData(secondPlumberEditable) },
};

export function getTemplate(id: string): TemplateEntry | undefined {
  return TEMPLATE_REGISTRY[id];
}

export function getAllTemplates(): TemplateConfig[] {
  return Object.values(TEMPLATE_REGISTRY).map((template) => template.config);
}
