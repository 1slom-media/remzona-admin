import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogPut, BlogGet, UploadImage } from "../../../redux/blog";
import CommonBtn from "../../common/CommonBtn";
import { Row, Col } from "react-grid-system";
import { Spin, Image } from "antd";
import InputCommon from "../../common/input";
import { LoadingOutlined } from "@ant-design/icons";
import "./styles.css";

function Put({ openPut, handleClosePut, HandlePut, put_id }) {
  const ids = put_id;
  const dispatch = useDispatch();
  const [titleUz, setTitleUz] = useState();
  const [titleRu, setTitleRu] = useState();
  const [descriptionUz, setDescriptionUz] = useState();
  const [descriptionRu, setDescriptionRu] = useState();
  const [monthUz, setMonthUz] = useState();
  const [monthRu, setMonthRu] = useState();
  const [date, setDate] = useState();
  const [link, setLink] = useState();
  const [textUz, setTextUz] = useState();
  const [textRu, setTextRu] = useState();

  const dataProject = useSelector((state) => state.blog?.uploadProjects);

  const BlogGets = useSelector((state) => state.blog.blogGet.data);
  const FilterData = BlogGets.filter((elem) => elem.id == ids);
  useEffect(() => {
    dispatch(BlogGet());
  }, []);
  const HandleChange = async (e) => {
    await dispatch(UploadImage(e));
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title_uz: titleUz,
      title_ru: titleRu,
      description_uz: descriptionUz,
      description_ru: descriptionRu,
      month_uz: monthUz,
      month_ru: monthRu,
      date: date,
      text_ru: textRu,
      text_uz: textUz,
      link: link,
      image: !dataProject.data
        ? FilterData.map((elem) => elem.image)[0]
        : dataProject.data,
    };
    await dispatch(BlogPut({ body, id: ids }));
    dispatch(BlogGet());
    handleClosePut();
  };
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  return (
    <>
      <ModalCommon width={700} open={openPut} handleClose={handleClosePut}>
        <Wrapper onSubmit={HandleSubmit}>
          <h3>Изменение блог</h3>
          <div className="input_wrap">
            <div className="scrool">
              <Row className="row">
                {BlogGets.map((elem) =>
                  elem.id == put_id ? (
                    <>
                      <Col className="col" lg={6}>
                        {dataProject.Loading == true ? (
                          <div className="spinss">
                            <Spin indicator={antIcon} />
                          </div>
                        ) : dataProject.Success == true ? (
                          <Image
                            width="100%"
                            style={{
                              aspectRatio: "16 / 9",
                              borderRadius: "20px",
                              zIndex: "99999999",
                            }}
                            src={dataProject.data}
                          />
                        ) : (
                          <Image
                            width="100%"
                            style={{
                              aspectRatio: "16 / 9",
                              borderRadius: "20px",
                              zIndex: "99999999",
                            }}
                            src={elem.image}
                          />
                        )}

                        <div className="infor_box">
                          <p style={{ color: "#fff" }}>
                            <span>Формат: </span>PNG, JPEG, JPG, SVG.
                            Рекомендуемое разрешение <span>1920×1080</span> или{" "}
                            <span>1280×720</span>
                          </p>
                          <p style={{ color: "#fff" }}>
                            {" "}
                            <span>Размер: </span>размер файла не должен
                            превышать 5 MB
                          </p>
                        </div>
                        <InputCommon
                          type="text"
                          defaultValue={elem.text_ru}
                          onChange={(e) => setTextRu(e.currentTarget.value)}
                        />
                        <InputCommon
                          type="text"
                          defaultValue={elem.text_uz}
                          onChange={(e) => setTextUz(e.currentTarget.value)}
                        />
                        <InputCommon
                          type="text"
                          defaultValue={elem.link}
                          onChange={(e) => setLink(e.currentTarget.value)}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        {dataProject.Loading === true ? (
                          <div className="spins">
                            <Spin indicator={antIcon} />
                          </div>
                        ) : (
                          <>
                            <input
                              type="file"
                              id="file"
                              onChange={HandleChange}
                            />
                            <label for="file" class="custom-file-upload">
                              <span className="span-download">
                                <ion-icon name="cloud-download-outline"></ion-icon>
                                <span>Загрузить фото</span>
                              </span>
                            </label>
                          </>
                        )}
                        <InputCommon
                          type="text"
                          defaultValue={elem.title_uz}
                          onChange={(e) => setTitleUz(e.currentTarget.value)}
                        />
                        <InputCommon
                          type="text"
                          defaultValue={elem.title_ru}
                          onChange={(e) => setTitleRu(e.currentTarget.value)}
                        />
                        <InputCommon
                          type="text"
                          defaultValue={elem.description_uz}
                          onChange={(e) =>
                            setDescriptionUz(e.currentTarget.value)
                          }
                        />
                        <InputCommon
                          type="text"
                          defaultValue={elem.description_ru}
                          onChange={(e) =>
                            setDescriptionRu(e.currentTarget.value)
                          }
                        />
                        <InputCommon
                          type="text"
                          defaultValue={elem.month_uz}
                          onChange={(e) => setMonthUz(e.currentTarget.value)}
                        />
                        <InputCommon
                          type="text"
                          defaultValue={elem.month_ru}
                          onChange={(e) => setMonthRu(e.currentTarget.value)}
                        />
                        <InputCommon
                          type="text"
                          defaultValue={elem.date}
                          onChange={(e) => setDate(e.currentTarget.value)}
                        />
                        <CommonBtn
                          type="submit"
                          style={{
                            margin: "20px auto 0 auto",
                            padding: "12px 40px",
                            border: "2px solid #fff",
                            background: "#03544c",
                          }}
                        >
                          Изменить
                        </CommonBtn>
                      </Col>
                    </>
                  ) : null
                )}
              </Row>
            </div>
          </div>
        </Wrapper>
      </ModalCommon>
    </>
  );
}
export default Put;
