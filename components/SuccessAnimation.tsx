"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import dinámico de Lottie para evitar errores de hidratación
const Lottie = dynamic(() => import('lottie-react'), { 
  ssr: false,
  loading: () => <div className="w-20 h-20" />
});

interface SuccessAnimationProps {
  className?: string;
}

export function SuccessAnimation({ className = "" }: SuccessAnimationProps) {
  const [showFallback, setShowFallback] = useState(false);

  // Animación 3D de éxito (JSON placeholder - puedes reemplazar con tu animación)
  const successAnimationData = {
    "v": "5.7.4",
    "fr": 30,
    "ip": 0,
    "op": 60,
    "w": 200,
    "h": 200,
    "nm": "Success Check",
    "ddd": 0,
    "assets": [],
    "layers": [
      {
        "ddd": 0,
        "ind": 1,
        "ty": 4,
        "nm": "Check",
        "sr": 1,
        "ks": {
          "o": {
            "a": 1,
            "k": [
              { "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 0, "s": [0] },
              { "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 20, "s": [100] },
              { "t": 60, "s": [100] }
            ],
            "ix": 11
          },
          "r": {
            "a": 1,
            "k": [
              { "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 0, "s": [0] },
              { "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 20, "s": [360] },
              { "t": 60, "s": [360] }
            ],
            "ix": 10
          },
          "p": {
            "a": 0,
            "k": [100, 100, 0],
            "ix": 2
          },
          "a": {
            "a": 0,
            "k": [0, 0, 0],
            "ix": 1
          },
          "s": {
            "a": 1,
            "k": [
              { "i": { "x": [0.667, 0.667, 0.667], "y": [0.667, 0.667, 0.667] }, "o": { "x": [0.333, 0.333, 0.333], "y": [0.333, 0.333, 0.333] }, "t": 0, "s": [0, 0, 100] },
              { "i": { "x": [0.667, 0.667, 0.667], "y": [0.667, 0.667, 0.667] }, "o": { "x": [0.333, 0.333, 0.333] }, "t": 20, "s": [120, 120, 100] },
              { "t": 60, "s": [100, 100, 100] }
            ],
            "ix": 6
          }
        },
        "ao": 0,
        "shapes": [
          {
            "ty": "gr",
            "it": [
              {
                "d": 1,
                "ty": "el",
                "s": {
                  "a": 0,
                  "k": [80, 80],
                  "ix": 2
                },
                "p": {
                  "a": 0,
                  "k": [0, 0],
                  "ix": 3
                },
                "nm": "Ellipse Path 1",
                "mn": "ADBE Vector Shape - Ellipse",
                "hd": false
              },
              {
                "ty": "fl",
                "c": {
                  "a": 0,
                  "k": [0.2, 0.8, 0.4, 1],
                  "ix": 4
                },
                "o": {
                  "a": 0,
                  "k": 100,
                  "ix": 5
                },
                "r": 1,
                "bm": 0,
                "nm": "Fill 1",
                "mn": "ADBE Vector Graphic - Fill",
                "hd": false
              },
              {
                "ty": "tr",
                "p": {
                  "a": 0,
                  "k": [0, 0],
                  "ix": 2
                },
                "a": {
                  "a": 0,
                  "k": [0, 0],
                  "ix": 1
                },
                "s": {
                  "a": 0,
                  "k": [100, 100],
                  "ix": 3
                },
                "r": {
                  "a": 0,
                  "k": 0,
                  "ix": 6
                },
                "o": {
                  "a": 0,
                  "k": 100,
                  "ix": 7
                },
                "sk": {
                  "a": 0,
                  "k": 0,
                  "ix": 4
                },
                "sa": {
                  "a": 0,
                  "k": 0,
                  "ix": 5
                },
                "nm": "Transform"
              }
            ],
            "nm": "Ellipse 1",
            "mn": "ADBE Vector Group",
            "hd": false
          },
          {
            "ty": "gr",
            "it": [
              {
                "ty": "rc",
                "d": 1,
                "s": {
                  "a": 0,
                  "k": [8, 8],
                  "ix": 2
                },
                "p": {
                  "a": 0,
                  "k": [0, 0],
                  "ix": 3
                },
                "r": {
                  "a": 0,
                  "k": 4,
                  "ix": 4
                },
                "nm": "Rectangle Path 1",
                "mn": "ADBE Vector Shape - Rect",
                "hd": false
              },
              {
                "ty": "fl",
                "c": {
                  "a": 0,
                  "k": [1, 1, 1, 1],
                  "ix": 4
                },
                "o": {
                  "a": 0,
                  "k": 100,
                  "ix": 5
                },
                "r": 1,
                "bm": 0,
                "nm": "Fill 1",
                "mn": "ADBE Vector Graphic - Fill",
                "hd": false
              },
              {
                "ty": "tr",
                "p": {
                  "a": 0,
                  "k": [0, 0],
                  "ix": 2
                },
                "a": {
                  "a": 0,
                  "k": [0, 0],
                  "ix": 1
                },
                "s": {
                  "a": 0,
                  "k": [100, 100],
                  "ix": 3
                },
                "r": {
                  "a": 0,
                  "k": 0,
                  "ix": 6
                },
                "o": {
                  "a": 0,
                  "k": 100,
                  "ix": 7
                },
                "sk": {
                  "a": 0,
                  "k": 0,
                  "ix": 4
                },
                "sa": {
                  "a": 0,
                  "k": 0,
                  "ix": 5
                },
                "nm": "Transform"
              }
            ],
            "nm": "Check",
            "mn": "ADBE Vector Group",
            "hd": false
          }
        ],
        "ip": 0,
        "op": 60,
        "st": 0,
        "bm": 0
      }
    ],
    "markers": []
  };

  useEffect(() => {
    // Animación de éxito sin confetti para evitar problemas de tipos
    console.log('Success animation triggered');
  }, []);

  const handleLottieError = () => {
    setShowFallback(true);
  };

  if (showFallback) {
    // Fallback CSS 3D animation
    return (
      <div className={`relative ${className}`}>
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center transform-gpu animate-pulse">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform rotate-12 animate-bounce">
            <span className="text-2xl text-green-600 font-bold">✓</span>
          </div>
        </div>
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-full blur-xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Lottie
        animationData={successAnimationData}
        loop={false}
        autoplay={true}
        onError={handleLottieError}
        style={{ width: 80, height: 80 }}
      />
      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-full blur-xl animate-pulse"></div>
    </div>
  );
}

