export const shopCategories = [
  { label: "All Products", path: "/shop" },
  { label: "Lipstick and Lip Care", path: "/shop/lipstick-and-lip-care" },
  { label: "Face Wash and Cleansers", path: "/shop/face-wash-and-cleansers" },
  { label: "Shampoo and Hair Care", path: "/shop/shampoo-and-hair-care" },
  { label: "Skincare", path: "/shop/skincare" },
  { label: "Makeup", path: "/shop/makeup" },
  { label: "Sunscreen", path: "/shop/sunscreen" },
  { label: "Body Care", path: "/shop/body-care" },
  { label: "Fragrance", path: "/shop/fragrance" },
] as const;

export type ShopCategory = (typeof shopCategories)[number]["label"];
export type ProductShopCategory = Exclude<ShopCategory, "All Products">;

export type Product = {
  id: string;
  name: string;
  line: string;
  category: string;
  shopCategory: ProductShopCategory;
  origin: string;
  originKey: "South Korea" | "Japan" | "USA" | "China";
  skinTypes: string[];
  concerns: string[];
  price: number;
  compareAt?: number;
  size: string;
  rating: number;
  reviews: number;
  status: "Bestseller" | "New" | "Limited" | "Restocking";
  stock: number;
  image: string;
  accent: string;
  summary: string;
  description: string;
  benefits: string[];
  ingredients: string;
  usage: string;
  verification: {
    recordId: string;
    batchNumber: string;
    sourceRoute: string;
    supplierDocument: string;
    certificateId: string;
    certificateType: string;
    certificateStatus: string;
    receivedDate: string;
    verifiedDate: string;
    bestBefore: string;
    checks: string[];
    note: string;
  };
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "dewveil-amino-cleanser",
    name: "Dewveil Amino Cleanser",
    line: "Gentle daily cleanse",
    category: "Cleansers",
    shopCategory: "Face Wash and Cleansers",
    origin: "South Korea",
    originKey: "South Korea",
    skinTypes: ["All skin", "Sensitive"],
    concerns: ["Dryness", "Barrier care"],
    price: 1850,
    size: "150 ml",
    rating: 4.9,
    reviews: 128,
    status: "Bestseller",
    stock: 18,
    image: "/images/products/dewveil-cleanser.webp",
    accent: "#b97b86",
    summary: "A low-foam amino-acid wash that lifts sunscreen and daily buildup without a tight finish.",
    description:
      "A soft, milky cleanser selected for humid-weather routines and easily disrupted skin barriers. Its cushiony lather rinses clean while leaving the complexion comfortable and balanced.",
    benefits: ["Cleanses without stripping", "Supports a calm-feeling barrier", "Rinses without residue"],
    ingredients: "Amino-acid surfactants, panthenol, beta-glucan, glycerin",
    usage: "Massage one pump over damp skin for 30–45 seconds, then rinse with lukewarm water.",
    verification: {
      recordId: "ORV-KR-260714-01",
      batchNumber: "DVA-KR-26K041",
      sourceRoute: "Reviewed South Korean exporter → ORAVÈ online fulfilment, Dhaka",
      supplierDocument: "Commercial invoice KR-0714 · packing list 04",
      certificateId: "SAD-KR-DVA-260714",
      certificateType: "Supplier authenticity declaration",
      certificateStatus: "Reviewed and matched to this batch",
      receivedDate: "14 Jul 2026",
      verifiedDate: "15 Jul 2026",
      bestBefore: "Apr 2029",
      checks: [
        "Supplier identity and invoice matched to the ordered cleanser",
        "Pump collar, outer seal and printed lot code inspected on arrival",
        "Volume, origin and label-print details compared with the source file",
      ],
      note: "This received batch passed ORAVÈ's document, packaging and condition review before being listed online.",
    },
    featured: true,
  },
  {
    id: "rice-cloud-essence",
    name: "Rice Cloud Treatment Essence",
    line: "Lightweight first hydration",
    category: "Treatments",
    shopCategory: "Skincare",
    origin: "Japan",
    originKey: "Japan",
    skinTypes: ["All skin", "Dehydrated"],
    concerns: ["Dullness", "Dehydration"],
    price: 2450,
    size: "120 ml",
    rating: 4.8,
    reviews: 94,
    status: "Bestseller",
    stock: 11,
    image: "/images/products/rice-cloud-essence.webp",
    accent: "#b59472",
    summary: "A featherlight first-step essence that softens, hydrates and prepares skin for the rest of a routine.",
    description:
      "This water-light treatment layers easily in warm weather. A considered blend of fermented rice filtrate and humectants helps soften texture and restore a fresh, rested look.",
    benefits: ["Adds weightless hydration", "Softens the look of texture", "Layers without stickiness"],
    ingredients: "Fermented rice filtrate, glycerin, betaine, allantoin",
    usage: "After cleansing, press one or two layers into the face and neck with clean palms.",
    verification: {
      recordId: "ORV-JP-260709-02",
      batchNumber: "RCTE-JP-6F18",
      sourceRoute: "Reviewed Japanese supplier → ORAVÈ online fulfilment, Dhaka",
      supplierDocument: "Supplier invoice JP-0709 · export carton record 18",
      certificateId: "SAD-JP-RCTE-260709",
      certificateType: "Supplier distribution and authenticity record",
      certificateStatus: "Reviewed and matched to this batch",
      receivedDate: "09 Jul 2026",
      verifiedDate: "10 Jul 2026",
      bestBefore: "May 2029",
      checks: [
        "Supplier item code and invoice quantity matched to the essence",
        "Bottle cap, shrink seal and base lot marking inspected on arrival",
        "Japanese label details and declared volume compared with the source file",
      ],
      note: "The bottle and shipping records for this batch were reviewed together before online availability was approved.",
    },
    featured: true,
  },
  {
    id: "c-bright-serum",
    name: "C-Bright 15% Serum",
    line: "Daily antioxidant concentrate",
    category: "Treatments",
    shopCategory: "Skincare",
    origin: "USA",
    originKey: "USA",
    skinTypes: ["Normal", "Combination"],
    concerns: ["Dullness", "Uneven tone"],
    price: 2950,
    compareAt: 3250,
    size: "30 ml",
    rating: 4.7,
    reviews: 76,
    status: "Limited",
    stock: 7,
    image: "/images/products/c-bright-serum.webp",
    accent: "#a86b4d",
    summary: "A concentrated morning serum designed to brighten the appearance of uneven, tired-looking skin.",
    description:
      "A balanced antioxidant serum pairing 15% vitamin C with supporting hydrators. The fluid texture sits comfortably under moisturizer and sunscreen without adding unnecessary weight.",
    benefits: ["Boosts visible radiance", "Supports a more even-looking tone", "Layers under sunscreen"],
    ingredients: "15% vitamin C complex, vitamin E, ferulic acid, hyaluronic acid",
    usage: "Apply two to three drops to dry skin in the morning. Follow with moisturizer and broad-spectrum sunscreen.",
    verification: {
      recordId: "ORV-US-260706-01",
      batchNumber: "CB15-US-26051",
      sourceRoute: "Reviewed USA distributor → ORAVÈ online fulfilment, Dhaka",
      supplierDocument: "Distributor invoice US-0706 · export packing record C15",
      certificateId: "DAD-US-CB15-260706",
      certificateType: "Distributor authenticity declaration",
      certificateStatus: "Reviewed and matched to this batch",
      receivedDate: "06 Jul 2026",
      verifiedDate: "07 Jul 2026",
      bestBefore: "Feb 2028",
      checks: [
        "Distributor account and item code matched to the serum order",
        "Dropper seal, tamper ring and amber bottle condition inspected",
        "Batch print and concentration label compared with the distributor file",
      ],
      note: "This serum batch cleared ORAVÈ's document match and arrival-condition check before listing.",
    },
    featured: true,
  },
  {
    id: "ceramide-silk-barrier-cream",
    name: "Ceramide Silk Barrier Cream",
    line: "Comforting moisture seal",
    category: "Moisturizers",
    shopCategory: "Skincare",
    origin: "South Korea",
    originKey: "South Korea",
    skinTypes: ["Dry", "Sensitive"],
    concerns: ["Dryness", "Barrier care"],
    price: 2680,
    size: "50 ml",
    rating: 4.9,
    reviews: 163,
    status: "Bestseller",
    stock: 14,
    image: "/images/products/barrier-cream.webp",
    accent: "#b6a08b",
    summary: "A plush but breathable cream that cushions dry, easily sensitized skin without a waxy after-feel.",
    description:
      "A barrier-focused moisturizer with a soft satin finish. Ceramides and calming lipids help reduce the uncomfortable feeling that can follow cleansing, air conditioning or active treatments.",
    benefits: ["Comforts dry skin", "Helps reinforce the moisture barrier", "Soft satin finish"],
    ingredients: "Ceramide complex, squalane, cholesterol, centella extract",
    usage: "Smooth a small amount over face and neck as the final moisturizer step, morning or evening.",
    verification: {
      recordId: "ORV-KR-260718-03",
      batchNumber: "CSBC-KR-26H22",
      sourceRoute: "Reviewed South Korean exporter → ORAVÈ online fulfilment, Dhaka",
      supplierDocument: "Commercial invoice KR-0718 · carton manifest 22",
      certificateId: "SAD-KR-CSBC-260718",
      certificateType: "Supplier authenticity declaration",
      certificateStatus: "Reviewed and matched to this batch",
      receivedDate: "18 Jul 2026",
      verifiedDate: "19 Jul 2026",
      bestBefore: "Jun 2029",
      checks: [
        "Supplier invoice and cream item code matched to the import record",
        "Jar liner, carton seal and base lot code inspected on arrival",
        "Weight marking, origin line and packaging finish compared with the source file",
      ],
      note: "The jar, outer carton and supplier paperwork were reviewed as one batch-level record.",
    },
    featured: true,
  },
  {
    id: "weightless-uv-fluid",
    name: "Weightless UV Fluid SPF 50+",
    line: "Daily invisible protection",
    category: "Sun Care",
    shopCategory: "Sunscreen",
    origin: "Japan",
    originKey: "Japan",
    skinTypes: ["All skin", "Combination"],
    concerns: ["Sun care", "Oil control"],
    price: 2250,
    size: "50 ml",
    rating: 4.8,
    reviews: 211,
    status: "Bestseller",
    stock: 23,
    image: "/images/products/uv-fluid.webp",
    accent: "#c3aa7f",
    summary: "A fluid everyday sunscreen with a natural finish, made for comfortable wear in heat and humidity.",
    description:
      "A silky, quick-set sun fluid selected for Bangladesh weather. It spreads evenly, wears well beneath makeup and leaves no deliberately tinted finish.",
    benefits: ["High everyday protection", "Quick-set natural finish", "Comfortable beneath makeup"],
    ingredients: "Modern UV filters, glycerin, green-tea extract, vitamin E",
    usage: "Apply generously as the final morning step, 15 minutes before sun exposure. Reapply as needed.",
    verification: {
      recordId: "ORV-JP-260721-01",
      batchNumber: "WUV-JP-6G03",
      sourceRoute: "Reviewed Japanese supplier → ORAVÈ online fulfilment, Dhaka",
      supplierDocument: "Supplier invoice JP-0721 · export case record UV03",
      certificateId: "SAD-JP-WUV-260721",
      certificateType: "Supplier authenticity and distribution record",
      certificateStatus: "Reviewed and matched to this batch",
      receivedDate: "21 Jul 2026",
      verifiedDate: "22 Jul 2026",
      bestBefore: "Mar 2029",
      checks: [
        "Supplier account and sunscreen item code matched to the order",
        "Cap seal, bottle print and base lot marking inspected on arrival",
        "SPF label, declared volume and Japanese origin statement compared with the source file",
      ],
      note: "This sunscreen batch was released for online sale only after its source record and packaging checks aligned.",
    },
    featured: true,
  },
  {
    id: "petal-veil-lip-tint",
    name: "Petal Veil Lip Tint",
    line: "Soft rose satin color",
    category: "Makeup",
    shopCategory: "Lipstick and Lip Care",
    origin: "South Korea",
    originKey: "South Korea",
    skinTypes: ["All skin"],
    concerns: ["Color", "Comfort"],
    price: 1550,
    size: "4.5 g",
    rating: 4.7,
    reviews: 87,
    status: "New",
    stock: 16,
    image: "/images/products/lip-tint.webp",
    accent: "#b85f70",
    summary: "A buildable muted-rose tint with a smooth satin finish and a comfortable, softly blurred edge.",
    description:
      "A refined everyday lip color that can be tapped on as a soft stain or layered for richer coverage. The flexible texture stays comfortable without feeling syrupy.",
    benefits: ["Buildable muted color", "Soft-focus satin finish", "Comfortable flexible wear"],
    ingredients: "Emollient esters, jojoba derivative, vitamin E, flexible color pigments",
    usage: "Apply to the center of the lips and blend outward, or layer evenly for fuller color.",
    verification: {
      recordId: "ORV-KR-260724-02",
      batchNumber: "PVLT-KR-26C117",
      sourceRoute: "Reviewed South Korean exporter → ORAVÈ online fulfilment, Dhaka",
      supplierDocument: "Commercial invoice KR-0724 · shade manifest R17",
      certificateId: "SAD-KR-PVLT-260724",
      certificateType: "Supplier authenticity declaration",
      certificateStatus: "Reviewed and matched to this shade batch",
      receivedDate: "24 Jul 2026",
      verifiedDate: "25 Jul 2026",
      bestBefore: "May 2029",
      checks: [
        "Shade code, unit quantity and supplier invoice matched",
        "Tube seal, applicator closure and base batch print inspected",
        "Color-name label and South Korean origin marking compared with the source file",
      ],
      note: "The shade manifest is stored with this lot so the selected color can be traced to its reviewed supplier record.",
    },
    featured: true,
  },
  {
    id: "satin-skin-cushion",
    name: "Satin Skin Cushion SPF 35",
    line: "Flexible light-to-medium cover",
    category: "Makeup",
    shopCategory: "Makeup",
    origin: "South Korea",
    originKey: "South Korea",
    skinTypes: ["Normal", "Combination"],
    concerns: ["Coverage", "Uneven tone"],
    price: 2850,
    size: "15 g",
    rating: 4.6,
    reviews: 58,
    status: "New",
    stock: 9,
    image: "/images/products/cushion.webp",
    accent: "#a88767",
    summary: "A flexible cushion base that evens the complexion while preserving a skin-like satin finish.",
    description:
      "A compact complexion formula chosen for light, buildable coverage. The fine texture layers over sunscreen and can be refreshed through the day without looking heavy.",
    benefits: ["Buildable coverage", "Skin-like satin finish", "Portable touch-ups"],
    ingredients: "Flexible film formers, niacinamide, humectants, mineral pigments",
    usage: "Press the puff lightly into the cushion and pat from the center of the face outward.",
    verification: {
      recordId: "ORV-KR-260726-01",
      batchNumber: "SSC-KR-26S35",
      sourceRoute: "Reviewed South Korean exporter → ORAVÈ online fulfilment, Dhaka",
      supplierDocument: "Commercial invoice KR-0726 · shade and refill list S35",
      certificateId: "SAD-KR-SSC-260726",
      certificateType: "Supplier authenticity declaration",
      certificateStatus: "Reviewed and matched to this shade batch",
      receivedDate: "26 Jul 2026",
      verifiedDate: "27 Jul 2026",
      bestBefore: "Jun 2029",
      checks: [
        "Shade, refill format and supplier item code matched to the order",
        "Compact clasp, inner foil and refill seal inspected on arrival",
        "SPF, weight and base lot details compared with the source file",
      ],
      note: "This compact's shade and refill references were checked against the same supplier file before listing.",
    },
  },
  {
    id: "camellia-melt-cleansing-balm",
    name: "Camellia Melt Cleansing Balm",
    line: "First-step makeup dissolve",
    category: "Cleansers",
    shopCategory: "Face Wash and Cleansers",
    origin: "Japan",
    originKey: "Japan",
    skinTypes: ["All skin", "Dry"],
    concerns: ["Makeup removal", "Dryness"],
    price: 2300,
    size: "90 g",
    rating: 4.8,
    reviews: 101,
    status: "Limited",
    stock: 6,
    image: "/images/products/cleansing-balm.webp",
    accent: "#93a27a",
    summary: "A soft balm-to-oil cleanser that loosens makeup and sunscreen, then emulsifies to a milky rinse.",
    description:
      "A non-gritty cleansing balm with a clean melt and easy emulsification. It removes long-wear layers while keeping the first step of an evening routine comfortable.",
    benefits: ["Dissolves long-wear layers", "Emulsifies cleanly", "Soft, non-gritty texture"],
    ingredients: "Camellia oil, lightweight esters, rice-bran oil, vitamin E",
    usage: "Massage onto dry skin, add water to emulsify, then rinse. Follow with a water-based cleanser if desired.",
    verification: {
      recordId: "ORV-JP-260712-01",
      batchNumber: "CMCB-JP-6B09",
      sourceRoute: "Reviewed Japanese supplier → ORAVÈ online fulfilment, Dhaka",
      supplierDocument: "Supplier invoice JP-0712 · export carton record B09",
      certificateId: "SAD-JP-CMCB-260712",
      certificateType: "Supplier distribution and authenticity record",
      certificateStatus: "Reviewed and matched to this batch",
      receivedDate: "12 Jul 2026",
      verifiedDate: "13 Jul 2026",
      bestBefore: "Apr 2029",
      checks: [
        "Supplier item code and balm quantity matched to the shipping record",
        "Jar seal, lid fit and base lot marking inspected on arrival",
        "Net weight, Japanese origin and label layout compared with the source file",
      ],
      note: "This balm lot passed a combined supplier-document, seal and packaging-condition review.",
    },
  },
  {
    id: "glass-dew-mask-set",
    name: "Glass Dew Hydration Mask Set",
    line: "Five intensive moisture sheets",
    category: "Masks",
    shopCategory: "Skincare",
    origin: "China",
    originKey: "China",
    skinTypes: ["All skin", "Dehydrated"],
    concerns: ["Dehydration", "Dullness"],
    price: 1450,
    size: "5 × 25 ml",
    rating: 4.5,
    reviews: 34,
    status: "Restocking",
    stock: 0,
    image: "/images/products/hydration-mask.webp",
    accent: "#b79b94",
    summary: "A five-piece moisture mask set authentically imported from China and designed for occasional hydration resets.",
    description:
      "A soft cellulose sheet saturated with a simple humectant essence. This China-imported set follows the same supplier, batch and condition checks as every product listed by ORAVÈ online.",
    benefits: ["Immediate moisture boost", "Soft cellulose fit", "Simple occasional treatment"],
    ingredients: "Glycerin, beta-glucan, panthenol, sodium hyaluronate",
    usage: "Apply to clean skin for 10–15 minutes. Remove and press in the remaining essence; do not rinse.",
    verification: {
      recordId: "ORV-CN-PRE-260729-01",
      batchNumber: "GDMS-CN-2606A",
      sourceRoute: "Reviewed Chinese supplier → scheduled ORAVÈ arrival review, Dhaka",
      supplierDocument: "Pro-forma invoice CN-0729 · five-piece set packing list 6A",
      certificateId: "SAD-CN-GDMS-260729",
      certificateType: "Supplier authenticity declaration",
      certificateStatus: "Source file reviewed · arrival check pending",
      receivedDate: "Expected Aug 2026",
      verifiedDate: "Source review completed 29 Jul 2026",
      bestBefore: "To be confirmed on arrival",
      checks: [
        "Supplier identity, set configuration and pro-forma invoice matched",
        "Five-sachet pack code and export packing details reviewed",
        "Sachet seals, printed lot and physical condition will be checked before relisting",
      ],
      note: "This incoming batch is not yet available. ORAVÈ will complete the physical arrival inspection before accepting online orders.",
    },
  },
  // Mock catalog records use neutral in-project packshots until final category photography is supplied.
  {
    id: "silk-root-repair-shampoo",
    name: "Silk Root Repair Shampoo",
    line: "Softening everyday cleanse",
    category: "Hair Care",
    shopCategory: "Shampoo and Hair Care",
    origin: "South Korea",
    originKey: "South Korea",
    skinTypes: ["All skin"],
    concerns: ["Dryness", "Breakage"],
    price: 2180,
    compareAt: 2400,
    size: "320 ml",
    rating: 4.7,
    reviews: 42,
    status: "New",
    stock: 15,
    image: "/images/products/dewveil-cleanser.webp",
    accent: "#8f786d",
    summary: "A softly lathering daily shampoo designed to cleanse the scalp while leaving dry lengths smooth and manageable.",
    description:
      "A balanced hair-and-scalp cleanser with a creamy rinse and lightweight finish. The formula is positioned for regular use when lengths need softness without a heavy coated feel.",
    benefits: ["Cleanses without a rough finish", "Softens dry-feeling lengths", "Rinses clean for regular use"],
    ingredients: "Amino-acid surfactants, panthenol, rice protein, camellia extract",
    usage: "Massage through wet scalp and hair, work into a gentle lather, then rinse thoroughly. Repeat only when needed.",
    verification: {
      recordId: "ORV-KR-260731-04",
      batchNumber: "SRRS-KR-26H19",
      sourceRoute: "Reviewed South Korean exporter → ORAVÈ online fulfilment, Dhaka",
      supplierDocument: "Commercial invoice KR-0731 · hair-care packing list H19",
      certificateId: "SAD-KR-SRRS-260731",
      certificateType: "Supplier authenticity declaration",
      certificateStatus: "Reviewed and matched to this batch",
      receivedDate: "31 Jul 2026",
      verifiedDate: "01 Aug 2026",
      bestBefore: "Jun 2029",
      checks: [
        "Supplier item code and shampoo volume matched to the order record",
        "Pump lock, bottle seal and printed lot marking inspected on arrival",
        "Ingredient label, origin statement and carton count compared with the source file",
      ],
      note: "This shampoo record includes the supplier, batch and arrival-condition checks required before an active online listing.",
    },
  },
  {
    id: "yuzu-velvet-body-lotion",
    name: "Yuzu Velvet Body Lotion",
    line: "Lightweight all-over moisture",
    category: "Body Moisturizers",
    shopCategory: "Body Care",
    origin: "Japan",
    originKey: "Japan",
    skinTypes: ["All skin", "Dry"],
    concerns: ["Dryness", "Comfort"],
    price: 2350,
    size: "250 ml",
    rating: 4.8,
    reviews: 39,
    status: "New",
    stock: 12,
    image: "/images/products/barrier-cream.webp",
    accent: "#c39b72",
    summary: "A quick-absorbing body lotion that leaves arms and legs comfortably moisturized with a soft, non-greasy finish.",
    description:
      "A fluid daily moisturizer selected for warm-weather body care. It spreads easily, settles without tackiness and supports a smooth, comfortable feel after bathing.",
    benefits: ["Adds lightweight daily moisture", "Softens rough-feeling areas", "Absorbs without a heavy film"],
    ingredients: "Yuzu extract, glycerin, squalane, ceramide complex",
    usage: "Smooth over clean, slightly damp skin and massage until absorbed. Reapply to drier areas as needed.",
    verification: {
      recordId: "ORV-JP-260730-03",
      batchNumber: "YVBL-JP-6Y12",
      sourceRoute: "Reviewed Japanese supplier → ORAVÈ online fulfilment, Dhaka",
      supplierDocument: "Supplier invoice JP-0730 · body-care carton record Y12",
      certificateId: "SAD-JP-YVBL-260730",
      certificateType: "Supplier distribution and authenticity record",
      certificateStatus: "Reviewed and matched to this batch",
      receivedDate: "30 Jul 2026",
      verifiedDate: "31 Jul 2026",
      bestBefore: "May 2029",
      checks: [
        "Supplier account and body-lotion item code matched to the purchase file",
        "Container seal, cap fit and base lot marking inspected on arrival",
        "Declared volume, Japanese origin line and carton labeling compared with the source record",
      ],
      note: "This body-lotion batch passed ORAVÈ's supplier-document and physical packaging review before online availability.",
    },
  },
  {
    id: "santal-bloom-eau-de-parfum",
    name: "Santal Bloom Eau de Parfum",
    line: "Warm woods with soft florals",
    category: "Fragrance",
    shopCategory: "Fragrance",
    origin: "USA",
    originKey: "USA",
    skinTypes: ["All skin"],
    concerns: ["Warm woods", "Layering"],
    price: 4850,
    size: "50 ml",
    rating: 4.6,
    reviews: 27,
    status: "New",
    stock: 8,
    image: "/images/products/rice-cloud-essence.webp",
    accent: "#8b6b5c",
    summary: "A softly diffusive eau de parfum pairing sandalwood warmth with airy petals and a clean skin-musk finish.",
    description:
      "A refined everyday fragrance with a calm woody center and restrained floral lift. The dry-down stays close and polished, making it easy to wear alone or layer.",
    benefits: ["Balanced woody-floral profile", "Soft everyday projection", "Layer-friendly dry-down"],
    ingredients: "Alcohol denat., parfum, sandalwood accord, white-floral accord, musk accord",
    usage: "Mist lightly onto pulse points from a short distance. Allow the fragrance to dry naturally without rubbing.",
    verification: {
      recordId: "ORV-US-260728-05",
      batchNumber: "SBEP-US-26S08",
      sourceRoute: "Reviewed USA distributor → ORAVÈ online fulfilment, Dhaka",
      supplierDocument: "Distributor invoice US-0728 · fragrance packing record S08",
      certificateId: "DAD-US-SBEP-260728",
      certificateType: "Distributor authenticity declaration",
      certificateStatus: "Reviewed and matched to this batch",
      receivedDate: "28 Jul 2026",
      verifiedDate: "29 Jul 2026",
      bestBefore: "Jul 2031",
      checks: [
        "Distributor item reference and fragrance volume matched to the order",
        "Atomizer fit, bottle seal and printed batch marking inspected on arrival",
        "Fragrance name, declared origin and outer-box details compared with the distributor file",
      ],
      note: "This fragrance batch cleared ORAVÈ's document, bottle and packaging-condition review before its active listing.",
    },
  },
];

export type JournalEntry = {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  imagePosition?: string;
  excerpt: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  relatedProductIds: string[];
};

export const journalEntries: JournalEntry[] = [
  {
    id: "layering-hydration-in-dhaka-weather",
    title: "Layering Hydration in Dhaka Weather",
    category: "Routine Notes",
    date: "24 July 2026",
    readTime: "5 min read",
    image: "/images/editorial/morning-ritual.webp",
    imagePosition: "center 36%",
    excerpt: "A lighter way to build comfortable hydration when heat, humidity and indoor cooling share the same day.",
    intro:
      "Hydration does not have to mean a long routine. In warm, humid weather, the most elegant approach is often a few thin layers chosen for how they feel together.",
    sections: [
      {
        heading: "Begin with a comfortable cleanse",
        paragraphs: [
          "If skin already feels tight after cleansing, every step that follows has to work harder. Choose a wash that removes sunscreen and daily buildup without leaving a squeaky finish.",
          "Pat away excess water, but leave the complexion slightly damp before applying a first hydrating layer.",
        ],
      },
      {
        heading: "Use one light layer at a time",
        paragraphs: [
          "Press a water-light essence into the skin and pause briefly. If one layer feels sufficient, stop there. If air conditioning or dehydration has left the skin uncomfortable, add a second thin layer rather than a thick coat all at once.",
        ],
      },
      {
        heading: "Seal only where you need it",
        paragraphs: [
          "A small amount of moisturizer can be concentrated around the cheeks and other dry areas. During the day, finish with sunscreen and allow each layer to settle before the next.",
        ],
      },
    ],
    relatedProductIds: ["dewveil-amino-cleanser", "rice-cloud-essence", "ceramide-silk-barrier-cream"],
  },
  {
    id: "how-we-check-authenticity",
    title: "How We Check Authenticity Before a Product Reaches You",
    category: "Our Standards",
    date: "18 July 2026",
    readTime: "6 min read",
    image: "/images/hero.webp",
    imagePosition: "70% center",
    excerpt: "Documentation, packaging review and batch-level checks form the practical core of our sourcing process.",
    intro:
      "Authenticity is not a decorative promise. At ORAVÈ, it is a chain of repeatable checks—from who supplied an item to how its batch information and packaging reach our online-order fulfilment base in Dhaka.",
    sections: [
      {
        heading: "Start with the source",
        paragraphs: [
          "We source authentic imported products through reviewed purchasing routes in South Korea, Japan, the USA and China. Supplier documentation and physical inspection must meet the same requirements across all four source markets.",
        ],
      },
      {
        heading: "Inspect the physical details",
        paragraphs: [
          "We review seals, print quality, batch markings, fill consistency and packaging construction. A single detail is not treated as proof on its own; the full set of details must make sense together.",
        ],
      },
      {
        heading: "Keep the path visible",
        paragraphs: [
          "Product pages state the listed country of origin, size and practical usage information. If a batch has a special sourcing note, we surface it rather than hiding it in fine print.",
        ],
      },
    ],
    relatedProductIds: ["c-bright-serum", "weightless-uv-fluid", "glass-dew-mask-set"],
  },
  {
    id: "the-three-step-morning-edit",
    title: "The Three-Step Morning Edit",
    category: "Routine Notes",
    date: "10 July 2026",
    readTime: "4 min read",
    image: "/images/hero.webp",
    imagePosition: "68% center",
    excerpt: "Cleanse, moisturize, protect: a concise morning structure that leaves room for your skin to guide the details.",
    intro:
      "A dependable routine is easier to repeat when each step has a clear job. For many mornings, three considered steps are enough.",
    sections: [
      {
        heading: "Cleanse according to the morning",
        paragraphs: [
          "A gentle wash can refresh an oily or humid-weather morning. If skin feels dry, a water rinse may be enough. Comfort is a better guide than habit alone.",
        ],
      },
      {
        heading: "Add the right amount of moisture",
        paragraphs: [
          "Use a thin layer and give it a moment to settle. More product does not always create more comfort, especially beneath sunscreen.",
        ],
      },
      {
        heading: "Finish with generous protection",
        paragraphs: [
          "Apply broad-spectrum sunscreen evenly across the face, neck and exposed areas. Reapply according to exposure, perspiration and time outdoors.",
        ],
      },
    ],
    relatedProductIds: ["dewveil-amino-cleanser", "ceramide-silk-barrier-cream", "weightless-uv-fluid"],
  },
];

export const storyEntries = [
  {
    stage: "01",
    title: "Online from Rayerbag",
    text: "ORAVÈ operates exclusively online from Rayerbag, Dhaka. There is no physical storefront, walk-in service or pickup counter; every order is arranged for home delivery across Bangladesh.",
    tags: ["100% online", "Nationwide delivery"],
  },
  {
    stage: "02",
    title: "Authentic imports, four source markets",
    text: "We source imported cosmetics and beauty products through reviewed routes in South Korea, Japan, the USA and China, with documentation considered before any item is listed online.",
    tags: ["South Korea", "Japan", "USA", "China"],
  },
  {
    stage: "03",
    title: "Documented before listing",
    text: "Supplier details, batch information and physical presentation are reviewed before products from any source country are added to the ORAVÈ online selection.",
    tags: ["Supplier review", "Batch checks"],
  },
  {
    stage: "04",
    title: "Checked before online dispatch",
    text: "Seals, print, batch markings, packaging condition and fill consistency are checked when imported stock reaches our Dhaka fulfilment base and again before home-delivery dispatch.",
    tags: ["Inspection", "Delivery ready"],
  },
  {
    stage: "05",
    title: "Online support after delivery",
    text: "Customers across Bangladesh can reach ORAVÈ by phone, email or WhatsApp for delivery questions, order support and practical product guidance.",
    tags: ["Online support", "Aftercare"],
  },
] as const;

export const formatPrice = (value: number) => `৳${value.toLocaleString("en-BD")}`;
