import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import AnimatedBackground from '@/components/auth/AnimatedBackground';

const WEBSITE_NAME = 'Focilo';
const WEBSITE_TAGLINE = 'Focus + Flow + Productivity';

const AuthPage = () => {
  const [tab, setTab] = useState<'signup' | 'login'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login, loginWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        toast.error(data.error || 'Signup failed');
        return;
      }
      toast.success('Account created! You can now sign in.');
      setTab('login');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error('Signup failed. Please try again.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      if (credentialResponse.credential) {
        await loginWithGoogle(credentialResponse.credential);
        navigate('/dashboard');
      } else {
        toast.error('Google login failed - no credential received');
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Google login failed. Please try again.');
    }
  };

  const handleGoogleError = () => {
    console.error('Google OAuth Error - this might be a redirect_uri_mismatch');
    toast.error('Google login failed. Please check your browser console for details.');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', position: 'relative' }}>
      <AnimatedBackground />
      {/* Back to Home */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 inline-flex items-center text-white/80 hover:text-white transition-all duration-300 hover:scale-105 z-10"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>
      {/* Main Auth Card - Glassmorphism */}
      <div style={{
        background: 'rgba(255,255,255,0.18)',
        borderRadius: '2rem',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.22)',
        padding: '2.7rem 2.2rem',
        width: '100%',
        maxWidth: 410,
        minWidth: 300,
        backdropFilter: 'blur(18px)',
        border: '1.5px solid rgba(255,255,255,0.28)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}>
        {/* Logo/Icon and Website Name */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.7rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            borderRadius: '1.2rem',
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            boxShadow: '0 2px 8px 0 rgba(30,60,114,0.13)'
          }}>
            <CheckCircle size={32} color="#fff" />
          </div>
          <h2 style={{ fontWeight: 800, fontSize: '2.1rem', letterSpacing: '-0.02em', color: '#1e3c72', margin: 0 }}>{WEBSITE_NAME}</h2>
          <div style={{ color: '#2a5298', fontWeight: 500, fontSize: '1.08rem', marginTop: 2, marginBottom: 0 }}>{WEBSITE_TAGLINE}</div>
        </div>
        {/* Google Login Button */}
        <div style={{ width: '100%', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
            width={320}
            text={tab === 'login' ? 'signin_with' : 'signup_with'}
                    shape="rectangular"
                    theme="filled_black"
                    useOneTap={false}
                  />
                </div>
        {tab === 'login' ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }}>
            <input
                  type="email"
              placeholder="Email Address"
                  value={email}
              onChange={e => setEmail(e.target.value)}
                  required
              style={{ padding: '1rem', borderRadius: '0.8rem', border: '1px solid #e0e0e0', fontSize: '1.05rem', background: 'rgba(255,255,255,0.35)', outline: 'none', transition: 'border 0.2s', boxShadow: '0 1px 4px 0 rgba(30,60,114,0.04)' }}
            />
            <input
                  type="password"
              placeholder="Password"
                  value={password}
              onChange={e => setPassword(e.target.value)}
                  required
              style={{ padding: '1rem', borderRadius: '0.8rem', border: '1px solid #e0e0e0', fontSize: '1.05rem', background: 'rgba(255,255,255,0.35)', outline: 'none', transition: 'border 0.2s', boxShadow: '0 1px 4px 0 rgba(30,60,114,0.04)' }}
                />
            <div style={{ textAlign: 'right', marginBottom: '-0.7rem' }}>
              <a href="#" style={{ color: '#1e3c72', fontSize: '0.97rem', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</a>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '0.8rem',
                background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '1.1rem',
                border: 'none',
                cursor: 'pointer',
                marginTop: '0.5rem',
                opacity: isLoading ? 0.7 : 1,
                boxShadow: '0 2px 8px 0 rgba(30,60,114,0.08)'
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '1rem' }}>
              Don&apos;t have an account?{' '}
              <span
                style={{ color: '#1e3c72', cursor: 'pointer', fontWeight: 600 }}
                onClick={() => setTab('signup')}
              >
                Sign up
              </span>
                </div>
          </form>
        ) : (
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ padding: '1rem', borderRadius: '0.8rem', border: '1px solid #e0e0e0', fontSize: '1.05rem', background: 'rgba(255,255,255,0.35)', outline: 'none', transition: 'border 0.2s', boxShadow: '0 1px 4px 0 rgba(30,60,114,0.04)' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ padding: '1rem', borderRadius: '0.8rem', border: '1px solid #e0e0e0', fontSize: '1.05rem', background: 'rgba(255,255,255,0.35)', outline: 'none', transition: 'border 0.2s', boxShadow: '0 1px 4px 0 rgba(30,60,114,0.04)' }}
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              style={{ padding: '1rem', borderRadius: '0.8rem', border: '1px solid #e0e0e0', fontSize: '1.05rem', background: 'rgba(255,255,255,0.35)', outline: 'none', transition: 'border 0.2s', boxShadow: '0 1px 4px 0 rgba(30,60,114,0.04)' }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '0.8rem',
                background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '1.1rem',
                border: 'none',
                cursor: 'pointer',
                marginTop: '0.5rem',
                boxShadow: '0 2px 8px 0 rgba(30,60,114,0.08)'
              }}
            >
              Sign Up
            </button>
            <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '1rem' }}>
              Already have an account?{' '}
              <span
                style={{ color: '#1e3c72', cursor: 'pointer', fontWeight: 600 }}
                onClick={() => setTab('login')}
              >
                Sign in
              </span>
          </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
