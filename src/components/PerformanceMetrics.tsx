import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PerformanceMonitor = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px;
  border-radius: 6px;
  font-size: 12px;
  font-family: monospace;
  z-index: 1000;
  max-width: 200px;

  .metric {
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .metric-label {
    opacity: 0.7;
  }

  .metric-value {
    margin-left: 8px;
    font-weight: bold;
  }

  .metric-good {
    color: #4caf50;
  }

  .metric-needs-improvement {
    color: #ff9800;
  }

  .metric-poor {
    color: #f44336;
  }
`;

interface WebVital {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

const PerformanceMetrics: React.FC = () => {
  const [vitals, setVitals] = useState<WebVital[]>([]);
  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const handleVital = (vital: any) => {
      setVitals(prev => {
        const existing = prev.findIndex(v => v.name === vital.name);
        const newVital = {
          name: vital.name,
          value: vital.value,
          rating: vital.rating,
        };

        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = newVital;
          return updated;
        }

        return [...prev, newVital];
      });
    };

    // Import and use web-vitals
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(handleVital);
      onFCP(handleVital);
      onLCP(handleVital);
      onTTFB(handleVital);
      onINP(handleVital); // INP replaced FID in web-vitals v3+
      setShowMetrics(true);
    });

    // Listen for keyboard shortcut to toggle metrics
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setShowMetrics(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const formatValue = (name: string, value: number) => {
    if (name === 'CLS') {
      return value.toFixed(3);
    }
    return `${Math.round(value)}ms`;
  };

  if (!showMetrics || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <PerformanceMonitor>
      <div style={{ marginBottom: '8px', opacity: 0.8 }}>
        Web Vitals (Ctrl+Shift+P)
      </div>
      {vitals.map(vital => (
        <div key={vital.name} className="metric">
          <span className="metric-label">{vital.name}:</span>
          <span className={`metric-value metric-${vital.rating}`}>
            {formatValue(vital.name, vital.value)}
          </span>
        </div>
      ))}
    </PerformanceMonitor>
  );
};

export default PerformanceMetrics;
