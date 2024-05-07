import React, { useState, useEffect } from "react";
import CommonBtn from "../../common/CommonBtn";
import { useDispatch } from "react-redux";
import { SeoPost, SeoGet } from "../../../redux/seo/index";
import { Wrapper } from "./styled-index";
import { Row, Col } from "react-grid-system";
import { Input } from "antd";
import "./styles.css";
import DraverCommon from "../../common/Drawer";
import InputCommon from "../../common/input/index";

const { TextArea } = Input;
function SeoForm({ Open, HandleClose }) {
  const dispatch = useDispatch();
  const [titleUz, setTitleUz] = useState();
  const [titleRu, setTitleRu] = useState();
  const [titleEn, setTitleEn] = useState();
  useEffect(() => {
    dispatch(SeoGet());
  }, []);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      SeoPost({
        meta_title: titleUz,
        meta_description: titleRu,
        meta_key: titleEn,
      })
    );
    dispatch(SeoGet());
    HandleClose();
    window.location.reload();
  };

  return (
    <DraverCommon title="Добавить Ceo" open={Open} onClose={HandleClose}>
      <>
        <Wrapper onSubmit={HandleSubmit}>
          <div className="input_wrap">
            <div className="scrool">
              <Row className="row">
                <Col className="col" lg={8}>
                  <h4>Тема</h4>
                  <InputCommon
                    type="text"
                    placeholder="заголовок"
                    required
                    onChange={(e) => setTitleUz(e.currentTarget.value)}
                  />
                  <InputCommon
                    type="text"
                    placeholder="описание"
                    required
                    onChange={(e) => setTitleRu(e.currentTarget.value)}
                  />
                  <InputCommon
                    type="text"
                    placeholder="ключ"
                    required
                    onChange={(e) => setTitleEn(e.currentTarget.value)}
                  />
                </Col>
              </Row>
              <hr />
              <CommonBtn
                type="submit"
                style={{
                  margin: "20px 10px 0 auto",
                  padding: "15px 40px",
                  border: "2px solid #f3f3f3",
                  borderRadius: "50px",
                }}
              >
                Добавить
              </CommonBtn>
            </div>
          </div>
        </Wrapper>
      </>
    </DraverCommon>
  );
}

export default SeoForm;
