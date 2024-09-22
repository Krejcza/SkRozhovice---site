import { div } from 'framer-motion/client'
import Transition from '../Transition'
import BeePic from '../components/images/beehive.png'

const ErrorPage = () => {
  return (
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
  );
};

export default  Transition(ErrorPage);
