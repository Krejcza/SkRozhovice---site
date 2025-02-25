import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './CookieConsentBanner.css'



// Komponenta cookie consent banner, kterou uživatel odklikává, když přijde na stránku. Pokud ano tak se uloží cookie na GA4, která vydží rok. Pokud zamítne, data se nesbírají.

const CookieConsentBanner = () => {
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  // useEffect, který kontroluje, že pokud uživatel potvrdit cookies, tak se spustí GA4 a zároveň se schová banner, aby už mu nevyskakoval.

  useEffect(() => {
    const consent = Cookies.get('cookie_consent');
    if (consent === 'accepted') {
      setIsConsentGiven(true);
      initializeGA4();
    } else if (!consent) {
      setIsBannerVisible(true);
    }
  }, []);

  // funkce na přijetí cookie

  const handleAccept = () => {
    Cookies.set('cookie_consent', 'accepted', { expires: 365 });
    setIsConsentGiven(true);
    setIsBannerVisible(false);
    initializeGA4();
  };

 // funkce na odmítnutí cookie

  const handleDecline = () => {
    Cookies.set('cookie_consent', 'declined', { expires: 365 });
    setIsConsentGiven(false);
    setIsBannerVisible(false);
  };


  // funkce, která aktivuje GA4 - G-12VTRDF3BY

  const initializeGA4 = () => {
    if (!window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=G-V7VEFNEKHK`;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        window.gtag = gtag;

        window.gtag('js', new Date());
        window.gtag('config', 'G-V7VEFNEKHK');
      };
    }
  };

  // pokud není banner viditelný, tak komponenta se vůbec nezobrazí

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
