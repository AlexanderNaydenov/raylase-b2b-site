import type { AppLocale } from "@/lib/locales";

export type UiDictionary = {
  navProducts: string;
  navEvents: string;
  navContact: string;
  footerTagline: string;
  footerHq: string;
  footerProducts: string;
  footerEvents: string;
  footerRaylaseRef: string;
  footerDisclaimer: string;
  homeEyebrow: string;
  homeTitle: string;
  homeLead: string;
  homeCtaProducts: string;
  homeCtaEvents: string;
  homeFeaturedTitle: string;
  homeFeaturedSubtitle: string;
  homeViewAll: string;
  productsTitle: string;
  productsLead: string;
  productRequestConsultation: string;
  productBackToCatalog: string;
  productSpecs: string;
  relatedProducts: string;
  carouselPrev: string;
  carouselNext: string;
  cardNoImage: string;
  cardViewDetails: string;
  eventsTitle: string;
  eventsLead: string;
  eventsReadMore: string;
  eventsBack: string;
  typeEvent: string;
  typeWebinar: string;
  typeTradeShow: string;
  typeNews: string;
  metaProducts: string;
  metaEvents: string;
};

const en: UiDictionary = {
  navProducts: "Products",
  navEvents: "Events",
  navContact: "Contact",
  footerTagline:
    "Modular laser scan systems for industrial marking, welding, cutting, and battery applications — with integrated software and control electronics.",
  footerHq: "Headquarters",
  footerProducts: "Products",
  footerEvents: "Events & webinars",
  footerRaylaseRef: "Raylase.de (reference)",
  footerDisclaimer:
    "Demo B2B site — content powered by Hygraph. Not affiliated with RAYLASE GmbH.",
  homeEyebrow: "Industrial laser scanning",
  homeTitle: "Precision scan systems for production lines",
  homeLead:
    "Explore modular XY scanners, pre-focusing optics, FocusShifter modules, SP-ICE control electronics, and RAYGUIDE software — built for repeatable throughput and integration with factory systems.",
  homeCtaProducts: "Browse products",
  homeCtaEvents: "Events & webinars",
  homeFeaturedTitle: "Featured",
  homeFeaturedSubtitle:
    "High-impact systems for conversion-focused product pages",
  homeViewAll: "View all products →",
  productsTitle: "Products",
  productsLead:
    "Catalog-style presentation without checkout — technical specs, narrative copy, and related product suggestions for each solution.",
  productRequestConsultation: "Request consultation",
  productBackToCatalog: "Back to catalog",
  productSpecs: "Specifications",
  relatedProducts: "Related products",
  carouselPrev: "Previous",
  carouselNext: "Next",
  cardNoImage: "No image",
  cardViewDetails: "View details →",
  eventsTitle: "Events & webinars",
  eventsLead:
    "Marketing landing pages for trade shows, online sessions, and announcements — aligned with a B2B conversion journey.",
  eventsReadMore: "Read more →",
  eventsBack: "← All events",
  typeEvent: "Event",
  typeWebinar: "Webinar",
  typeTradeShow: "Trade show",
  typeNews: "News",
  metaProducts: "Products",
  metaEvents: "Events & marketing",
};

const de: UiDictionary = {
  navProducts: "Produkte",
  navEvents: "Veranstaltungen",
  navContact: "Kontakt",
  footerTagline:
    "Modulare Laser-Scansysteme für industrielle Markierung, Schweißen, Schneiden und Batterieanwendungen — mit integrierter Software und Steuerelektronik.",
  footerHq: "Hauptsitz",
  footerProducts: "Produkte",
  footerEvents: "Events & Webinare",
  footerRaylaseRef: "Raylase.de (Referenz)",
  footerDisclaimer:
    "Demo-B2B-Website — Inhalte über Hygraph. Keine Verbindung zur RAYLASE GmbH.",
  homeEyebrow: "Industrielles Laserscannen",
  homeTitle: "Präzise Scansysteme für Fertigungslinien",
  homeLead:
    "Entdecken Sie modulare XY-Scanner, Vorfokus-Optik, FocusShifter-Module, SP-ICE-Steuerelektronik und RAYGUIDE-Software — für reproduzierbare Durchsatzraten und Anbindung an Fabriksysteme.",
  homeCtaProducts: "Produkte ansehen",
  homeCtaEvents: "Events & Webinare",
  homeFeaturedTitle: "Highlights",
  homeFeaturedSubtitle:
    "Leistungsstarke Systeme für konversionsorientierte Produktseiten",
  homeViewAll: "Alle Produkte →",
  productsTitle: "Produkte",
  productsLead:
    "Katalogartige Darstellung ohne Checkout — technische Daten, erzählende Texte und verwandte Produkte für jede Lösung.",
  productRequestConsultation: "Beratung anfragen",
  productBackToCatalog: "Zurück zum Katalog",
  productSpecs: "Spezifikationen",
  relatedProducts: "Verwandte Produkte",
  carouselPrev: "Zurück",
  carouselNext: "Weiter",
  cardNoImage: "Kein Bild",
  cardViewDetails: "Details ansehen →",
  eventsTitle: "Events & Webinare",
  eventsLead:
    "Marketing-Landingpages für Messen, Online-Sessions und Ankündigungen — passend zur B2B-Conversion-Journey.",
  eventsReadMore: "Weiterlesen →",
  eventsBack: "← Alle Events",
  typeEvent: "Event",
  typeWebinar: "Webinar",
  typeTradeShow: "Messe",
  typeNews: "News",
  metaProducts: "Produkte",
  metaEvents: "Events & Marketing",
};

const zh: UiDictionary = {
  navProducts: "产品",
  navEvents: "活动",
  navContact: "联系",
  footerTagline:
    "面向工业打标、焊接、切割与电池应用的模块化激光扫描系统——集成软件与控制电子。",
  footerHq: "总部",
  footerProducts: "产品",
  footerEvents: "活动与网络研讨会",
  footerRaylaseRef: "Raylase.de（参考）",
  footerDisclaimer: "演示 B2B 站点 — 内容由 Hygraph 提供。与 RAYLASE GmbH 无关联。",
  homeEyebrow: "工业激光扫描",
  homeTitle: "面向产线的精密扫描系统",
  homeLead:
    "探索模块化 XY 扫描头、预聚焦光学、FocusShifter 模块、SP-ICE 控制电子与 RAYGUIDE 软件——为可重复产能与工厂系统集成而打造。",
  homeCtaProducts: "浏览产品",
  homeCtaEvents: "活动与网络研讨会",
  homeFeaturedTitle: "精选",
  homeFeaturedSubtitle: "面向高转化产品页的重点系统",
  homeViewAll: "查看全部产品 →",
  productsTitle: "产品",
  productsLead:
    "类目录展示、无结账流程——每款方案包含技术规格、叙述文案与相关产品推荐。",
  productRequestConsultation: "预约咨询",
  productBackToCatalog: "返回目录",
  productSpecs: "规格",
  relatedProducts: "相关产品",
  carouselPrev: "上一页",
  carouselNext: "下一页",
  cardNoImage: "无图片",
  cardViewDetails: "查看详情 →",
  eventsTitle: "活动与网络研讨会",
  eventsLead:
    "面向展会、线上活动与公告的营销落地页——契合 B2B 转化路径。",
  eventsReadMore: "阅读更多 →",
  eventsBack: "← 全部活动",
  typeEvent: "活动",
  typeWebinar: "网络研讨会",
  typeTradeShow: "展会",
  typeNews: "新闻",
  metaProducts: "产品",
  metaEvents: "活动与营销",
};

const map: Record<AppLocale, UiDictionary> = { en, de, zh };

export function getDictionary(locale: AppLocale): UiDictionary {
  return map[locale] ?? en;
}

export function pageTypeLabel(
  locale: AppLocale,
  pageType: string,
): string {
  const d = getDictionary(locale);
  const labels: Record<string, string> = {
    EVENT: d.typeEvent,
    WEBINAR: d.typeWebinar,
    TRADE_SHOW: d.typeTradeShow,
    NEWS: d.typeNews,
  };
  return labels[pageType] ?? pageType;
}
