import { Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import enFlag from "../assets/uk.png";
import espFlag from "../assets/spain.png";
import frFlag from "../assets/france.png";
import portFlag from "../assets/portugal.png";
import gerFlag from "../assets/germany.png";
import "../styles/dropdown.css";

const LangDdown = () => {
  const { i18n } = useTranslation();

  const languages = [
    { key: "en", label: "English", flag: enFlag },
    { key: "de", label: "German", flag: gerFlag },
    { key: "fr", label: "French", flag: frFlag },
    { key: "pt", label: "Portuguese", flag: portFlag },
    { key: "es", label: "Spanish", flag: espFlag },
  ];

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.key);
  };

  const menuItems = languages.map((lang) => ({
    key: lang.key,
    label: <img src={lang.flag} alt={lang.label} className="img-style" />,
  }));

  return (
    <Dropdown
      menu={{
        items: menuItems,
        onClick: handleLanguageChange,
      }}
      placement="bottomRight"
    >
      <img
        src={
          languages.find((lang) => lang.key === i18n.language)?.flag || enFlag
        }
        className="drpdwn-img"
      />
    </Dropdown>
  );
};

export default LangDdown;
