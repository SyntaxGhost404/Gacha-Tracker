import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

async function loadCatalogData() {
  const source = await readFile(projectFile("app/data.ts"), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
}

test("home directory is generated for every populated catalog category", async () => {
  const { products, shopCategories } = await loadCatalogData();
  assert.deepEqual(
    shopCategories.slice(1).map(({ label }) => label),
    [
      "Lipstick and Lip Care",
      "Face Wash and Cleansers",
      "Shampoo and Hair Care",
      "Skincare",
      "Makeup",
      "Sunscreen",
      "Body Care",
      "Fragrance",
    ],
  );

  for (const { label } of shopCategories.slice(1)) {
    const categoryItems = products.filter((product) => product.shopCategory === label && product.stock > 0);
    assert.ok(categoryItems.length > 0, `${label} needs at least one active product`);
    for (const product of categoryItems) {
      assert.ok(product.name.trim(), `${product.id} needs a title`);
      assert.ok(product.category.trim(), `${product.id} needs a product tag`);
      assert.ok(product.price > 0, `${product.id} needs a price`);
      assert.ok(product.size.trim(), `${product.id} needs a size`);
      assert.ok(product.summary.trim(), `${product.id} needs summary copy`);
      assert.ok(product.image.startsWith("/images/products/"), `${product.id} needs a local product image`);
      await access(projectFile(`public${product.image}`));
    }
  }

  const pages = await readFile(projectFile("app/Pages.tsx"), "utf8");
  assert.match(pages, /homeCategoryDefinitions\.map\(\(category, sectionIndex\) =>/);
  assert.match(pages, /product\.shopCategory === category\.label/);
  assert.match(pages, /<ProductCard[\s\S]*?compact/);
  assert.doesNotMatch(pages, /CategoryPreviewCard|Collection in progress|Authenticity review|Arrival planning/);
});

test("home category metadata adapts only at the mobile breakpoint", async () => {
  const [pages, styles] = await Promise.all([
    readFile(projectFile("app/Pages.tsx"), "utf8"),
    readFile(projectFile("app/globals.css"), "utf8"),
  ]);

  assert.match(pages, /className="view-category-label-full">View category<\/span>/);
  assert.match(pages, /className="view-category-label-short">View<\/span>/);
  assert.match(styles, /\.view-category-label-short \{ display: none; \}/);
  assert.match(styles, /@media \(max-width: 600px\) \{[\s\S]*?\.home-category-section \.count-badge \{ display: none; \}/);
  assert.match(styles, /@media \(max-width: 600px\) \{[\s\S]*?\.view-category-label-full \{ display: none; \}[\s\S]*?\.view-category-label-short \{ display: inline; \}/);
});

test("legacy home sections stay in source but remain disabled", async () => {
  const pages = await readFile(projectFile("app/Pages.tsx"), "utf8");
  assert.match(pages, /const SHOW_LEGACY_HOME_SECTIONS = false;/);
  assert.match(pages, /function LegacyHomeSections/);
  assert.match(pages, /title="From the beauty journal"/);
  assert.match(pages, /title="The current edit"/);
  assert.match(pages, /SHOW_LEGACY_HOME_SECTIONS && <LegacyHomeSections/);
  assert.doesNotMatch(pages, /Not sure where to begin\?|Tell us about your routine|Ask ORAVÈ/);
});

test("category rails use native infinite scrolling with delayed interaction resume", async () => {
  const [pages, styles] = await Promise.all([
    readFile(projectFile("app/Pages.tsx"), "utf8"),
    readFile(projectFile("app/globals.css"), "utf8"),
  ]);

  assert.match(pages, /const CATEGORY_INTERACTION_RESUME_MS = 8_000;/);
  assert.match(pages, /const CATEGORY_AUTO_SCROLL_PX_PER_MS = 0\.028;/);
  assert.match(pages, /window\.requestAnimationFrame\(move\)/);
  assert.match(pages, /viewport\.scrollLeft \+= Math\.min\(time - previousTime, 40\) \* CATEGORY_AUTO_SCROLL_PX_PER_MS/);
  assert.match(pages, /\[0, 1, 2\]\.map\(\(groupIndex\) =>/);
  assert.match(pages, /onPointerDown=\{handlePointerDown\}/);
  assert.match(pages, /onPointerMove=\{handlePointerMove\}/);
  assert.match(pages, /onPointerUp=\{handlePointerEnd\}/);
  assert.match(pages, /onMouseEnter=\{pauseForInteraction\}/);
  assert.match(pages, /onMouseLeave=/);
  assert.match(pages, /onWheel=/);
  assert.match(pages, /onFocusCapture=\{pauseForInteraction\}/);
  assert.match(styles, /\.category-marquee \{[\s\S]*?overflow-x: auto;[\s\S]*?touch-action: pan-x pan-y;/);
  assert.match(styles, /\.category-marquee\.is-dragging \{ cursor: grabbing; user-select: none; \}/);
  assert.match(styles, /\.category-marquee-card \{[^}]*width: var\(--category-card-width\);[^}]*height: var\(--category-card-height\);[^}]*flex: 0 0 var\(--category-card-width\);/);
  assert.match(styles, /@media \(max-width: 768px\) \{[\s\S]*?--category-card-width: clamp\(/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\.category-marquee-group:nth-child\(n \+ 2\) \{ display: none; \}/);
  assert.doesNotMatch(pages, /inert=\{visualClone\}|aria-hidden=\{visualClone\}/);
});

test("every repeated home card keeps the shared actions and verification cooldown", async () => {
  const [pages, storefront, card] = await Promise.all([
    readFile(projectFile("app/Pages.tsx"), "utf8"),
    readFile(projectFile("app/Storefront.tsx"), "utf8"),
    readFile(projectFile("app/ProductCard.tsx"), "utf8"),
  ]);

  assert.match(pages, /const CATEGORY_VERIFICATION_RESUME_MS = 5_000;/);
  assert.match(pages, /setVerificationPaused\(true\);[\s\S]*?verifyProduct\(productId\)/);
  assert.match(pages, /verificationOpenedRef\.current = true/);
  assert.match(pages, /setVerificationPaused\(false\)[\s\S]*?CATEGORY_VERIFICATION_RESUME_MS/);
  assert.match(pages, /verifyProduct=\{openVerification\}/);
  assert.match(pages, /addToCart=\{addToCart\}/);
  assert.match(pages, /toggleWishlist=\{toggleWishlist\}/);
  assert.match(storefront, /verificationActive=\{Boolean\(verificationProduct\)\}/);
  assert.match(storefront, /menuOpen \|\| verificationProduct \? "is-open"/);
  assert.match(card, /onClick=\{\(\) => verifyProduct\(product\.id\)\}/);
  assert.match(card, /onClick=\{\(\) => addToCart\(product\.id\)\}/);
  assert.match(card, /onClick=\{\(\) => toggleWishlist\(product\.id\)\}/);
});
