"use client";

import { useEffect, useState } from "react";

export default function Nav({ items, title }: { items: { id: string; label: string }[]; title: string }) {
  const [current, setCurrent] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setCurrent(vis[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="nav" aria-label="Sections">
      <a href="#top" className="nav-title">
        {title}
      </a>
      <ul className="nav-list">
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} className={current === i.id ? "is-on" : ""}>
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
