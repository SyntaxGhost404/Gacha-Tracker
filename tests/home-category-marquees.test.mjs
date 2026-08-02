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

test("category rails move continuously and pause for pointer interaction", async () => {
  const [pages, styles] = await Promise.all([
    readFile(projectFile("app/Pages.tsx"), "utf8"),
    readFile(projectFile("app/globals.css"), "utf8"),
  ]);

  assert.match(styles, /animation: category-marquee-scroll[^;]*linear infinite;/);
  assert.match(styles, /translate3d\(-50%, 0, 0\)/);
  assert.match(styles, /\.category-marquee\.is-paused \.category-marquee-track \{ animation-play-state: paused; \}/);
  assert.match(styles, /@media \(hover: hover\) and \(pointer: fine\)/);
  assert.match(styles, /\.category-marquee-card \{[^}]*width: var\(--category-card-width\);[^}]*height: var\(--category-card-height\);[^}]*flex: 0 0 var\(--category-card-width\);/);
  assert.match(styles, /@media \(max-width: 768px\) \{[\s\S]*?--category-card-width: clamp\(/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\.category-marquee-track \{ animation: none !important; \}/);
  assert.match(pages, /onPointerDown=\{\(event\) => \{[\s\S]*?event\.pointerType !== "mouse"/);
  assert.match(pages, /window\.addEventListener\("pointerup", resume/);
  assert.match(pages, /window\.addEventListener\("pointercancel", resume/);
});
