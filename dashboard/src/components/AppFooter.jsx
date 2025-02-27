import { useEffect, useState } from "react";
import { Layout } from "antd";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome
import "../styles/footer.css";

const { Footer } = Layout;

const AppFooter = () => {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    fetch("/footer.json")
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => setSocials(data.socials))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  return (
    <div>
      <Layout>
        <Footer className="footer-ortho">
          {/* Logo */}
          <div className="footeritems-ortho">
            {socials?.map((social, idx) => (
              <a
                key={idx}
                // href="#"
                style={{
                  color: "white",
                  fontsize: "20px",
                  textDecoration: "none",
                }}
              >
                <i className={`fab ${social.icon}`}></i>
              </a>
            ))}
          </div>
        </Footer>
      </Layout>
    </div>
  );
};

export default AppFooter;
