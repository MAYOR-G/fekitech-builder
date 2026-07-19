import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { isTemplateData, type TemplateData } from "@/lib/template-data";
import accountancyConfig from "../templates/accountancy-website/config.json";
import accountancyEditable from "../templates/accountancy-website/editable.json";
import agencyConfig from "../templates/agency/config.json";
import agencyEditable from "../templates/agency/editable.json";
import barberConfig from "../templates/barber-website/config.json";
import barberEditable from "../templates/barber-website/editable.json";
import blackwoodConfig from "../templates/blackwood-barbers/config.json";
import blackwoodEditable from "../templates/blackwood-barbers/editable.json";
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
import estateAgentConfig from "../templates/estate-agent-website/config.json";
import estateAgentEditable from "../templates/estate-agent-website/editable.json";
import furnitureConfig from "../templates/furniture-website/config.json";
import furnitureEditable from "../templates/furniture-website/editable.json";
import gymConfig from "../templates/gym-website/config.json";
import gymEditable from "../templates/gym-website/editable.json";
import hearthConfig from "../templates/hearth-and-harvest/config.json";
import hearthEditable from "../templates/hearth-and-harvest/editable.json";
import hotelConfig from "../templates/hotel-website/config.json";
import hotelEditable from "../templates/hotel-website/editable.json";
import inkConfig from "../templates/ink-and-iron/config.json";
import inkEditable from "../templates/ink-and-iron/editable.json";
import oakConfig from "../templates/oak-and-ivory-barbers/config.json";
import oakEditable from "../templates/oak-and-ivory-barbers/editable.json";
import plumberConfig from "../templates/plumber-website/config.json";
import plumberEditable from "../templates/plumber-website/editable.json";
import premiumCoffeeConfig from "../templates/premium-coffee-website/config.json";
import premiumCoffeeEditable from "../templates/premium-coffee-website/editable.json";
import premiumLashConfig from "../templates/premium-lash-technician-website/config.json";
import premiumLashEditable from "../templates/premium-lash-technician-website/editable.json";
import premiumNailConfig from "../templates/premium-nail-technician-website/config.json";
import premiumNailEditable from "../templates/premium-nail-technician-website/editable.json";
import premiumSpaConfig from "../templates/premium-spa-website/config.json";
import premiumSpaEditable from "../templates/premium-spa-website/editable.json";
import restaurantConfig from "../templates/restaurant-website/config.json";
import restaurantEditable from "../templates/restaurant-website/editable.json";
import salonConfig from "../templates/salon-website/config.json";
import salonEditable from "../templates/salon-website/editable.json";
import secondElectricianConfig from "../templates/second-electrician-website/config.json";
import secondElectricianEditable from "../templates/second-electrician-website/editable.json";
import secondFurnitureConfig from "../templates/second-furniture-website/config.json";
import secondFurnitureEditable from "../templates/second-furniture-website/editable.json";
import secondPlumberConfig from "../templates/second-plumber-website/config.json";
import secondPlumberEditable from "../templates/second-plumber-website/editable.json";
import secondSalonConfig from "../templates/second-salon-website/config.json";
import secondSalonEditable from "../templates/second-salon-website/editable.json";

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
  "accountancy-website": dynamic<{ data: TemplateData }>(() => import("../templates/accountancy-website/template")),
  agency: dynamic<{ data: TemplateData }>(() => import("../templates/agency/template")),
  "barber-website": dynamic<{ data: TemplateData }>(() => import("../templates/barber-website/template")),
  "blackwood-barbers": dynamic<{ data: TemplateData }>(() => import("../templates/blackwood-barbers/template")),
  "cake-website": dynamic<{ data: TemplateData }>(() => import("../templates/cake-website/template")),
  "catering-website": dynamic<{ data: TemplateData }>(() => import("../templates/catering-website/template")),
  "coffee-website": dynamic<{ data: TemplateData }>(() => import("../templates/coffee-website/template")),
  "dentist-website": dynamic<{ data: TemplateData }>(() => import("../templates/dentist-website/template")),
  "electrician-website": dynamic<{ data: TemplateData }>(() => import("../templates/electrician-website/template")),
  "estate-agent-website": dynamic<{ data: TemplateData }>(() => import("../templates/estate-agent-website/template")),
  "furniture-website": dynamic<{ data: TemplateData }>(() => import("../templates/furniture-website/template")),
  "gym-website": dynamic<{ data: TemplateData }>(() => import("../templates/gym-website/template")),
  "hearth-and-harvest": dynamic<{ data: TemplateData }>(() => import("../templates/hearth-and-harvest/template")),
  "hotel-website": dynamic<{ data: TemplateData }>(() => import("../templates/hotel-website/template")),
  "ink-and-iron": dynamic<{ data: TemplateData }>(() => import("../templates/ink-and-iron/template")),
  "oak-and-ivory-barbers": dynamic<{ data: TemplateData }>(() => import("../templates/oak-and-ivory-barbers/template")),
  "plumber-website": dynamic<{ data: TemplateData }>(() => import("../templates/plumber-website/template")),
  "premium-coffee-website": dynamic<{ data: TemplateData }>(() => import("../templates/premium-coffee-website/template")),
  "premium-lash-technician-website": dynamic<{ data: TemplateData }>(() => import("../templates/premium-lash-technician-website/template")),
  "premium-nail-technician-website": dynamic<{ data: TemplateData }>(() => import("../templates/premium-nail-technician-website/template")),
  "premium-spa-website": dynamic<{ data: TemplateData }>(() => import("../templates/premium-spa-website/template")),
  "restaurant-website": dynamic<{ data: TemplateData }>(() => import("../templates/restaurant-website/template")),
  "salon-website": dynamic<{ data: TemplateData }>(() => import("../templates/salon-website/template")),
  "second-electrician-website": dynamic<{ data: TemplateData }>(() => import("../templates/second-electrician-website/template")),
  "second-furniture-website": dynamic<{ data: TemplateData }>(() => import("../templates/second-furniture-website/template")),
  "second-plumber-website": dynamic<{ data: TemplateData }>(() => import("../templates/second-plumber-website/template")),
  "second-salon-website": dynamic<{ data: TemplateData }>(() => import("../templates/second-salon-website/template")),
} satisfies Record<string, ComponentType<{ data: TemplateData }>>;

export const TEMPLATE_REGISTRY: Record<string, TemplateEntry> = {
  "accountancy-website": { config: accountancyConfig, component: components["accountancy-website"], defaultData: normalizeData(accountancyEditable) },
  agency: { config: agencyConfig, component: components.agency, defaultData: normalizeData(agencyEditable) },
  "barber-website": { config: barberConfig, component: components["barber-website"], defaultData: normalizeData(barberEditable) },
  "blackwood-barbers": { config: blackwoodConfig, component: components["blackwood-barbers"], defaultData: normalizeData(blackwoodEditable) },
  "cake-website": { config: cakeConfig, component: components["cake-website"], defaultData: normalizeData(cakeEditable) },
  "catering-website": { config: cateringConfig, component: components["catering-website"], defaultData: normalizeData(cateringEditable) },
  "coffee-website": { config: coffeeConfig, component: components["coffee-website"], defaultData: normalizeData(coffeeEditable) },
  "dentist-website": { config: dentistConfig, component: components["dentist-website"], defaultData: normalizeData(dentistEditable) },
  "electrician-website": { config: electricianConfig, component: components["electrician-website"], defaultData: normalizeData(electricianEditable) },
  "estate-agent-website": { config: estateAgentConfig, component: components["estate-agent-website"], defaultData: normalizeData(estateAgentEditable) },
  "furniture-website": { config: furnitureConfig, component: components["furniture-website"], defaultData: normalizeData(furnitureEditable) },
  "gym-website": { config: gymConfig, component: components["gym-website"], defaultData: normalizeData(gymEditable) },
  "hearth-and-harvest": { config: hearthConfig, component: components["hearth-and-harvest"], defaultData: normalizeData(hearthEditable) },
  "hotel-website": { config: hotelConfig, component: components["hotel-website"], defaultData: normalizeData(hotelEditable) },
  "ink-and-iron": { config: inkConfig, component: components["ink-and-iron"], defaultData: normalizeData(inkEditable) },
  "oak-and-ivory-barbers": { config: oakConfig, component: components["oak-and-ivory-barbers"], defaultData: normalizeData(oakEditable) },
  "plumber-website": { config: plumberConfig, component: components["plumber-website"], defaultData: normalizeData(plumberEditable) },
  "premium-coffee-website": { config: premiumCoffeeConfig, component: components["premium-coffee-website"], defaultData: normalizeData(premiumCoffeeEditable) },
  "premium-lash-technician-website": { config: premiumLashConfig, component: components["premium-lash-technician-website"], defaultData: normalizeData(premiumLashEditable) },
  "premium-nail-technician-website": { config: premiumNailConfig, component: components["premium-nail-technician-website"], defaultData: normalizeData(premiumNailEditable) },
  "premium-spa-website": { config: premiumSpaConfig, component: components["premium-spa-website"], defaultData: normalizeData(premiumSpaEditable) },
  "restaurant-website": { config: restaurantConfig, component: components["restaurant-website"], defaultData: normalizeData(restaurantEditable) },
  "salon-website": { config: salonConfig, component: components["salon-website"], defaultData: normalizeData(salonEditable) },
  "second-electrician-website": { config: secondElectricianConfig, component: components["second-electrician-website"], defaultData: normalizeData(secondElectricianEditable) },
  "second-furniture-website": { config: secondFurnitureConfig, component: components["second-furniture-website"], defaultData: normalizeData(secondFurnitureEditable) },
  "second-plumber-website": { config: secondPlumberConfig, component: components["second-plumber-website"], defaultData: normalizeData(secondPlumberEditable) },
  "second-salon-website": { config: secondSalonConfig, component: components["second-salon-website"], defaultData: normalizeData(secondSalonEditable) },
};

export function getTemplate(id: string): TemplateEntry | undefined {
  return TEMPLATE_REGISTRY[id];
}

export function getAllTemplates(): TemplateConfig[] {
  return Object.values(TEMPLATE_REGISTRY).map((template) => template.config);
}
