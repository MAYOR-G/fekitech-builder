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
import blueforgePlumbingConfig from "../templates/blueforge-plumbing/config.json";
import blueforgePlumbingEditable from "../templates/blueforge-plumbing/editable.json";
import northlineGroomingConfig from "../templates/northline-grooming/config.json";
import northlineGroomingEditable from "../templates/northline-grooming/editable.json";
import verdantHouseGroomingConfig from "../templates/verdant-house-grooming/config.json";
import verdantHouseGroomingEditable from "../templates/verdant-house-grooming/editable.json";
import brightnestCleaningConfig from "../templates/brightnest-cleaning/config.json";
import brightnestCleaningEditable from "../templates/brightnest-cleaning/editable.json";
import ashBridleBarbersConfig from "../templates/ash-bridle-barbers/config.json";
import ashBridleBarbersEditable from "../templates/ash-bridle-barbers/editable.json";
import lacquerFormNailAtelierConfig from "../templates/lacquer-form-nail-atelier/config.json";
import lacquerFormNailAtelierEditable from "../templates/lacquer-form-nail-atelier/editable.json";
import harborwellHomeHealthConfig from "../templates/harborwell-home-health/config.json";
import harborwellHomeHealthEditable from "../templates/harborwell-home-health/editable.json";
import infusionLondonConfig from "../templates/infusion-london/config.json";
import infusionLondonEditable from "../templates/infusion-london/editable.json";
import digitalDesignerPortfolioConfig from "../templates/digital-designer-portfolio/config.json";
import digitalDesignerPortfolioEditable from "../templates/digital-designer-portfolio/editable.json";
import kineticFrameStudioConfig from "../templates/kinetic-frame-studio/config.json";
import kineticFrameStudioEditable from "../templates/kinetic-frame-studio/editable.json";
import softwareEngineerPortfolioConfig from "../templates/software-engineer-portfolio/config.json";
import softwareEngineerPortfolioEditable from "../templates/software-engineer-portfolio/editable.json";
import londonPizzaShopConfig from "../templates/london-pizza-shop/config.json";
import londonPizzaShopEditable from "../templates/london-pizza-shop/editable.json";
import mossMarrowCafeConfig from "../templates/moss-marrow-cafe/config.json";
import mossMarrowCafeEditable from "../templates/moss-marrow-cafe/editable.json";
import blushCrumbBakehouseConfig from "../templates/blush-crumb-bakehouse/config.json";
import blushCrumbBakehouseEditable from "../templates/blush-crumb-bakehouse/editable.json";
import aureaObjectsShopConfig from "../templates/aurea-objects-shop/config.json";
import aureaObjectsShopEditable from "../templates/aurea-objects-shop/editable.json";
import velourStudioSalonConfig from "../templates/velour-studio-salon/config.json";
import velourStudioSalonEditable from "../templates/velour-studio-salon/editable.json";
import harrowValeEstatesConfig from "../templates/harrow-vale-estates/config.json";
import harrowValeEstatesEditable from "../templates/harrow-vale-estates/editable.json";
import emberGraceChurchConfig from "../templates/ember-grace-church/config.json";
import emberGraceChurchEditable from "../templates/ember-grace-church/editable.json";
import lindenPathTherapyConfig from "../templates/linden-path-therapy/config.json";
import lindenPathTherapyEditable from "../templates/linden-path-therapy/editable.json";
import theCopperTapConfig from "../templates/the-copper-tap/config.json";
import theCopperTapEditable from "../templates/the-copper-tap/editable.json";
import signalYardStudioConfig from "../templates/signal-yard-studio/config.json";
import signalYardStudioEditable from "../templates/signal-yard-studio/editable.json";
import modularsConfig from "../templates/modulars/config.json";
import modularsEditable from "../templates/modulars/editable.json";
import forgeFitTrainingConfig from "../templates/forgefit-training/config.json";
import forgeFitTrainingEditable from "../templates/forgefit-training/editable.json";
import rivergatePlumbingConfig from "../templates/rivergate-plumbing/config.json";
import rivergatePlumbingEditable from "../templates/rivergate-plumbing/editable.json";
import hawthorneFieldsAcademyConfig from "../templates/hawthorne-fields-academy/config.json";
import hawthorneFieldsAcademyEditable from "../templates/hawthorne-fields-academy/editable.json";
import mercerBlytheSolicitorsConfig from "../templates/mercer-blythe-solicitors/config.json";
import mercerBlytheSolicitorsEditable from "../templates/mercer-blythe-solicitors/editable.json";
import northLedgerAccountantsConfig from "../templates/north-ledger-accountants/config.json";
import northLedgerAccountantsEditable from "../templates/north-ledger-accountants/editable.json";
import kindredPawsVetsConfig from "../templates/kindred-paws-vets/config.json";
import kindredPawsVetsEditable from "../templates/kindred-paws-vets/editable.json";
import littleLanternsNurseryConfig from "../templates/little-lanterns-nursery/config.json";
import littleLanternsNurseryEditable from "../templates/little-lanterns-nursery/editable.json";
import boroughMotorWorksConfig from "../templates/borough-motor-works/config.json";
import boroughMotorWorksEditable from "../templates/borough-motor-works/editable.json";
import wildmereGardensConfig from "../templates/wildmere-gardens/config.json";
import wildmereGardensEditable from "../templates/wildmere-gardens/editable.json";
import tallowAndSageConfig from "../templates/tallow-and-sage/config.json";
import tallowAndSageEditable from "../templates/tallow-and-sage/editable.json";
import nightjarAndCrownConfig from "../templates/nightjar-and-crown/config.json";
import nightjarAndCrownEditable from "../templates/nightjar-and-crown/editable.json";
import crumbAndCharConfig from "../templates/crumb-and-char/config.json";
import crumbAndCharEditable from "../templates/crumb-and-char/editable.json";
import fornoSixteenConfig from "../templates/forno-sixteen/config.json";
import fornoSixteenEditable from "../templates/forno-sixteen/editable.json";
import arcstoneGrowthConfig from "../templates/arcstone-growth/config.json";
import arcstoneGrowthEditable from "../templates/arcstone-growth/editable.json";
import beaniroColdBrewConfig from "../templates/beaniro-cold-brew/config.json";
import beaniroColdBrewEditable from "../templates/beaniro-cold-brew/editable.json";
import luneLeafSkincareConfig from "../templates/lune-leaf-skincare/config.json";
import luneLeafSkincareEditable from "../templates/lune-leaf-skincare/editable.json";

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
  "blueforge-plumbing": dynamic<{ data: TemplateData }>(() => import("../templates/blueforge-plumbing/template")),
  "northline-grooming": dynamic<{ data: TemplateData }>(() => import("../templates/northline-grooming/template")),
  "verdant-house-grooming": dynamic<{ data: TemplateData }>(() => import("../templates/verdant-house-grooming/template")),
  "brightnest-cleaning": dynamic<{ data: TemplateData }>(() => import("../templates/brightnest-cleaning/template")),
  "ash-bridle-barbers": dynamic<{ data: TemplateData }>(() => import("../templates/ash-bridle-barbers/template")),
  "lacquer-form-nail-atelier": dynamic<{ data: TemplateData }>(() => import("../templates/lacquer-form-nail-atelier/template")),
  "harborwell-home-health": dynamic<{ data: TemplateData }>(() => import("../templates/harborwell-home-health/template")),
  "infusion-london": dynamic<{ data: TemplateData }>(() => import("../templates/infusion-london/template")),
  "digital-designer-portfolio": dynamic<{ data: TemplateData }>(() => import("../templates/digital-designer-portfolio/template")),
  "kinetic-frame-studio": dynamic<{ data: TemplateData }>(() => import("../templates/kinetic-frame-studio/template")),
  "software-engineer-portfolio": dynamic<{ data: TemplateData }>(() => import("../templates/software-engineer-portfolio/template")),
  "london-pizza-shop": dynamic<{ data: TemplateData }>(() => import("../templates/london-pizza-shop/template")),
  "moss-marrow-cafe": dynamic<{ data: TemplateData }>(() => import("../templates/moss-marrow-cafe/template")),
  "blush-crumb-bakehouse": dynamic<{ data: TemplateData }>(() => import("../templates/blush-crumb-bakehouse/template")),
  "aurea-objects-shop": dynamic<{ data: TemplateData }>(() => import("../templates/aurea-objects-shop/template")),
  "velour-studio-salon": dynamic<{ data: TemplateData }>(() => import("../templates/velour-studio-salon/template")),
  "harrow-vale-estates": dynamic<{ data: TemplateData }>(() => import("../templates/harrow-vale-estates/template")),
  "ember-grace-church": dynamic<{ data: TemplateData }>(() => import("../templates/ember-grace-church/template")),
  "linden-path-therapy": dynamic<{ data: TemplateData }>(() => import("../templates/linden-path-therapy/template")),
  "the-copper-tap": dynamic<{ data: TemplateData }>(() => import("../templates/the-copper-tap/template")),
  "signal-yard-studio": dynamic<{ data: TemplateData }>(() => import("../templates/signal-yard-studio/template")),
  "modulars": dynamic<{ data: TemplateData }>(() => import("../templates/modulars/template")),
  "forgefit-training": dynamic<{ data: TemplateData }>(() => import("../templates/forgefit-training/template")),
  "rivergate-plumbing": dynamic<{ data: TemplateData }>(() => import("../templates/rivergate-plumbing/template")),
  "hawthorne-fields-academy": dynamic<{ data: TemplateData }>(() => import("../templates/hawthorne-fields-academy/template")),
  "mercer-blythe-solicitors": dynamic<{ data: TemplateData }>(() => import("../templates/mercer-blythe-solicitors/template")),
  "north-ledger-accountants": dynamic<{ data: TemplateData }>(() => import("../templates/north-ledger-accountants/template")),
  "kindred-paws-vets": dynamic<{ data: TemplateData }>(() => import("../templates/kindred-paws-vets/template")),
  "little-lanterns-nursery": dynamic<{ data: TemplateData }>(() => import("../templates/little-lanterns-nursery/template")),
  "borough-motor-works": dynamic<{ data: TemplateData }>(() => import("../templates/borough-motor-works/template")),
  "wildmere-gardens": dynamic<{ data: TemplateData }>(() => import("../templates/wildmere-gardens/template")),
  "tallow-and-sage": dynamic<{ data: TemplateData }>(() => import("../templates/tallow-and-sage/template")),
  "nightjar-and-crown": dynamic<{ data: TemplateData }>(() => import("../templates/nightjar-and-crown/template")),
  "crumb-and-char": dynamic<{ data: TemplateData }>(() => import("../templates/crumb-and-char/template")),
  "forno-sixteen": dynamic<{ data: TemplateData }>(() => import("../templates/forno-sixteen/template")),
  "arcstone-growth": dynamic<{ data: TemplateData }>(() => import("../templates/arcstone-growth/template")),
  "beaniro-cold-brew": dynamic<{ data: TemplateData }>(() => import("../templates/beaniro-cold-brew/template")),
  "lune-leaf-skincare": dynamic<{ data: TemplateData }>(() => import("../templates/lune-leaf-skincare/template")),

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
  "forgefit-training": { config: forgeFitTrainingConfig, component: components["forgefit-training"], defaultData: normalizeData(forgeFitTrainingEditable) },
  "rivergate-plumbing": { config: rivergatePlumbingConfig, component: components["rivergate-plumbing"], defaultData: normalizeData(rivergatePlumbingEditable) },
  "brightnest-cleaning": { config: brightnestCleaningConfig, component: components["brightnest-cleaning"], defaultData: normalizeData(brightnestCleaningEditable) },
  "premium-restaurant": { config: premiumRestaurantConfig, component: components["premium-restaurant"], defaultData: normalizeData(premiumRestaurantEditable) },
  "blush-crumb-bakehouse": { config: blushCrumbBakehouseConfig, component: components["blush-crumb-bakehouse"], defaultData: normalizeData(blushCrumbBakehouseEditable) },
  "northline-grooming": { config: northlineGroomingConfig, component: components["northline-grooming"], defaultData: normalizeData(northlineGroomingEditable) },
  "blueforge-plumbing": { config: blueforgePlumbingConfig, component: components["blueforge-plumbing"], defaultData: normalizeData(blueforgePlumbingEditable) },
  "pizza-light-clean": { config: pizzaLightConfig, component: components["pizza-light-clean"], defaultData: normalizeData(pizzaLightEditable) },
  "little-lanterns-nursery": { config: littleLanternsNurseryConfig, component: components["little-lanterns-nursery"], defaultData: normalizeData(littleLanternsNurseryEditable) },
  "north-ledger-accountants": { config: northLedgerAccountantsConfig, component: components["north-ledger-accountants"], defaultData: normalizeData(northLedgerAccountantsEditable) },
  "harborwell-home-health": { config: harborwellHomeHealthConfig, component: components["harborwell-home-health"], defaultData: normalizeData(harborwellHomeHealthEditable) },
  "linden-path-therapy": { config: lindenPathTherapyConfig, component: components["linden-path-therapy"], defaultData: normalizeData(lindenPathTherapyEditable) },
  "tallow-and-sage": { config: tallowAndSageConfig, component: components["tallow-and-sage"], defaultData: normalizeData(tallowAndSageEditable) },
  "london-pizza-shop": { config: londonPizzaShopConfig, component: components["london-pizza-shop"], defaultData: normalizeData(londonPizzaShopEditable) },
  "lacquer-form-nail-atelier": { config: lacquerFormNailAtelierConfig, component: components["lacquer-form-nail-atelier"], defaultData: normalizeData(lacquerFormNailAtelierEditable) },
  "crumb-and-char": { config: crumbAndCharConfig, component: components["crumb-and-char"], defaultData: normalizeData(crumbAndCharEditable) },
  "signal-yard-studio": { config: signalYardStudioConfig, component: components["signal-yard-studio"], defaultData: normalizeData(signalYardStudioEditable) },
  "the-copper-tap": { config: theCopperTapConfig, component: components["the-copper-tap"], defaultData: normalizeData(theCopperTapEditable) },
  "borough-motor-works": { config: boroughMotorWorksConfig, component: components["borough-motor-works"], defaultData: normalizeData(boroughMotorWorksEditable) },
  "digital-designer-portfolio": { config: digitalDesignerPortfolioConfig, component: components["digital-designer-portfolio"], defaultData: normalizeData(digitalDesignerPortfolioEditable) },
  "kinetic-frame-studio": { config: kineticFrameStudioConfig, component: components["kinetic-frame-studio"], defaultData: normalizeData(kineticFrameStudioEditable) },
  "pastries-snacks-premium": { config: pastriesSnacksConfig, component: components["pastries-snacks-premium"], defaultData: normalizeData(pastriesSnacksEditable) },
  "forgepoint-construction": { config: forgepointConstructionConfig, component: components["forgepoint-construction"], defaultData: normalizeData(forgepointConstructionEditable) },
  "harrow-vale-estates": { config: harrowValeEstatesConfig, component: components["harrow-vale-estates"], defaultData: normalizeData(harrowValeEstatesEditable) },
  "verdant-house-grooming": { config: verdantHouseGroomingConfig, component: components["verdant-house-grooming"], defaultData: normalizeData(verdantHouseGroomingEditable) },
  "ember-grace-church": { config: emberGraceChurchConfig, component: components["ember-grace-church"], defaultData: normalizeData(emberGraceChurchEditable) },
  "aurea-objects-shop": { config: aureaObjectsShopConfig, component: components["aurea-objects-shop"], defaultData: normalizeData(aureaObjectsShopEditable) },
  "kindred-paws-vets": { config: kindredPawsVetsConfig, component: components["kindred-paws-vets"], defaultData: normalizeData(kindredPawsVetsEditable) },
  "forno-sixteen": { config: fornoSixteenConfig, component: components["forno-sixteen"], defaultData: normalizeData(fornoSixteenEditable) },
  "infusion-london": { config: infusionLondonConfig, component: components["infusion-london"], defaultData: normalizeData(infusionLondonEditable) },
  "velour-studio-salon": { config: velourStudioSalonConfig, component: components["velour-studio-salon"], defaultData: normalizeData(velourStudioSalonEditable) },
  "software-engineer-portfolio": { config: softwareEngineerPortfolioConfig, component: components["software-engineer-portfolio"], defaultData: normalizeData(softwareEngineerPortfolioEditable) },
  "coffee-website": { config: coffeeWebsiteConfig, component: components["coffee-website"], defaultData: normalizeData(coffeeWebsiteEditable) },
  "mercer-blythe-solicitors": { config: mercerBlytheSolicitorsConfig, component: components["mercer-blythe-solicitors"], defaultData: normalizeData(mercerBlytheSolicitorsEditable) },
  "ash-bridle-barbers": { config: ashBridleBarbersConfig, component: components["ash-bridle-barbers"], defaultData: normalizeData(ashBridleBarbersEditable) },
  "catering-company-premium": { config: cateringCompanyConfig, component: components["catering-company-premium"], defaultData: normalizeData(cateringCompanyEditable) },
  "nightjar-and-crown": { config: nightjarAndCrownConfig, component: components["nightjar-and-crown"], defaultData: normalizeData(nightjarAndCrownEditable) },
  "moss-marrow-cafe": { config: mossMarrowCafeConfig, component: components["moss-marrow-cafe"], defaultData: normalizeData(mossMarrowCafeEditable) },
  "modulars": { config: modularsConfig, component: components["modulars"], defaultData: normalizeData(modularsEditable) },
  "hawthorne-fields-academy": { config: hawthorneFieldsAcademyConfig, component: components["hawthorne-fields-academy"], defaultData: normalizeData(hawthorneFieldsAcademyEditable) },
  "wildmere-gardens": { config: wildmereGardensConfig, component: components["wildmere-gardens"], defaultData: normalizeData(wildmereGardensEditable) },
  "arcstone-growth": { config: arcstoneGrowthConfig, component: components["arcstone-growth"], defaultData: normalizeData(arcstoneGrowthEditable) },
  "beaniro-cold-brew": { config: beaniroColdBrewConfig, component: components["beaniro-cold-brew"], defaultData: normalizeData(beaniroColdBrewEditable) },
  "lune-leaf-skincare": { config: luneLeafSkincareConfig, component: components["lune-leaf-skincare"], defaultData: normalizeData(luneLeafSkincareEditable) },
};

export function getTemplate(id: string): TemplateEntry | undefined {
  return TEMPLATE_REGISTRY[id];
}

export function getAllTemplates(): TemplateConfig[] {
  return Object.values(TEMPLATE_REGISTRY).map((template) => template.config);
}
