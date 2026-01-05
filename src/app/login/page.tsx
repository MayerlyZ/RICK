"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/components/auth/AuthLayout.module.css'

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const raw = localStorage.getItem('mock_users');
      const users = raw ? JSON.parse(raw) : [];
      const user = users.find((u: any) => u.email === form.email && u.password === form.password);
      if (!user) {
        setError('Credenciales inválidas');
        return;
      }
      localStorage.setItem('current_user', JSON.stringify({ name: user.name, email: user.email }));
      router.push('/');
    } catch (err) {
      setError('Error al autenticar');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.left}>
          <img src="/img/rick.jpg" alt="Auth image" className={styles.image} />
        </div>

        <div className={styles.right}>
          <div className={styles.formWrapper}>
            <form onSubmit={handleSubmit} className="w-full">
              <h1 className={styles.title}>Iniciar sesión</h1>

              {error && <p className={styles.error}>{error}</p>}

              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                className={styles.input}
              />

              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                className={styles.input}
              />

              <button type="submit" className={styles.submitButton}>Ingresar</button>

              <div className="text-sm text-center" style={{marginTop: 8}}>
                <a href="/register" className={styles.smallLink}>Crear cuenta</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
