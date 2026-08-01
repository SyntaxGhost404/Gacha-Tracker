"use client";

/* eslint-disable @next/next/no-img-element */

import { Icon } from "./Icon";
import type { JournalEntry } from "./data";

export default function JournalCard({
  entry,
  navigate,
  compact = false,
}: {
  entry: JournalEntry;
  navigate: (path: string) => void;
  compact?: boolean;
}) {
  const href = `/journal/${entry.id}`;
  const open = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(href);
  };

  return (
    <article className={`journal-card ${compact ? "is-compact" : ""}`} onClick={open}>
      <a href={href} className="journal-image-link" onClick={open} aria-label={`Read ${entry.title}`}>
        <img src={entry.image} alt="" style={{ objectPosition: entry.imagePosition ?? "center" }} />
        <span className="journal-image-overlay" />
        <span className="journal-badge journal-badge-left">Journal</span>
        <span className="journal-badge journal-badge-right">{entry.category}</span>
      </a>
      <div className="journal-card-body">
        <h3>{entry.title}</h3>
        <div className="journal-meta"><Icon name="clock" /> {entry.date} · {entry.readTime}</div>
        <div className="tag-row"><span className="tag tag-accent">{entry.category}</span></div>
        <p>{entry.excerpt}</p>
        <div className="card-divider" />
        <div className="journal-action-row">
          <span>ORAVÈ online edit</span>
          <a href={href} onClick={open} className="quiet-button compact">Read article <Icon name="arrow-right" /></a>
        </div>
      </div>
    </article>
  );
}
