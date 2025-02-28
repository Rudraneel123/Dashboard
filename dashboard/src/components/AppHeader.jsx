import { Layout } from "antd";
import "../styles/header.css";
import { useEffect, useState } from "react";
// import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import LangDdown from "./LangDdown";

const { Header } = Layout;

const AppHeader = () => {
  const [categories, setCategories] = useState([]);
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetch("/header.json")
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  useEffect(() => {
    const culture = searchParams.get("culture");
    if (culture) {
      i18n.changeLanguage(culture);
    }
  }, [searchParams, i18n]);

  return (
    <Layout style={{height:"100%"}}>
      <Header className="header-ortho">
          <LangDdown/>
        {/* Logo */}
        <div className="title-ortho">{t('title')}</div>
        <div className="items-ortho">
          {categories?.map((category, idx) => (
            <span key={idx}>{category[i18n.language]}</span>
          ))}
        </div>
      </Header>
    </Layout>
  );
};

export default AppHeader;
