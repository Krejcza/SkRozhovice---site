import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimatedText = ({ text }) => {
  const textWrapperRef = useRef(null);

  useEffect(() => {
    const textWrapper = textWrapperRef.current;

    if (!textWrapper) {
      console.error('Text wrapper ref is null');
      return;
    }

    // Wrap letters and spaces in spans
    const letters = text.split('').map(char => 
      char === ' ' 
        ? `<span class='space'> </span>`  // Wrap space in span
        : `<span class='letter'>${char}</span>`
    ).join('');

    textWrapper.innerHTML = `<span class="letters">${letters}</span>`;

    const timeline = anime.timeline({loop: false});

    timeline
      .add({
        targets: '.ml11 .line',
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 400
      })
      .add({
        targets: '.ml11 .line',
        translateX: [0, textWrapper.getBoundingClientRect().width + 10],
        easing: "easeOutExpo",
        duration: 400,
        delay: 50
      })
      .add({
        targets: '.ml11 .letter',
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 400,
        offset: '-=775',
        delay: (el, i) => 20 * (i + 1)
      })
      .add({
        targets: '.ml11 .space',  // Add animation for spaces if needed
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 400,
        delay: (el, i) => 20 * (i + 1)
      });

    return () => {
      timeline.pause();
    };
  }, [text]);

  return (
    <h1 className="ml11" ref={textWrapperRef}>
      <span className="text-wrapper">
        <span className="line line1"></span>
      </span>
    </h1>
  );
};

export default AnimatedText;
