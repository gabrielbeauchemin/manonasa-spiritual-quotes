import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useMediaQuery } from "react-responsive";

let LanguageSelector = ({ language, updateLanguage }) => {
  const [languages] = useState([
    { value: "en", label: "En" },
    { value: "fr", label: "Fr" },
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState(
    language === "fr"
      ? { value: "fr", label: "Fr" }
      : { value: "en", label: "En" }
  );
  const isBigScreen = useMediaQuery({ query: "(min-device-width: 1824px)" });
  let LanguageSelectorClass = isBigScreen
    ? "languagesSelectorBigScreen"
    : "languagesSelector";

  useEffect(() => {
    updateLanguage(selectedLanguage.value);
  }, [updateLanguage, selectedLanguage.value]);

  return (
    <div className={LanguageSelectorClass}>
      <Select
        options={languages}
        value={[selectedLanguage]}
        onChange={(newValue, actionMeta) => setSelectedLanguage(newValue)}
        theme={(theme) => ({
          ...theme,
          borderRadius: 2,
          colors: {
            ...theme.colors,
            primary25: "#EAEAEA",
            primary: "lightgray",
          },
        })}
      />
    </div>
  );
};

export default LanguageSelector;
