import { Dropdown, } from 'antd';
import { useTranslation } from 'react-i18next';
import enFlag from "../assets/uk.png";
import espFlag from "../assets/spain.png";
import frFlag from "../assets/france.png";
import portFlag from "../assets/portugal.png";
import gerFlag from "../assets/germany.png";

const LangDdown = () => {
  const { i18n } = useTranslation();

  const languages = [
    { key: 'en', label: 'English',flag: enFlag },
    { key: 'de', label: 'German',flag: gerFlag },
    { key: 'fr', label: 'French' ,flag: frFlag},
    { key: 'pt', label: 'Portuguese',flag: portFlag },
    { key: 'es', label: 'Spanish',flag: espFlag },
  ];

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.key);
  };

  const menuItems = languages.map((lang) => ({
    key: lang.key,
    label: <img src={lang.flag} alt={lang.label} style={{ width: '20px' ,marginLeft:'8px'}} />,
  }));
//   const menuItems = languages.map((lang) => ({
//     key: lang.key,
//     label: lang.label,
//   }));

  return (
    <Dropdown
      menu={{
        items: menuItems,
        onClick: handleLanguageChange,
      }}
      placement="bottomRight"
    >
      {/* <span className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {languages.find((lang) => lang.key === i18n.language)?.label || 'Language'}
      </span> */}
      <img
        src={languages.find((lang) => lang.key === i18n.language)?.flag || enFlag} // Display current language flag
        alt="Language"
        style={{ width: '24px', cursor: 'pointer',marginLeft:'20px' }} // Adjust width as needed
      />
    </Dropdown>
  );
};

export default LangDdown;