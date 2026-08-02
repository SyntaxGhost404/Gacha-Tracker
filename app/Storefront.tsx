"use client";

/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./Icon";
import ProductVerificationModal, { PRODUCT_VERIFICATION_DRAWER_ID } from "./ProductVerificationModal";
import {
  AccountPage,
  ArticleDetailPage,
  BestSellersPage,
  ContactPage,
  HomePage,
  JournalPage,
  NotFoundPage,
  ProductDetailPage,
  ShopPage,
  StoryPage,
} from "./Pages";
import type { ChatGPTUser } from "./chatgpt-auth";
import { formatPrice, products, shopCategories } from "./data";

type CartState = Record<string, number>;

const CART_KEY = "hb-cart-v1";
const THEME_KEY = "hb-theme";
const WISHLIST_KEY = "orave-wishlist-v1";

export default function Storefront({
  initialPath,
  user,
  accountSignInPath,
  mobileSignInPath,
  signOutPath,
}: {
  initialPath: string;
  user: ChatGPTUser | null;
  accountSignInPath: string;
  mobileSignInPath: string;
  signOutPath: string;
}) {
  const [path, setPath] = useState(initialPath || "/");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [cart, setCart] = useState<CartState>({});
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [verificationProductId, setVerificationProductId] = useState<string | null>(null);
  const [bottomVisible, setBottomVisible] = useState(path !== "/");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toast, setToast] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const bottomRef = useRef<HTMLElement>(null);
  const toastTimerRef = useRef<number | null>(null);
  const verificationScrollTopRef = useRef(0);
  const verificationTriggerRef = useRef<HTMLElement | null>(null);

  const closeVerification = useCallback(() => {
    const savedScrollTop = verificationScrollTopRef.current;
    const trigger = verificationTriggerRef.current;
    setVerificationProductId(null);
    window.requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: savedScrollTop, behavior: "instant" });
      trigger?.focus({ preventScroll: true });
      verificationTriggerRef.current = null;
    });
  }, []);

  const verifyProduct = useCallback((productId: string) => {
    if (!products.some((product) => product.id === productId)) return;
    verificationScrollTopRef.current = scrollRef.current?.scrollTop ?? 0;
    verificationTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setMenuOpen(false);
    setSearchOpen(false);
    setSearchActive(false);
    setCartOpen(false);
    setMoreOpen(false);
    setAccountOpen(false);
    setToast("");
    setVerificationProductId(productId);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = localStorage.getItem(THEME_KEY);
      const initialTheme = saved === "dark" ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.dataset.theme = initialTheme;

      try {
        const savedCart = JSON.parse(localStorage.getItem(CART_KEY) ?? "{}");
        if (savedCart && typeof savedCart === "object") setCart(savedCart);
      } catch {
        localStorage.removeItem(CART_KEY);
      }

      try {
        const savedWishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) ?? "[]");
        if (Array.isArray(savedWishlist)) {
          const validIds = savedWishlist.filter(
            (id): id is string => typeof id === "string" && products.some((product) => product.id === id),
          );
          setWishlistIds(Array.from(new Set(validIds)));
        }
      } catch {
        localStorage.removeItem(WISHLIST_KEY);
      }
      setStorageReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (storageReady) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, storageReady]);

  useEffect(() => {
    if (storageReady) localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistIds));
  }, [storageReady, wishlistIds]);

  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname || "/");
      setMenuOpen(false);
      setSearchOpen(false);
      setSearchActive(false);
      setCartOpen(false);
      setMoreOpen(false);
      setAccountOpen(false);
      setVerificationProductId(null);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k" && !verificationProductId) {
        event.preventDefault();
        setMenuOpen(false);
        setMoreOpen(false);
        setAccountOpen(false);
        setSearchOpen(true);
        setSearchActive(true);
        window.setTimeout(() => searchInputRef.current?.focus(), 60);
      }
      if (event.key === "Escape") {
        if (verificationProductId) {
          event.preventDefault();
          closeVerification();
          return;
        }
        setSearchOpen(false);
        setSearchActive(false);
        setCartOpen(false);
        setMenuOpen(false);
        setMoreOpen(false);
        setAccountOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeVerification, verificationProductId]);

  useEffect(() => {
    const onOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (headerRef.current && !headerRef.current.contains(target)) {
        setSearchActive(false);
        setCartOpen(false);
      }
      if (bottomRef.current && !bottomRef.current.contains(target)) {
        setMoreOpen(false);
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let lastScrollTop = container.scrollTop;
    setBottomVisible(path !== "/" || container.scrollTop > 40);

    const onScroll = () => {
      const current = container.scrollTop;
      setMoreOpen(false);
      setAccountOpen(false);
      setShowScrollTop(current > 300);
      if (current <= 40) {
        setBottomVisible(path !== "/");
        lastScrollTop = current;
        return;
      }
      const difference = current - lastScrollTop;
      if (difference > 12) {
        setBottomVisible(true);
        lastScrollTop = current;
      } else if (difference < -12) {
        setBottomVisible(false);
        lastScrollTop = current;
      }
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [path]);

  const navigate = useCallback((nextPath: string) => {
    if (nextPath !== path) {
      window.history.pushState({}, "", nextPath);
      setPath(nextPath);
    }
    scrollRef.current?.scrollTo({ top: 0, behavior: nextPath === path ? "smooth" : "instant" });
    setSearchOpen(false);
    setSearchActive(false);
    setSearchQuery("");
    setCartOpen(false);
    setMenuOpen(false);
    setMoreOpen(false);
    setAccountOpen(false);
    setVerificationProductId(null);
  }, [path]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(THEME_KEY, nextTheme);
  };

  const notify = useCallback((message: string) => {
    setToast(message);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 2200);
  }, []);

  const addToCart = useCallback((productId: string) => {
    const product = products.find((item) => item.id === productId);
    if (!product || product.stock === 0) return;
    setCart((current) => ({ ...current, [productId]: Math.min((current[productId] ?? 0) + 1, product.stock) }));
    setSearchActive(false);
    notify(`${product.name} added to your bag`);
  }, [notify]);

  const toggleWishlist = useCallback((productId: string) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    const isSaved = wishlistIds.includes(productId);
    setWishlistIds((current) => isSaved
      ? current.filter((id) => id !== productId)
      : [...current, productId]);
    notify(isSaved ? `${product.name} removed from your wishlist` : `${product.name} saved to your wishlist`);
  }, [notify, wishlistIds]);

  const updateQuantity = (productId: string, quantity: number) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    setCart((current) => {
      const next = { ...current };
      if (quantity <= 0) delete next[productId];
      else next[productId] = Math.min(quantity, product.stock);
      return next;
    });
  };

  const cartLines = products.filter((product) => (cart[product.id] ?? 0) > 0).map((product) => ({ product, quantity: cart[product.id] }));
  const verificationProduct = products.find((product) => product.id === verificationProductId) ?? null;
  const cartCount = cartLines.reduce((total, line) => total + line.quantity, 0);
  const cartTotal = cartLines.reduce((total, line) => total + line.product.price * line.quantity, 0);
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return products.filter((product) => `${product.name} ${product.category} ${product.shopCategory} ${product.origin} ${product.concerns.join(" ")}`.toLowerCase().includes(query)).slice(0, 5);
  }, [searchQuery]);

  const orderMessage = useMemo(() => {
    const lines = cartLines.map(({ product, quantity }) => `• ${product.name} × ${quantity} — ${formatPrice(product.price * quantity)}`);
    return encodeURIComponent(`Hello ORAVÈ, I would like to confirm this online order for home delivery:\n\n${lines.join("\n")}\n\nEstimated product total: ${formatPrice(cartTotal)}\n\nPlease confirm availability and delivery details.`);
  }, [cartLines, cartTotal]);

  return (
    <div className={`app-shell ${menuOpen ? "menu-open" : ""} ${verificationProduct ? "verification-open" : ""}`}>
      <header className="top-navbar" ref={headerRef}>
        <div className="nav-inner">
          <button
            className={`nav-icon-button menu-toggle ${menuOpen || verificationProduct ? "is-open" : ""}`}
            type="button"
            onClick={() => {
              if (verificationProduct) {
                closeVerification();
                return;
              }
              setMenuOpen((value) => !value);
              setCartOpen(false);
              setSearchOpen(false);
              setSearchActive(false);
              setMoreOpen(false);
              setAccountOpen(false);
            }}
            aria-label={verificationProduct ? `Close authenticity verification for ${verificationProduct.name}` : menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={Boolean(menuOpen || verificationProduct)}
            aria-controls={verificationProduct ? PRODUCT_VERIFICATION_DRAWER_ID : "site-navigation-drawer"}
          >
            <span className="menu-glyph" aria-hidden="true"><i /><i /><i /></span>
          </button>

          <a href="/" className="brand-mark" onClick={(event) => { event.preventDefault(); navigate("/"); }} aria-label="ORAVÈ home">
            ORA<span>VÈ</span><i />
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <NavItem href="/" label="Home" path={path} navigate={navigate} />
            <NavItem href="/shop" label="Online Shop" path={path} navigate={navigate} />
            <NavItem href="/best-sellers" label="Best Sellers" path={path} navigate={navigate} />
            <NavItem href="/account" label="Account" path={path} navigate={navigate} />
          </nav>

          <div className="nav-actions">
            <div className={`global-search ${searchOpen ? "is-mobile-open" : ""}`}>
              <Icon name="search" className="search-prefix" />
              <input
                ref={searchInputRef}
                value={searchQuery}
                disabled={Boolean(verificationProduct)}
                onChange={(event) => { setSearchQuery(event.target.value); setSearchActive(true); }}
                onFocus={() => setSearchActive(true)}
                placeholder="Search ORAVÈ products"
                aria-label="Search products"
              />
              {searchQuery && <button type="button" className="search-clear" onClick={() => setSearchQuery("")} aria-label="Clear search"><Icon name="x" /></button>}
              <span className="shortcut-hint">⌘K</span>
              {searchActive && searchQuery && (
                <div className="search-results" role="list">
                  {searchResults.length ? searchResults.map((product) => (
                    <button key={product.id} type="button" role="listitem" onClick={() => navigate(`/product/${product.id}`)}>
                      <span className="result-image"><img src={product.image} alt="" /><i style={{ background: product.accent }} /></span>
                      <span className="result-copy"><strong>{product.name}</strong><span><em>{product.category}</em><em>{product.origin}</em></span></span>
                      <span className="result-price">{formatPrice(product.price)}</span>
                    </button>
                  )) : <div className="search-empty">No products match “{searchQuery}”</div>}
                  <button className="search-all" type="button" onClick={() => navigate("/shop")}>Browse the online shop <Icon name="arrow-right" /></button>
                </div>
              )}
            </div>

            <button className="nav-icon-button mobile-search-button" type="button" disabled={Boolean(verificationProduct)} onClick={() => { setSearchOpen((value) => !value); setCartOpen(false); setMenuOpen(false); window.setTimeout(() => searchInputRef.current?.focus(), 60); }} aria-label={searchOpen ? "Close search" : "Open search"}>
              <Icon name={searchOpen ? "x" : "search"} />
            </button>

            <div className="cart-anchor">
              <button className={`nav-icon-button bag-button ${cartOpen ? "is-active" : ""}`} type="button" disabled={Boolean(verificationProduct)} onClick={() => { setCartOpen((value) => !value); setSearchOpen(false); setSearchActive(false); setMenuOpen(false); }} aria-label={`Shopping bag with ${cartCount} items`} aria-expanded={cartOpen}>
                <Icon name="bag" /><span className="bag-label">Bag</span>{cartCount > 0 && <b>{cartCount}</b>}
              </button>
              {cartOpen && <CartPanel lines={cartLines} total={cartTotal} updateQuantity={updateQuantity} clear={() => setCart({})} orderMessage={orderMessage} navigate={navigate} />}
            </div>

            <button className="nav-icon-button theme-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`} title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
              <Icon name={theme === "light" ? "moon" : "sun"} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`menu-overlay ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        onClick={() => setMenuOpen(false)}
      >
        <aside id="site-navigation-drawer" className="site-drawer" role="dialog" aria-modal="true" aria-label="ORAVÈ navigation" onClick={(event) => event.stopPropagation()}>
          <div className="drawer-utilities">
            <button type="button" className="drawer-button drawer-utility-button" onClick={() => navigate("/contact")}><Icon name="truck" /> Track Order</button>
            <button type="button" className="drawer-button drawer-utility-button" onClick={() => navigate("/our-story")}><Icon name="shield" /> Authenticity</button>
          </div>
          <div className="drawer-divider" />
          <p className="drawer-section-label">Shop by category</p>
          <nav className="drawer-category-list" aria-label="Product categories">
            {shopCategories.map((category) => (
              <button
                key={category.path}
                type="button"
                className={`drawer-button drawer-category-button ${path === category.path ? "is-active" : ""}`}
                onClick={() => navigate(category.path)}
                aria-current={path === category.path ? "page" : undefined}
              >
                <span>{category.label}</span><Icon name="arrow-right" />
              </button>
            ))}
          </nav>
        </aside>
      </div>

      {verificationProduct && <ProductVerificationModal product={verificationProduct} onClose={closeVerification} />}

      <div id="main-scroll-container" className="main-scroll-container" ref={scrollRef} aria-hidden={Boolean(verificationProduct)} inert={Boolean(verificationProduct)}>
        <div className="content-wrapper"><main><PageRouter path={path} navigate={navigate} addToCart={addToCart} verifyProduct={verifyProduct} wishlistIds={wishlistIds} toggleWishlist={toggleWishlist} user={user} accountSignInPath={accountSignInPath} signOutPath={signOutPath} /></main></div>
        <SiteFooter navigate={navigate} />
      </div>

      {!verificationProduct && (
        <button className={`scroll-top-button ${showScrollTop ? "is-visible" : ""} ${bottomVisible ? "with-bottom-nav" : ""}`} type="button" onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top">
          <Icon name="arrow-up" /><span>Top</span>
        </button>
      )}

      {!verificationProduct && (
        <MobileBottomNav
          path={path}
          navigate={navigate}
          visible={bottomVisible}
          user={user}
          accountOpen={accountOpen}
          setAccountOpen={setAccountOpen}
          moreOpen={moreOpen}
          setMoreOpen={setMoreOpen}
          mobileSignInPath={mobileSignInPath}
          signOutPath={signOutPath}
          bottomRef={bottomRef}
        />
      )}

      {!verificationProduct && <div className={`toast ${toast ? "is-visible" : ""}`} role="status"><Icon name="check" />{toast}</div>}
    </div>
  );
}

function PageRouter({
  path,
  navigate,
  addToCart,
  verifyProduct,
  wishlistIds,
  toggleWishlist,
  user,
  accountSignInPath,
  signOutPath,
}: {
  path: string;
  navigate: (path: string) => void;
  addToCart: (productId: string) => void;
  verifyProduct: (productId: string) => void;
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  user: ChatGPTUser | null;
  accountSignInPath: string;
  signOutPath: string;
}) {
  const shared = { navigate, addToCart, verifyProduct, wishlistIds, toggleWishlist };
  const shopRoute = shopCategories.find((category) => category.path === path);
  if (path === "/") return <HomePage {...shared} />;
  if (shopRoute) return <ShopPage {...shared} activeCategory={shopRoute.label} />;
  if (path === "/best-sellers") return <BestSellersPage {...shared} />;
  if (path === "/account" || path.startsWith("/account/")) {
    const section = path === "/account" ? undefined : path.slice("/account/".length);
    const accountSection = ["orders", "wishlist", "history", "edit-profile"].includes(section ?? "")
      ? section as "orders" | "wishlist" | "history" | "edit-profile"
      : undefined;
    return <AccountPage navigate={navigate} addToCart={addToCart} verifyProduct={verifyProduct} wishlistIds={wishlistIds} toggleWishlist={toggleWishlist} user={user} section={accountSection} accountSignInPath={accountSignInPath} signOutPath={signOutPath} />;
  }
  if (path === "/journal") return <JournalPage {...shared} />;
  if (path.startsWith("/journal/")) return <ArticleDetailPage {...shared} articleId={decodeURIComponent(path.slice("/journal/".length))} />;
  if (path.startsWith("/product/")) return <ProductDetailPage {...shared} productId={decodeURIComponent(path.slice("/product/".length))} />;
  if (path === "/contact") return <ContactPage {...shared} />;
  if (path === "/our-story") return <StoryPage {...shared} />;
  return <NotFoundPage navigate={navigate} />;
}

function NavItem({ href, label, path, navigate }: { href: string; label: string; path: string; navigate: (path: string) => void }) {
  const active = href === "/" ? path === "/" : path.startsWith(href);
  return <a href={href} className={active ? "is-active" : ""} onClick={(event) => { event.preventDefault(); navigate(href); }}>{label}</a>;
}

function CartPanel({
  lines,
  total,
  updateQuantity,
  clear,
  orderMessage,
  navigate,
}: {
  lines: { product: (typeof products)[number]; quantity: number }[];
  total: number;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  orderMessage: string;
  navigate: (path: string) => void;
}) {
  return (
    <div className="cart-panel">
      <div className="cart-panel-header"><strong>Shopping bag</strong>{lines.length > 0 && <button type="button" onClick={clear}><Icon name="trash" /> Clear</button>}</div>
      {lines.length === 0 ? (
        <div className="empty-cart"><span><Icon name="bag" /></span><strong>Your bag is quietly waiting</strong><p>Add an authentic imported essential from ORAVÈ.</p><button className="solid-button" type="button" onClick={() => navigate("/shop")}>Browse online shop</button></div>
      ) : (
        <>
          <div className="cart-lines">
            {lines.map(({ product, quantity }) => (
              <div className="cart-line" key={product.id}>
                <button type="button" className="cart-line-image" onClick={() => navigate(`/product/${product.id}`)}><img src={product.image} alt="" /></button>
                <div className="cart-line-copy"><button type="button" onClick={() => navigate(`/product/${product.id}`)}>{product.name}</button><span>{product.size} · {product.origin}</span><strong>{formatPrice(product.price)}</strong></div>
                <div className="quantity-stepper"><button type="button" onClick={() => updateQuantity(product.id, quantity - 1)} aria-label={`Remove one ${product.name}`}><Icon name={quantity === 1 ? "trash" : "minus"} /></button><span>{quantity}</span><button type="button" onClick={() => updateQuantity(product.id, quantity + 1)} aria-label={`Add one ${product.name}`} disabled={quantity >= product.stock}><Icon name="plus" /></button></div>
              </div>
            ))}
          </div>
          <div className="cart-summary"><div><span>Estimated product total</span><strong>{formatPrice(total)}</strong></div><p>ORAVÈ confirms product availability and Bangladesh home-delivery cost before payment.</p><a className="solid-button full-width" href={`https://wa.me/8801830098285?text=${orderMessage}`} target="_blank" rel="noreferrer"><Icon name="phone" /> Confirm on WhatsApp</a></div>
        </>
      )}
    </div>
  );
}

function SiteFooter({ navigate }: { navigate: (path: string) => void }) {
  const link = (href: string, label: string) => <a href={href} onClick={(event) => { event.preventDefault(); navigate(href); }}>{label}</a>;
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand"><strong>ORA<span>VÈ</span></strong><p>ORAVÈ is a 100% online-only cosmetics and beauty store, operating from Rayerbag, Dhaka and delivering authentic imports from South Korea, Japan, the USA and China to homes across Bangladesh.</p><div className="footer-contact"><a href="mailto:herbeauty@gmail.com"><Icon name="mail" /> herbeauty@gmail.com</a><a href="tel:+8801830098285"><Icon name="phone" /> +880 1830-098285</a></div></div>
        <div className="footer-columns">
          <div><span>Explore</span>{link("/shop", "Shop online")}{link("/best-sellers", "Best sellers")}{link("/journal", "Beauty journal")}</div>
          <div><span>ORAVÈ</span>{link("/our-story", "Sourcing & delivery")}{link("/contact", "Online support")}<a href="https://wa.me/8801830098285" target="_blank" rel="noreferrer">WhatsApp</a></div>
        </div>
      </div>
      <div className="sub-footer"><p>© 2026 ORAVÈ · 100% ONLINE · BANGLADESH</p><div><span>Nationwide home delivery</span><span>Prices shown in BDT</span></div></div>
      <p className="footer-note">ORAVÈ has no walk-in shop or pickup counter. Product availability, packaging and batch details can change between imports; contact our online team for current information before ordering.</p>
    </footer>
  );
}

function MobileBottomNav({
  path,
  navigate,
  visible,
  user,
  accountOpen,
  setAccountOpen,
  moreOpen,
  setMoreOpen,
  mobileSignInPath,
  signOutPath,
  bottomRef,
}: {
  path: string;
  navigate: (path: string) => void;
  visible: boolean;
  user: ChatGPTUser | null;
  accountOpen: boolean;
  setAccountOpen: (open: boolean) => void;
  moreOpen: boolean;
  setMoreOpen: (open: boolean) => void;
  mobileSignInPath: string;
  signOutPath: string;
  bottomRef: React.RefObject<HTMLElement | null>;
}) {
  const moreActive = path.startsWith("/journal") || path === "/best-sellers" || path === "/our-story" || path === "/contact" || moreOpen;
  return (
    <nav className={`mobile-bottom-nav ${visible ? "is-visible" : ""}`} ref={bottomRef} aria-label="Mobile navigation">
      <BottomButton icon="home" label="Home" active={path === "/"} onClick={() => navigate("/")} />
      <BottomButton icon="shop" label="Shop" active={path.startsWith("/shop") || path.startsWith("/product/")} onClick={() => navigate("/shop")} />
      <BottomButton
        icon="user"
        label="Account"
        active={path.startsWith("/account") || accountOpen}
        onClick={() => {
          setAccountOpen(!accountOpen);
          setMoreOpen(false);
        }}
        expanded={accountOpen}
        controls="mobile-account-menu"
      />
      <BottomButton
        icon="more"
        label="More"
        active={moreActive}
        onClick={() => {
          setMoreOpen(!moreOpen);
          setAccountOpen(false);
        }}
        expanded={moreOpen}
        controls="mobile-more-menu"
      />
      <div id="mobile-account-menu" className={`mobile-nav-popover mobile-account-menu ${accountOpen ? "is-visible" : ""}`} role="menu" aria-hidden={!accountOpen}>
        {user ? (
          <>
            <div className="mobile-account-identity" aria-label={`Signed in as ${user.displayName}`}>
              <strong>{user.displayName}</strong>
            </div>
            <div className="mobile-popover-divider" />
            <button type="button" role="menuitem" onClick={() => navigate("/account/edit-profile")}><Icon name="edit" /> Edit Profile</button>
            <button type="button" role="menuitem" onClick={() => navigate("/account/orders")}><Icon name="bag" /> Orders</button>
            <button type="button" role="menuitem" onClick={() => navigate("/account/wishlist")}><Icon name="heart" /> Wishlist</button>
            <button type="button" role="menuitem" onClick={() => navigate("/account/history")}><Icon name="clock" /> History</button>
            <a href={signOutPath} role="menuitem" className="mobile-account-logout"><Icon name="logout" /> Logout</a>
          </>
        ) : (
          <a href={mobileSignInPath} role="menuitem" className="mobile-login-link">Login / Register</a>
        )}
      </div>
      <div id="mobile-more-menu" className={`mobile-nav-popover mobile-more-menu ${moreOpen ? "is-visible" : ""}`} role="menu" aria-hidden={!moreOpen}>
        <button type="button" role="menuitem" className={path.startsWith("/journal") ? "is-active" : ""} onClick={() => navigate("/journal")}><Icon name="journal" /> Beauty journal</button>
        <button type="button" role="menuitem" className={path === "/best-sellers" ? "is-active" : ""} onClick={() => navigate("/best-sellers")}><Icon name="heart" /> Best sellers</button>
        <button type="button" role="menuitem" className={path === "/our-story" ? "is-active" : ""} onClick={() => navigate("/our-story")}><Icon name="shield" /> Our promise</button>
        <button type="button" role="menuitem" className={path === "/contact" ? "is-active" : ""} onClick={() => navigate("/contact")}><Icon name="mail" /> Contact us</button>
      </div>
    </nav>
  );
}

function BottomButton({
  icon,
  label,
  active,
  onClick,
  expanded,
  controls,
}: {
  icon: "home" | "shop" | "user" | "more";
  label: string;
  active: boolean;
  onClick: () => void;
  expanded?: boolean;
  controls?: string;
}) {
  return <button type="button" className={active ? "is-active" : ""} onClick={onClick} aria-expanded={expanded} aria-controls={controls}><Icon name={icon} /><span>{label}</span></button>;
}
