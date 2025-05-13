import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../StyleComponents/LoginForm.css';

const RegisterForm = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí deberías llamar a tu API para registrar el usuario
    // Por ahora, solo redirige al login
    // Si usas fetch, puedes hacer la petición aquí y luego redirigir si es exitosa
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Registrarse</h2>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Crear cuenta</button>
        <div className="register-link">
          ¿Ya tienes cuenta?{' '}
          <span onClick={handleLogin}>Inicia sesión</span>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;