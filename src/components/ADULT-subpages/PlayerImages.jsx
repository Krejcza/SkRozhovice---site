import onePlayer from '../images/onePlayer.png';
import DenisDvorak from '../images/players/DenisDvorak.png';

const playerImages = {
  onePlayer,
  DenisDvorak,
};

export const getPlayerImage = (imagePath) => {
  return playerImages[imagePath] || onePlayer;
};

export default playerImages;