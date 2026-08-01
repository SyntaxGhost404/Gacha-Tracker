"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import { Icon } from "./Icon";
import type { Product } from "./data";

export const PRODUCT_VERIFICATION_DRAWER_ID = "product-verification-drawer";

export default function ProductVerificationModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  const isPending = product.stock === 0;
  const titleId = `verification-title-${product.id}`;
  const descriptionId = `verification-description-${product.id}`;

  useEffect(() => {
    dialogRef.current?.focus({ preventScroll: true });
  }, [product.id]);

  return (
    <div
      className="verification-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        id={PRODUCT_VERIFICATION_DRAWER_ID}
        className="verification-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
      >
        <div className="verification-product-panel">
          <div className="verification-product-media">
            <img src={product.image} alt={product.name} />
            <span className={`verification-state-badge ${isPending ? "is-pending" : ""}`}>
              <Icon name={isPending ? "clock" : "shield"} />
              {isPending ? "Arrival check pending" : "Verified for online listing"}
            </span>
            <span className="verification-origin-badge">Imported from {product.origin}</span>
          </div>

          <div className="verification-product-copy">
            <span className="verification-kicker">Selected product</span>
            <h2 id={titleId}>{product.name}</h2>
            <p>{product.line} · {product.size}</p>
            <div className="verification-batch-line">
              <span>Batch</span>
              <strong>{product.verification.batchNumber}</strong>
            </div>
          </div>
        </div>

        <div className="verification-dossier">
          <header className="verification-dossier-header">
            <div>
              <span className="verification-kicker">ORAVÈ authenticity record</span>
              <h3>{isPending ? "Pre-arrival source dossier" : "Batch verification dossier"}</h3>
              <p id={descriptionId}>
                {isPending
                  ? "The source file is ready; the physical batch must still pass arrival inspection before online orders reopen."
                  : "A product-specific view of the source documents, batch markings and arrival checks held for this online listing."}
              </p>
            </div>
            <button className="verification-close-button" type="button" onClick={onClose} aria-label="Close product verification">
              <Icon name="x" />
            </button>
          </header>

          <div className={`verification-status-strip ${isPending ? "is-pending" : ""}`}>
            <span><Icon name={isPending ? "clock" : "check"} /></span>
            <div>
              <strong>{isPending ? "Source review complete · physical check pending" : "Document and arrival review complete"}</strong>
              <p>{product.verification.note}</p>
            </div>
          </div>

          <dl className="verification-record-grid" aria-label="Verification record details">
            <div>
              <dt>Internal record</dt>
              <dd>{product.verification.recordId}</dd>
            </div>
            <div>
              <dt>Batch / lot</dt>
              <dd>{product.verification.batchNumber}</dd>
            </div>
            <div>
              <dt>{isPending ? "Expected arrival" : "Received in Dhaka"}</dt>
              <dd>{product.verification.receivedDate}</dd>
            </div>
            <div>
              <dt>Record reviewed</dt>
              <dd>{product.verification.verifiedDate}</dd>
            </div>
            <div>
              <dt>Best before</dt>
              <dd>{product.verification.bestBefore}</dd>
            </div>
            <div>
              <dt>Import origin</dt>
              <dd>{product.origin}</dd>
            </div>
          </dl>

          <section className="verification-section verification-checks">
            <div className="verification-section-heading">
              <span>01</span>
              <div><strong>Checks for this item</strong><p>Each line is tied to the selected product and batch record.</p></div>
            </div>
            <ol>
              {product.verification.checks.map((check, index) => {
                const pendingCheck = isPending && index === product.verification.checks.length - 1;
                return (
                  <li className={pendingCheck ? "is-pending" : ""} key={check}>
                    <span><Icon name={pendingCheck ? "clock" : "check"} /></span>
                    <div><strong>{pendingCheck ? "Scheduled on arrival" : `Check ${String(index + 1).padStart(2, "0")}`}</strong><p>{check}</p></div>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="verification-section verification-documents">
            <div className="verification-section-heading">
              <span>02</span>
              <div><strong>Source and certificate file</strong><p>References retained with ORAVÈ’s internal online-listing record.</p></div>
            </div>
            <div className="verification-document-grid">
              <div>
                <span className="verification-document-icon"><Icon name="journal" /></span>
                <div><small>Supplier / import document</small><strong>{product.verification.supplierDocument}</strong></div>
              </div>
              <div>
                <span className="verification-document-icon"><Icon name="shield" /></span>
                <div><small>{product.verification.certificateType}</small><strong>{product.verification.certificateId}</strong><em>{product.verification.certificateStatus}</em></div>
              </div>
            </div>
          </section>

          <section className="verification-section verification-route">
            <div className="verification-section-heading">
              <span>03</span>
              <div><strong>Reviewed sourcing route</strong><p>{product.verification.sourceRoute}</p></div>
            </div>
            <div className="verification-route-line" aria-hidden="true">
              <span className="is-complete" /><i /><span className={isPending ? "is-pending" : "is-complete"} />
            </div>
          </section>

          <p className="verification-disclaimer">
            This dossier summarizes ORAVÈ’s internal sourcing and arrival review for the displayed batch. Supplier declarations are retained as supporting documents; this is not a government-issued laboratory certificate.
          </p>
        </div>
      </section>
    </div>
  );
}
