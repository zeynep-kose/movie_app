import { useTranslation } from "react-i18next";
import { ALL_LANGS, DEFAULT_LANG } from "./constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect } from "react";

const useLocales = () => {
  const [lang, setLang] = useLocalStorage("lang", DEFAULT_LANG);
  const { i18n, t: translate } = useTranslation();

  const langStorage =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("lang") || "{}")
      : "";

  const currentLang =
    ALL_LANGS.find((_lang) => _lang.value === langStorage) || DEFAULT_LANG;

  const handleChangeLanguage = (newlang: string) => {
    i18n.changeLanguage(newlang);
    setLang(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translate: (text: any, options?: any): string =>
      translate(text, options).toString(),
    currentLang,
    allLangs: ALL_LANGS,
  };
};

export default useLocales;
