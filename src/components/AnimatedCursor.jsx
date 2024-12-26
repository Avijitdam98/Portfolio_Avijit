import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';

const AnimatedCursor = () => {
  const [cursorType, setCursorType] = useState('default');
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handlePointerOver = (e) => {
      const target = e.target;
      
      // Check for interactive elements
      const isLink = target.tagName.toLowerCase() === 'a' || target.closest('a');
      const isButton = target.tagName.toLowerCase() === 'button' || target.closest('button');
      const isInput = target.tagName.toLowerCase() === 'input' || target.closest('input');
      const isTextArea = target.tagName.toLowerCase() === 'textarea' || target.closest('textarea');
      const isHeading = /^h[1-6]$/.test(target.tagName.toLowerCase());
      const isImage = target.tagName.toLowerCase() === 'img';
      
      setIsPointer(isLink || isButton || isInput || isTextArea);
      
      // Set specific cursor types
      if (isLink) setCursorType('link');
      else if (isButton) setCursorType('button');
      else if (isInput || isTextArea) setCursorType('text');
      else if (isHeading) setCursorType('heading');
      else if (isImage) setCursorType('image');
      else setCursorType('default');
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handlePointerOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Add global styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      body, a, button, input, textarea {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handlePointerOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.head.removeChild(styleSheet);
    };
  }, []);

  const getCursorStyles = () => {
    const baseStyles = {
      position: 'fixed',
      pointerEvents: 'none',
      transform: 'translate(-50%, -50%)',
      x: cursorXSpring,
      y: cursorYSpring,
      transition: 'width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s',
    };

    const dotStyles = {
      ...baseStyles,
      zIndex: 9999,
      width: isPointer ? '50px' : '12px',
      height: isPointer ? '50px' : '12px',
      backgroundColor: getCursorColor(),
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      borderRadius: '50%',
      scale: isClicking ? 0.9 : 1,
    };

    const ringStyles = {
      ...baseStyles,
      zIndex: 9998,
      width: '40px',
      height: '40px',
      backgroundColor: 'transparent',
      border: `2px solid ${getCursorRingColor()}`,
      borderRadius: '50%',
      scale: isClicking ? 1.2 : (isPointer ? 1.5 : 1),
    };

    return { dotStyles, ringStyles };
  };

  const getCursorColor = () => {
    switch (cursorType) {
      case 'link':
        return 'rgba(59, 130, 246, 0.2)';
      case 'button':
        return 'rgba(139, 92, 246, 0.2)';
      case 'text':
        return 'rgba(236, 72, 153, 0.2)';
      case 'heading':
        return 'rgba(234, 179, 8, 0.2)';
      case 'image':
        return 'rgba(34, 197, 94, 0.2)';
      default:
        return 'rgba(255, 255, 255, 0.1)';
    }
  };

  const getCursorRingColor = () => {
    switch (cursorType) {
      case 'link':
        return 'rgba(59, 130, 246, 0.5)';
      case 'button':
        return 'rgba(139, 92, 246, 0.5)';
      case 'text':
        return 'rgba(236, 72, 153, 0.5)';
      case 'heading':
        return 'rgba(234, 179, 8, 0.5)';
      case 'image':
        return 'rgba(34, 197, 94, 0.5)';
      default:
        return 'rgba(255, 255, 255, 0.3)';
    }
  };

  const { dotStyles, ringStyles } = getCursorStyles();

  return (
    <>
      <motion.div
        style={dotStyles}
        animate={{
          scale: isClicking ? 0.9 : 1,
          opacity: [0.5, 1],
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      />
      <motion.div
        style={ringStyles}
        animate={{
          scale: isClicking ? 1.2 : (isPointer ? 1.5 : 1),
          opacity: [0.3, 0.6],
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      />
      {isPointer && (
        <motion.div
          style={{
            ...dotStyles,
            backgroundColor: 'transparent',
            scale: 1.8,
            opacity: 0.1,
          }}
          animate={{
            scale: [1.8, 2.2],
            opacity: [0.1, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      )}
    </>
  );
};

export default AnimatedCursor;
