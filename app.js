const STORAGE_KEY = "granny-menu-builder-v2";
const OLD_STORAGE_KEY = "granny-menu-builder-v1";
const SCHEMA_VERSION = 47;
const DEFAULT_PAGE_WIDTH = 1180;
const DEFAULT_PAGE_HEIGHT = Math.round((1180 * 941) / 1672);
const DEFAULT_PRINT_WIDTH_MM = 297;
const DEFAULT_PRINT_HEIGHT_MM = 167.25;
const PX_PER_MM = DEFAULT_PAGE_WIDTH / DEFAULT_PRINT_WIDTH_MM;
const DEFAULT_PAGE_MARGIN = 34;
const DEFAULT_FOLD_MARGIN = 18;
const FOLD_GRID_PX = 18;
const SNAP_STEP = 2;
const DEFAULT_TITLE_BG = "#fff1f3";
const DEFAULT_TITLE_STROKE = "#e9c6c8";
const ICE_CREAM_TITLE_BG = "#eaf6ff";
const DEFAULT_BLOCK_RADIUS = 9;
const DEFAULT_TITLE_RADIUS = 0;
const DEFAULT_SECTION_PADDING = 14;
const PAPER_PRESETS = {
  custom: { label: "自定义", widthMm: DEFAULT_PRINT_WIDTH_MM, heightMm: DEFAULT_PRINT_HEIGHT_MM },
  a3: { label: "A3", widthMm: 297, heightMm: 420 },
  a4: { label: "A4", widthMm: 210, heightMm: 297 },
  a5: { label: "A5", widthMm: 148, heightMm: 210 },
  b4: { label: "B4", widthMm: 250, heightMm: 353 },
  b5: { label: "B5", widthMm: 176, heightMm: 250 }
};
const FOLD_MODES = {
  none: { label: "不折叠", panels: 1 },
  bi: { label: "双折叠", panels: 2 },
  tri: { label: "三折叠", panels: 3 }
};

const baseSections = {
  pageInfo: {
    id: "page-info",
    type: "pageInfo",
    title: "Page Info",
    titleCn: "页面信息",
    x: 74,
    y: 0,
    w: 26,
    h: 24,
    autoHeight: false,
    noBorder: true,
    transparentBg: true,
    pageKicker: "Signature Noodles",
    pageHeading: "Menu",
    pageWebsite: "www.grannynoodles.co.uk"
  },
  logo: {
    id: "logo",
    type: "logo",
    title: "Logo",
    titleCn: "品牌",
    x: 9,
    y: 0,
    w: 25,
    h: 24,
    autoHeight: false,
    logoText: "Granny Noodles",
    logoCn: "梁匠老大嫂拌面",
    logoSince: "Since 1908",
    logoImage: ""
  },
  legend: {
    id: "legend",
    type: "legend",
    title: "Legend",
    titleCn: "图例",
    x: 0,
    y: 90,
    w: 22,
    h: 6,
    autoHeight: false,
    legendText: "Green V - Vegan"
  },
  social: {
    id: "social",
    type: "social",
    title: "Social Media",
    titleCn: "社交媒体",
    x: 77,
    y: 91,
    w: 22,
    h: 6,
    autoHeight: false,
    noBorder: true,
    transparentBg: true,
    socialHandle: "@GRANNYNOODLESUK",
    socialImages: {}
  },
  tips: {
    id: "tips",
    type: "tips",
    title: "Tips",
    titleCn: "温馨提示",
    x: 29,
    y: 90,
    w: 42,
    h: 8,
    autoHeight: true,
    fontScale: 0.86,
    itemGap: 2,
    titleBgColor: "#fff8df",
    titleStrokeColor: "#ead283",
    items: [
      { name: "Sauce settles at the bottom of the bowl. Please mix well before eating.", desc: "碗底有酱料，食用前请充分搅拌。" },
      { name: "A discretionary 12% service charge will be added to your bill.", desc: "账单将加收 12% 服务费。" }
    ]
  },
  cold: {
    id: "cold",
    type: "list",
    title: "Summer Cold Noodles",
    titleCn: "夏日限定凉面",
    x: 0,
    y: 25,
    w: 30,
    h: 30,
    autoHeight: true,
    items: [
      { name: "Vegan Cold Xiao Mian 素素小面", desc: "Peanuts, Cucumber", price: "£ 10.8", vegan: true },
      { name: "Sesame Sauce Cold Noodles 麻酱凉面", desc: "Sesame Sauce, Peanuts, Cucumber", price: "£ 11.8" },
      { name: "ZaJiang Cold Xiao Mian 炸酱凉面", desc: "Minced Pork, Peanuts, Cucumber", price: "£ 12.8", recommended: true }
    ]
  },
  glass: {
    id: "glass",
    type: "list",
    title: "Sweet Potato Glass Noodles - Hot & Sour Flavor",
    titleCn: "酸辣粉",
    x: 0,
    y: 58,
    w: 30,
    h: 30,
    autoHeight: true,
    items: [
      { name: "Vegan Hot & Sour Glass Noodles 素质酸辣粉", desc: "Vegetables, Peanuts", price: "£ 11.8", vegan: true, spice: 1 },
      { name: "ZaJiang Hot & Sour Glass Noodles 炸酱酸辣粉", desc: "Minced Pork, Vegetables, Peanuts", price: "£ 13.8", spice: 3, recommended: true }
    ]
  },
  xiaomian: {
    id: "xiaomian",
    type: "list",
    title: "Chongqing Xiaomian (Wheat Noodles)",
    titleCn: "重庆小面",
    x: 32,
    y: 25,
    w: 36,
    h: 63,
    autoHeight: true,
    className: "large",
    fontScale: 0.92,
    items: [
      { name: "Chongqing Xiao Mian (Soup / Dry) 小面（汤/干拌）", desc: "Vegetables, Peanuts", price: "£ 10.8", vegan: true, spice: 1, recommended: true },
      { name: "ZaJiang Noodles (Soup / Dry) 炸酱面（汤/干拌）", desc: "Minced Pork, Vegetables, Peanuts", price: "£ 12.8", spice: 2 },
      { name: "ZaJiang & Peas Noodles 豌豆炸酱面（汤/干拌）", desc: "Minced Pork, Vegetables, Peas", price: "£ 13.8", spice: 2 },
      { name: "Peas Noodles 豌豆面", desc: "Vegetables, Peanuts, Peas", price: "£ 11.8", vegan: true },
      { name: "Beef Noodles 牛肉面", desc: "Beef, Vegetables, Peanuts", price: "£ 13.8", spice: 1 },
      { name: "Spicy Beef Noodles 麻辣牛肉面", desc: "Spicy Beef, Vegetables, Peanuts", price: "£ 14.8", spice: 3 },
      { name: "Sichuan Spicy Chicken Noodles 辣子鸡面", desc: "Spicy Chicken, Vegetables, Peanuts", price: "£ 15.8", spice: 2 },
      { name: "Mala Pork Trotter Noodles 麻辣猪蹄面", desc: "Mala Pork Trotter, Vegetables, Peanuts", price: "£ 15.8", spice: 2 },
      { name: "Pork Trotter Noodles 猪蹄面", desc: "Mala Pork Trotter, Vegetables, Peanuts", price: "£ 14.8", spice: 1 },
      { name: "Chicken Soup Noodles 鸡汤面", desc: "Vegetables, Light Chicken Broth", price: "£ 10.8" },
      { name: "Pork Tripe Chicken Noodles 猪肚鸡汤面", desc: "Pork Tripe, Chicken, Vegetables", price: "£ 17.8" }
    ]
  },
  topping: {
    id: "topping",
    type: "list",
    title: "Extra Topping",
    titleCn: "小料",
    x: 71,
    y: 25,
    w: 29,
    h: 63,
    autoHeight: true,
    className: "large",
    items: [
      { name: "Fried Egg 煎鸡蛋", price: "£ 1.5" },
      { name: "Peas 豌豆", price: "£ 1" },
      { name: "Minced Pork 炸酱", price: "£ 2" },
      { name: "Vegetables 蔬菜", price: "£ 1" },
      { name: "Beef 牛肉", price: "£ 4" },
      { name: "Spicy Chicken 辣子鸡", price: "£ 8", spice: 2 },
      { divider: true },
      { name: "Garden Harvest Dumplings (3 pcs) 田园素珍水饺（3个）", price: "£ 4.0" },
      { name: "Signature Pork Dumplings (3 pcs) 醇香鲜肉水饺（3个）", price: "£ 4.5", recommended: true },
      { name: "Jade Prawn Dumplings (3 pcs) 翡翠鲜虾水饺（3个）", price: "£ 4.8" },
      { name: "Black Truffle Beef & Cheese Dumplings (3 pcs) 松露芝香牛肉水饺（3个）", price: "£ 5.0" }
    ]
  }
};

const demoMenu = {
  schemaVersion: SCHEMA_VERSION,
  selectedPage: 0,
  selectedSection: "cold",
  newPageFoldMode: "none",
  pageSettingsScope: "linked",
  zoom: 100,
  snap: true,
  pagePreset: "custom",
  pageOrientation: "landscape",
  pageMargin: DEFAULT_PAGE_MARGIN,
  pageSize: {
    width: DEFAULT_PAGE_WIDTH,
    height: DEFAULT_PAGE_HEIGHT
  },
  pages: [
    {
      id: "noodles",
      kicker: "Signature Noodles",
      title: "Menu",
      website: "www.grannynoodles.co.uk",
      showSocial: false,
      sections: [
        structuredClone(baseSections.pageInfo),
        structuredClone(baseSections.logo),
        structuredClone(baseSections.cold),
        structuredClone(baseSections.glass),
        structuredClone(baseSections.xiaomian),
        structuredClone(baseSections.topping),
        structuredClone(baseSections.legend),
        structuredClone(baseSections.tips),
        structuredClone(baseSections.social)
      ]
    },
    {
      id: "dumplings",
      kicker: "Dumplings & Sides",
      title: "Menu",
      website: "www.grannynoodles.co.uk",
      showSocial: false,
      sections: [
        {
          ...structuredClone(baseSections.pageInfo),
          pageKicker: "Dumplings & Sides",
          pageHeading: "Menu",
          pageWebsite: "www.grannynoodles.co.uk"
        },
        {
          id: "dumpling-step",
          type: "priceGrid",
          title: "Step 1 · Choose Dumplings",
          titleCn: "水饺选择",
          step: "1",
          x: 0,
          y: 15,
          w: 37,
          h: 35,
          autoHeight: true,
          arrowTo: "flavour-step",
          priceBold: true,
          itemGap: 9,
          headers: ["6 pcs", "10 pcs"],
          items: [
            { name: "Garden Harvest Dumplings 田园素珍水饺", prices: ["£6.8", "£10.8"] },
            { name: "Signature Pork Dumplings 醇香鲜肉水饺", prices: ["£7.8", "£11.8"], recommended: true },
            { name: "Jade Prawn Dumplings 翡翠鲜虾水饺", prices: ["£8.8", "£13.8"] },
            { name: "Black Truffle Beef & Cheese Dumplings 松露芝香牛肉水饺", desc: "Beef, Black Truffle, Cheese", prices: ["£9.8", "£15.8"] }
          ]
        },
        {
          id: "flavour-step",
          type: "stepList",
          title: "Step 2 · Choose Flavour",
          titleCn: "水饺风味",
          step: "2",
          subtitle: "Available for all dumplings 所有水饺均可选择",
          x: 40,
          y: 15,
          w: 34,
          h: 35,
          autoHeight: true,
          items: [
            { name: "Boiled / Plain 白的", desc: "with Vinegar 醋 or Chili Sauce 辣椒酱", price: "+£1" },
            { name: "Sour Soup 酸汤", price: "+£1", recommended: true },
            { name: "Chicken Soup 鸡汤", price: "+£1" },
            { name: "Sesame Sauce Dry 麻酱干拌", price: "+£1" },
            { name: "Chili Sesame Dry 红油麻酱干拌", price: "+£1", spice: 2 }
          ]
        },
        {
          id: "drinks",
          type: "list",
          title: "Soft Drinks",
          titleCn: "饮料",
          x: 76,
          y: 15,
          w: 24,
          h: 73,
          autoHeight: true,
          items: [
            { name: "Sprite 雪碧", price: "£3.8" },
            { name: "Coca-Cola 可口可乐", price: "£3.8" },
            { name: "Diet Coke 零度可乐", price: "£3.8" },
            { name: "Aloe Vera Juice 芦荟汁", price: "£4.8" },
            { name: "Wang Lao Ji Herbal Tea 王老吉", price: "£3.8" },
            { name: "Iced Black Tea 冰红茶", price: "£4.8" },
            { name: "Iced Green Tea 冰绿茶", price: "£4.8" },
            { name: "Sour Plum Drink 酸梅汤", price: "£4.8" },
            { name: "Mineral Water 矿泉水", price: "£ 2" },
            { name: "Sparkling Water 气泡水", price: "£ 2" },
            { name: "Hot Green Tea 绿茶（热）", price: "£2.5" }
          ]
        },
        {
          id: "sides",
          type: "list",
          title: "Side Dishes",
          titleCn: "小吃",
          x: 0,
          y: 55,
          w: 37,
          h: 33,
          autoHeight: true,
          items: [
            { name: "Handmade Spiced Dried Tofu", price: "£4.5" },
            { name: "Cucumber Salad", price: "£4.5" },
            { name: "Pork Trotter", price: "£8" },
            { name: "Stir-fried Greens", price: "£5.8" },
            { name: "Stir-fried Broccoli", price: "£5.8" }
          ]
        },
        {
          id: "ice-cream",
          type: "flavourGrid",
          title: "Ice Cream Can",
          titleCn: "罐装冰淇淋",
          subtitle: "Available Flavours 可选口味",
          titleBgColor: ICE_CREAM_TITLE_BG,
          titleStrokeColor: "#b9dcf5",
          deals: [
            { label: "1 can", price: "£4.99" },
            { label: "2 cans", price: "£8.99" }
          ],
          x: 40,
          y: 55,
          w: 34,
          h: 33,
          autoHeight: true,
          items: [
            { name: "Lychee Breeze Sorbet", desc: "荔枝微醺" },
            { name: "Vanilla Cloud", desc: "云朵香草" },
            { name: "Berry Bliss", desc: "莓莓心动" },
            { name: "Salted Caramel Swirl", desc: "海盐焦糖风暴" },
            { name: "Tropical Escape", desc: "热带漫游（芒果椰奶）" },
            { name: "Kyoto Matcha", desc: "京都抹茶" }
          ]
        }
      ]
    }
  ]
};

let state = normalizeState(loadState());
let dragState = null;
let panState = null;
let copiedSection = null;
let fitQueued = false;
let didInitialCenter = false;

const els = {
  canvas: document.querySelector("#menuCanvas"),
  canvasViewport: document.querySelector(".canvas-wrap"),
  pageSelect: document.querySelector("#pageSelect"),
  newPageFoldMode: document.querySelector("#newPageFoldMode"),
  newPageDialog: document.querySelector("#newPageDialog"),
  newPageForm: document.querySelector("#newPageForm"),
  newPageName: document.querySelector("#newPageName"),
  newPagePreset: document.querySelector("#newPagePreset"),
  newPageOrientation: document.querySelector("#newPageOrientation"),
  newPageWidth: document.querySelector("#newPageWidth"),
  newPageHeight: document.querySelector("#newPageHeight"),
  newPageMargin: document.querySelector("#newPageMargin"),
  pagePreset: document.querySelector("#pagePreset"),
  pageOrientation: document.querySelector("#pageOrientation"),
  pageSettingsScope: document.querySelector("#pageSettingsScope"),
  pageFoldMode: document.querySelector("#pageFoldMode"),
  foldMarginGrid: document.querySelector("#foldMarginGrid"),
  pageMargin: document.querySelector("#pageMargin"),
  foldMargins: [
    document.querySelector("#foldMargin1"),
    document.querySelector("#foldMargin2"),
    document.querySelector("#foldMargin3")
  ],
  pageWidth: document.querySelector("#pageWidth"),
  pageHeight: document.querySelector("#pageHeight"),
  pageBackgroundImage: document.querySelector("#pageBackgroundImage"),
  clearPageBackground: document.querySelector("#clearPageBackground"),
  sectionList: document.querySelector("#sectionList"),
  sectionEditor: document.querySelector("#sectionEditor"),
  addPage: document.querySelector("#addPage"),
  deletePage: document.querySelector("#deletePage"),
  addSection: document.querySelector("#addSection"),
  copySection: document.querySelector("#copySection"),
  pasteSection: document.querySelector("#pasteSection"),
  deleteSection: document.querySelector("#deleteSection"),
  printPdf: document.querySelector("#printPdf"),
  exportImage: document.querySelector("#exportImage"),
  imageFormat: document.querySelector("#imageFormat"),
  colorSpace: document.querySelector("#colorSpace"),
  exportScale: document.querySelector("#exportScale"),
  resetDemo: document.querySelector("#resetDemo"),
  zoomRange: document.querySelector("#zoomRange"),
  zoomValue: document.querySelector("#zoomValue"),
  centerCanvas: document.querySelector("#centerCanvas"),
  snapToggle: document.querySelector("#snapToggle"),
  exportProject: document.querySelector("#exportProject"),
  importProject: document.querySelector("#importProject"),
  projectFile: document.querySelector("#projectFile")
};

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(OLD_STORAGE_KEY);
  if (!saved) return structuredClone(demoMenu);
  try {
    return JSON.parse(saved);
  } catch {
    return structuredClone(demoMenu);
  }
}

function normalizeState(input) {
  const next = structuredClone(input || demoMenu);
  const needsCanvasMigration = next.schemaVersion < 3;
  const needsLegendMigration = next.schemaVersion < 11;
  const needsDemoLayoutCleanup = next.schemaVersion < 13;
  const needsTipsMigration = next.schemaVersion < 33;
  const needsPageInfoMigration = next.schemaVersion < 43;
  next.schemaVersion = SCHEMA_VERSION;
  next.zoom = clamp(Number(next.zoom || 100), 20, 300);
  next.snap = next.snap !== false;
  next.newPageFoldMode = FOLD_MODES[next.newPageFoldMode] ? next.newPageFoldMode : "none";
  next.pageSettingsScope = ["linked", "current"].includes(next.pageSettingsScope) ? next.pageSettingsScope : "linked";
  next.pageMargin = normalizePageMargin(next.pageMargin);
  next.pagePreset = PAPER_PRESETS[next.pagePreset] ? next.pagePreset : "custom";
  next.pageOrientation = ["landscape", "portrait"].includes(next.pageOrientation)
    ? next.pageOrientation
    : inferOrientation(next.pageSize);
  next.pageSize = normalizePageSize(next.pageSize);
  next.selectedPage = Number(next.selectedPage || 0);
  next.selectedSection = typeof next.selectedSection === "string" ? next.selectedSection : "";
  next.pages = Array.isArray(next.pages) ? next.pages : structuredClone(demoMenu.pages);
  if (next.pages.length) {
    next.selectedPage = clamp(next.selectedPage, 0, next.pages.length - 1);
  } else {
    next.selectedPage = 0;
    next.selectedSection = "";
  }

  next.pages.forEach((page, pageIndex) => {
    page.id ||= `page-${pageIndex}`;
    page.kicker ||= "Menu";
    page.title ||= "Menu";
    page.website ||= "";
    page.backgroundImage ||= "";
    page.socialImages ||= {};
    if (page.pagePreset && !PAPER_PRESETS[page.pagePreset]) delete page.pagePreset;
    if (page.pageOrientation && !["landscape", "portrait"].includes(page.pageOrientation)) delete page.pageOrientation;
    if (page.pageSize) page.pageSize = normalizePageSize(page.pageSize);
    if (page.pageMargin !== undefined) page.pageMargin = normalizePageMargin(page.pageMargin);
    page.foldMode = FOLD_MODES[page.foldMode] ? page.foldMode : "none";
    page.foldMargins = normalizeFoldMargins(page.foldMargins, page.foldMode);
    page.sections = Array.isArray(page.sections) ? page.sections : [];
    if (needsPageInfoMigration && !page.sections.some((section) => section.type === "pageInfo")) {
      page.sections.unshift(createPageInfoSection(page, pageIndex));
    }
    if (page.showBrand && !page.sections.some((section) => section.type === "logo")) {
      page.sections.unshift(structuredClone(baseSections.logo));
    }
    if ((page.showSocial || needsLegendMigration) && !page.sections.some((section) => section.type === "legend") && page.id === "noodles") {
      page.sections.push(structuredClone(baseSections.legend));
    }
    if ((page.showSocial || page.socialImages) && !page.sections.some((section) => section.type === "social") && page.id === "noodles") {
      const social = structuredClone(baseSections.social);
      social.socialImages = structuredClone(page.socialImages || {});
      page.sections.push(social);
      page.showSocial = false;
    }
    if (needsTipsMigration && page.id === "noodles" && !page.sections.some((section) => section.type === "tips")) {
      page.sections.push(structuredClone(baseSections.tips));
    }
    if (needsDemoLayoutCleanup && page.id === "noodles") {
      ["cold", "glass", "xiaomian", "topping", "legend", "social"].forEach((id) => {
        const section = page.sections.find((item) => item.id === id);
        if (!section || !baseSections[id]) return;
        Object.assign(section, {
          x: baseSections[id].x,
          y: baseSections[id].y,
          w: baseSections[id].w,
          h: baseSections[id].h
        });
      });
    }
    if (needsCanvasMigration && page.sections.some((section) => section.type === "logo")) {
      page.sections.forEach((section) => {
        if (section.type !== "logo" && Number(section.y || 0) < 25) {
          section.y = Number(section.y || 0) + 8;
          section.h = Math.max(18, Number(section.h || 24) - 8);
        }
      });
    }
    page.sections.forEach((section, sectionIndex) => normalizeSection(section, sectionIndex, page.sections.length));
    syncPageInfoSection(page);
  });

  const page = next.pages[next.selectedPage] || next.pages[0];
  if (!page) {
    next.selectedSection = "";
  } else if (next.selectedSection && !page.sections.some((section) => section.id === next.selectedSection)) {
    next.selectedSection = page.sections[0]?.id || "";
  }
  return next;
}

function normalizeSection(section, index, total) {
  section.id ||= `section-${index}-${Date.now()}`;
  section.type ||= "list";
  section.title ||= section.type === "logo" ? "Logo" : "New Section";
  section.titleCn ||= "";
  section.items = Array.isArray(section.items) ? section.items : [];
  section.autoHeight = section.autoHeight !== false;
  section.fontScale = Number(section.fontScale || 1);
  section.titleScale = Number(section.titleScale || 1);
  section.blockRadius = normalizeRadius(section.blockRadius, DEFAULT_BLOCK_RADIUS);
  section.titleRadius = normalizeRadius(section.titleRadius, DEFAULT_TITLE_RADIUS);
  section.sectionPadding = normalizeSectionPadding(section.sectionPadding, defaultSectionPadding(section));
  section.titleBgColor = normalizeColor(section.titleBgColor, defaultTitleBgColor(section));
  section.titleStrokeColor = normalizeColor(section.titleStrokeColor, defaultTitleStrokeColor(section));
  section.boldTitle = section.boldTitle !== false;
  section.boldItems = section.boldItems !== false;
  section.priceBold = section.priceBold === true || section.id === "dumpling-step";
  section.itemGap = Number.isFinite(Number(section.itemGap))
    ? Number(section.itemGap)
    : defaultItemGap(section);
  if (section.type === "flavourGrid") {
    section.deals = normalizeDeals(section);
    if (!section.subtitle || /can|£/.test(section.subtitle)) section.subtitle = "Available Flavours 可选口味";
  }
  section.spicePosition ||= "before";
  section.veganPosition ||= "before";
  section.recommendPosition ||= "before";
  if (["xiaomian", "topping"].includes(section.id) && !section.className) section.className = "large";
  if (section.type === "social") {
    section.socialHandle ||= "@GRANNYNOODLESUK";
    section.socialImages ||= {};
    section.noBorder = section.noBorder !== false;
    section.transparentBg = section.transparentBg !== false;
  }
  if (section.type === "tips") {
    section.fontScale = Number(section.fontScale || 0.86);
    section.itemGap = Number.isFinite(Number(section.itemGap)) ? Number(section.itemGap) : 2;
    section.hideTitle = section.hideTitle === true;
    if (!section.items.length) section.items = structuredClone(baseSections.tips.items);
  }
  if (section.type === "pageInfo") {
    section.items = [];
    section.pageKicker ||= section.title === "Page Info" ? "" : section.pageKicker;
    section.pageHeading ||= "";
    section.pageWebsite ||= "";
    section.noBorder = section.noBorder !== false;
    section.transparentBg = section.transparentBg !== false;
  }
  section.noBorder = section.noBorder === true;
  section.transparentBg = section.transparentBg === true;
  if (section.type === "logo" && Number(section.h || 0) < 22) {
    section.y = Math.min(Number(section.y || 0), 2);
    section.h = 24;
  }

  if (Number.isFinite(section.x) && Number.isFinite(section.y) && Number.isFinite(section.w) && Number.isFinite(section.h)) {
    clampFrame(section);
    return;
  }

  const legacy = legacyFrame(section, index, total);
  Object.assign(section, legacy);
}

function createPageInfoSection(page, pageIndex = 0) {
  const section = structuredClone(baseSections.pageInfo);
  section.id = pageIndex ? `page-info-${pageIndex}` : "page-info";
  section.pageKicker = page.kicker || section.pageKicker;
  section.pageHeading = page.title || section.pageHeading;
  section.pageWebsite = page.website || section.pageWebsite;
  return section;
}

function syncPageInfoSection(page) {
  const section = page.sections.find((item) => item.type === "pageInfo");
  if (!section) return;
  section.pageKicker ||= page.kicker || "";
  section.pageHeading ||= page.title || "";
  section.pageWebsite ||= page.website || "";
}

function legacyFrame(section, index, total) {
  const column = String(section.gridColumn || "");
  const row = String(section.gridRow || "");
  if (column.includes("2")) return { x: 32, y: 17, w: 36, h: 71 };
  if (column.includes("3")) return { x: 71, y: 17, w: 29, h: 71 };
  if (row.includes("2")) return { x: 0, y: 57, w: 30, h: 31 };
  const columns = Math.min(3, Math.max(1, total));
  const col = index % columns;
  const rowIndex = Math.floor(index / columns);
  return { x: col * 33, y: 17 + rowIndex * 34, w: 31, h: 31 };
}

function defaultItemGap(section) {
  if (section.type === "stepList") return 9;
  if (section.className === "large" || ["xiaomian", "topping"].includes(section.id)) return 2;
  return 8;
}

function normalizeDeals(section) {
  if (Array.isArray(section.deals) && section.deals.length) {
    return section.deals.map((deal) => ({
      label: deal.label || "",
      price: deal.price || ""
    }));
  }
  if (section.id === "ice-cream") {
    return [
      { label: "1 can", price: "£4.99" },
      { label: "2 cans", price: "£8.99" }
    ];
  }
  return [];
}

function defaultTitleBgColor(section) {
  return section.id === "ice-cream" || section.type === "flavourGrid" ? ICE_CREAM_TITLE_BG : DEFAULT_TITLE_BG;
}

function defaultTitleStrokeColor(section) {
  return section.id === "ice-cream" || section.type === "flavourGrid" ? "#b9dcf5" : DEFAULT_TITLE_STROKE;
}

function normalizeColor(value, fallback) {
  const color = String(value || "").trim();
  return /^#[0-9a-f]{6}$/i.test(color) ? color : fallback;
}

function normalizeRadius(value, fallback) {
  return clamp(Number.isFinite(Number(value)) ? Number(value) : fallback, 0, 40);
}

function normalizeSectionPadding(value, fallback = DEFAULT_SECTION_PADDING) {
  return clamp(Number.isFinite(Number(value)) ? Number(value) : fallback, 0, 48);
}

function defaultSectionPadding(section = {}) {
  if (["logo", "social", "pageInfo"].includes(section.type)) return 0;
  if (section.type === "tips") return 6;
  if (section.className === "large" || ["xiaomian", "topping"].includes(section.id)) return 10;
  return DEFAULT_SECTION_PADDING;
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Project autosave skipped, likely because uploaded images are too large.", error);
  }
}

function normalizePageSize(size = {}) {
  return {
    width: clamp(Number(size.width || DEFAULT_PAGE_WIDTH), 100, 5000),
    height: clamp(Number(size.height || DEFAULT_PAGE_HEIGHT), 100, 5000)
  };
}

function normalizePageMargin(value) {
  return clamp(Number.isFinite(Number(value)) ? Number(value) : DEFAULT_PAGE_MARGIN, 0, 180);
}

function normalizeFoldMargin(value) {
  return clamp(Number.isFinite(Number(value)) ? Number(value) : DEFAULT_FOLD_MARGIN, 0, 120);
}

function foldPanelCount(mode = "none") {
  return FOLD_MODES[mode]?.panels || 1;
}

function normalizeFoldMargins(margins = [], mode = "none") {
  const count = foldPanelCount(mode);
  return Array.from({ length: 3 }, (_, index) => {
    const fallback = margins[index] ?? margins[0] ?? DEFAULT_FOLD_MARGIN;
    return index < count ? normalizeFoldMargin(fallback) : DEFAULT_FOLD_MARGIN;
  });
}

function pageSettings(page = activePage()) {
  return {
    preset: PAPER_PRESETS[page?.pagePreset] ? page.pagePreset : state.pagePreset,
    orientation: ["landscape", "portrait"].includes(page?.pageOrientation) ? page.pageOrientation : state.pageOrientation,
    margin: normalizePageMargin(page?.pageMargin ?? state.pageMargin),
    size: normalizePageSize(page?.pageSize || state.pageSize)
  };
}

function effectivePageSize(page = activePage()) {
  return pageSettings(page).size;
}

function ensureCurrentPageSettings() {
  const page = activePage();
  if (!page) return state;
  const settings = pageSettings(page);
  page.pagePreset = settings.preset;
  page.pageOrientation = settings.orientation;
  page.pageSize = normalizePageSize(settings.size);
  page.pageMargin = settings.margin;
  return page;
}

function pageLayoutTargets() {
  if (state.pageSettingsScope === "current") {
    const page = ensureCurrentPageSettings();
    return page === state ? [] : [page];
  }
  return [state, ...state.pages];
}

function pageFoldTargets() {
  const page = activePage();
  if (!page) return [];
  return state.pageSettingsScope === "current" ? [page] : state.pages;
}

function inferOrientation(size = {}) {
  return Number(size.height || DEFAULT_PAGE_HEIGHT) > Number(size.width || DEFAULT_PAGE_WIDTH) ? "portrait" : "landscape";
}

function paperSizeFor(preset = state.pagePreset, orientation = state.pageOrientation) {
  const paper = PAPER_PRESETS[preset] || PAPER_PRESETS.custom;
  const portrait = {
    widthMm: Math.min(paper.widthMm, paper.heightMm),
    heightMm: Math.max(paper.widthMm, paper.heightMm)
  };
  if (orientation === "landscape") {
    return { widthMm: portrait.heightMm, heightMm: portrait.widthMm };
  }
  return portrait;
}

function pixelsFromPaper(preset = state.pagePreset, orientation = state.pageOrientation) {
  const paper = paperSizeFor(preset, orientation);
  return normalizePageSize({
    width: Math.round(paper.widthMm * PX_PER_MM),
    height: Math.round(paper.heightMm * PX_PER_MM)
  });
}

function printSizeMm(page = activePage()) {
  const settings = pageSettings(page);
  if (settings.preset !== "custom") return paperSizeFor(settings.preset, settings.orientation);
  const size = settings.size;
  return {
    widthMm: (size.width * DEFAULT_PRINT_WIDTH_MM) / DEFAULT_PAGE_WIDTH,
    heightMm: (size.height * DEFAULT_PRINT_HEIGHT_MM) / DEFAULT_PAGE_HEIGHT
  };
}

function activePage() {
  return state.pages[state.selectedPage] || null;
}

function activeSection() {
  const page = activePage();
  if (!page) return null;
  if (!state.selectedSection) return null;
  return page.sections.find((section) => section.id === state.selectedSection) || null;
}

function activePageInfoSection(page = activePage()) {
  if (!page) return null;
  return page.sections.find((section) => section.type === "pageInfo");
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function icon(name) {
  return `<svg class="icon" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
}

function render() {
  state = normalizeState(state);
  renderControls();
  renderCanvas();
  if (constrainVisibleSectionsToFold()) renderCanvas();
  renderSectionEditor();
  applyPageSize();
  applyZoom();
  queueInitialCanvasCenter();
  queueAutoFit();
  saveState();
}

function refreshPreview() {
  renderControls();
  renderCanvas();
  if (constrainVisibleSectionsToFold()) renderCanvas();
  applyPageSize();
  applyZoom();
  queueAutoFit();
  saveState();
}

function renderControls() {
  els.pageSelect.innerHTML = state.pages
    .map((page, index) => `<option value="${index}">${escapeHtml(page.kicker)} · ${escapeHtml(page.title)}</option>`)
    .join("");
  els.pageSelect.value = state.pages.length ? String(state.selectedPage) : "";
  els.newPageFoldMode.value = state.newPageFoldMode;

  const page = activePage();
  const settings = pageSettings(page);
  els.pageSettingsScope.value = state.pageSettingsScope;
  els.pagePreset.value = settings.preset;
  els.pageOrientation.value = settings.orientation;
  els.pageFoldMode.value = page?.foldMode || "none";
  els.pageMargin.value = Math.round(settings.margin);
  updateFoldMarginControls(page);
  els.pageWidth.value = Math.round(settings.size.width);
  els.pageHeight.value = Math.round(settings.size.height);
  els.zoomRange.value = String(state.zoom);
  els.zoomValue.textContent = `${state.zoom}%`;
  els.snapToggle.checked = state.snap;
  els.pageSelect.disabled = !state.pages.length;
  els.deletePage.disabled = !state.pages.length;
  els.addSection.disabled = !page;
  els.deleteSection.disabled = !activeSection();
  els.pageFoldMode.disabled = !page;
  els.pageBackgroundImage.disabled = !page;
  els.clearPageBackground.disabled = !page;
  els.copySection.disabled = !activeSection();
  els.pasteSection.disabled = !copiedSection || !page;

  if (!page) {
    els.sectionList.innerHTML = `<p class="editor-empty">还没有页面。点击 + 新建空白页。</p>`;
    return;
  }

  els.sectionList.innerHTML = page.sections
    .map((section) => `
      <button class="section-button ${section.id === state.selectedSection ? "active" : ""}" data-section-id="${section.id}">
        <span>${escapeHtml(section.title)}</span>
        <small>${section.type === "logo" ? "logo" : `${Math.round(section.w)}×${Math.round(section.h)}`}</small>
      </button>
    `)
    .join("");
}

function updateFoldMarginControls(page = activePage()) {
  const count = page ? foldPanelCount(page.foldMode) : 1;
  const folded = Boolean(page) && count > 1;
  els.foldMarginGrid.hidden = !folded;
  const foldMargins = page
    ? normalizeFoldMargins(page.foldMargins, page.foldMode)
    : normalizeFoldMargins([], "none");
  els.foldMargins.forEach((input, index) => {
    const visible = folded && index < count;
    input.value = Math.round(foldMargins[index]);
    input.closest(".property-field").hidden = !visible;
  });
}

function renderCanvas() {
  els.canvas.innerHTML = state.pages.map((page, index) => renderPage(page, index)).join("");
}

function constrainVisibleSectionsToFold() {
  const page = activePage();
  const rect = activeGridRect();
  if (!page || !rect || foldPanelCount(page.foldMode) <= 1) return false;
  let changed = false;
  page.sections.forEach((section) => {
    const before = `${round(section.x)},${round(section.y)},${round(section.w)},${round(section.h)}`;
    constrainSectionToFold(section, page, rect);
    const after = `${round(section.x)},${round(section.y)},${round(section.w)},${round(section.h)}`;
    if (before !== after) changed = true;
  });
  return changed;
}

function applyPageSize() {
  const size = effectivePageSize();
  const margin = pageSettings().margin;
  document.documentElement.style.setProperty("--page-width", `${size.width}px`);
  document.documentElement.style.setProperty("--page-height", `${size.height}px`);
  document.documentElement.style.setProperty("--page-margin", `${margin}px`);

  const { widthMm: printWidthMm, heightMm: printHeightMm } = printSizeMm();
  let style = document.querySelector("#dynamicPrintSize");
  if (!style) {
    style = document.createElement("style");
    style.id = "dynamicPrintSize";
    document.head.appendChild(style);
  }
  style.textContent = `
    @page { size: ${printWidthMm.toFixed(2)}mm ${printHeightMm.toFixed(2)}mm; margin: 0; }
    @media print {
      .menu-page {
        width: ${printWidthMm.toFixed(2)}mm !important;
        height: ${printHeightMm.toFixed(2)}mm !important;
      }
    }
  `;
}

function renderPage(page, pageIndex) {
  const background = page.backgroundImage
    ? `<img class="page-bg-image" src="${page.backgroundImage}" alt="">`
    : "";
  const settings = pageSettings(page);
  const foldCount = foldPanelCount(page.foldMode);
  const pageStyle = [
    `--page-width:${settings.size.width}px`,
    `--page-height:${settings.size.height}px`,
    `--page-margin:${settings.margin}px`
  ].join(";");
  return `
    <article class="menu-page" style="${pageStyle}" data-page-index="${pageIndex}">
      ${background}
      <div class="sections-grid ${foldCount > 1 ? "folded-grid" : ""}">
        ${renderFoldGuides(page)}
        ${page.sections.map((section) => renderSection(section, pageIndex)).join("")}
        ${renderArrows(page)}
      </div>
    </article>
  `;
}

function renderFoldGuides(page) {
  const count = foldPanelCount(page.foldMode);
  if (count <= 1) return "";
  const margins = normalizeFoldMargins(page.foldMargins, page.foldMode);
  return `
    <div class="fold-guides fold-${count}" aria-hidden="true">
      ${Array.from({ length: count }, (_, index) => `
        <div class="fold-panel" style="--fold-panel-margin:${margins[index]}px">
          <div class="fold-panel-grid"></div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderArrows(page) {
  const arrows = page.sections
    .filter((section) => section.arrowTo && page.sections.some((target) => target.id === section.arrowTo))
    .map((section) => {
      const target = page.sections.find((item) => item.id === section.arrowTo);
      const x1 = section.x + section.w;
      const y1 = section.y + section.h / 2;
      const x2 = target.x;
      const y2 = target.y + target.h / 2;
      const mid = (x1 + x2) / 2;
      return `<path d="M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}" />`;
    }).join("");
  if (!arrows) return "";
  return `
    <svg class="connector-layer" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <marker id="arrowHead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z"></path>
        </marker>
      </defs>
      ${arrows}
    </svg>
  `;
}

function renderSection(section, pageIndex) {
  const style = [
    `left:${section.x}%`,
    `top:${section.y}%`,
    `width:${section.w}%`,
    `height:${section.h}%`,
    `--section-scale:${section.fontScale || 1}`,
    `--title-scale:${section.titleScale || 1}`,
    `--block-radius:${normalizeRadius(section.blockRadius, DEFAULT_BLOCK_RADIUS)}px`,
    `--title-radius:${normalizeRadius(section.titleRadius, DEFAULT_TITLE_RADIUS)}px`,
    `--title-bg:${normalizeColor(section.titleBgColor, defaultTitleBgColor(section))}`,
    `--title-stroke:${normalizeColor(section.titleStrokeColor, defaultTitleStrokeColor(section))}`,
    `--section-padding:${normalizeSectionPadding(section.sectionPadding, defaultSectionPadding(section))}px`,
    `--item-gap:${Number(section.itemGap ?? defaultItemGap(section))}px`
  ].join(";");
  const selected = pageIndex === state.selectedPage && section.id === state.selectedSection;
  const classes = [
    "menu-block",
    section.type === "pageInfo" ? "page-info-block" : "",
    section.type === "logo" ? "logo-block" : "",
    section.type === "social" ? "social-block" : "",
    section.type === "tips" ? "tips-block" : "",
    section.noBorder ? "no-border" : "",
    section.transparentBg ? "transparent-bg" : "",
    selected ? "is-selected" : "",
    section.autoHeight ? "auto-fit" : "",
    section.className || ""
  ].filter(Boolean).join(" ");

  return `
    <section class="${classes}" style="${style}" data-section-id="${section.id}" data-page-index="${pageIndex}">
      <div class="module-toolbar">${escapeHtml(section.title)} · 拖动移动</div>
      ${renderSectionHeader(section)}
      <div class="block-body">
        ${renderSectionBody(section)}
      </div>
      <span class="resize-handle" data-resize-handle="true"></span>
    </section>
  `;
}

function renderSectionHeader(section) {
  if (["logo", "legend", "social", "pageInfo"].includes(section.type)) return "";
  if (section.type === "tips" && section.hideTitle) return "";
  if (section.type === "priceGrid" || section.type === "stepList") {
    return `
      <div class="block-body step-head">
        <div class="step-title">
          <span class="step-number">${escapeHtml(section.step || "")}</span>
          <span class="step-copy">${escapeHtml(section.title)} <span>${escapeHtml(section.titleCn || "")}</span></span>
        </div>
        ${section.subtitle ? `<div class="step-subtitle">${escapeHtml(section.subtitle)}</div>` : ""}
      </div>
    `;
  }

  return `
    <div class="block-title ${section.boldTitle ? "is-bold" : ""}">
      <span>${escapeHtml(section.title)}</span>
      ${section.titleCn ? `<span class="cn">${escapeHtml(section.titleCn)}</span>` : ""}
    </div>
  `;
}

function renderSectionBody(section) {
  if (section.type === "pageInfo") return renderPageInfo(section);
  if (section.type === "logo") return renderLogo(section);
  if (section.type === "legend") return renderLegend(section);
  if (section.type === "social") return renderSocial(section);
  if (section.type === "tips") return renderTips(section);
  if (section.type === "priceGrid") return renderPriceGrid(section);
  if (section.type === "stepList") return renderStepList(section);
  if (section.type === "flavourGrid") return renderFlavourGrid(section);
  return renderList(section);
}

function renderPageInfo(section) {
  return `
    <div class="page-info-content">
      <div class="page-info-kicker">${escapeHtml(section.pageKicker || "")}</div>
      <div class="page-info-heading">${escapeHtml(section.pageHeading || "Menu")}</div>
      <div class="page-info-rule"></div>
      <div class="page-info-website">${escapeHtml(section.pageWebsite || "")}</div>
    </div>
  `;
}

function renderLegend(section) {
  return `
    <div class="legend-content">
      <span class="vegan">V</span>
      <span>${escapeHtml(section.legendText || "Green V - Vegan")}</span>
    </div>
  `;
}

function renderSocial(section) {
  const socialIcon = (key, fallback, className) => section.socialImages?.[key]
    ? `<span class="social-icon custom"><img src="${section.socialImages[key]}" alt="${key}"></span>`
    : `<span class="social-icon ${className}">${fallback}</span>`;
  return `
    <div class="social-content">
      ${socialIcon("facebook", "f", "facebook")}
      ${socialIcon("tiktok", "♪", "tiktok")}
      ${socialIcon("instagram", "◎", "instagram")}
      <span class="social-handle">${escapeHtml(section.socialHandle || "@GRANNYNOODLESUK")}</span>
    </div>
  `;
}

function renderLogo(section) {
  const image = section.logoImage
    ? `<img class="logo-image" src="${section.logoImage}" alt="${escapeHtml(section.logoText || "Logo")}">`
    : `<div class="chef-icon">♨</div>`;
  const logoCn = String(section.logoCn || "").trim();
  return `
    <div class="logo-content">
      ${image}
      <div class="brand-name">${escapeHtml(section.logoText || "Granny Noodles")}</div>
      ${logoCn ? `<div class="brand-cn">${escapeHtml(logoCn)}</div>` : ""}
      <div class="brand-since">${escapeHtml(section.logoSince || "")}</div>
    </div>
  `;
}

function renderTips(section) {
  return `
    <div class="tips-content">
      ${section.items.map((item) => `
        <div class="tip-item" style="${itemStyle(item)}">
          <strong>${escapeHtml(item.name || "")}</strong>
          ${item.desc ? `<span>${escapeHtml(item.desc)}</span>` : ""}
        </div>
      `).join("")}
    </div>
  `;
}

function renderList(section) {
  return section.items.map((item) => {
    if (item.divider) return `<div class="divider"></div>`;
    if (item.header) return `<div class="block-title item-heading" style="${itemStyle(item)}">${escapeHtml(item.name)}</div>`;
    return `
      <div class="menu-item" style="${itemStyle(item)}">
        <div class="item-line">
          <span class="item-name ${item.bold || section.boldItems ? "is-bold" : ""}">${renderBadges(item, section, "before")}${escapeHtml(item.name)}${renderBadges(item, section, "after")}</span>
          <span class="dots"></span>
          <span class="price ${item.bold || section.boldItems ? "is-bold" : ""}">${escapeHtml(item.price || "")}</span>
        </div>
        ${renderDescription(item, section)}
      </div>
    `;
  }).join("");
}

function renderDescription(item, section) {
  const spice = section.spicePosition === "desc" ? renderSpice(item) : "";
  const vegan = section.veganPosition === "desc" ? renderVegan(item) : "";
  const recommended = section.recommendPosition === "desc" ? renderRecommend(item) : "";
  const desc = [escapeHtml(item.desc || ""), recommended, vegan, spice].filter(Boolean).join(" ");
  return desc ? `<p class="item-desc">${desc}</p>` : "";
}

function renderDescriptionInline(item, section) {
  const spice = section.spicePosition === "desc" ? renderSpice(item) : "";
  const vegan = section.veganPosition === "desc" ? renderVegan(item) : "";
  const recommended = section.recommendPosition === "desc" ? renderRecommend(item) : "";
  return [escapeHtml(item.desc || ""), recommended, vegan, spice].filter(Boolean).join(" ");
}

function renderBadges(item, section, slot = "before") {
  const recommended = section.recommendPosition === slot ? renderRecommend(item) : "";
  const vegan = section.veganPosition === slot ? renderVegan(item) : "";
  const spice = section.spicePosition === slot ? renderSpice(item) : "";
  if (!recommended && !vegan && !spice) return "";
  return `<span class="badges badges-${slot}">${recommended}${vegan}${spice}</span>`;
}

function renderRecommend(item) {
  return item.recommended ? `<span class="recommend-badge">👍</span>` : "";
}

function renderVegan(item) {
  return item.vegan ? `<span class="vegan">V</span>` : "";
}

function renderSpice(item) {
  return Number(item.spice || 0) > 0 ? `<span class="chilli">${"🌶️".repeat(Number(item.spice))}</span>` : "";
}

function renderPriceGrid(section) {
  return `
    <div class="price-grid header">
      <span class="name"></span>
      ${(section.headers || []).map((header) => `<span>${escapeHtml(header)}</span>`).join("")}
    </div>
    ${section.items.map((item) => `
      <div class="menu-item" style="${itemStyle(item)}">
        <div class="price-grid">
          <span class="name ${item.bold || section.boldItems ? "is-bold" : ""}">${renderBadges(item, section, "before")}${escapeHtml(item.name)}${renderBadges(item, section, "after")}</span>
          ${(item.prices || []).map((price) => `<span class="cell ${item.bold || section.priceBold ? "is-bold" : ""}">${escapeHtml(price)}</span>`).join("")}
        </div>
        ${renderDescription(item, section)}
      </div>
    `).join("")}
  `;
}

function renderStepList(section) {
  return section.items.map((item) => `
    <div class="rule-item" style="${itemStyle(item)}">
      <span class="name ${item.bold || section.boldItems ? "is-bold" : ""}">${renderBadges(item, section, "before")}${escapeHtml(item.name)}${renderBadges(item, section, "after")} ${item.desc ? `<small>${renderDescriptionInline(item, section)}</small>` : ""}</span>
      <span>${escapeHtml(item.price || "")}</span>
    </div>
  `).join("");
}

function renderFlavourGrid(section) {
  const midpoint = Math.ceil(section.items.length / 2);
  const columns = [section.items.slice(0, midpoint), section.items.slice(midpoint)];
  return `
    ${renderFlavourDeals(section)}
    ${section.subtitle ? `<div class="flavour-caption">${escapeHtml(section.subtitle)}</div>` : ""}
    <div class="flavour-grid">
      ${columns.map((items) => `
        <ul>
          ${items.map((item) => `<li style="${itemStyle(item)}"><span class="${item.bold || section.boldItems ? "is-bold" : ""}">${renderBadges(item, section, "before")}${escapeHtml(item.name)}${renderBadges(item, section, "after")}</span><small>${renderDescriptionInline(item, section)}</small></li>`).join("")}
        </ul>
      `).join("")}
    </div>
  `;
}

function renderFlavourDeals(section) {
  if (!section.deals?.length) return "";
  return `
    <div class="flavour-deals">
      ${section.deals.map((deal) => `
        <span>
          <strong>${escapeHtml(deal.label)}</strong>
          <em>${escapeHtml(deal.price)}</em>
        </span>
      `).join("")}
    </div>
  `;
}

function itemStyle(item) {
  const scale = Number(item.itemScale || 1);
  return `--item-scale:${Number.isFinite(scale) ? scale : 1}`;
}

function renderSectionEditor() {
  const page = activePage();
  if (!page) {
    els.sectionEditor.innerHTML = `<p class="editor-empty">还没有页面。先在左侧新建一个空白页，再添加模块。</p>`;
    return;
  }

  const section = activeSection();
  if (!section) {
    els.sectionEditor.innerHTML = page.sections.length
      ? `<p class="editor-empty">当前没有选中模块。点击画布或左侧列表里的模块后就可以编辑。</p>`
      : `<p class="editor-empty">当前页面还没有模块。添加一个模块后就可以编辑标题、位置和菜单条目。</p>`;
    return;
  }

  const logoEditor = section.type === "logo" ? renderLogoEditor(section) : "";
  const pageInfoEditor = section.type === "pageInfo" ? renderPageInfoEditor(section) : "";
  const legendEditor = section.type === "legend" ? renderLegendEditor(section) : "";
  const socialEditor = section.type === "social" ? renderSocialEditor(section) : "";
  const itemEditor = ["logo", "legend", "social", "pageInfo"].includes(section.type) ? "" : `
    <div class="editor-group">
      <div class="panel-row">
        <h3>餐品条目</h3>
        <button class="icon-action" id="addItem" title="添加条目" aria-label="添加条目">${icon("plus")}</button>
      </div>
      <div id="itemEditors">
        ${section.items.map((item, index) => renderItemEditor(section, item, index)).join("")}
      </div>
    </div>
  `;

  els.sectionEditor.innerHTML = `
    <div class="editor-summary">
      <div>
        <span>${escapeHtml(section.type)}</span>
        <strong>${escapeHtml(section.title || "未命名模块")}</strong>
      </div>
      <em>${Math.round(section.x)}%, ${Math.round(section.y)}% · ${Math.round(section.w)}×${Math.round(section.h)}</em>
    </div>
    <div class="editor-group">
      <h3>模块身份</h3>
      <label class="field-label" for="sectionTitle">模块标题</label>
      <input id="sectionTitle" type="text" value="${escapeHtml(section.title)}">
      <label class="field-label" for="sectionTitleCn">中文标题</label>
      <input id="sectionTitleCn" type="text" value="${escapeHtml(section.titleCn || "")}">
      <div class="property-grid">
        <div class="property-field">
          <label class="field-label" for="sectionType">模块类型</label>
          <select id="sectionType">
            ${["list", "priceGrid", "stepList", "flavourGrid", "tips", "pageInfo", "logo", "legend", "social"].map((type) => `<option value="${type}" ${section.type === type ? "selected" : ""}>${type}</option>`).join("")}
          </select>
        </div>
        <div class="property-field">
          <label class="field-label" for="sectionStep">步骤数字</label>
          <input id="sectionStep" type="text" value="${escapeHtml(section.step || "")}">
        </div>
      </div>
      <label class="field-label" for="sectionSubtitle">副标题</label>
      <input id="sectionSubtitle" type="text" value="${escapeHtml(section.subtitle || "")}">
      <label class="field-label" for="arrowTo">箭头指向模块</label>
      <select id="arrowTo">
        <option value="">无箭头</option>
        ${page.sections
          .filter((item) => item.id !== section.id)
          .map((item) => `<option value="${item.id}" ${section.arrowTo === item.id ? "selected" : ""}>${escapeHtml(item.title)}</option>`)
          .join("")}
      </select>
    </div>

    <div class="editor-group">
      <h3>位置与尺寸</h3>
      <div class="property-grid">
        <div class="property-field">
          <label class="field-label" for="sectionX">X%</label>
          <input id="sectionX" type="number" min="0" max="100" step="1" value="${round(section.x)}">
        </div>
        <div class="property-field">
          <label class="field-label" for="sectionY">Y%</label>
          <input id="sectionY" type="number" min="0" max="100" step="1" value="${round(section.y)}">
        </div>
        <div class="property-field">
          <label class="field-label" for="sectionW">宽%</label>
          <input id="sectionW" type="number" min="8" max="100" step="1" value="${round(section.w)}">
        </div>
        <div class="property-field">
          <label class="field-label" for="sectionH">高%</label>
          <input id="sectionH" type="number" min="8" max="100" step="1" value="${round(section.h)}">
        </div>
      </div>
      <div class="align-tools">
        <button class="icon-action" data-align="left" title="左对齐" aria-label="左对齐">${icon("align-left")}</button>
        <button class="icon-action" data-align="center" title="水平居中" aria-label="水平居中">${icon("align-center-h")}</button>
        <button class="icon-action" data-align="right" title="右对齐" aria-label="右对齐">${icon("align-right")}</button>
        <button class="icon-action" data-align="top" title="顶对齐" aria-label="顶对齐">${icon("align-top")}</button>
        <button class="icon-action" data-align="middle" title="垂直居中" aria-label="垂直居中">${icon("align-center-v")}</button>
        <button class="icon-action" data-align="bottom" title="底对齐" aria-label="底对齐">${icon("align-bottom")}</button>
        <button class="icon-action" data-align="same-width" title="同宽" aria-label="同宽">${icon("width")}</button>
        <button class="icon-action" data-align="same-height" title="同高" aria-label="同高">${icon("height")}</button>
      </div>
      <div class="inline-actions">
        <button class="icon-action" id="fillRight" title="向右填充" aria-label="向右填充">${icon("fill-right")}</button>
        <button class="icon-action" id="fillBottom" title="向下填充" aria-label="向下填充">${icon("fill-down")}</button>
      </div>
    </div>

    <div class="editor-group">
      <h3>文字与标识</h3>
      <div class="property-grid">
        <div class="property-field">
          <label class="field-label" for="sectionFontScale">内容字号</label>
          <input id="sectionFontScale" type="number" min="0.45" max="1.45" step="0.05" value="${section.fontScale}">
        </div>
        <div class="property-field">
          <label class="field-label" for="sectionTitleScale">标题字号</label>
          <input id="sectionTitleScale" type="number" min="0.75" max="1.5" step="0.05" value="${section.titleScale}">
        </div>
        <div class="property-field swatch-field">
          <label class="field-label" for="sectionTitleBgColor">标题背景</label>
          <input id="sectionTitleBgColor" type="color" value="${escapeHtml(normalizeColor(section.titleBgColor, defaultTitleBgColor(section)))}">
        </div>
        <div class="property-field swatch-field">
          <label class="field-label" for="sectionTitleStrokeColor">标题描边</label>
          <input id="sectionTitleStrokeColor" type="color" value="${escapeHtml(normalizeColor(section.titleStrokeColor, defaultTitleStrokeColor(section)))}">
        </div>
        <div class="property-field">
          <label class="field-label" for="sectionBlockRadius">模块圆角 px</label>
          <input id="sectionBlockRadius" type="number" min="0" max="40" step="1" value="${normalizeRadius(section.blockRadius, DEFAULT_BLOCK_RADIUS)}">
        </div>
        <div class="property-field">
          <label class="field-label" for="sectionTitleRadius">标题圆角 px</label>
          <input id="sectionTitleRadius" type="number" min="0" max="40" step="1" value="${normalizeRadius(section.titleRadius, DEFAULT_TITLE_RADIUS)}">
        </div>
        <div class="property-field">
          <label class="field-label" for="sectionPadding">模块内边距 px</label>
          <input id="sectionPadding" type="number" min="0" max="48" step="1" value="${normalizeSectionPadding(section.sectionPadding, defaultSectionPadding(section))}">
        </div>
        <div class="property-field">
          <label class="field-label" for="sectionItemGap">条目间距 px</label>
          <input id="sectionItemGap" type="number" min="0" max="32" step="1" value="${Number(section.itemGap ?? defaultItemGap(section))}">
        </div>
      </div>
      <div class="property-grid marker-grid">
        <div class="property-field">
          <label class="field-label" for="spicePosition">辣度</label>
          <select id="spicePosition">
            <option value="before" ${section.spicePosition === "before" ? "selected" : ""}>前</option>
            <option value="after" ${section.spicePosition === "after" ? "selected" : ""}>后</option>
            <option value="desc" ${section.spicePosition === "desc" ? "selected" : ""}>描述</option>
          </select>
        </div>
        <div class="property-field">
          <label class="field-label" for="veganPosition">素</label>
          <select id="veganPosition">
            <option value="before" ${section.veganPosition === "before" ? "selected" : ""}>前</option>
            <option value="after" ${section.veganPosition === "after" ? "selected" : ""}>后</option>
            <option value="desc" ${section.veganPosition === "desc" ? "selected" : ""}>描述</option>
          </select>
        </div>
        <div class="property-field">
          <label class="field-label" for="recommendPosition">推荐</label>
          <select id="recommendPosition">
            <option value="before" ${section.recommendPosition === "before" ? "selected" : ""}>前</option>
            <option value="after" ${section.recommendPosition === "after" ? "selected" : ""}>后</option>
            <option value="desc" ${section.recommendPosition === "desc" ? "selected" : ""}>描述</option>
          </select>
        </div>
      </div>
      <div class="checkbox-grid">
        <label><input id="sectionAutoHeight" type="checkbox" ${section.autoHeight ? "checked" : ""}> 允许按内容适配</label>
        <label><input id="sectionBoldTitle" type="checkbox" ${section.boldTitle ? "checked" : ""}> 标题加粗</label>
        <label><input id="sectionBoldItems" type="checkbox" ${section.boldItems ? "checked" : ""}> 条目加粗</label>
        <label><input id="sectionPriceBold" type="checkbox" ${section.priceBold ? "checked" : ""}> 金额加粗</label>
        <label><input id="sectionNoBorder" type="checkbox" ${section.noBorder ? "checked" : ""}> 不要边框</label>
        <label><input id="sectionTransparentBg" type="checkbox" ${section.transparentBg ? "checked" : ""}> 不要背景</label>
        ${section.type === "tips" ? `<label><input id="sectionHideTitle" type="checkbox" ${section.hideTitle ? "checked" : ""}> 隐藏标题</label>` : ""}
      </div>
      <div class="inline-actions wrap">
        <button class="icon-action wide-icon" id="fitSection" title="按内容适配高度" aria-label="按内容适配高度">${icon("expand")}</button>
      </div>
    </div>
    ${section.type === "priceGrid" ? `
      <label class="field-label" for="sectionHeaders">价格列标题（逗号分隔）</label>
      <input id="sectionHeaders" type="text" value="${escapeHtml((section.headers || []).join(", "))}">
    ` : ""}
    ${section.type === "flavourGrid" ? renderFlavourDealEditor(section) : ""}
    ${pageInfoEditor}
    ${logoEditor}
    ${legendEditor}
    ${socialEditor}
    ${itemEditor}
  `;

  bindSectionEditor(section);
}

function renderPageInfoEditor(section) {
  return `
    <div class="editor-group">
      <h3>页面信息模块</h3>
      <label class="field-label" for="pageInfoKicker">顶部小标题</label>
      <input id="pageInfoKicker" type="text" value="${escapeHtml(section.pageKicker || "")}">
      <label class="field-label" for="pageInfoHeading">主标题</label>
      <input id="pageInfoHeading" type="text" value="${escapeHtml(section.pageHeading || "")}">
      <label class="field-label" for="pageInfoWebsite">网站</label>
      <input id="pageInfoWebsite" type="text" value="${escapeHtml(section.pageWebsite || "")}">
    </div>
  `;
}

function renderLogoEditor(section) {
  return `
    <div class="editor-group">
      <h3>Logo 模块</h3>
      <label class="field-label" for="logoText">英文品牌</label>
      <input id="logoText" type="text" value="${escapeHtml(section.logoText || "")}">
      <label class="field-label" for="logoCn">中文品牌</label>
      <input id="logoCn" type="text" value="${escapeHtml(section.logoCn || "")}">
      <label class="field-label" for="logoSince">底部文字</label>
      <input id="logoSince" type="text" value="${escapeHtml(section.logoSince || "")}">
      <label class="field-label" for="logoImage">导入 Logo 图片</label>
      <div class="asset-row">
        <input id="logoImage" type="file" accept="image/*">
        <button class="icon-action danger" id="clearLogoImage" title="清除图片" aria-label="清除图片">${icon("x")}</button>
      </div>
    </div>
  `;
}

function renderFlavourDealEditor(section) {
  const deals = normalizeDeals(section);
  return `
    <div class="editor-group">
      <h3>罐装价格</h3>
      <div class="property-grid deal-grid">
        <div class="property-field">
          <label class="field-label" for="deal0Label">选项 1</label>
          <input id="deal0Label" type="text" value="${escapeHtml(deals[0]?.label || "")}">
        </div>
        <div class="property-field">
          <label class="field-label" for="deal0Price">价格 1</label>
          <input id="deal0Price" type="text" value="${escapeHtml(deals[0]?.price || "")}">
        </div>
        <div class="property-field">
          <label class="field-label" for="deal1Label">选项 2</label>
          <input id="deal1Label" type="text" value="${escapeHtml(deals[1]?.label || "")}">
        </div>
        <div class="property-field">
          <label class="field-label" for="deal1Price">价格 2</label>
          <input id="deal1Price" type="text" value="${escapeHtml(deals[1]?.price || "")}">
        </div>
      </div>
    </div>
  `;
}

function renderLegendEditor(section) {
  return `
    <div class="editor-group">
      <h3>图例模块</h3>
      <label class="field-label" for="legendText">图例文字</label>
      <input id="legendText" type="text" value="${escapeHtml(section.legendText || "")}">
    </div>
  `;
}

function renderSocialEditor(section) {
  const thumb = (key, label) => section.socialImages?.[key]
    ? `<span class="social-thumb" data-social-thumb="${key}"><img src="${section.socialImages[key]}" alt="${label}"><em>${label}</em></span>`
    : `<span class="social-thumb empty" data-social-thumb="${key}"><em>${label}</em></span>`;
  return `
    <div class="editor-group">
      <h3>社交媒体模块</h3>
      <label class="field-label" for="socialHandle">账号文字</label>
      <input id="socialHandle" type="text" value="${escapeHtml(section.socialHandle || "")}">
      <div class="social-thumb-row">
        ${thumb("facebook", "Facebook")}
        ${thumb("tiktok", "TikTok")}
        ${thumb("instagram", "Instagram")}
      </div>
      <div class="asset-grid">
        <div>
          <label class="field-label" for="socialFacebookImage">Facebook 图标</label>
          <input id="socialFacebookImage" type="file" accept="image/*">
        </div>
        <div>
          <label class="field-label" for="socialTiktokImage">TikTok 图标</label>
          <input id="socialTiktokImage" type="file" accept="image/*">
        </div>
        <div>
          <label class="field-label" for="socialInstagramImage">Instagram 图标</label>
          <input id="socialInstagramImage" type="file" accept="image/*">
        </div>
        <button class="icon-action danger" id="clearSocialImages" title="清除图标" aria-label="清除图标">${icon("x")}</button>
      </div>
    </div>
  `;
}

function renderItemEditor(section, item, index) {
  if (item.divider) {
    return `
      <div class="item-editor" data-item-index="${index}">
        <div class="item-editor-head">
          <div class="item-editor-summary">
            <strong>分隔线</strong>
            <span>Divider</span>
          </div>
          <button class="icon-action danger" data-action="delete-item" title="删除" aria-label="删除">${icon("trash")}</button>
        </div>
      </div>
    `;
  }

  const priceValue = section.type === "priceGrid" ? (item.prices || []).join(", ") : (item.price || "");
  const itemTitle = item.name || `条目 ${index + 1}`;
  const itemMeta = [section.type === "tips" ? item.desc : priceValue, item.vegan ? "Vegan" : "", item.recommended ? "推荐" : "", item.spice ? `${item.spice} 辣` : ""]
    .filter(Boolean)
    .join(" · ");
  const priceEditor = section.type === "tips" ? "" : `
        <div class="property-field price-field">
          <label class="field-label">${section.type === "priceGrid" ? "价格（逗号分隔）" : "价格"}</label>
          <input data-field="${section.type === "priceGrid" ? "prices" : "price"}" type="text" value="${escapeHtml(priceValue)}">
        </div>
  `;
  return `
    <details class="item-editor" data-item-index="${index}">
      <summary class="item-editor-head">
        <span class="summary-caret">${icon("chevron-down")}</span>
        <span class="item-editor-summary">
          <strong>${escapeHtml(itemTitle)}</strong>
          <span>${escapeHtml(itemMeta || "点击展开编辑")}</span>
        </span>
        <span class="item-actions">
          <button class="icon-action" data-action="move-up" title="上移" aria-label="上移">${icon("arrow-up")}</button>
          <button class="icon-action" data-action="move-down" title="下移" aria-label="下移">${icon("arrow-down")}</button>
          <button class="icon-action" data-action="insert-divider" title="插入分隔线" aria-label="插入分隔线">${icon("minus")}</button>
          <button class="icon-action danger" data-action="delete-item" title="删除" aria-label="删除">${icon("trash")}</button>
        </span>
      </summary>
      <div class="item-editor-body">
        <label class="field-label">名称</label>
        <textarea data-field="name">${escapeHtml(item.name || "")}</textarea>
        <label class="field-label">描述</label>
        <textarea data-field="desc">${escapeHtml(item.desc || "")}</textarea>
        <div class="property-grid item-props">
          ${priceEditor}
          <div class="property-field">
            <label class="field-label">辣度</label>
            <input data-field="spice" type="number" min="0" max="5" value="${Number(item.spice || 0)}">
          </div>
          <div class="property-field">
            <label class="field-label">单条字号</label>
            <input data-field="itemScale" type="number" min="0.45" max="2" step="0.05" value="${Number(item.itemScale || 1)}">
          </div>
        </div>
        <div class="checkbox-grid">
          <label><input data-field="vegan" type="checkbox" ${item.vegan ? "checked" : ""}> Vegan</label>
          <label><input data-field="recommended" type="checkbox" ${item.recommended ? "checked" : ""}> 推荐</label>
          <label><input data-field="bold" type="checkbox" ${item.bold ? "checked" : ""}> 加粗</label>
          <label><input data-field="header" type="checkbox" ${item.header ? "checked" : ""}> 小标题</label>
        </div>
      </div>
    </details>
  `;
}

function bindSectionEditor(section) {
  bindValue("#sectionTitle", "title", section);
  bindValue("#sectionTitleCn", "titleCn", section);
  bindValue("#sectionStep", "step", section);
  bindValue("#sectionSubtitle", "subtitle", section);
  bindValue("#arrowTo", "arrowTo", section, (value) => value, "change");
  bindValue("#sectionHeaders", "headers", section, splitCsv);
  bindDealInputs(section);
  bindValue("#sectionFontScale", "fontScale", section, Number);
  bindValue("#sectionTitleScale", "titleScale", section, Number);
  bindValue("#sectionTitleBgColor", "titleBgColor", section, (value) => normalizeColor(value, defaultTitleBgColor(section)));
  bindValue("#sectionTitleStrokeColor", "titleStrokeColor", section, (value) => normalizeColor(value, defaultTitleStrokeColor(section)));
  bindValue("#sectionBlockRadius", "blockRadius", section, (value) => normalizeRadius(value, DEFAULT_BLOCK_RADIUS));
  bindValue("#sectionTitleRadius", "titleRadius", section, (value) => normalizeRadius(value, DEFAULT_TITLE_RADIUS));
  bindValue("#sectionPadding", "sectionPadding", section, (value) => normalizeSectionPadding(value, defaultSectionPadding(section)));
  bindValue("#sectionItemGap", "itemGap", section, Number);

  ["X", "Y", "W", "H"].forEach((key) => {
    const input = document.querySelector(`#section${key}`);
    if (!input) return;
    input.addEventListener("input", () => {
      section[key.toLowerCase()] = Number(input.value);
      clampFrame(section);
      constrainSectionToFold(section);
      refreshPreview();
      syncEditorFrame(section);
    });
  });

  bindChecked("#sectionAutoHeight", "autoHeight", section);
  bindChecked("#sectionBoldTitle", "boldTitle", section);
  bindChecked("#sectionBoldItems", "boldItems", section);
  bindChecked("#sectionPriceBold", "priceBold", section);
  bindChecked("#sectionNoBorder", "noBorder", section);
  bindChecked("#sectionTransparentBg", "transparentBg", section);
  bindChecked("#sectionHideTitle", "hideTitle", section);
  bindPageInfoInputs(section);
  bindValue("#logoText", "logoText", section);
  bindValue("#logoCn", "logoCn", section);
  bindValue("#logoSince", "logoSince", section);
  bindValue("#legendText", "legendText", section);
  bindValue("#socialHandle", "socialHandle", section);
  bindValue("#spicePosition", "spicePosition", section, (value) => value, "change");
  bindValue("#veganPosition", "veganPosition", section, (value) => value, "change");
  bindValue("#recommendPosition", "recommendPosition", section, (value) => value, "change");

  const typeInput = document.querySelector("#sectionType");
  typeInput.addEventListener("change", () => {
    const page = activePage();
    section.type = typeInput.value;
    if (section.type === "priceGrid" && !section.headers) section.headers = ["6 pcs", "10 pcs"];
    if (section.type === "tips") Object.assign(section, { items: section.items?.length ? section.items : structuredClone(baseSections.tips.items), title: section.title || "Tips", titleCn: section.titleCn || "温馨提示", itemGap: 2, fontScale: section.fontScale || 0.86 });
    if (section.type === "pageInfo") Object.assign(section, { items: [], pageKicker: page?.kicker || "", pageHeading: page?.title || "", pageWebsite: page?.website || "", noBorder: true, transparentBg: true });
    if (section.type === "logo") Object.assign(section, { items: [], logoText: section.logoText || "Granny Noodles" });
    if (section.type === "legend") Object.assign(section, { items: [], legendText: section.legendText || "Green V - Vegan" });
    if (section.type === "social") Object.assign(section, { items: [], socialHandle: section.socialHandle || "@GRANNYNOODLESUK", socialImages: section.socialImages || {}, noBorder: true, transparentBg: true });
    render();
  });

  document.querySelector("#fitSection")?.addEventListener("click", () => fitOneSection(section, true));
  document.querySelector("#fillRight")?.addEventListener("click", () => {
    section.w = 100 - section.x;
    clampFrame(section);
    constrainSectionToFold(section);
    refreshPreview();
    syncEditorFrame(section);
  });
  document.querySelector("#fillBottom")?.addEventListener("click", () => {
    section.h = 100 - section.y;
    clampFrame(section);
    constrainSectionToFold(section);
    refreshPreview();
    syncEditorFrame(section);
  });

  document.querySelectorAll("[data-align]").forEach((button) => {
    button.addEventListener("click", () => {
      applyAlignment(button.dataset.align, section);
      constrainSectionToFold(section);
      refreshPreview();
      syncEditorFrame(section);
    });
  });

  document.querySelector("#logoImage")?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    section.logoImage = await imageFileToDataUrl(file, 512);
    event.target.value = "";
    render();
  });
  document.querySelector("#clearLogoImage")?.addEventListener("click", () => {
    section.logoImage = "";
    render();
  });

  bindSectionImageInput("#socialFacebookImage", section, "facebook");
  bindSectionImageInput("#socialTiktokImage", section, "tiktok");
  bindSectionImageInput("#socialInstagramImage", section, "instagram");
  document.querySelector("#clearSocialImages")?.addEventListener("click", () => {
    section.socialImages = {};
    render();
  });

  document.querySelector("#addItem")?.addEventListener("click", () => {
    section.items.push(createItemFor(section.type));
    render();
  });

  document.querySelectorAll(".item-editor").forEach((editor) => {
    const index = Number(editor.dataset.itemIndex);
    const item = section.items[index];
    editor.querySelectorAll("[data-field]").forEach((input) => {
      input.addEventListener("input", () => updateItemField(input, item));
      input.addEventListener("change", () => updateItemField(input, item));
    });
    editor.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleItemAction(section, index, button.dataset.action);
      });
    });
  });
}

function bindPageInfoInputs(section) {
  if (section.type !== "pageInfo") return;
  [
    ["#pageInfoKicker", "pageKicker", "kicker"],
    ["#pageInfoHeading", "pageHeading", "title"],
    ["#pageInfoWebsite", "pageWebsite", "website"]
  ].forEach(([selector, sectionKey, pageKey]) => {
    const input = document.querySelector(selector);
    if (!input) return;
    input.addEventListener("input", () => {
      const page = activePage();
      section[sectionKey] = input.value;
      if (page) page[pageKey] = input.value;
      refreshPreview();
    });
  });
}

function bindSectionImageInput(selector, section, key) {
  document.querySelector(selector)?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    section.socialImages ||= {};
    section.socialImages[key] = await imageFileToDataUrl(file, 256);
    event.target.value = "";
    refreshPreview();
    updateSocialThumbs(section);
  });
}

function updateSocialThumbs(section) {
  const labels = { facebook: "Facebook", tiktok: "TikTok", instagram: "Instagram" };
  Object.entries(labels).forEach(([key, label]) => {
    const node = document.querySelector(`[data-social-thumb="${key}"]`);
    if (!node) return;
    const image = section.socialImages?.[key];
    node.classList.toggle("empty", !image);
    node.innerHTML = image
      ? `<img src="${image}" alt="${label}"><em>${label}</em>`
      : `<em>${label}</em>`;
  });
}

function bindValue(selector, key, target, transform = (value) => value, eventName = "input") {
  const input = document.querySelector(selector);
  if (!input) return;
  input.addEventListener(eventName, () => {
    target[key] = transform(input.value);
    refreshPreview();
  });
}

function bindChecked(selector, key, target) {
  const input = document.querySelector(selector);
  if (!input) return;
  input.addEventListener("change", () => {
    target[key] = input.checked;
    refreshPreview();
  });
}

function bindDealInputs(section) {
  if (section.type !== "flavourGrid") return;
  section.deals = normalizeDeals(section);
  [
    ["#deal0Label", 0, "label"],
    ["#deal0Price", 0, "price"],
    ["#deal1Label", 1, "label"],
    ["#deal1Price", 1, "price"]
  ].forEach(([selector, index, key]) => {
    const input = document.querySelector(selector);
    if (!input) return;
    input.addEventListener("input", () => {
      section.deals[index] ||= { label: "", price: "" };
      section.deals[index][key] = input.value;
      refreshPreview();
    });
  });
}

function updateItemField(input, item) {
  const field = input.dataset.field;
  if (["vegan", "header", "recommended", "bold"].includes(field)) {
    item[field] = input.checked;
  } else if (field === "spice") {
    item[field] = Number(input.value);
  } else if (field === "itemScale") {
    item[field] = Number(input.value) || 1;
  } else if (field === "prices") {
    item[field] = splitCsv(input.value);
  } else {
    item[field] = input.value;
  }
  refreshPreview();
}

function handleItemAction(section, index, action) {
  if (action === "delete-item") section.items.splice(index, 1);
  if (action === "move-up" && index > 0) {
    const [item] = section.items.splice(index, 1);
    section.items.splice(index - 1, 0, item);
  }
  if (action === "move-down" && index < section.items.length - 1) {
    const [item] = section.items.splice(index, 1);
    section.items.splice(index + 1, 0, item);
  }
  if (action === "insert-divider") section.items.splice(index + 1, 0, { divider: true });
  render();
}

function splitCsv(value) {
  return value.split(",").map((part) => part.trim()).filter(Boolean);
}

function createItemFor(type) {
  if (type === "priceGrid") return { name: "New Dumpling 新水饺", desc: "", prices: ["£0.0", "£0.0"] };
  if (type === "flavourGrid") return { name: "New Flavour", desc: "新口味" };
  if (type === "tips") return { name: "New reminder", desc: "新提示" };
  return { name: "New Item 新菜品", desc: "", price: "£0.0", spice: 0, vegan: false };
}

function createSection() {
  const id = `section-${Date.now()}`;
  return {
    id,
    type: "list",
    title: "New Section",
    titleCn: "新模块",
    x: 6,
    y: 18,
    w: 30,
    h: 24,
    autoHeight: true,
    fontScale: 1,
    titleScale: 1,
    blockRadius: DEFAULT_BLOCK_RADIUS,
    titleRadius: DEFAULT_TITLE_RADIUS,
    sectionPadding: DEFAULT_SECTION_PADDING,
    titleBgColor: DEFAULT_TITLE_BG,
    titleStrokeColor: DEFAULT_TITLE_STROKE,
    boldTitle: true,
    boldItems: true,
    items: [createItemFor("list")]
  };
}

function copyActiveSection() {
  const section = activeSection();
  if (!section) return;
  copiedSection = structuredClone(section);
  renderControls();
}

function sectionCopyTitle(title = "Module") {
  const base = String(title || "Module").replace(/\s+copy(?:\s+\d+)?$/i, "").trim() || "Module";
  return `${base} copy`;
}

function createPastedSection() {
  const page = activePage();
  if (!copiedSection || !page) return null;
  const section = structuredClone(copiedSection);
  const stamp = Date.now();
  section.id = `${section.type || "section"}-${stamp}`;
  section.title = sectionCopyTitle(section.title);
  section.x = Number(section.x || 0) + 2;
  section.y = Number(section.y || 0) + 2;
  clampFrame(section);
  constrainSectionToFold(section, page);
  normalizeSection(section, page.sections.length, page.sections.length + 1);
  return section;
}

function pasteSectionCopy() {
  const page = activePage();
  if (!page) return;
  const section = createPastedSection();
  if (!section) return;
  page.sections.push(section);
  state.selectedSection = section.id;
  render();
}

function openNewPageDialog() {
  els.newPageName.value = "New Page";
  els.newPagePreset.value = state.pagePreset;
  els.newPageOrientation.value = state.pageOrientation;
  els.newPageWidth.value = Math.round(state.pageSize.width);
  els.newPageHeight.value = Math.round(state.pageSize.height);
  els.newPageMargin.value = Math.round(state.pageMargin);
  els.newPageFoldMode.value = state.newPageFoldMode;
  if (typeof els.newPageDialog.showModal === "function") {
    els.newPageDialog.showModal();
  } else {
    els.newPageDialog.setAttribute("open", "");
  }
  els.newPageName.focus();
  els.newPageName.select();
}

function createBlankPageFromDialog() {
  const foldMode = FOLD_MODES[els.newPageFoldMode.value] ? els.newPageFoldMode.value : "none";
  const pageName = els.newPageName.value.trim() || "New Page";
  const preset = PAPER_PRESETS[els.newPagePreset.value] ? els.newPagePreset.value : "custom";
  const orientation = ["landscape", "portrait"].includes(els.newPageOrientation.value)
    ? els.newPageOrientation.value
    : "landscape";
  state.pagePreset = preset;
  state.pageOrientation = orientation;
  state.pageSize = preset === "custom"
    ? normalizePageSize({ width: els.newPageWidth.value, height: els.newPageHeight.value })
    : pixelsFromPaper(preset, orientation);
  state.pageMargin = normalizePageMargin(els.newPageMargin.value);
  state.newPageFoldMode = foldMode;
  const page = {
    id: `page-${Date.now()}`,
    kicker: pageName,
    title: "Menu",
    website: "",
    backgroundImage: "",
    socialImages: {},
    pagePreset: preset,
    pageOrientation: orientation,
    pageSize: normalizePageSize(state.pageSize),
    pageMargin: normalizePageMargin(state.pageMargin),
    foldMode,
    foldMargins: normalizeFoldMargins([], foldMode),
    sections: []
  };
  state.pages.push(page);
  state.selectedPage = state.pages.length - 1;
  state.selectedSection = "";
  render();
}

function isEditingText() {
  const target = document.activeElement;
  if (!target) return false;
  return target.closest("input, textarea, select, [contenteditable='true']");
}

function clampFrame(section) {
  section.w = clamp(Number(section.w || 20), 8, 100);
  section.h = clamp(Number(section.h || 16), 8, 100);
  section.x = clamp(Number(section.x || 0), 0, 100 - section.w);
  section.y = clamp(Number(section.y || 0), 0, 100 - section.h);
}

function activeGridRect() {
  return document
    .querySelector(`.menu-page[data-page-index="${state.selectedPage}"] .sections-grid`)
    ?.getBoundingClientRect();
}

function foldBoundsContext(page, rect, referenceX) {
  const count = foldPanelCount(page?.foldMode);
  if (count <= 1 || !rect?.width || !rect?.height) return null;
  const panelWidth = 100 / count;
  const panelIndex = clamp(Math.floor(referenceX / panelWidth), 0, count - 1);
  const marginPx = normalizeFoldMargins(page.foldMargins, page.foldMode)[panelIndex];
  const marginX = (marginPx / rect.width) * 100;
  const marginY = (marginPx / rect.height) * 100;
  return {
    left: panelIndex * panelWidth + marginX,
    right: (panelIndex + 1) * panelWidth - marginX,
    top: marginY,
    bottom: 100 - marginY
  };
}

function constrainFrameToFold(frame, page, rect, referenceX = frame.x + frame.w / 2) {
  const next = {
    x: Number(frame.x || 0),
    y: Number(frame.y || 0),
    w: clamp(Number(frame.w || 20), 8, 100),
    h: clamp(Number(frame.h || 16), 8, 100)
  };
  next.x = clamp(next.x, 0, 100 - next.w);
  next.y = clamp(next.y, 0, 100 - next.h);

  const bounds = foldBoundsContext(page, rect, referenceX);
  if (!bounds) return next;

  const availableW = Math.max(8, bounds.right - bounds.left);
  const availableH = Math.max(8, bounds.bottom - bounds.top);
  next.w = clamp(next.w, 8, availableW);
  next.h = clamp(next.h, 8, availableH);
  next.x = clamp(next.x, bounds.left, Math.max(bounds.left, bounds.right - next.w));
  next.y = clamp(next.y, bounds.top, Math.max(bounds.top, bounds.bottom - next.h));
  return next;
}

function constrainSectionToFold(section, page = activePage(), rect = activeGridRect()) {
  if (!section) return;
  Object.assign(section, constrainFrameToFold(section, page, rect));
}

function applyAlignment(mode, section) {
  const reference = findReferenceSection(activePage(), section);

  if (reference) {
    if (mode === "left") section.x = reference.x;
    if (mode === "center") section.x = reference.x + reference.w / 2 - section.w / 2;
    if (mode === "right") section.x = reference.x + reference.w - section.w;
    if (mode === "top") section.y = reference.y;
    if (mode === "middle") section.y = reference.y + reference.h / 2 - section.h / 2;
    if (mode === "bottom") section.y = reference.y + reference.h - section.h;
    if (mode === "same-width") section.w = reference.w;
    if (mode === "same-height") section.h = reference.h;
  } else {
    if (mode === "left") section.x = 0;
    if (mode === "center") section.x = (100 - section.w) / 2;
    if (mode === "right") section.x = 100 - section.w;
    if (mode === "top") section.y = 0;
    if (mode === "middle") section.y = (100 - section.h) / 2;
    if (mode === "bottom") section.y = 100 - section.h;
  }

  clampFrame(section);
}

function findReferenceSection(page, section) {
  const others = page.sections.filter((item) => item.id !== section.id);
  if (!others.length) return null;
  const sectionCenter = { x: section.x + section.w / 2, y: section.y + section.h / 2 };
  return others
    .map((item) => ({
      item,
      distance: Math.hypot(item.x + item.w / 2 - sectionCenter.x, item.y + item.h / 2 - sectionCenter.y)
    }))
    .sort((a, b) => a.distance - b.distance)[0].item;
}

function updateBlockNode(node, section) {
  node.style.left = `${section.x}%`;
  node.style.top = `${section.y}%`;
  node.style.width = `${section.w}%`;
  node.style.height = `${section.h}%`;
}

function syncSelectionClasses() {
  document.querySelectorAll(".menu-block").forEach((block) => {
    const selected = Number(block.dataset.pageIndex) === state.selectedPage && block.dataset.sectionId === state.selectedSection;
    block.classList.toggle("is-selected", selected);
  });
}

function clearSelectedSection() {
  if (!state.selectedSection) return;
  state.selectedSection = "";
  syncSelectionClasses();
  renderControls();
  renderSectionEditor();
  saveState();
}

function safeSetPointerCapture(node, pointerId) {
  try {
    node.setPointerCapture?.(pointerId);
  } catch {
    // Some synthetic or interrupted pointer events cannot be captured.
  }
}

function safeReleasePointerCapture(node, pointerId) {
  try {
    if (node.hasPointerCapture?.(pointerId)) node.releasePointerCapture(pointerId);
  } catch {
    // Ignore capture state races during cancelled drags.
  }
}

function syncEditorFrame(section) {
  [["X", section.x], ["Y", section.y], ["W", section.w], ["H", section.h]].forEach(([key, value]) => {
    const input = document.querySelector(`#section${key}`);
    if (input) input.value = round(value);
  });
}

function snap(value) {
  return state.snap ? Math.round(value / SNAP_STEP) * SNAP_STEP : value;
}

function snapToStep(value, origin, step) {
  if (!state.snap || !Number.isFinite(step) || step <= 0) return value;
  return origin + Math.round((value - origin) / step) * step;
}

function foldSnapContext(page, rect, referenceX) {
  const bounds = foldBoundsContext(page, rect, referenceX);
  if (!state.snap || !bounds) return null;
  return {
    ...bounds,
    stepX: (FOLD_GRID_PX / rect.width) * 100,
    stepY: (FOLD_GRID_PX / rect.height) * 100
  };
}

function snapMoveFrame(frame, page, rect) {
  const ctx = foldSnapContext(page, rect, frame.x + frame.w / 2);
  if (!ctx) {
    const constrained = constrainFrameToFold({
      x: snap(frame.x),
      y: snap(frame.y),
      w: frame.w,
      h: frame.h
    }, page, rect);
    return { x: constrained.x, y: constrained.y };
  }
  const maxX = Math.max(ctx.left, ctx.right - frame.w);
  const maxY = Math.max(ctx.top, ctx.bottom - frame.h);
  return {
    x: clamp(snapToStep(frame.x, ctx.left, ctx.stepX), ctx.left, maxX),
    y: clamp(snapToStep(frame.y, ctx.top, ctx.stepY), ctx.top, maxY)
  };
}

function snapResizeFrame(frame, page, rect) {
  const referenceX = frame.x + 0.01;
  const ctx = foldSnapContext(page, rect, referenceX);
  if (!ctx) {
    const constrained = constrainFrameToFold({
      ...frame,
      w: snap(frame.w),
      h: snap(frame.h)
    }, page, rect, referenceX);
    return { w: constrained.w, h: constrained.h };
  }
  const right = clamp(snapToStep(frame.x + frame.w, ctx.left, ctx.stepX), frame.x + 8, ctx.right);
  const bottom = clamp(snapToStep(frame.y + frame.h, ctx.top, ctx.stepY), frame.y + 8, ctx.bottom);
  return {
    w: right - frame.x,
    h: bottom - frame.y
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function round(value) {
  return Math.round(Number(value || 0) * 10) / 10;
}

function applyZoom() {
  const scale = state.zoom / 100;
  const pages = state.pages.length || 1;
  const sizes = state.pages.length ? state.pages.map((page) => effectivePageSize(page)) : [effectivePageSize()];
  const maxWidth = Math.max(...sizes.map((size) => size.width));
  const totalHeight = sizes.reduce((sum, size) => sum + size.height, 0) + Math.max(0, pages - 1) * 22;
  const extraX = Math.max(0, maxWidth * (scale - 1));
  const extraY = Math.max(0, totalHeight * (scale - 1));
  els.canvas.style.transform = `scale(${scale})`;
  els.canvas.style.marginRight = `${extraX + els.canvasViewport.clientWidth * 0.9}px`;
  els.canvas.style.marginBottom = `${extraY + els.canvasViewport.clientHeight * 0.9}px`;
}

function captureZoomAnchor() {
  const viewport = els.canvasViewport;
  const viewportRect = viewport.getBoundingClientRect();
  const selected = document.querySelector(".menu-block.is-selected");
  if (selected) {
    const rect = selected.getBoundingClientRect();
    return {
      type: "element",
      node: selected,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  const scale = state.zoom / 100;
  const canvasRect = els.canvas.getBoundingClientRect();
  const x = viewportRect.left + viewportRect.width / 2;
  const y = viewportRect.top + viewportRect.height / 2;
  return {
    type: "point",
    localX: (x - canvasRect.left) / scale,
    localY: (y - canvasRect.top) / scale,
    x,
    y
  };
}

function restoreZoomAnchor(anchor) {
  if (!anchor) return;
  requestAnimationFrame(() => {
    const viewport = els.canvasViewport;
    let x = anchor.x;
    let y = anchor.y;

    if (anchor.type === "element" && anchor.node?.isConnected) {
      const rect = anchor.node.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else if (anchor.type === "point") {
      const scale = state.zoom / 100;
      const canvasRect = els.canvas.getBoundingClientRect();
      x = canvasRect.left + anchor.localX * scale;
      y = canvasRect.top + anchor.localY * scale;
    }

    viewport.scrollLeft = clamp(
      viewport.scrollLeft + (x - anchor.x),
      0,
      Math.max(0, viewport.scrollWidth - viewport.clientWidth)
    );
    viewport.scrollTop = clamp(
      viewport.scrollTop + (y - anchor.y),
      0,
      Math.max(0, viewport.scrollHeight - viewport.clientHeight)
    );
  });
}

function zoomAroundAnchor(nextZoom) {
  const anchor = captureZoomAnchor();
  state.zoom = clamp(Number(nextZoom), 20, 300);
  els.zoomRange.value = String(state.zoom);
  els.zoomValue.textContent = `${state.zoom}%`;
  applyZoom();
  restoreZoomAnchor(anchor);
  saveState();
}

function centerCanvasView() {
  requestAnimationFrame(() => {
    const viewport = els.canvasViewport;
    const pageIndex = clamp(state.selectedPage || 0, 0, Math.max(0, state.pages.length - 1));
    const page = document.querySelector(`.menu-page[data-page-index="${pageIndex}"]`) || document.querySelector(".menu-page");
    if (!page) {
      viewport.scrollLeft = Math.max(0, (viewport.scrollWidth - viewport.clientWidth) / 2);
      viewport.scrollTop = Math.max(0, (viewport.scrollHeight - viewport.clientHeight) / 2);
      return;
    }

    const viewportRect = viewport.getBoundingClientRect();
    const pageRect = page.getBoundingClientRect();
    const targetLeft = viewport.scrollLeft + (pageRect.left + pageRect.width / 2 - viewportRect.left) - viewport.clientWidth / 2;
    const targetTop = viewport.scrollTop + (pageRect.top + pageRect.height / 2 - viewportRect.top) - viewport.clientHeight / 2;
    viewport.scrollLeft = clamp(targetLeft, 0, Math.max(0, viewport.scrollWidth - viewport.clientWidth));
    viewport.scrollTop = clamp(targetTop, 0, Math.max(0, viewport.scrollHeight - viewport.clientHeight));
  });
}

function queueInitialCanvasCenter() {
  if (didInitialCenter) return;
  didInitialCenter = true;
  centerCanvasView();
}

function queueAutoFit() {
  if (fitQueued) return;
  fitQueued = true;
  requestAnimationFrame(() => {
    fitQueued = false;
    autoFitVisibleSections();
  });
}

function autoFitVisibleSections() {
  let changed = false;
  const page = activePage();
  if (!page) return;
  document.querySelectorAll(`.menu-page[data-page-index="${state.selectedPage}"] .menu-block.auto-fit`).forEach((node) => {
    const section = page.sections.find((item) => item.id === node.dataset.sectionId);
    if (section && fitSectionFromNode(section, node)) changed = true;
  });
  if (changed) {
    saveState();
    renderCanvas();
    applyZoom();
    queueAutoFit();
  }
}

function fitOneSection(section, forceRender = false) {
  const node = document.querySelector(`.menu-page[data-page-index="${state.selectedPage}"] [data-section-id="${section.id}"]`);
  if (node) fitSectionFromNode(section, node);
  clampFrame(section);
  constrainSectionToFold(section);
  if (forceRender) render();
}

function fitSectionFromNode(section, node) {
  if (section.type === "logo") return false;
  const grid = node.closest(".sections-grid");
  const gridHeight = grid.getBoundingClientRect().height;
  const maxHeight = availableHeightForSection(section);
  const contentHeight = [...node.children]
    .filter((child) => !child.classList.contains("module-toolbar") && !child.classList.contains("resize-handle"))
    .reduce((total, child) => total + child.scrollHeight, 0);
  const overflow = contentHeight - node.clientHeight;
  node.classList.toggle("is-overflowing", overflow > 2);
  if (section.h > maxHeight) {
    section.h = maxHeight;
    clampFrame(section);
    constrainSectionToFold(section, activePage(), grid.getBoundingClientRect());
    return true;
  }
  if (overflow <= 2) return false;

  const extraPercent = (overflow / gridHeight) * 100 + 2;
  const oldH = section.h;
  const oldFontScale = section.fontScale;
  section.h = clamp(section.h + extraPercent, 8, maxHeight);
  if (section.h === oldH && section.fontScale > 0.45) {
    section.fontScale = Math.max(0.45, Number(section.fontScale) - 0.05);
  }
  clampFrame(section);
  constrainSectionToFold(section, activePage(), grid.getBoundingClientRect());
  return section.h !== oldH || section.fontScale !== oldFontScale;
}

function availableHeightForSection(section) {
  const gap = 2;
  const page = activePage();
  const blocker = (page?.sections || [])
    .filter((other) => other.id !== section.id && other.y > section.y && framesOverlapOnX(section, other))
    .sort((a, b) => a.y - b.y)[0];
  const bottomLimit = blocker ? blocker.y - gap : 100;
  return Math.max(8, clamp(bottomLimit - section.y, 8, 100 - section.y));
}

function framesOverlapOnX(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function imageFileToDataUrl(file, maxSize = 512) {
  const dataUrl = await fileToDataUrl(file);
  if (!file.type.startsWith("image/")) return dataUrl;

  const image = await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });

  const ratio = Math.min(1, maxSize / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(1, Math.round(image.naturalWidth * ratio));
  const height = Math.max(1, Math.round(image.naturalHeight * ratio));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/png");
}

function exportProject() {
  const payload = JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `menu-project-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function canvasToBlob(canvas, format) {
  const mimeType = format === "jpeg" ? "image/jpeg" : "image/png";
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error(`${format.toUpperCase()} export returned empty data.`));
    }, mimeType, format === "jpeg" ? 0.95 : undefined);
  });
}

async function convertBlobToCmyk(blob) {
  const response = await fetch("/api/convert-cmyk", {
    method: "POST",
    headers: {
      "Content-Type": blob.type || "application/octet-stream"
    },
    body: blob
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "CMYK 转换失败。请确认当前是 Docker 版本服务。");
  }
  return response.blob();
}

async function exportAllPageImages() {
  if (typeof html2canvas !== "function") {
    throw new Error("图片导出库没有加载完成，请刷新页面后重试。");
  }

  const pageNodes = [...document.querySelectorAll(".menu-page")];
  if (!pageNodes.length) {
    throw new Error("当前没有页面，请先新建页面再导出图片。");
  }

  const colorSpace = els.colorSpace?.value === "cmyk" ? "cmyk" : "srgb";
  const requestedFormat = els.imageFormat?.value === "jpeg" ? "jpeg" : "png";
  const format = colorSpace === "cmyk" ? "jpeg" : requestedFormat;
  const extension = format === "jpeg" ? "jpg" : "png";
  const exportScale = clamp(Number(els.exportScale?.value || 2), 1, 3);
  const oldTransform = els.canvas.style.transform;
  const oldMarginRight = els.canvas.style.marginRight;
  const oldMarginBottom = els.canvas.style.marginBottom;
  const oldButtonText = els.exportImage.textContent;

  els.exportImage.disabled = true;
  els.exportImage.textContent = `导出中 0/${pageNodes.length}`;
  els.canvas.style.transform = "none";
  els.canvas.style.marginRight = "0";
  els.canvas.style.marginBottom = "0";

  try {
    for (const [index, pageNode] of pageNodes.entries()) {
      els.exportImage.textContent = `导出中 ${index + 1}/${pageNodes.length}`;
      const page = state.pages[index] || {};
      const size = pageSettings(page).size;
      const canvas = await html2canvas(pageNode, {
        backgroundColor: "#ffffff",
        scale: exportScale,
        useCORS: true,
        allowTaint: true,
        width: size.width,
        height: size.height,
        windowWidth: size.width,
        windowHeight: size.height,
        scrollX: 0,
        scrollY: 0,
        onclone: (doc) => {
          doc.querySelectorAll(".module-toolbar, .resize-handle, .fold-guides").forEach((node) => node.remove());
          doc.querySelectorAll(".is-selected").forEach((node) => node.classList.remove("is-selected"));
          doc.querySelectorAll(".sections-grid").forEach((node) => {
            node.style.border = "0";
            node.style.backgroundImage = "none";
          });
        }
      });
      const sourceBlob = await canvasToBlob(canvas, format);
      const blob = colorSpace === "cmyk" ? await convertBlobToCmyk(sourceBlob) : sourceBlob;
      const pageId = page.id || `page-${index + 1}`;
      downloadBlob(blob, `${pageId}-${index + 1}-${exportScale}x${colorSpace === "cmyk" ? "-cmyk" : ""}.${extension}`);
      await new Promise((resolve) => setTimeout(resolve, 180));
    }
  } finally {
    els.canvas.style.transform = oldTransform;
    els.canvas.style.marginRight = oldMarginRight;
    els.canvas.style.marginBottom = oldMarginBottom;
    els.exportImage.disabled = false;
    els.exportImage.textContent = oldButtonText;
  }
}

async function importProject(file) {
  const text = await file.text();
  state = normalizeState(JSON.parse(text));
  render();
}

els.pageSelect.addEventListener("change", () => {
  state.selectedPage = Number(els.pageSelect.value);
  state.selectedSection = activePage()?.sections[0]?.id || "";
  render();
});

els.newPageFoldMode.addEventListener("change", () => {
  state.newPageFoldMode = FOLD_MODES[els.newPageFoldMode.value] ? els.newPageFoldMode.value : "none";
  saveState();
});

function updateNewPageSizeFieldsFromPreset() {
  const preset = els.newPagePreset.value;
  if (preset === "custom") return;
  const size = pixelsFromPaper(preset, els.newPageOrientation.value);
  els.newPageWidth.value = Math.round(size.width);
  els.newPageHeight.value = Math.round(size.height);
}

els.newPagePreset.addEventListener("change", updateNewPageSizeFieldsFromPreset);
els.newPageOrientation.addEventListener("change", updateNewPageSizeFieldsFromPreset);
els.newPageWidth.addEventListener("input", () => {
  els.newPagePreset.value = "custom";
});
els.newPageHeight.addEventListener("input", () => {
  els.newPagePreset.value = "custom";
});

els.pageSettingsScope.addEventListener("change", () => {
  state.pageSettingsScope = ["linked", "current"].includes(els.pageSettingsScope.value)
    ? els.pageSettingsScope.value
    : "linked";
  if (state.pageSettingsScope === "current") ensureCurrentPageSettings();
  render();
});

els.pageMargin.addEventListener("input", () => {
  const margin = normalizePageMargin(els.pageMargin.value);
  pageLayoutTargets().forEach((target) => {
    target.pageMargin = margin;
  });
  renderCanvas();
  applyPageSize();
  applyZoom();
  queueAutoFit();
  saveState();
});

els.pageFoldMode.addEventListener("change", () => {
  const mode = FOLD_MODES[els.pageFoldMode.value] ? els.pageFoldMode.value : "none";
  const targets = pageFoldTargets();
  if (!targets.length) return;
  targets.forEach((page) => {
    page.foldMode = mode;
    page.foldMargins = normalizeFoldMargins(page.foldMargins, page.foldMode);
  });
  updateFoldMarginControls(activePage());
  refreshPreview();
});

els.foldMargins.forEach((input, index) => {
  input.addEventListener("input", () => {
    const targets = pageFoldTargets();
    if (!targets.length) return;
    const value = normalizeFoldMargin(input.value);
    targets.forEach((page) => {
      page.foldMargins = normalizeFoldMargins(page.foldMargins, page.foldMode);
      page.foldMargins[index] = value;
    });
    renderCanvas();
    applyPageSize();
    applyZoom();
    queueAutoFit();
    saveState();
  });
});

els.pageBackgroundImage.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  const page = activePage();
  if (!file) return;
  if (!page) {
    event.target.value = "";
    return;
  }
  page.backgroundImage = await imageFileToDataUrl(file, 2500);
  event.target.value = "";
  refreshPreview();
});

els.clearPageBackground.addEventListener("click", () => {
  const page = activePage();
  if (!page) return;
  page.backgroundImage = "";
  refreshPreview();
});

function updatePageSizeFromInputs() {
  if (!els.pageWidth.value || !els.pageHeight.value) return;
  const pageSize = normalizePageSize({
    width: els.pageWidth.value,
    height: els.pageHeight.value
  });
  const pageOrientation = inferOrientation({
    width: els.pageWidth.value,
    height: els.pageHeight.value
  });
  pageLayoutTargets().forEach((target) => {
    target.pagePreset = "custom";
    target.pageOrientation = pageOrientation;
    target.pageSize = normalizePageSize(pageSize);
  });
  els.pagePreset.value = "custom";
  els.pageOrientation.value = pageOrientation;
  renderCanvas();
  applyPageSize();
  applyZoom();
  queueAutoFit();
  saveState();
}

els.pageWidth.addEventListener("input", updatePageSizeFromInputs);
els.pageHeight.addEventListener("input", updatePageSizeFromInputs);

function applyPaperSelection() {
  const pagePreset = els.pagePreset.value;
  const pageOrientation = els.pageOrientation.value;
  const pageSize = pagePreset !== "custom" ? pixelsFromPaper(pagePreset, pageOrientation) : null;
  pageLayoutTargets().forEach((target) => {
    target.pagePreset = pagePreset;
    target.pageOrientation = pageOrientation;
    if (pageSize) target.pageSize = normalizePageSize(pageSize);
  });
  if (pageSize) {
    els.pageWidth.value = Math.round(pageSize.width);
    els.pageHeight.value = Math.round(pageSize.height);
  }
  renderCanvas();
  applyPageSize();
  applyZoom();
  queueAutoFit();
  saveState();
}

els.pagePreset.addEventListener("change", applyPaperSelection);
els.pageOrientation.addEventListener("change", () => {
  const pagePreset = els.pagePreset.value;
  const pageOrientation = els.pageOrientation.value;
  if (pagePreset === "custom") {
    const current = normalizePageSize({ width: els.pageWidth.value, height: els.pageHeight.value });
    const shouldSwap = (pageOrientation === "landscape" && current.height > current.width)
      || (pageOrientation === "portrait" && current.width > current.height);
    const pageSize = shouldSwap
      ? normalizePageSize({ width: current.height, height: current.width })
      : current;
    pageLayoutTargets().forEach((target) => {
      target.pagePreset = "custom";
      target.pageOrientation = pageOrientation;
      target.pageSize = normalizePageSize(pageSize);
    });
    els.pageWidth.value = Math.round(pageSize.width);
    els.pageHeight.value = Math.round(pageSize.height);
    renderCanvas();
    applyPageSize();
    applyZoom();
    queueAutoFit();
    saveState();
    return;
  }
  applyPaperSelection();
});

els.zoomRange.addEventListener("input", () => {
  zoomAroundAnchor(els.zoomRange.value);
});

els.centerCanvas.addEventListener("click", centerCanvasView);

els.snapToggle.addEventListener("change", () => {
  state.snap = els.snapToggle.checked;
  saveState();
});

els.sectionList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-section-id]");
  if (!button) return;
  state.selectedSection = button.dataset.sectionId;
  render();
});

els.canvasViewport.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  if (event.target.closest(".menu-block")) return;
  event.preventDefault();
  clearSelectedSection();
  panState = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    scrollLeft: els.canvasViewport.scrollLeft,
    scrollTop: els.canvasViewport.scrollTop
  };
  els.canvasViewport.classList.add("is-panning");
  safeSetPointerCapture(els.canvasViewport, event.pointerId);
});

els.canvasViewport.addEventListener("pointermove", (event) => {
  if (!panState || event.pointerId !== panState.pointerId) return;
  event.preventDefault();
  const dx = event.clientX - panState.startX;
  const dy = event.clientY - panState.startY;
  els.canvasViewport.scrollLeft = panState.scrollLeft - dx;
  els.canvasViewport.scrollTop = panState.scrollTop - dy;
});

function stopCanvasPan(event) {
  if (!panState || (event && event.pointerId !== panState.pointerId)) return;
  if (event) safeReleasePointerCapture(els.canvasViewport, event.pointerId);
  panState = null;
  els.canvasViewport.classList.remove("is-panning");
}

els.canvasViewport.addEventListener("pointerup", stopCanvasPan);
els.canvasViewport.addEventListener("pointercancel", stopCanvasPan);

els.canvas.addEventListener("pointerdown", (event) => {
  const block = event.target.closest(".menu-block");
  if (!block) return;
  event.preventDefault();
  const pageIndex = Number(block.dataset.pageIndex);
  state.selectedPage = pageIndex;
  state.selectedSection = block.dataset.sectionId;

  const section = activeSection();
  const grid = block.closest(".sections-grid");
  const rect = grid.getBoundingClientRect();
  const isResize = Boolean(event.target.closest("[data-resize-handle]"));
  dragState = {
    mode: isResize ? "resize" : "move",
    pointerId: event.pointerId,
    section,
    page: activePage(),
    rect,
    block,
    startX: event.clientX,
    startY: event.clientY,
    startFrame: { x: section.x, y: section.y, w: section.w, h: section.h }
  };
  safeSetPointerCapture(block, event.pointerId);
  syncSelectionClasses();
  renderControls();
  renderSectionEditor();
});

window.addEventListener("pointermove", (event) => {
  if (!dragState) return;
  const dx = ((event.clientX - dragState.startX) / dragState.rect.width) * 100;
  const dy = ((event.clientY - dragState.startY) / dragState.rect.height) * 100;
  const section = dragState.section;
  if (dragState.mode === "move") {
    const snapped = snapMoveFrame({
      x: dragState.startFrame.x + dx,
      y: dragState.startFrame.y + dy,
      w: dragState.startFrame.w,
      h: dragState.startFrame.h
    }, dragState.page, dragState.rect);
    section.x = snapped.x;
    section.y = snapped.y;
  } else {
    const snapped = snapResizeFrame({
      x: section.x,
      y: section.y,
      w: dragState.startFrame.w + dx,
      h: dragState.startFrame.h + dy
    }, dragState.page, dragState.rect);
    section.w = snapped.w;
    section.h = snapped.h;
  }
  clampFrame(section);
  constrainSectionToFold(section, dragState.page, dragState.rect);
  updateBlockNode(dragState.block, section);
  syncEditorFrame(section);
});

window.addEventListener("pointerup", () => {
  if (!dragState) return;
  dragState = null;
  saveState();
});

els.addPage.addEventListener("click", openNewPageDialog);

els.newPageForm.addEventListener("submit", (event) => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  createBlankPageFromDialog();
  els.newPageDialog.close();
});

els.deletePage.addEventListener("click", () => {
  if (!state.pages.length) return;
  state.pages.splice(state.selectedPage, 1);
  state.selectedPage = Math.min(state.selectedPage, Math.max(0, state.pages.length - 1));
  state.selectedSection = activePage()?.sections[0]?.id || "";
  render();
});

els.addSection.addEventListener("click", () => {
  const page = activePage();
  if (!page) {
    openNewPageDialog();
    return;
  }
  const section = createSection();
  page.sections.push(section);
  state.selectedSection = section.id;
  render();
});

els.copySection.addEventListener("click", copyActiveSection);
els.pasteSection.addEventListener("click", pasteSectionCopy);

els.deleteSection.addEventListener("click", () => {
  const page = activePage();
  if (!page) return;
  const index = page.sections.findIndex((section) => section.id === state.selectedSection);
  if (index === -1) return;
  page.sections.splice(index, 1);
  state.selectedSection = page.sections[Math.max(0, index - 1)]?.id || "";
  render();
});

window.addEventListener("keydown", (event) => {
  if (isEditingText() || event.shiftKey || event.altKey) return;
  const shortcut = event.metaKey || event.ctrlKey;
  if (!shortcut) return;
  if (event.key.toLowerCase() === "c") {
    event.preventDefault();
    copyActiveSection();
  }
  if (event.key.toLowerCase() === "v") {
    event.preventDefault();
    pasteSectionCopy();
  }
});

els.exportProject.addEventListener("click", exportProject);
els.exportImage.addEventListener("click", () => {
  exportAllPageImages().catch((error) => alert(`导出图片失败：${error.message}`));
});
els.importProject.addEventListener("click", () => els.projectFile.click());
els.projectFile.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  importProject(file).catch((error) => alert(`导入失败：${error.message}`));
  event.target.value = "";
});

els.printPdf.addEventListener("click", () => window.print());

els.resetDemo.addEventListener("click", () => {
  localStorage.removeItem(OLD_STORAGE_KEY);
  state = structuredClone(demoMenu);
  render();
});

render();
