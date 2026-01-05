"use client"

import React, { useEffect, useState } from "react";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from "./Sidebar.module.css";

interface SidebarItem {
  label: string;
  href: string;
}

interface SidebarProps {
  title?: string;
  items: SidebarItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const pathname = usePathname()
  const [hasUser, setHasUser] = useState<boolean>(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('current_user')
      setHasUser(Boolean(raw))
    } catch (e) {
      setHasUser(false)
    }
  }, [])

  return (
    <aside className={`${styles.sidebar} ${!hasUser ? styles.sidebarCollapsed : ''}`}>
      <nav className={styles.nav} aria-label="Main navigation">
        {items.map((item, i) => {
          const isDashboard = item.href === '/dashboard'
          if (isDashboard && !hasUser) return null
          const active = pathname === item.href
          return (
            <Link key={i} href={item.href} className={`${styles.item} ${active ? styles.itemActive : ''}`}>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  );
};