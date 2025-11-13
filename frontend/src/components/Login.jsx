import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = ({ onSwitchToRegister, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData);
    
    if (result.success) {
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '0 24px',
      textAlign: 'center'
    }}>
      {/* Header Section */}
      <div style={{
        marginBottom: '48px'
      }}>
        <div style={{
          backgroundColor: '#3b82f6',
          width: '80px',
          height: '80px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto',
          border: '2px solid #2563eb'
        }}>
          <span style={{ fontSize: '32px', color: 'white' }}>🔐</span>
        </div>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '300',
          color: 'Black',
          margin: '0 0 12px 0'
        }}>
          Welcome Back
        </h1>
        <p style={{
          fontSize: '16px',
          color: 'Black',
          margin: '0'
        }}>
          Sign in to your account
        </p>
      </div>

      {/* Login Form */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        textAlign: 'left'
      }}>
        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div>
            <label style={{
              display: 'block',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '8px'
            }} htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="your@email.com"
              required
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '8px'
            }} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your password"
              required
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: loading ? '#9ca3af' : '#3b82f6',
              color: 'white',
              padding: '14px 16px',
              fontSize: '16px',
              fontWeight: '500',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#3b82f6')}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{
          marginTop: '32px',
          textAlign: 'center',
          paddingTop: '24px',
          borderTop: '1px solid #f3f4f6'
        }}>
          <p style={{
            color: '#6b7280',
            fontSize: '14px',
            margin: '0'
          }}>
            Don't have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              style={{
                color: '#3b82f6',
                background: 'none',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px'
              }}
              onMouseOver={(e) => e.target.style.color = '#2563eb'}
              onMouseOut={(e) => e.target.style.color = '#3b82f6'}
            >
              Create one here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;