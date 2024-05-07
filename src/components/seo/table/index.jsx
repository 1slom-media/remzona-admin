import * as React from "react";
import "./styles.css";
import TableCommon from "../../common/table";
import { useSelector } from "react-redux";
import { Image } from "antd";
import { Popover, Tooltip, Space } from "antd";

export default function TableAdd({ HandleDelete, onClickPut }) {
  const seoGetState = useSelector((state) => state.seo);
  const rows = seoGetState.SeoGet?.data;
  const data = [];
  rows.map((elem, index) => {
    data.push({
      data: index + 1,
      заголовок: (
        <Tooltip
          overlayInnerStyle={{
            // width: "500px",
            height: "100%",
            borderRadius: "20px",
            padding: "15px",
          }}
          color="#1fab8a"
          title={
            <div className="tooltip_box">
              <span>
                <span>{elem.meta_title}</span>
              </span>
            </div>
          }
        >
          <span className="curson">{elem.meta_title}</span>
        </Tooltip>
      ),
      описание: (
        <Tooltip
          overlayInnerStyle={{
            // width: "500px",
            height: "100%",
            borderRadius: "20px",
            padding: "15px",
          }}
          color="#1fab8a"
          title={
            <div className="tooltip_box">
              <span>
                <span>{elem.meta_description}</span>
              </span>
            </div>
          }
        >
          <span className="curson">{elem.meta_description}</span>
        </Tooltip>
      ),
      ключ: (
        <Tooltip
          overlayInnerStyle={{
            // width: "500px",
            height: "100%",
            borderRadius: "20px",
            padding: "15px",
          }}
          color="#1fab8a"
          title={
            <div className="tooltip_box">
              <span>
                <span>{elem.meta_key}</span>
              </span>
            </div>
          }
        >
          <span className="curson">{elem.meta_key}</span>
        </Tooltip>
      ),

      Действие: (
        <div className="boxx">
          <div className="btn-wraps">
            <button onClick={onClickPut} id={elem.id}>
              <i class="bx bx-message-square-edit"></i>
            </button>
          </div>

          <Space wrap>
            <Popover
              trigger="click"
              placement="rightBottom"
              content={
                <div className="content_delete_box">
                  <p>Вы уверены, что хотите удалить эту ceo?</p>
                  <div className="btn_wrap_delete">
                    <button
                      onClick={HandleDelete}
                      id={elem.id}
                      className="yes_btn"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              }
              title={
                <div className="delete_box">
                  <i class="bx bxs-error-circle"></i>
                  <span>
                    Удалите ceo <span>{elem.title_ru}</span>
                  </span>
                </div>
              }
            >
              <div className="btn-wrap">
                <button id={elem.id}>
                  <i class="bx bxs-trash"></i>
                </button>
              </div>
            </Popover>
          </Space>
        </div>
      ),
    });
  });

  const columns = [
    {
      title: "№",
      dataIndex: "data",
      key: "data",
      width: 50,
      align: "center",
      fixed: "left",
    },

    {
      title: "заголовок",
      dataIndex: "заголовок",
      key: "заголовок",
      width: 100,
    },
    {
      title: "описание",
      dataIndex: "описание",
      key: "описание",
      width: 100,
    },
    {
      title: "ключ",
      dataIndex: "ключ",
      key: "ключ",
      width: 100,
    },
    {
      title: "Действие",
      dataIndex: "Действие",
      key: "Действие",
      fixed: "right",
      align: "center",
      width: 100,
    },
  ];

  return (
    <TableCommon
      bordered
      scroll={{
        y: 330,
        // x: 2000,
      }}
      columns={columns}
      data={data}
      pagination={false}
    />
  );
}
