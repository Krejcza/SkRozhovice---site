
import Transition from '../Transition'
import BeePic from '../components/images/beehive.png'
import { Helmet } from 'react-helmet-async';

// Error page, když se stránka nenajde nebo nenačte/špatně napíše. Nemá komponenty - celá stránka je napsaná zde.


const ErrorPage = () => {
  return (
    <>
    <Helmet>
    <title>SK Rozhovice - Neexistující stránka</title>
        <meta
          name="description"
          content="SK Rozhovice - stránka nenalezena."
        />
        <meta
          name="keywords"
          content="SK Rozhovice, fotbal, sportovní klub, aktuality, kontakty"
        />
    </Helmet>
    <div className='background-linear-deff mappp'>
      <div className='error-pager'>
        <div>
          <h1>404 - Stránka nenalezena</h1>
          <p className='sorry-error'>Omlouváme se, ale stránka, kterou hledáte, neexistuje.</p>
        </div>
        <div>
          <img src={BeePic} className='image-hive' alt="" />
          <p className='sorry-hive'>Zalezl jsi do špatného úlu!</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default  Transition(ErrorPage);
