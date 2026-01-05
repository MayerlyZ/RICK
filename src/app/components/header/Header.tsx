"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './Header.module.css'

export default function Header() {
  const router = useRouter()
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('current_user')
      if (raw) setUser(JSON.parse(raw))
    } catch (e) {
      setUser(null)
    }
  }, [])

  const handleLogout = () => {
    try { localStorage.removeItem('current_user') } catch (e) {}
    setUser(null)
    router.push('/login')
  }

  return (
    <div className={styles.container}>
      {user ? (
        <>
          <div className={styles.name}>Hola, {user.name ?? user.email}</div>
          <button className={styles.button} onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <a className={styles.login} href="/login">Iniciar sesión</a>
      )}
    </div>
  )
}
