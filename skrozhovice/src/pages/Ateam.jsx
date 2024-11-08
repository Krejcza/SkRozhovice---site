import Transition from '../Transition'
import MainPageOld from '../components/ADULT-subpages/MainPageOld'
import { Helmet } from 'react-helmet-async';

const Ateam = () => {
  return (
    <>
    <Helmet>
    <title>SK Rozhovice - A-Tým</title>
        <meta
          name="description"
          content="A-Tým SK Rozhovice - informace o hráčích, trenérech, zápasech a výsledcích.."
        />
        <meta
          name="keywords"
          content="SK Rozhovice, fotbal, sportovní klub, aktuality, kontakty"
        />
    </Helmet>
    <div>
      <MainPageOld />
    </div>
    </>
  )
}

export default Transition(Ateam)
