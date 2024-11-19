import onePlayer from '../images/onePlayer.png';
import DenisDvorak from '../images/players/DenisDvorak.png';

// Zde se nahrávají obrázky hráčů, které budou použity v modalním okně na kartě hráče

const playerImages = {
  onePlayer,
  DenisDvorak,
};

export const getPlayerImage = (imagePath) => {
  return playerImages[imagePath] || onePlayer;
};

export default playerImages;