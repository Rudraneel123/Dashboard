import { Table, Card, Row, Col } from "antd";
import { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import "../styles/card.css";

const DashboardTrans = () => {
  const [dataentry, setDataentry] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetch("/config2.json")
      .then((response) => response.json())
      .then((fetchedData) => {
        if (fetchedData && Array.isArray(fetchedData)) {
          const tableColumns = [
            { title: t("columns.item"), dataIndex: "item", key: "item" },
            {
              title: t("columns.material_number"),
              dataIndex: ["orderinfo", "material_number"],
              key: "material_number",
            },
            {
              title: t("columns.description"),
              dataIndex: ["orderinfo", "description"],
              key: "description",
            },
            {
              title: t("columns.est_del_date"),
              dataIndex: ["shippinginfo", "est_del_date"],
              key: "est_del_date",
            },
            {
              title: t("columns.order_quantity"),
              dataIndex: ["ordertotal", "order_quantity"],
              key: "order_quantity",
            },
            { title: t("columns.UOM"), dataIndex: ["ordertotal", "UOM"], key: "UOM" },
            {
              title: t("columns.back_quantity"),
              dataIndex: ["shippinginfo", "back_quantity"],
              key: "back_quantity",
            },
            {
              title: t("columns.cancel_quantity"),
              dataIndex: ["shippinginfo", "cancel_quantity"],
              key: "cancel_quantity",
            },
            {
              title: t("columns.ship_quantity"),
              dataIndex: ["shippinginfo", "ship_quantity"],
              key: "ship_quantity",
            },
            {
              title: t("columns.status"),
              dataIndex: ["shippinginfo", "status"],
              key: "status",
            },
          ];

          setColumns(tableColumns);
          setDataentry(fetchedData);
          if (fetchedData.length > 0) {
            handleShowCards(fetchedData[0]);
          }
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [t]);

  useEffect(() => {
    const culture = searchParams.get("culture");
    if (culture) {
      i18n.changeLanguage(culture);
    }
  }, [searchParams, i18n]);

  const handleShowCards = (record) => {
    const cards = [
      {
        title: t("order_info"),
        details: [
          { label: t("order_number"), value: record.orderinfo.order_number },
          { label: t("purchase_order"), value: record.orderinfo.purchase_order },
          { label: t("order_status"), value: record.orderinfo.order_status },
          { label: t("order_type"), value: record.orderinfo.order_type },
        ],
      },
      {
        title: t("shipping_info"),
        details: [
          { label: t("company"), value: record.shippinginfo.company },
          { label: t("location"), value: record.shippinginfo.location },
          { label: t("country"), value: record.shippinginfo.country },
          { label: t("via"), value: record.shippinginfo.via },
        ],
      },
      {
        title: t("order_total"),
        details: [
          { label: t("order_value"), value: record.ordertotal.order_value },
          { label: t("taxes"), value: record.ordertotal.taxes },
          { label: t("shipping_and_handling"), value: record.ordertotal.shipping_and_handling },
          { label: t("order_total_amount"), value: record.ordertotal.order_total },
        ],
      },
    ];
    setSelectedCards(cards);
  };

  const borderColors = ["purple", "brown", "orange"];

  return (
    <div style={{ overflowX: "clip", width: "100vw" }}>
      <AppHeader />
      {selectedCards.length > 0 && (
        <div style={{ marginBottom: "18px" }}>
          <Row
            gutter={[16, 16]}
            justify="space-between"
            style={{ backgroundColor: "white",padding: "0 16px"  }}
          >
            {selectedCards.map((card, idx) => (
              <Col
                key={idx}
                xs={24}
                sm={12}
                md={8}
                lg={8}
                style={{ backgroundColor: "white",padding: "0 8px" }}
              >
                <Card
                  title={card.title}
                  style={{
                    borderBottomColor: borderColors[idx % borderColors.length],
                  }}
                  className="card-container"
                >
                  <div>
                    {card.details.map((obj, index) => (
                      <p key={index}>
                        <strong>{obj.label}: </strong> {obj.value}
                      </p>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
      <div style={{ overflowX: "auto", width: "100%", whiteSpace: "nowrap" }}>
        <Table
          columns={columns}
          dataSource={dataentry}
          pagination={{ position: ["bottomCenter"], defaultPageSize: 2 }}
          rowKey="item"
          onRow={(record) => ({
            onClick: () => handleShowCards(record),
            style: { cursor: "pointer" },
          })}
          scroll={{ x: "max-content" }}
        />
      </div>
      <AppFooter />
    </div>
  );
};

export default DashboardTrans;
