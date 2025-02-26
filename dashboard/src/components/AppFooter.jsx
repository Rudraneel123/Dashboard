//         {/* Social Media Icons */}
//         <Menu theme="dark" mode="horizontal" style={{ background: "transparent", borderBottom: "none" }}>
//         <Menu.Item key="facebook">
//           <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
//             <FacebookOutlined style={{ fontSize: "20px", color: "white" }} />
//           </a>
//         </Menu.Item>
//         <Menu.Item key="linkedin">
//           <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
//             <LinkedinOutlined style={{ fontSize: "20px", color: "white" }} />
//           </a>
//         </Menu.Item>
//         <Menu.Item key="instagram">
//           <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
//             <InstagramOutlined style={{ fontSize: "20px", color: "white" }} />
//           </a>
//         </Menu.Item>
//         <Menu.Item key="whatsapp">
//           <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
//             <WhatsAppOutlined style={{ fontSize: "20px", color: "white" }} />
//           </a>
//         </Menu.Item>
//       </Menu>

// import { FacebookOutlined, LinkedinOutlined, InstagramOutlined, WhatsAppOutlined } from "@ant-design/icons";

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
