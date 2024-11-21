import Transition from '../Transition'
import NewMainPageOld from '../components/ADULT-subpages/NewMainPageOld';
import { Helmet } from 'react-helmet-async';



// Stránka hlavního A-týmu - s komponentami a popiskem přes react-helmet, kde se data trenérů načítají odtud s arraye. Při úpravě je třeba přidat/odebrat jméno, obrázek nahrát a změnit pozici popřípadě.

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
      <NewMainPageOld />
    </div>
    </>
  )
}

export default Transition(Ateam)
