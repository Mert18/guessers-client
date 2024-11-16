"use client";
import i18next from "i18next";
import  { useEffect, useState } from "react";

const lngs: any = { // TODO: fix any
  tr: { nativeName: "Türkçe" },
  en: { nativeName: "English" },
};

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("tr");

  useEffect(() => {
    setCurrentLanguage(i18next.language);
  }, []);

  return (
    <div className="absolute top-2 left-2 z-10">
      <select
        value={currentLanguage}
        onChange={(e) => {
          i18next.changeLanguage(e.target.value);
          setCurrentLanguage(e.target.value);
        }}
      >
        {Object.keys(lngs).map((lng) => (
          <option key={lng} value={lng}>
            {lngs[lng].nativeName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
