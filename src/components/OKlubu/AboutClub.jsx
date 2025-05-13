import './AboutClub.css'
import FullGallery from '../OKlubu/FullGallery'
import ButtonOrganization from './ButtonOrganization'
import images from './FImages';


// Hlavní komponenta stránky O klubu, kde se dají měnit data organizace a taky se odsud posílají obrázky z FImage.

const AboutClub = () => {

   const pozice = ['Stejskal Milan', 'Ježek Robert', 'Zykudová Soňa', 'Valenta Radek']
   const jmeno = ['Předseda', 'Místopředseda', 'Ekonomka', 'Sekretář klubu']

   const selectedImages = [
      images.image28,images.image1,images.image2,images.image3,images.image4,images.image5,images.image6,images.image7,images.image8,images.image9,images.image10,images.image11,images.image12,images.image13,images.image14,images.image15,images.image16,images.image17,images.image18,images.image19,images.image20,images.image21,
   ];

  return (
    <>
      <div className='main-banner-ep'>
        <h1>O KLUBU</h1>
      </div>
      <div className="background-linear-deff">
         <div className="history-cl">
            <div className='text-passage'>
               <p>Fotbalový klub SK Rozhovice byl založen roku 1920 a momentálně hraje 1.A třídu Pardubického kraje. Klubové barvy jsou modrá, žlutá a červená.</p>
            </div>
            <div className='text-passage'>
               <p>První zmínka o klubu pochází z roku 1920. Mužstvo dříve dosahovalo velmi dobrých výsledků, vyhrávalo se nad kluby, které byly založeny mnohem dříve, například AFK Chrudim (dnes MFK), Slovan Pardubice (dnes FK) atd.  Bohužel v roce 1929 musela být činnost klubu ukončena z důvodu nedostatku hráčů.</p>
            </div>
            <div className="tripple-pic">
               <img src={images.image22} alt="" />
               <img src={images.image23} alt=""/>
               <img src={images.image24} alt=""/>
            </div>
            <div className='text-passage'>
               <p>Počátek další etapy SK Rozhovice vznikl v roce 1934, kdy klub dostal název AFK. Tato etapa ovšem skončila dříve než začala, důvodem bylo zorání fotbalového hřiště (využíváno jako orná půda). Činnost byla obnovena v roce 1942 a jde o činnost stálou až dodnes. Mezi zakladatele a osoby, které se zasloužili o obnovu klubu patří: Novák F., Ráliš, Pleskot V., Pleskot F., Mergl J.</p>
            </div>
            <div className='text-passage'>
               <p>V období 1979-1980, šedesát let od založení, klub dosahoval nejlepších výsledků na amatérské úrovni. V roce 1977 se mužstvo účastnilo soutěže kategorie 1.B třídy. Tehdy se probojovalo do prvního kola Východočeského poháru, kde později vypadlo s družstvem VCHZ Pardubice s výsledkem 0:3. Zápasu přihlíželo 1300 diváků. V tomto případě oslavy místního fotbalu úzce souvisí s první etapou z roku 1920. Na této akci nechyběl samotný zakladatel Josef Novák, který poskytl rozhovor do místních novin:"Pamatuji, jak před osmačtyřiceti lety hrálo naši varieté v Karlových Varech fotbalové utkání. Jinak do 60 jsem lyžoval, do 65 bruslil a teď ještě chodím sáňkovat u nás v Heřmanové Městci v parku. Co se týče našeho areálu, chtěli bychom zde vybudovat tribunku pro 200 diváků.</p>
            </div>
            <div className="tripple-pic">
               <img src={images.image25} alt="" />
               <img src={images.image26} alt=""/>
               <img src={images.image27} alt=""/>
            </div>
            <div className='text-passage'>
               <p>Současné zázemí a hřiště klubu bylo vybudováno v roce 1952. Ovšem hřiště mělo jeden velký problém, bylo šikmé, hrálo se tedy opravdu "do kopce" a "z kopce". Sklon měl úhlopříčně přes dva metry. Každopádně na hřišti se hrálo až do roku 2000, následně bylo vybagrováno a srovnáno. Dnes mají Rozhovice dvě fotbalové hřiště, zázemí pro hráče včetně sprch, klubovnu a hostinec na hřišti.</p>
            </div>
            <div className='text-passage'>
               <p>V Rozhovicích vyrostli špičkoví hráči. Například Radim Holub, který hrál na Spartě (2016 zpět v SK Rozhovice), Bohuslav Pilný, hráč Liberce (v roce 2016 trenér ligového FK Hradec Králové).</p>
            </div>
         </div>
      </div>
      <div className="background-yellow wyc">
         <h2 className='main-topic-small bl'>FOTOGALERIE</h2>
         <FullGallery images={selectedImages.reverse()} />
      </div>
      <div className="background-linear-deff">
         <div className="stadion-wrap">
            <h2 className='main-topic-small bl'>Hřiště</h2>
            <div className='text-passage'>
               <p>
                  Při příjezdu do Rozhovic se nachází naše hřiště, které je srdcem sportovního dění v obci. Je to místo, kde se scházejí malí i velcí sportovci, rodiny, přátelé a všichni, kdo mají rádi pohyb a zábavu. Rozhovické hřiště má rozměry 105 m na délku a 55 m na šířku. Na hřišti se nachází přírodní trávník, který je vždy řádně upraven a posekán. Hřiště disponuje kapacitou 200 stojících a 50 sedících diváků. V areálu se nachází také Rozhovická hospoda, kde se podává točené pivo a klobásy.
                  </p>
            </div>
            <div className="tripple-pic">
               <img src={images.droneF1} alt="" />
               <img src={images.droneF2} alt=""/>
               <img src={images.droneF3} alt=""/>
            </div>
         </div>
      </div>
      <div className="background-black nb">
         <div className="organization-wrap">
            <h2 className='main-topic-small'>ORGANIZACE</h2>
         </div>
         <ButtonOrganization pozice={pozice} jmeno={jmeno} />
      </div>
      <div className="background-linear-deff mappp">
         <div className="mascot-wrap">
            <h2 className='main-topic-small bl'>TÝMOVÝ MASKOT</h2>
            <div className='text-passage'>
               <p>Kdo řekl, že maskoti jsou jen pro velké kluby? U nás v Rozhovicích máme vlastní tradici a tou je naše včelka! Po každém utkání vyhlašujeme nejlepšího hráče a právě ten má tu čest si naši včelku nasadit na hlavu a absolvovat povinně dobrovolný "vítězný" rozhovor. Není to jen o výkonu na hřišti, ale i o atmosféře a týmovém duchu. Včelka je symbol úsilí, spolupráce a odhodlání, které do každého zápasu dáváme. A když ji má někdo na hlavě, víme, že tenhle hráč dal do zápasu všechno. BZUM BZUM
               </p>
            </div>
            <div className="tripple-pic">
               <img src={images.mascot1} alt="" />
               <img src={images.mascot2} alt=""/>
            </div>
         </div>
      </div>
    </>
  )
}

export default AboutClub
