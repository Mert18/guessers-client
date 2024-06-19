"use client";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import ComponentWithHeader from "./ComponentWithHeader";
import { useTranslation } from "react-i18next";

const lngs = {
  tr: { nativeName: "Türkçe" },
  en: { nativeName: "English" },
};

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState("tr");

  useEffect(() => {
    setCurrentLanguage(i18next.language);
  }, []);

  const { t } = useTranslation();

  return (
    <div className="absolute top-2 left-2 z-10">
      <ComponentWithHeader name={t("language")}>
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
      </ComponentWithHeader>
    </div>
  );
};

export default LanguageSelector;
