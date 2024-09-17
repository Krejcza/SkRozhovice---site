import BEElogo from '../images/fot.webp'
import './AboutClub.css'
import FullGallery from '../OKlubu/FullGallery'
import ButtonOrganization from './ButtonOrganization'

const AboutClub = () => {

   const images = [BEElogo, BEElogo, BEElogo, BEElogo, BEElogo, BEElogo, BEElogo, BEElogo, BEElogo, BEElogo, BEElogo, BEElogo, BEElogo, BEElogo];

   const pozice = ['Jan Novák', 'Jakub Krejčí', 'Denis Dvořák', 'Jana Hovnová']
   const jmeno = ['Prezident', 'Manažer', 'Ekonom', 'Sekretářka']

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
               <img src={BEElogo} alt="" />
               <img src={BEElogo} alt=""/>
               <img src={BEElogo} alt=""/>
            </div>
            <div className='text-passage'>
               <p>Počátek další etapy SK Rozhovice vznikl v roce 1934, kdy klub dostal název AFK. Tato etapa ovšem skončila dříve než začala, důvodem bylo zorání fotbalového hřiště (využíváno jako orná půda). Činnost byla obnovena v roce 1942 a jde o činnost stálou až dodnes. Mezi zakladatele a osoby, které se zasloužili o obnovu klubu patří: Novák F., Ráliš, Pleskot V., Pleskot F., Mergl J.</p>
            </div>
            <div className='text-passage'>
               <p>V období 1979-1980, šedesát let od založení, klub dosahoval nejlepších výsledků na amatérské úrovni. V roce 1977 se mužstvo účastnilo soutěže kategorie 1.B třídy. Tehdy se probojovalo do prvního kola Východočeského poháru, kde později vypadlo s družstvem VCHZ Pardubice s výsledkem 0:3. Zápasu přihlíželo 1300 diváků. V tomto případě oslavy místního fotbalu úzce souvisí s první etapou z roku 1920. Na této akci nechyběl samotný zakladatel Josef Novák, který poskytl rozhovor do místních novin:"Pamatuji, jak před osmačtyřiceti lety hrálo naši varieté v Karlových Varech fotbalové utkání. Jinak do 60 jsem lyžoval, do 65 bruslil a teď ještě chodím sáňkovat u nás v Heřmanové Městci v parku. Co se týče našeho areálu, chtěli bychom zde vybudovat tribunku pro 200 diváků.</p>
            </div>
            <div className="tripple-pic">
               <img src={BEElogo} alt="" />
               <img src={BEElogo} alt=""/>
               <img src={BEElogo} alt=""/>
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
         <FullGallery images={images} />
      </div>
      <div className="background-linear-deff">
         <div className="stadion-wrap">
            <h2 className='main-topic-small bl'>STADION</h2>
            <div className='text-passage'>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod blanditiis debitis magnam necessitatibus soluta optio quibusdam, voluptates quos omnis temporibus, hic ab possimus? Magni sapiente a illo delectus minus ea?
               Possimus, tempora! Molestiae non repellendus quibusdam in rem alias ullam voluptate magnam, autem, modi odit officia nisi nostrum, nam molestias voluptatum rerum ducimus. Eius dignissimos dolorum, similique incidunt ad tenetur.
               Eligendi iure itaque architecto, quia recusandae ad hic nobis possimus facere minima inventore quidem accusamus praesentium distinctio labore! Sapiente, voluptatem maxime! Quaerat aliquid, quos magni sunt minus labore molestiae eum!
               Tempore laudantium exercitationem libero soluta optio quas corrupti rerum corporis eligendi velit tenetur, beatae quam rem unde sunt culpa non quis error necessitatibus dolorum! Eveniet, cupiditate? Minima aperiam minus labore!
               Fugit porro voluptas accusamus eaque optio debitis itaque, similique quo, distinctio magni modi molestias incidunt quis. Harum voluptatum nam enim sequi, assumenda corporis voluptate quo ipsum ut et, provident autem!
               </p>
            </div>
            <div className="tripple-pic">
               <img src={BEElogo} alt="" />
               <img src={BEElogo} alt=""/>
               <img src={BEElogo} alt=""/>
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
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, consequatur ab, commodi tempora aut tempore laboriosam magni at nemo molestiae sint atque modi sequi quibusdam dolorum quas labore, explicabo illum.
               Repellat odit numquam, error commodi quidem quibusdam, iste aperiam vel ad nemo laboriosam et amet culpa molestiae! Perspiciatis, delectus facere impedit fugiat aut repellendus, eos iste, dolorem quisquam cumque dicta.
               Consectetur minima quidem cum facere voluptate maiores explicabo est libero impedit magnam, possimus laborum tenetur natus sint expedita, pariatur quae, aperiam labore ab velit blanditiis amet commodi? Nihil, optio voluptas!
               </p>
            </div>
            <div className="tripple-pic">
               <img src={BEElogo} alt="" />
               <img src={BEElogo} alt=""/>
               <img src={BEElogo} alt=""/>
            </div>
         </div>
      </div>
    </>
  )
}

export default AboutClub
