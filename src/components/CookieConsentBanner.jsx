import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './CookieConsentBanner.css'

const CookieConsentBanner = () => {
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie_consent');
    if (consent === 'accepted') {
      setIsConsentGiven(true);
      initializeGA4();
    } else if (!consent) {
      setIsBannerVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookie_consent', 'accepted', { expires: 365 });
    setIsConsentGiven(true);
    setIsBannerVisible(false);
    initializeGA4();
  };

  const handleDecline = () => {
    Cookies.set('cookie_consent', 'declined', { expires: 365 });
    setIsConsentGiven(false);
    setIsBannerVisible(false);
  };

  const initializeGA4 = () => {
    if (!window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=G-12VTRDF3BY`;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        window.gtag = gtag;

        window.gtag('js', new Date());
        window.gtag('config', 'G-12VTRDF3BY');
      };
    }
  };

  if (!isBannerVisible) {
    return null;
  }

  return (
    <div className="cookie-banner-overlay">
      <div className="cookie-banner">
        <p>
          Na našem hřišti používáme cookies, abychom vylepšili každou návštěvu! Souhlasíte s touto taktikou?
        </p>
        <div className="acc-dec-buttons">
          <button className='accept-button-consent' onClick={handleAccept}>Souhlasím</button>
          <button className='decline-button-consent' onClick={handleDecline}>Odmítám</button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
