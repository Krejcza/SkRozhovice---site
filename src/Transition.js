import React from 'react';
import { motion } from 'framer-motion';


// Přechod mezi stránky - přechod slider-in načte přechod nahoru a slider-out načítá přechod hned za ním, vytvářející efekt přechodu stránky

const Transition = (OgComponent) => {
  return () => (
    <>
      <OgComponent />
      <motion.div
        className='slider-in'
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className='slider-out'
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
};

export default Transition;
