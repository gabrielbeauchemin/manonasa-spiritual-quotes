import React from "react";
import TopNav from "../TopNav";
import { useLanguage } from "../useLanguage";

const ContactPage = (props) => {
  let language = useLanguage();
  if (language === "fr") {
    return (
      <>
        <TopNav updateSearchQuery={props.updateSearchQuery} />
        <div className="pageTitle">Contacte</div>
        <br />
        <div className="pageParagraph">
          Pour reporter un bug ou pour toutes suggestions ou questions, vous
          pouvez contacter l'administrateur au courriel suivant:
        </div>
        <div className="pageParagraph">gabybeauchemin@gmail.com</div>
      </>
    );
  } else {
    return (
      <>
        <TopNav updateSearchQuery={props.updateSearchQuery} />
        <div className="pageTitle">Contact</div>
        <br />
        <div className="pageParagraph">
          To report a bug or for any suggestions or questions, you can contact
          the administrator at the following email:
        </div>
        <div className="pageParagraph">gabybeauchemin@gmail.com</div>
      </>
    );
  }
};

export default ContactPage;