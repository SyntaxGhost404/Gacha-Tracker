"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { Icon } from "./Icon";
import { formatPrice, type Product } from "./data";

type ProductCardProps = {
  product: Product;
  navigate: (path: string) => void;
  addToCart: (productId: string) => void;
};

export default function ProductCard({ product, navigate, addToCart }: ProductCardProps) {
  const [expanded, setExpanded] = useState(false);
  const productPath = `/product/${product.id}`;

  const follow = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(productPath);
  };

  return (
    <article className="product-card">
      <a className="product-cover" href={productPath} onClick={follow} aria-label={`View ${product.name}`}>
        <img src={product.image} alt="" />
        <span className={`cover-badge status-${product.status.toLowerCase().replaceAll(" ", "-")}`}>
          {product.status}
        </span>
        <span className="cover-badge cover-origin">{product.origin}</span>
        <span className="cover-shade" />
      </a>

      <div className="product-card-body">
        <div className="identity-row">
          <a className="product-thumb" href={productPath} onClick={follow} tabIndex={-1} aria-hidden="true">
            <img src={product.image} alt="" />
          </a>
          <div className="identity-copy">
            <a className="card-title-link" href={productPath} onClick={follow}>
              {product.name}
            </a>
            <span className="identity-subline">
              <span>{product.line}</span>
              <span aria-hidden="true">·</span>
              <span className="rating-inline"><Icon name="star" /> {product.rating} ({product.reviews})</span>
            </span>
          </div>
        </div>

        <div className="tag-row" aria-label="Product details">
          <span className="tag tag-accent" style={{ "--tag-accent": product.accent } as React.CSSProperties}>
            {product.category}
          </span>
          {product.skinTypes.slice(0, 2).map((item) => <span className="tag" key={item}>{item}</span>)}
          <span className="tag">{product.size}</span>
        </div>

        <div className="description-block">
          <p className={`card-summary ${expanded ? "is-expanded" : ""}`}>{product.summary}</p>
          {product.summary.length > 128 && (
            <button className="text-control" type="button" onClick={() => setExpanded((value) => !value)}>
              {expanded ? "Show less" : "Read more"}
              <Icon name="chevron-down" className={expanded ? "is-rotated" : ""} />
            </button>
          )}
        </div>

        <div className="card-divider" />

        <div className="card-meta-split">
          <div className="meta-cluster">
            <span className="meta-label">Selected for</span>
            <span>{product.concerns.slice(0, 2).join(" · ")}</span>
          </div>
          <div className="meta-cluster meta-right">
            <span className="meta-label">Availability</span>
            <span>{product.stock > 0 ? `${product.stock} ready to dispatch` : "New shipment on the way"}</span>
          </div>
        </div>

        <div className="card-divider" />

        <div className="card-action-row">
          <div className="price-wrap">
            <strong>{formatPrice(product.price)}</strong>
            {product.compareAt && <span>{formatPrice(product.compareAt)}</span>}
          </div>
          <div className="card-actions">
            <a className="quiet-button" href={productPath} onClick={follow}>Details</a>
            <button
              className="solid-button compact"
              type="button"
              disabled={product.stock === 0}
              onClick={() => addToCart(product.id)}
            >
              <Icon name={product.stock === 0 ? "clock" : "bag"} />
              {product.stock === 0 ? "Restocking" : "Add to bag"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
