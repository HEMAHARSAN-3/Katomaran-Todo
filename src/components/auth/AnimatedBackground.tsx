
import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Multi-layer animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient-x"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 via-transparent to-purple-900/50 animate-gradient-y"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/30 via-transparent to-pink-900/30 animate-gradient-xy"></div>
      
      {/* Enhanced floating particles with varied sizes and speeds */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-white/10 animate-float ${
              i % 3 === 0 ? 'bg-blue-400/20' : i % 3 === 1 ? 'bg-purple-400/20' : 'bg-pink-400/20'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 15 + 15}s`
            }}
          />
        ))}
      </div>
      
      {/* Enhanced geometric shapes with more variety */}
      <div className="absolute top-20 left-20 w-40 h-40 border-2 border-white/10 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-32 right-32 w-32 h-32 border border-purple-400/20 rotate-45 animate-pulse"></div>
      <div className="absolute top-1/3 left-16 w-20 h-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl animate-bounce-slow"></div>
      <div className="absolute bottom-1/4 right-20 w-24 h-24 border-2 border-pink-400/20 rounded-lg rotate-12 animate-pulse-slow"></div>
      
      {/* Additional animated elements */}
      <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full animate-bounce-slow" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-12 h-12 border border-yellow-400/20 rounded-full animate-spin-slow" style={{ animationDelay: '5s' }}></div>
      
      {/* Enhanced glowing orbs with more complex gradients */}
      <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-500/15 via-purple-500/10 to-pink-500/15 rounded-full blur-2xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-500/15 via-pink-500/10 to-cyan-500/15 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-transparent animate-gradient-mesh"></div>
    </div>
  );
};

export default AnimatedBackground;
