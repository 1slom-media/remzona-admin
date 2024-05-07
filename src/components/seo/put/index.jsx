import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SeoPut, SeoGet } from "../../../redux/seo/index";
import CommonBtn from "../../common/CommonBtn";
import { Row, Col } from "react-grid-system";
import { Spin, Input, Image } from "antd";
import DraverCommon from "../../common/Drawer";
import "./styles.css";
import InputCommon from "../../common/input/index";
const { TextArea } = Input;

function Put({ openPut, handleClosePut, HandlePut, put_id }) {
  const ids = put_id;
  const dispatch = useDispatch();
  const [titleUz, setTitleUz] = useState();
  const [titleRu, setTitleRu] = useState();
  const [titleEn, setTitleEn] = useState();
  const SeoGets = useSelector((state) => state.seo.SeoGet.data);
  useEffect(() => {
    dispatch(SeoGet());
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      meta_title: titleUz,
      meta_description: titleRu,
      meta_key: titleEn,
    };
    await dispatch(SeoPut({ body, id: ids }));
    dispatch(SeoGet());
    handleClosePut();
    window.location.reload();
  };

  return (
    <>
      <DraverCommon
        title="Изменить сео"
        open={openPut}
        onClose={handleClosePut}
      >
        <>
          <Wrapper onSubmit={HandleSubmit}>
            <div className="input_wrap">
              <div className="scrool">
                {SeoGets.map((elem) =>
                  elem.id == ids ? (
                    <Row className="row">
                      <Col className="col" lg={8}>
                        <h4>Тема</h4>
                        <InputCommon
                          type="text"
                          defaultValue={elem.meta_title}
                          onChange={(e) => setTitleUz(e.currentTarget.value)}
                        />
                        <InputCommon
                          type="text"
                          defaultValue={elem.meta_description}
                          onChange={(e) => setTitleRu(e.currentTarget.value)}
                        />
                        <InputCommon
                          type="text"
                          defaultValue={elem.meta_key}
                          onChange={(e) => setTitleEn(e.currentTarget.value)}
                        />
                      </Col>
                    </Row>
                  ) : null
                )}
                <CommonBtn
                  type="submit"
                  style={{
                    margin: "20px 10px 0 auto",
                    padding: "15px 40px",
                    border: "2px solid #f3f3f3",
                    borderRadius: "50px",
                  }}
                >
                  Изменить
                </CommonBtn>
              </div>
            </div>
          </Wrapper>
        </>
      </DraverCommon>
    </>
  );
}
export default Put;
