"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/app/components/auth/AuthLayout.module.css'

interface RegisterForm {
  name: string
  email: string
  password: string
  confirm: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState<RegisterForm>({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Todos los campos son obligatorios')
      return
    }
    if (form.password !== form.confirm) {
      setError('Las contraseñas no coinciden')
      return
    }

    // Simulación: guarda en localStorage
    try {
      const raw = localStorage.getItem('mock_users')
      const users = raw ? JSON.parse(raw) : []
      if (users.find((u: any) => u.email === form.email)) {
        setError('El correo ya está registrado')
        return
      }
      users.push({ name: form.name, email: form.email, password: form.password })
      localStorage.setItem('mock_users', JSON.stringify(users))
      setSuccess('Registro exitoso. Redirigiendo a login...')
      setTimeout(() => router.push('/login'), 1200)
    } catch (err: any) {
      setError('Error al guardar usuario')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.left}>
          <img src="/img/rick.jpg" alt="Auth image" className={styles.image} />
        </div>

        <div className={styles.right}>
          <div className={styles.formWrapper}>
            <form onSubmit={handleSubmit} className="w-full">
              <h1 className={styles.title}>Crear cuenta</h1>

              {error && <p className={styles.error}>{error}</p>}
              {success && <p className={styles.success}>{success}</p>}

              <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} className={styles.input} />
              <input type="email" name="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} className={styles.input} />
              <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} className={styles.input} />
              <input type="password" name="confirm" placeholder="Confirma contraseña" value={form.confirm} onChange={handleChange} className={styles.input} />

              <button type="submit" className={styles.submitButton}>Registrarse</button>

              <div className="text-sm text-center" style={{marginTop: 8}}>
                <a href="/login" className={styles.smallLink}>¿Ya tienes cuenta? Iniciar sesión</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

