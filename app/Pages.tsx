"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import { Icon, type IconName } from "./Icon";
import type { ChatGPTUser } from "./chatgpt-auth";
import JournalCard from "./JournalCard";
import ProductCard from "./ProductCard";
import {
  formatPrice,
  journalEntries,
  products,
  shopCategories,
  storyEntries,
  type Product,
  type ShopCategory,
} from "./data";

type SharedPageProps = {
  navigate: (path: string) => void;
  addToCart: (productId: string) => void;
  verifyProduct: (productId: string) => void;
};

function InternalLink({
  href,
  navigate,
  children,
  className,
}: {
  href: string;
  navigate: (path: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}

function BackLink({ href, label, navigate }: { href: string; label: string; navigate: (path: string) => void }) {
  return (
    <InternalLink href={href} navigate={navigate} className="back-link">
      <Icon name="arrow-left" /> {label}
    </InternalLink>
  );
}

function PageHeading({ title, copy }: { title: string; copy: string }) {
  return (
    <header className="page-heading">
      <h1>{title}</h1>
      <p>{copy}</p>
    </header>
  );
}

function SectionHeader({
  title,
  count,
  action,
}: {
  title: string;
  count?: number;
  action?: React.ReactNode;
}) {
  return (
    <div className="section-header">
      <div className="section-title-wrap">
        <h2>{title}</h2>
        {typeof count === "number" && <span className="count-badge">{count}</span>}
      </div>
      {action}
    </div>
  );
}

function ProductRibbon({ product, navigate }: { product: Product; navigate: (path: string) => void }) {
  const href = `/product/${product.id}`;
  return (
    <InternalLink href={href} navigate={navigate} className="product-ribbon">
      <div className="ribbon-image" style={{ backgroundImage: `url(${product.image})` }} />
      <div className="ribbon-overlay" />
      <img src={product.image} alt="" />
      <div className="ribbon-copy">
        <strong>{product.name}</strong>
        <span><i style={{ background: product.accent }} /> {product.status} · {product.category}</span>
        <small>{formatPrice(product.price)} · {product.origin}</small>
      </div>
      <Icon name="arrow-right" className="ribbon-arrow" />
    </InternalLink>
  );
}

function HeroProductCarousel({ items, navigate }: { items: Product[]; navigate: (path: string) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (items.length < 2 || isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [isPaused, items.length]);

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + items.length) % items.length);
  };

  if (items.length === 0) return null;

  return (
    <aside
      className="hero-product-carousel"
      aria-label="Featured products"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false);
      }}
    >
      <div className="hero-carousel-heading">
        <div>
          <span>Featured online</span>
          <strong>{String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</strong>
        </div>
        <div className="hero-carousel-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous featured product">
            <Icon name="arrow-left" />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Next featured product">
            <Icon name="arrow-right" />
          </button>
        </div>
      </div>

      <div className="hero-carousel-viewport" aria-live="off">
        <div className="hero-carousel-track" style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}>
          {items.map((product, index) => {
            const href = `/product/${product.id}`;
            return (
              <article className="hero-carousel-slide" key={product.id} aria-hidden={index !== activeIndex}>
                <a
                  className="hero-carousel-card"
                  href={href}
                  tabIndex={index === activeIndex ? 0 : -1}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(href);
                  }}
                >
                  <div className="hero-carousel-media">
                    <img src={product.image} alt="" />
                    <span className={`cover-badge status-${product.status.toLowerCase().replaceAll(" ", "-")}`}>{product.status}</span>
                    <span className="cover-badge cover-origin">{product.origin}</span>
                    <span className="cover-shade" />
                  </div>
                  <div className="hero-carousel-body">
                    <div className="hero-carousel-category-row">
                      <span style={{ "--hero-card-accent": product.accent } as React.CSSProperties}>{product.category}</span>
                      <span><Icon name="star" /> {product.rating}</span>
                    </div>
                    <h2>{product.name}</h2>
                    <p>{product.line}</p>
                    <div className="hero-carousel-price-row">
                      <strong>{formatPrice(product.price)}</strong>
                      <span>{product.size}</span>
                      <Icon name="arrow-right" />
                    </div>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      </div>

      <div className="hero-carousel-dots" aria-label="Choose featured product">
        {items.map((product, index) => (
          <button
            key={product.id}
            type="button"
            className={index === activeIndex ? "is-active" : ""}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${product.name}`}
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </aside>
  );
}

export function HomePage({ navigate }: SharedPageProps) {
  const featured = products.filter((product) => product.featured).slice(0, 8);
  const heroProducts = featured.slice(0, 6);

  return (
    <div className="route-page home-page">
      <section className="home-hero">
        <div className="home-hero-shade" aria-hidden="true" />
        <div className="hero-layout">
          <div className="hero-inner">
            <h1>Authentic beauty,<br />thoughtfully sourced.</h1>
            <p>
              ORAVÈ is a 100% online-only beauty store for authentic cosmetics imported from South Korea, Japan, the USA and China, with home delivery across Bangladesh.
            </p>
            <div className="hero-actions">
              <InternalLink href="/shop" navigate={navigate} className="solid-button hero-button">
                Shop online <Icon name="arrow-right" />
              </InternalLink>
              <InternalLink href="/our-story" navigate={navigate} className="outline-button hero-button">
                <Icon name="shield" /> How we source
              </InternalLink>
            </div>
            <div className="hero-trust-row" aria-label="Service highlights">
              <span><Icon name="shield" /> Authentic imports</span>
              <span><Icon name="truck" /> Home delivery nationwide</span>
              <span><Icon name="heart" /> 100% online-only</span>
            </div>
          </div>
          <HeroProductCarousel items={heroProducts} navigate={navigate} />
        </div>
      </section>

      <div className="standard-content home-content">
        <SectionHeader
          title="From the beauty journal"
          action={<InternalLink href="/journal" navigate={navigate} className="view-all-link">View all <Icon name="arrow-right" /></InternalLink>}
        />
        <div className="journal-list home-journal-list">
          {journalEntries.map((entry) => <JournalCard key={entry.id} entry={entry} navigate={navigate} compact />)}
        </div>

        <SectionHeader
          title="The current edit"
          count={featured.length}
          action={<InternalLink href="/shop" navigate={navigate} className="view-all-link">Shop all <Icon name="arrow-right" /></InternalLink>}
        />
        <div className="featured-ribbon-list">
          {featured.map((product) => <ProductRibbon key={product.id} product={product} navigate={navigate} />)}
        </div>

        <div className="home-contact-note">
          <span className="note-icon"><Icon name="sparkles" /></span>
          <div>
            <strong>Not sure where to begin?</strong>
            <p>Tell us about your routine and preferences. We will help you narrow the edit without overcomplicating it.</p>
          </div>
          <InternalLink href="/contact" navigate={navigate} className="quiet-button">Ask ORAVÈ</InternalLink>
        </div>
      </div>
    </div>
  );
}

const categories = shopCategories.map((category) => category.label);
const origins = ["All", "South Korea", "Japan", "USA", "China"];
const skinTypes = ["All", "Sensitive", "Dry", "Combination", "Dehydrated", "All skin"];

export function ShopPage({ navigate, addToCart, verifyProduct, activeCategory }: SharedPageProps & { activeCategory: ShopCategory }) {
  const [query, setQuery] = useState("");
  const [origin, setOrigin] = useState("All");
  const [skinType, setSkinType] = useState("All");
  const [sort, setSort] = useState("featured");
  const [viewMode, setViewMode] = useState<"standard" | "compact">("standard");
  const [panel, setPanel] = useState<"filter" | "sort" | "view" | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesQuery = !normalized || [product.name, product.category, product.shopCategory, product.concerns.join(" "), product.origin]
        .join(" ").toLowerCase().includes(normalized);
      const matchesCategory = activeCategory === "All Products" || product.shopCategory === activeCategory;
      const matchesOrigin = origin === "All" || product.originKey === origin;
      const matchesSkin = skinType === "All" || product.skinTypes.includes(skinType);
      return matchesQuery && matchesCategory && matchesOrigin && matchesSkin;
    });

    return [...result].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "name") return a.name.localeCompare(b.name);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || products.indexOf(a) - products.indexOf(b);
    });
  }, [query, activeCategory, origin, skinType, sort]);

  const available = filtered.filter((product) => product.stock > 0);
  const restocking = filtered.filter((product) => product.stock === 0);
  const hasRefinement = Boolean(query || activeCategory !== "All Products" || origin !== "All" || skinType !== "All" || sort !== "featured");
  const reset = () => {
    setQuery("");
    setOrigin("All");
    setSkinType("All");
    setSort("featured");
    setPanel(null);
    if (activeCategory !== "All Products") navigate("/shop");
  };

  const selectCategory = (category: string) => {
    const destination = shopCategories.find((item) => item.label === category);
    if (destination) navigate(destination.path);
  };

  return (
    <div className="route-page standard-route">
      <div className="standard-content directory-content">
        <BackLink href="/" label="Back to home" navigate={navigate} />
        <PageHeading
          title={activeCategory === "All Products" ? "Shop beauty online" : activeCategory}
          copy="Order authentic imported cosmetics from ORAVÈ for home delivery anywhere in Bangladesh. Our online-only selection includes products from South Korea, Japan, the USA and China."
        />

        <div className="info-callout">
          <Icon name="shield" />
          <div>
            <strong>Authentic imports, ordered online.</strong>
            <span className="long-copy"> Every product from South Korea, Japan, the USA and China follows our sourcing and arrival checks before it is listed for nationwide home delivery.</span>
            <span className="short-copy"> Imported products are reviewed, ordered online and delivered nationwide.</span>
          </div>
          <InternalLink href="/our-story" navigate={navigate}>Read our promise</InternalLink>
        </div>

        <label className="directory-search">
          <Icon name="search" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, categories or concerns" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><Icon name="x" /></button>}
        </label>

        <div className="directory-controls">
          <button type="button" className={panel === "filter" ? "is-active" : ""} onClick={() => setPanel(panel === "filter" ? null : "filter")}>
            <Icon name="filter" /> Filter
            {(activeCategory !== "All Products" || origin !== "All" || skinType !== "All") && <span className="control-dot" />}
            <Icon name="chevron-down" className={panel === "filter" ? "is-rotated" : ""} />
          </button>
          <button type="button" className={panel === "sort" ? "is-active" : ""} onClick={() => setPanel(panel === "sort" ? null : "sort")}>
            <Icon name="sort" /> Sort
            {sort !== "featured" && <span className="control-dot" />}
            <span className="control-value">{sort.replace("-", " ")}</span>
            <Icon name="chevron-down" className={panel === "sort" ? "is-rotated" : ""} />
          </button>
          <button type="button" className={panel === "view" ? "is-active" : ""} onClick={() => setPanel(panel === "view" ? null : "view")}>
            <Icon name="grid" /> View
            {viewMode === "compact" && <span className="control-dot" />}
            <span className="control-value">{viewMode}</span>
            <Icon name="chevron-down" className={panel === "view" ? "is-rotated" : ""} />
          </button>
        </div>

        {panel === "filter" && (
          <div className="control-panel">
            <FilterGroup label="Category" options={categories} value={activeCategory} setValue={selectCategory} />
            <FilterGroup label="Origin" options={origins} value={origin} setValue={setOrigin} />
            <FilterGroup label="Skin preference" options={skinTypes} value={skinType} setValue={setSkinType} />
          </div>
        )}

        {panel === "sort" && (
          <div className="control-panel sort-panel">
            {[
              ["featured", "Featured first"],
              ["rating", "Highest rated"],
              ["price-low", "Price: low to high"],
              ["price-high", "Price: high to low"],
              ["name", "Name: A to Z"],
            ].map(([value, label]) => (
              <button key={value} type="button" className={sort === value ? "is-selected" : ""} onClick={() => { setSort(value); setPanel(null); }}>
                <span>{label}</span>{sort === value && <Icon name="check" />}
              </button>
            ))}
          </div>
        )}

        {panel === "view" && (
          <div className="control-panel sort-panel view-panel">
            {[
              ["standard", "Standard view"],
              ["compact", "Compact view"],
            ].map(([value, label]) => (
              <button key={value} type="button" className={viewMode === value ? "is-selected" : ""} onClick={() => { setViewMode(value as "standard" | "compact"); setPanel(null); }}>
                <span>{label}</span>{viewMode === value && <Icon name="check" />}
              </button>
            ))}
          </div>
        )}

        <div className="results-row">
          <span>Showing <strong>{filtered.length}</strong> of {products.length} pieces</span>
          {hasRefinement && <button type="button" onClick={reset}>Reset all</button>}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title={activeCategory === "All Products" ? "Nothing matches that edit" : `No ${activeCategory.toLowerCase()} listed yet`}
            copy={activeCategory === "All Products" ? "Try clearing a filter or searching with a broader term." : "This category route is ready. Browse all products while the next authentic imports are added online."}
            action={activeCategory === "All Products" ? "Reset filters" : "Browse all products"}
            onAction={reset}
          />
        ) : (
          <>
            {available.length > 0 && (
              <section className="result-section">
                <SectionHeader title="Available now" count={available.length} />
                <div className={`product-list ${viewMode === "compact" ? "is-compact" : "is-standard"}`}>{available.map((product) => <ProductCard key={product.id} product={product} navigate={navigate} addToCart={addToCart} verifyProduct={verifyProduct} compact={viewMode === "compact"} />)}</div>
              </section>
            )}
            {restocking.length > 0 && (
              <section className="result-section">
                <SectionHeader title="Returning soon" count={restocking.length} />
                <div className={`product-list ${viewMode === "compact" ? "is-compact" : "is-standard"}`}>{restocking.map((product) => <ProductCard key={product.id} product={product} navigate={navigate} addToCart={addToCart} verifyProduct={verifyProduct} compact={viewMode === "compact"} />)}</div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ label, options, value, setValue }: { label: string; options: string[]; value: string; setValue: (value: string) => void }) {
  return (
    <div className="filter-group">
      <span>{label}</span>
      <div className="pill-row">
        {options.map((option) => <button type="button" key={option} className={value === option ? "is-selected" : ""} onClick={() => setValue(option)}>{option}</button>)}
      </div>
    </div>
  );
}

function EmptyState({ title, copy, action, onAction }: { title: string; copy: string; action: string; onAction: () => void }) {
  return (
    <div className="empty-state">
      <span><Icon name="search" /></span>
      <h2>{title}</h2>
      <p>{copy}</p>
      <button className="solid-button" type="button" onClick={onAction}>{action}</button>
    </div>
  );
}

export function BestSellersPage({ navigate, addToCart, verifyProduct }: SharedPageProps) {
  const bestSellers = products.filter((product) => product.status === "Bestseller");
  return (
    <div className="route-page standard-route">
      <div className="standard-content directory-content">
        <BackLink href="/shop" label="Back to the full edit" navigate={navigate} />
        <PageHeading title="Best sellers" copy="The authentic imported formulas most often ordered from ORAVÈ online, available for home delivery across Bangladesh." />
        <div className="info-callout warm">
          <Icon name="heart" />
          <div><strong>Popular, but still considered.</strong> A best seller remains in our online selection only while its sourcing, condition and delivery experience meet our standard.</div>
          <InternalLink href="/contact" navigate={navigate}>Ask for guidance</InternalLink>
        </div>
        <section className="result-section">
          <SectionHeader title="Most loved" count={bestSellers.length} />
          <div className="product-list">{bestSellers.map((product) => <ProductCard key={product.id} product={product} navigate={navigate} addToCart={addToCart} verifyProduct={verifyProduct} />)}</div>
        </section>
      </div>
    </div>
  );
}

export function JournalPage({ navigate }: SharedPageProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const journalCategories = ["All", ...Array.from(new Set(journalEntries.map((entry) => entry.category)))];
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return journalEntries
      .filter((entry) => (!normalized || `${entry.title} ${entry.excerpt} ${entry.category}`.toLowerCase().includes(normalized)) && (category === "All" || entry.category === category))
      .sort((a, b) => sort === "title" ? a.title.localeCompare(b.title) : journalEntries.indexOf(a) - journalEntries.indexOf(b));
  }, [query, category, sort]);

  return (
    <div className="route-page standard-route">
      <div className="standard-content directory-content">
        <BackLink href="/" label="Back to home" navigate={navigate} />
        <PageHeading title="Guidance without the noise" copy="Practical online guidance from ORAVÈ on routines, imported products and the standards behind our Bangladesh-wide delivery service." />
        <label className="directory-search">
          <Icon name="search" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the journal" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><Icon name="x" /></button>}
        </label>
        <div className="journal-filter-row">
          <div className="pill-row">{journalCategories.map((item) => <button key={item} type="button" className={category === item ? "is-selected" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <label className="sort-select"><Icon name="sort" /><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Newest first</option><option value="title">Title A–Z</option></select></label>
        </div>
        <div className="results-row"><span>Showing <strong>{results.length}</strong> articles</span>{(query || category !== "All") && <button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Reset</button>}</div>
        <div className="journal-list index-journal-list">{results.map((entry) => <JournalCard key={entry.id} entry={entry} navigate={navigate} />)}</div>
      </div>
    </div>
  );
}

export function ProductDetailPage({ productId, navigate, addToCart }: SharedPageProps & { productId: string }) {
  const product = products.find((item) => item.id === productId);
  if (!product) return <MissingDetail navigate={navigate} kind="product" />;

  const related = products.filter((item) => item.id !== product.id && (item.category === product.category || item.concerns.some((concern) => product.concerns.includes(concern)))).slice(0, 4);

  return (
    <div className="route-page detail-route">
      <div className="product-detail-cover" style={{ "--detail-accent": product.accent } as React.CSSProperties}>
        <img src={product.image} alt="" />
        <div className="detail-cover-shade" />
        <span className="detail-status-badge">{product.status}</span>
      </div>
      <div className="product-detail-identity">
        <img className="detail-product-thumb" src={product.image} alt={product.name} />
        <div className="detail-title-copy">
          <h1>{product.name}</h1>
          <p>{product.line}</p>
          <div className="tag-row">
            <span className="tag tag-accent" style={{ "--tag-accent": product.accent } as React.CSSProperties}>{product.category}</span>
            <span className="tag">{product.origin}</span>
            <span className="tag">{product.size}</span>
            <span className="tag rating-tag"><Icon name="star" /> {product.rating} · {product.reviews} reviews</span>
          </div>
        </div>
      </div>

      <div className="product-detail-inner">
        <BackLink href="/shop" label="Back to online shop" navigate={navigate} />
        <div className="detail-grid">
          <main className="detail-main-column">
            <section className="detail-card">
              <span className="detail-section-label">Why it made the edit</span>
              <h2>A considered everyday formula</h2>
              <p>{product.description}</p>
            </section>

            <section className="detail-card">
              <span className="detail-section-label">What it does</span>
              <div className="benefit-grid">
                {product.benefits.map((benefit, index) => <div key={benefit}><span>0{index + 1}</span><strong>{benefit}</strong></div>)}
              </div>
            </section>

            <section className="detail-card ritual-card">
              <span className="detail-section-label">Place in your routine</span>
              <h2>How to use it well</h2>
              <p>{product.usage}</p>
              <div className="ingredient-note"><strong>Key composition</strong><span>{product.ingredients}</span></div>
            </section>

            <section className="detail-card">
              <div className="section-heading-row"><div><span className="detail-section-label">Pair the routine</span><h2>Related selections</h2></div></div>
              <div className="media-track">
                {related.map((item) => (
                  <InternalLink key={item.id} href={`/product/${item.id}`} navigate={navigate} className="media-product-slide">
                    <img src={item.image} alt="" />
                    <div><strong>{item.name}</strong><span>{formatPrice(item.price)}</span></div>
                  </InternalLink>
                ))}
              </div>
              <div className="carousel-dots" aria-hidden="true">{related.map((item, index) => <span className={index === 0 ? "is-active" : ""} key={item.id} />)}</div>
            </section>
          </main>

          <aside className="detail-sidebar">
            <section className="detail-card order-card">
              <span className="detail-section-label">Ready to dispatch</span>
              <div className="detail-price"><strong>{formatPrice(product.price)}</strong>{product.compareAt && <span>{formatPrice(product.compareAt)}</span>}</div>
              <p>{product.stock > 0 ? `${product.stock} units ready for online ordering and home delivery across Bangladesh.` : "A new imported shipment is being prepared. Contact our online team for a restock update."}</p>
              <button className="solid-button full-width" type="button" disabled={product.stock === 0} onClick={() => addToCart(product.id)}><Icon name={product.stock === 0 ? "clock" : "bag"} />{product.stock === 0 ? "Restocking" : "Add to bag"}</button>
              <InternalLink href="/contact" navigate={navigate} className="outline-button full-width">Ask about this product</InternalLink>
            </section>
            <section className="detail-card key-value-card">
              <span className="detail-section-label">Product notes</span>
              <KeyValue label="Origin" value={product.origin} />
              <KeyValue label="Size" value={product.size} />
              <KeyValue label="Best for" value={product.skinTypes.join(", ")} />
              <KeyValue label="Focus" value={product.concerns.join(", ")} />
              <KeyValue label="Finish" value={product.line} />
            </section>
            <section className="detail-card promise-card">
              <Icon name="shield" />
              <div><strong>Authenticity, checked in stages.</strong><p>Before an online order ships, ORAVÈ reviews the source, batch details and physical condition.</p></div>
              <InternalLink href="/our-story" navigate={navigate}>How our process works <Icon name="arrow-right" /></InternalLink>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

function KeyValue({ label, value }: { label: string; value: string }) {
  return <div className="key-value-row"><span>{label}</span><strong>{value}</strong></div>;
}

export function ArticleDetailPage({ articleId, navigate }: SharedPageProps & { articleId: string }) {
  const entry = journalEntries.find((item) => item.id === articleId);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  if (!entry) return <MissingDetail navigate={navigate} kind="article" />;
  const relatedArticles = journalEntries.filter((item) => item.id !== entry.id);
  const relatedProducts = entry.relatedProductIds.map((id) => products.find((product) => product.id === id)).filter(Boolean) as Product[];

  const share = async () => {
    try { await navigator.clipboard?.writeText(window.location.href); } catch { /* Clipboard can be unavailable in preview. */ }
    setShared(true);
    window.setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="route-page article-route">
      <div className="article-inner">
        <div className="article-return-row"><BackLink href="/journal" label="All journal notes" navigate={navigate} /><BackLink href="/" label="Back to home" navigate={navigate} /></div>
        <div className="article-grid">
          <article className="article-card">
            <header className="article-header">
              <h1>{entry.title}</h1>
              <div className="article-meta"><span>{entry.date}</span><span>ORAVÈ editorial</span><span>{entry.readTime}</span></div>
            </header>
            <div className="article-hero-image">
              <img src={entry.image} alt="" style={{ objectPosition: entry.imagePosition ?? "center" }} />
              <span>{entry.category}</span>
            </div>
            <div className="article-body">
              <p className="article-intro">{entry.intro}</p>
              {entry.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </section>
              ))}
              <div className="article-reactions">
                <div><span>Was this useful?</span><p>Save the note or share it with someone refining their routine.</p></div>
                <div className="reaction-buttons">
                  <button type="button" className={liked ? "is-active" : ""} onClick={() => setLiked((value) => !value)}><Icon name="heart" /> {liked ? 49 : 48}</button>
                  <button type="button" className={saved ? "is-active" : ""} onClick={() => setSaved((value) => !value)}><Icon name="journal" /> {saved ? "Saved" : "Save"}</button>
                  <button type="button" className={shared ? "is-success" : ""} onClick={share}><Icon name={shared ? "check" : "share"} /> {shared ? "Copied" : "Share"}</button>
                </div>
              </div>
            </div>
          </article>

          <aside className="article-sidebar">
            <section className="sidebar-card">
              <span className="detail-section-label">Continue reading</span>
              <div className="related-article-list">
                {relatedArticles.map((item) => <InternalLink key={item.id} href={`/journal/${item.id}`} navigate={navigate}><img src={item.image} alt="" /><div><strong>{item.title}</strong><span>{item.readTime}</span></div></InternalLink>)}
              </div>
            </section>
            <section className="sidebar-card">
              <span className="detail-section-label">From the edit</span>
              <div className="related-mini-products">
                {relatedProducts.map((product) => <InternalLink key={product.id} href={`/product/${product.id}`} navigate={navigate}><img src={product.image} alt="" /><div><strong>{product.name}</strong><span>{formatPrice(product.price)}</span></div></InternalLink>)}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

type AccountSection = "orders" | "wishlist" | "history" | "edit-profile";

const accountDashboardOptions: Array<{
  section: AccountSection;
  label: string;
  copy: string;
  icon: IconName;
}> = [
  { section: "orders", label: "Orders", copy: "Review your online orders and delivery status.", icon: "bag" },
  { section: "wishlist", label: "Wishlist", copy: "Return to the products you have saved for later.", icon: "heart" },
  { section: "history", label: "History", copy: "See your recent account and shopping activity.", icon: "clock" },
  { section: "edit-profile", label: "Edit Profile", copy: "Review the identity connected to your account.", icon: "edit" },
];

const accountSectionContent: Record<Exclude<AccountSection, "edit-profile">, { title: string; subtitle: string; emptyTitle: string; copy: string; actionPath: string; actionLabel: string }> = {
  orders: {
    title: "Orders",
    subtitle: "Review online purchases and nationwide home-delivery updates in one place.",
    emptyTitle: "No linked orders yet",
    copy: "Confirmed ORAVÈ orders will appear here when account-linked ordering is available. For an existing delivery, our online team can help you track it now.",
    actionPath: "/contact",
    actionLabel: "Track an order",
  },
  wishlist: {
    title: "Wishlist",
    subtitle: "Keep a considered shortlist of products you would like to revisit.",
    emptyTitle: "Your wishlist is ready for you",
    copy: "Products you save for later will be gathered here. Browse the online catalog to start building your edit.",
    actionPath: "/shop",
    actionLabel: "Browse products",
  },
  history: {
    title: "History",
    subtitle: "Return to your recent account and shopping activity.",
    emptyTitle: "No recent activity",
    copy: "Your recent ORAVÈ account activity will appear here as you browse and shop while signed in.",
    actionPath: "/shop",
    actionLabel: "Continue shopping",
  },
};

export function AccountPage({
  navigate,
  user,
  section,
  accountSignInPath,
  signOutPath,
}: {
  navigate: (path: string) => void;
  user: ChatGPTUser | null;
  section?: AccountSection;
  accountSignInPath: string;
  signOutPath: string;
}) {
  if (!user) {
    return (
      <div className="route-page standard-route account-route">
        <div className="account-content">
          <BackLink href="/" label="Back to home" navigate={navigate} />
          <section className="account-signin-card">
            <h1>Your ORAVÈ account</h1>
            <p>Login or register to access your orders, wishlist, history and profile from one place.</p>
            <a className="solid-button" href={accountSignInPath}>Login / Register</a>
          </section>
        </div>
      </div>
    );
  }

  const detail = section && section !== "edit-profile" ? accountSectionContent[section] : null;

  return (
    <div className="route-page standard-route account-route">
      <div className="account-content">
        <BackLink href={section ? "/account" : "/"} label={section ? "Back to account" : "Back to home"} navigate={navigate} />

        {!section ? (
          <>
            <header className="account-profile-header">
            <h1>{user.displayName}</h1>
              <InternalLink href="/account/edit-profile" navigate={navigate} className="account-edit-link">Edit Profile</InternalLink>
            </header>
            <div className="account-divider" />
          </>
        ) : null}

        {!section ? (
          <section className="account-dashboard" aria-label="Account dashboard">
            {accountDashboardOptions.map((option) => (
              <InternalLink key={option.section} href={`/account/${option.section}`} navigate={navigate} className="account-dashboard-card">
                <span><Icon name={option.icon} /></span>
                <div><strong>{option.label}</strong><p>{option.copy}</p></div>
                <Icon name="arrow-right" />
              </InternalLink>
            ))}
            <a className="account-dashboard-card account-logout-card" href={signOutPath}>
              <span><Icon name="logout" /></span>
              <div><strong>Logout</strong><p>Sign out securely on this device.</p></div>
              <Icon name="arrow-right" />
            </a>
          </section>
        ) : section === "edit-profile" ? (
          <div className="account-section-page">
            <header className="account-section-header">
              <h1>Edit Profile</h1>
              <p>Review the name and email connected to your ORAVÈ account.</p>
            </header>
            <section className="account-detail-card">
              <div className="account-profile-values">
                <div><span>Name</span><strong>{user.displayName}</strong></div>
                <div><span>Email</span><strong>{user.email}</strong></div>
              </div>
              <p className="account-detail-note">These details are used only for your signed-in ORAVÈ experience. ORAVÈ does not store your login credentials.</p>
              <div className="account-detail-actions account-detail-actions-single">
                <InternalLink href="/account" navigate={navigate} className="outline-button"><Icon name="arrow-left" /> Back to account</InternalLink>
              </div>
            </section>
          </div>
        ) : detail ? (
          <div className="account-section-page">
            <header className="account-section-header">
              <h1>{detail.title}</h1>
              <p>{detail.subtitle}</p>
            </header>
            <section className="account-detail-card account-empty-state">
              <h2>{detail.emptyTitle}</h2>
              <p>{detail.copy}</p>
              <div className="account-detail-actions">
                <InternalLink href="/account" navigate={navigate} className="outline-button"><Icon name="arrow-left" /> Back to account</InternalLink>
                <InternalLink href={detail.actionPath} navigate={navigate} className="solid-button">{detail.actionLabel}<Icon name="arrow-right" /></InternalLink>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ContactPage({ navigate }: SharedPageProps) {
  const [type, setType] = useState("Product guidance");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", subject: "", message: "" });
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => { setLoading(false); setSubmitted(true); }, 800);
  };
  const emailHref = `mailto:herbeauty@gmail.com?subject=${encodeURIComponent(`${type}: ${form.subject || "ORAVÈ enquiry"}`)}&body=${encodeURIComponent(`${form.message}\n\nName: ${form.name}\nContact: ${form.contact}`)}`;

  return (
    <div className="route-page standard-route form-route">
      <div className="form-content">
        <BackLink href="/" label="Back to home" navigate={navigate} />
        <PageHeading title="Online guidance, nationwide delivery" copy="ORAVÈ is 100% online-only—there is no walk-in shop or pickup counter. Our team operates from Rayerbag, Dhaka and supports home-delivery orders across Bangladesh." />
        <div className="contact-strip">
          <a href="tel:+8801830098285"><Icon name="phone" /><span><small>Call or WhatsApp</small><strong>+880 1830-098285</strong></span></a>
          <a href="mailto:herbeauty@gmail.com"><Icon name="mail" /><span><small>Email</small><strong>herbeauty@gmail.com</strong></span></a>
          <span><Icon name="truck" /><span><small>Service model</small><strong>Online only · Nationwide delivery</strong></span></span>
        </div>

        {submitted ? (
          <div className="form-card success-card">
            <span className="success-icon"><Icon name="check" /></span>
            <h2>Your note is ready</h2>
            <p>Choose email or WhatsApp to send it to ORAVÈ online support. We usually reply during Dhaka business hours.</p>
            <div className="success-actions">
              <a className="solid-button" href={emailHref}><Icon name="mail" /> Open email</a>
              <a className="outline-button" href="https://wa.me/8801830098285" target="_blank" rel="noreferrer"><Icon name="phone" /> Open WhatsApp</a>
            </div>
            <button className="text-control" type="button" onClick={() => setSubmitted(false)}>Edit your note</button>
          </div>
        ) : (
          <form className="form-card" onSubmit={submit}>
            <fieldset className="field-group">
              <legend>What can we help with?</legend>
              <div className="pill-row form-pills">{["Product guidance", "Order help", "Authenticity question", "General"].map((item) => <button key={item} type="button" className={type === item ? "is-selected" : ""} onClick={() => setType(item)}>{item}</button>)}</div>
            </fieldset>
            <div className="form-grid-two">
              <label><span>Your name *</span><input required value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="How should we address you?" /></label>
              <label><span>Phone or email *</span><input required value={form.contact} onChange={(event) => update("contact", event.target.value)} placeholder="Your preferred contact" /></label>
            </div>
            <label><span>Subject *</span><input required value={form.subject} onChange={(event) => update("subject", event.target.value)} placeholder="A short summary" /></label>
            <label><span>Tell us more *</span><textarea required value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Share your question, routine preferences or order details." /></label>
            <button className="solid-button full-width submit-button" type="submit" disabled={loading || !form.name.trim() || !form.contact.trim() || !form.subject.trim() || !form.message.trim()}>{loading ? "Preparing your note…" : "Continue"}<Icon name="arrow-right" /></button>
            <p className="form-helper">This form prepares your message on this device; it does not store personal information on the website.</p>
          </form>
        )}
      </div>
    </div>
  );
}

export function StoryPage({ navigate }: SharedPageProps) {
  const [filter, setFilter] = useState("All");
  const filtered = storyEntries.filter((entry) => {
    if (filter === "All") return true;
    if (filter === "Sourcing") return ["02", "03"].includes(entry.stage);
    if (filter === "Inspection") return entry.stage === "04";
    return entry.stage === "05";
  });
  return (
    <div className="route-page standard-route timeline-route">
      <div className="timeline-content">
        <BackLink href="/" label="Back to home" navigate={navigate} />
        <PageHeading title="From source to doorstep" copy="How ORAVÈ sources authentic imports from South Korea, Japan, the USA and China, then fulfils online home-delivery orders across Bangladesh." />
        <div className="timeline-filter pill-row">
          {["All", "Sourcing", "Inspection", "Support"].map((item) => <button type="button" key={item} className={filter === item ? "is-selected" : ""} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <div className="timeline">
          {filtered.map((entry, index) => (
            <article className="timeline-entry" key={entry.stage} style={{ "--entry-index": index } as React.CSSProperties}>
              <span className="timeline-marker">{entry.stage}</span>
              <div className="timeline-copy"><h2>{entry.title}</h2></div>
              <div className="timeline-card"><p>{entry.text}</p><div className="tag-row">{entry.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div>
            </article>
          ))}
        </div>
        <div className="timeline-callout"><Icon name="sparkles" /><div><strong>Questions are welcome.</strong><p>If you want to understand the source or condition of a specific item, ask our online team before ordering.</p></div><InternalLink href="/contact" navigate={navigate} className="quiet-button">Contact ORAVÈ</InternalLink></div>
      </div>
    </div>
  );
}

function MissingDetail({ navigate, kind }: { navigate: (path: string) => void; kind: "product" | "article" }) {
  const destination = kind === "product" ? "/shop" : "/journal";
  return (
    <div className="route-page missing-route"><div className="missing-card"><span><Icon name="sparkles" /></span><h1>We could not find that {kind}</h1><p>It may have moved or is no longer part of the current edit.</p><InternalLink href={destination} navigate={navigate} className="solid-button">Return to {kind === "product" ? "online shop" : "journal"}</InternalLink></div></div>
  );
}

export function NotFoundPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className="route-page missing-route"><div className="missing-card quiet"><span><Icon name="sparkles" /></span><h1>That page is not in the edit</h1><p>Use the navigation to continue exploring ORAVÈ online.</p><InternalLink href="/" navigate={navigate} className="solid-button">Return home</InternalLink></div></div>
  );
}
