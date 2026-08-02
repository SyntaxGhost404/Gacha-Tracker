import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

test("wishlist state is device-persistent and shared with every product card surface", async () => {
  const [storefront, pages, card, styles] = await Promise.all([
    readFile(projectFile("app/Storefront.tsx"), "utf8"),
    readFile(projectFile("app/Pages.tsx"), "utf8"),
    readFile(projectFile("app/ProductCard.tsx"), "utf8"),
    readFile(projectFile("app/globals.css"), "utf8"),
  ]);

  assert.match(storefront, /const WISHLIST_KEY = "orave-wishlist-v1";/);
  assert.match(storefront, /localStorage\.getItem\(WISHLIST_KEY\)/);
  assert.match(storefront, /localStorage\.setItem\(WISHLIST_KEY, JSON\.stringify\(wishlistIds\)\)/);
  assert.match(storefront, /const toggleWishlist = useCallback/);
  assert.match(storefront, /const shared = \{ navigate, addToCart, verifyProduct, wishlistIds, toggleWishlist, verificationActive \}/);

  assert.match(card, /className=\{`wishlist-button/);
  assert.match(card, /<Icon name="heart" \/>/);
  assert.match(card, /aria-pressed=\{isWishlisted\}/);
  assert.doesNotMatch(card, />\s*Wishlist\s*</);
  assert.match(pages, /isWishlisted=\{wishlistIds\.includes\(product\.id\)\}/);
  assert.match(pages, /function CategoryMarquee\([\s\S]*?toggleWishlist/);
  assert.match(styles, /\.wishlist-button\.is-wishlisted svg \{ fill: currentColor;/);
  assert.match(styles, /@keyframes wishlist-heart-pop/);
});

test("wishlist page mirrors the catalog toolbar and both density modes", async () => {
  const pages = await readFile(projectFile("app/Pages.tsx"), "utf8");

  assert.match(pages, /function WishlistCatalog/);
  assert.match(pages, /placeholder="Search wishlisted products"/);
  assert.match(pages, /className="directory-controls wishlist-controls"/);
  assert.match(pages, /<Icon name="filter" \/> Filter/);
  assert.match(pages, /<Icon name="sort" \/> Sort/);
  assert.match(pages, /<Icon name="grid" \/> View/);
  assert.match(pages, /sort !== "saved" && <span className="control-dot"/);
  assert.match(pages, /viewMode === "compact" && <span className="control-dot"/);
  assert.match(pages, /product-list \$\{viewMode === "compact" \? "is-compact" : "is-standard"\}/);
});

test("subpage headings are distinct without changing account navigation labels", async () => {
  const [pages, storefront] = await Promise.all([
    readFile(projectFile("app/Pages.tsx"), "utf8"),
    readFile(projectFile("app/Storefront.tsx"), "utf8"),
  ]);

  assert.match(pages, /<h1>Edit Your Profile<\/h1>/);
  assert.match(pages, /<h1>Wishlisted Products<\/h1>/);
  assert.match(pages, /title: "Order Status"/);
  assert.match(pages, /title: "Activity History"/);

  for (const label of ["Edit Profile", "Orders", "Wishlist", "History"]) {
    assert.match(pages, new RegExp(`label: "${label}"`));
    assert.match(storefront, new RegExp(`\\/> ${label}<\\/button>`));
  }
});
