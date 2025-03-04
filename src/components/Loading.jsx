import React from 'react';

const Loading = () => (
  <div style={overlayStyle}>
    <div style={spinnerContainerStyle}>
      <div style={spinnerStyle}></div>
      <p style={textStyle}>Cargando...</p>
    </div>
  </div>
);

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999
};

const spinnerContainerStyle = {
  textAlign: 'center'
};

const spinnerStyle = {
  width: '50px',
  height: '50px',
  border: '5px solid #f3f3f3',
  borderTop: '5px solid #1a237e',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '0 auto 20px auto',
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  animationName: 'spin',
  animationDuration: '1s',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite'
};

const textStyle = {
  color: '#1a237e',
  fontSize: '1.2rem',
  fontWeight: '500'
};

export default Loading;
