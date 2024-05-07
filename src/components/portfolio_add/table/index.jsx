import * as React from "react";
import "./styles.css";
import TableCommon from "../../common/table";
import { useSelector } from "react-redux";
import {Image, Popover, Space } from "antd";

export default function TableAdd({ HandleDelete, onClickPut }) {
  const PortfolioGetState = useSelector((state) =>
    state.portfolio?.portfolioGet?.data
  );
  const data = [];
  PortfolioGetState?.map((elem, index) => {
    data.push({
      data: index + 1,
      Фото: (
        <Image
          width="100px"
          height="100%"
          style={{ aspectRatio: "16 / 9", borderRadius: "20px" }}
          src={elem.image}
        />
      ),
      key: elem.id,
      портфолиоузб: elem.title_uz,
      портфолиорусский: elem.title_ru,

      Действие: (
        <div className="boxx">
          <div className="btn-wraps">
            <button onClick={onClickPut} id={elem.id}>
              <i className="bx bx-message-square-edit"></i>
            </button>
          </div>

          <Space wrap>
            <Popover
              trigger="click"
              placement="rightBottom"
              content={
                <div className="content_delete_box">
                  <p>Вы уверены, что хотите удалить эту портфолио?</p>
                  <p>
                    Чтобы удалить портфолио, необходимо удалить <br /> связанные
                    с ней товары!
                  </p>
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
                    Удалите портфолио <span>{elem.title_ru}</span>
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
    },
    {
      title: "Фото",
      dataIndex: "Фото",
      key: "Фото",
      align: "center",
    },
    {
      title: "Имя портфолио узб",
      dataIndex: "портфолиоузб",
      key: "портфолиоузб",
    },
    {
      title: "Имя портфолио рус",
      dataIndex: "портфолиорусский",
      key: "портфолиорусский",
    },
    {
      title: "Действие",
      dataIndex: "Действие",
      key: "Действие",
      fixed: "right",
      align: "center",
    },
  ];

  return (
    <TableCommon
      bordered
      scroll={{ 
        y: 330,
      }}
      columns={columns}
      data={data}
      pagination={false}
    />
  );
}
