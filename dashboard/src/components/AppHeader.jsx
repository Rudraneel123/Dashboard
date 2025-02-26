import { Layout } from "antd";
import "../styles/header.css";
import { useEffect, useState } from "react";

const { Header } = Layout;

const AppHeader = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/header.json")
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);
  return (
    <Layout>
      <Header className="header-ortho">
        {/* Logo */}
        <div className="title-ortho">Ortho Clinical</div>
        <div className="items-ortho">
          {categories?.map((category, idx) => (
            <span key={idx}>{category}</span>
          ))}
        </div>
      </Header>
    </Layout>
  );
};

export default AppHeader;
