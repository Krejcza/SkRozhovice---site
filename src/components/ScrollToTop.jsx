import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


// Komponenta na vyjetí nahoru na stránku při přechodu na jinou page. Toto NENÍ tlačítko na vyjetí na stránku, na které může uživatel kliknout. Je to čistě při přechodu na stránku, že přes transition to vyjede nahoru.

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    }, 500);

    return () => clearTimeout(timeout);

  }, [pathname]);

  return null;
};

export default ScrollToTop;
