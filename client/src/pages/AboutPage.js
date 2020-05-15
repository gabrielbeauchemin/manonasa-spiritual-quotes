import React from "react";
import TopNav from "../TopNav";
import { useLanguage } from "../hooks/useLanguage";

const AboutPage = (props) => {
  let language = useLanguage(props.language);
  if (language === "fr") {
    return (
      <>
        <TopNav
          updateSearchQuery={props.updateSearchQuery}
          updateLanguage={props.updateLanguage}
          language={language}
          keywords={props.searchQuery}
        />
        <div className="pageTitle">A propos</div>
        <br />
        <div className="pageParagraph">Bienvenu à toi!</div>
        <br />
        <div className="pageParagraph">
          Ce portail est dédié aux chercheurs sérieux de vérité, de paix et
          d'amour complète , lesquels ne se trouvent qu'en découvrant qui nous
          sommes vraiment. Tu es vraiment chanceux de découvrir ici beaucoup de
          citations profondes de sages qui ont trouvé l'essence pure de toutes
          choses et ont mis fin aux illusions. Les citations sont sélectionnées
          pour être directes et sans détours. En les lisant de manière répétée
          et les mettant en pratique, n'importe qui peut aussi découvrir par
          expérience directe la Réalité décrite par les sages.
        </div>
        <br />
        <div className="pageParagraph">
          Toute souffrance peut être remplacée par une liberté, un amour et une
          paix total et immuable!
        </div>
        <br />
      </>
    );
  } else {
    return (
      <>
        <TopNav
          updateSearchQuery={props.updateSearchQuery}
          updateLanguage={props.updateLanguage}
          language={language}
          keywords={props.searchQuery}
        />
        <div className="pageTitle">About</div>
        <br />
        <div className="pageParagraph">Welcome to you!</div>
        <br />
        <div className="pageParagraph">
          This portal is dedicated to the serious seekers of complete freedom,
          love and peace, which can only be found by discovering who you really
          are. You are very lucky to discover here a lot of profound quotes by
          sages who found the pure essence of everything and removed all
          illusions. The quotes are selected to be direct and without detours.
          By reading them repeatedly and by putting them into practise, anyone
          can also discover by direct experience the Reality described by sages.
        </div>
        <br />
        <div className="pageParagraph">
          All suffering and sorrow can be replaced by total and unchanging
          freedom, love and peace!
        </div>
        <br />
      </>
    );
  }
};

export default AboutPage;
