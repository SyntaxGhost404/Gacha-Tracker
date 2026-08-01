import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

async function loadProductData() {
  const source = await readFile(projectFile("app/data.ts"), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
}

test("every catalog item has a complete, unique verification dossier", async () => {
  const { products } = await loadProductData();
  const records = new Set();
  const certificates = new Set();

  assert.ok(products.length > 0);
  for (const product of products) {
    const record = product.verification;
    assert.ok(record, `${product.id} is missing verification data`);
    for (const key of [
      "recordId",
      "batchNumber",
      "sourceRoute",
      "supplierDocument",
      "certificateId",
      "certificateType",
      "certificateStatus",
      "receivedDate",
      "verifiedDate",
      "bestBefore",
      "note",
    ]) {
      assert.equal(typeof record[key], "string", `${product.id}.${key} must be text`);
      assert.ok(record[key].trim(), `${product.id}.${key} must not be empty`);
    }
    assert.equal(record.checks.length, 3, `${product.id} must expose three product-specific checks`);
    assert.equal(new Set(record.checks).size, 3, `${product.id} checks must be distinct`);
    assert.ok(!records.has(record.recordId), `${record.recordId} must be unique`);
    assert.ok(!certificates.has(record.certificateId), `${record.certificateId} must be unique`);
    records.add(record.recordId);
    certificates.add(record.certificateId);
  }
});

test("verification lifecycle keeps the page locked and restores the original catalog control", async () => {
  const [storefront, card, modal, styles] = await Promise.all([
    readFile(projectFile("app/Storefront.tsx"), "utf8"),
    readFile(projectFile("app/ProductCard.tsx"), "utf8"),
    readFile(projectFile("app/ProductVerificationModal.tsx"), "utf8"),
    readFile(projectFile("app/globals.css"), "utf8"),
  ]);

  assert.match(card, /verifyProduct\(product\.id\)/);
  assert.doesNotMatch(card, /how-we-check-authenticity/);
  assert.match(storefront, /verificationScrollTopRef\.current = scrollRef\.current\?\.scrollTop/);
  assert.match(storefront, /trigger\?\.focus\(\{ preventScroll: true \}\)/);
  assert.match(storefront, /menuOpen \|\| verificationProduct \? "is-open"/);
  assert.match(storefront, /!verificationProduct && \(\s*<MobileBottomNav/);
  assert.match(storefront, /inert=\{Boolean\(verificationProduct\)\}/);
  assert.match(modal, /role="dialog"/);
  assert.match(modal, /aria-modal="true"/);
  assert.match(styles, /\.app-shell\.verification-open \.main-scroll-container \{ overflow: hidden;/);
  assert.match(styles, /\.verification-overlay \{[\s\S]*?inset: 3\.5rem 0 0;/);
  assert.match(styles, /@media \(max-width: 768px\) \{[\s\S]*?\.verification-dialog \{ width: 100%; height: 100%;/);
});
