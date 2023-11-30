"use client";
import React, { useState, useEffect } from "react";

const FadeInOut = ({ children, duration = 1000, fadeOut = false }) => {
  const [opacity, setOpacity] = useState(0);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    // Fade in
    setOpacity(1);

    // If fadeOut is true, fade out after duration
    if (fadeOut) {
      setTimeout(() => {
        setOpacity(0);
        // Optional: set display to false to remove from DOM after fade-out
        setTimeout(() => setDisplay(false), duration);
      }, duration);
    }
  }, [fadeOut, duration]);

  const style = {
    opacity: opacity,
    transition: `opacity ${duration / 1000}s ease-in-out`,
    display: display ? "block" : "none",
  };

  return <div style={style}>{children}</div>;
};

export default FadeInOut;
