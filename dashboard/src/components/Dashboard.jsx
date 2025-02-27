import { Table, Card, Row, Col } from "antd";
import { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
// import 'antd/dist/antd.min.css';
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [dataentry, setDataentry] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]); // Store selected row cards
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  const handleShowCards = (record) => {
    console.log("Row clicked:", record); // Debugging log

    if (record.cards && Array.isArray(record.cards)) {
      //Array.isArray check the cards is an array or not

      setSelectedCards(record.cards.slice(0, 3));
      console.log("Setting selected cards:", record.cards); // Debugging log
    } else {
      console.log("No cards found for this row");

      selectedCards([]);
    }
  };

  useEffect(() => {
    // Fetch the config.json file from the public folder
    fetch("/config.json")
      .then((response) => response.json()) // Convert response to JSON
      .then((fetchedData) => {
        // console.log("Fetched Config Data:", fetchedData);

        if (fetchedData.columns && fetchedData.data) {
          setColumns(fetchedData.columns); // Use predefined columns
          setDataentry(fetchedData.data); // Use predefined data
        }
        if (fetchedData.data.length > 0 && fetchedData.data[0].cards) {
          setSelectedCards(fetchedData.data[0].cards.slice(0, 3)); // Show first 3 cards
        } else {
          console.error("Invalid config.json format");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const culture = searchParams.get("culture");
    if (culture) {
      i18n.changeLanguage(culture);
    }
  }, [searchParams, i18n]);

  const borderColors = ["purple", "brown", "orange"];

  return (
    <div style={{ /*padding: "20px",*/ overflowX: "hidden",width:"100vw"}}>
      {/* {console.log("Rendering Cards:", selectedCards)} */}
      <AppHeader />
      {selectedCards.length > 0 && (
        <div style={{ marginBottom: "18px" }}>
          <Row
            gutter={[16, 16]}
            justify="center"
            style={{ backgroundColor: "white" }}
          >
            {selectedCards.map((card, idx) => (
              <Col
                key={idx}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                style={{ backgroundColor: "white" }}
              >
                <Card
                  title={card.title}
                  style={{
                    border: "1px solidrgb(58, 13, 13)",
                    borderRadius: "8px",
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                    borderBottomWidth: "10px",
                    marginTop:"12px",
                    borderBottomColor: borderColors[idx % borderColors.length],
                    //idx is the current index in the map loop,
                    //idx % borderColors.length  calculates which color to pick from the array.
                    //for 0 0%3=0(purple),1%3=1(brown),2%3=2(orange)..3%3=0(purple) it repeats
                  }}
                >
                  <div>
                    {card.details?.map((detail, idx) => (
                      <p key={idx}>
                        {/* <strong>{detail.label}:</strong>
                        {detail.value} */}
                        <strong>
                          {/* {detail.label[i18n.language]} */}
                          {detail.label}
                          {detail.value ? ":" : ""}
                        </strong>
                        {detail.value ? `${detail.value}` : ""}
                      </p>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
         <div style={{ overflowX: "auto", width: "100%",whiteSpace: "nowrap", }}>

        <Table
          columns={columns}
          dataSource={dataentry}
          pagination={{ position: ["bottomCenter"], defaultPageSize: 2 }}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => handleShowCards(record),
            style: { cursor: "pointer" },
          })}
          scroll={{ x: "max-content" }}
          // scroll={{x:"true"}}
        />
        </div>
      <AppFooter />
    </div>
  );
};
export default Dashboard;
