import React, { useEffect, useState } from "react";
import HeaderTopCommon from "../../components/common/HeaderTop";
import { WrapperContainer } from "../../style-App";
import { SeoGet } from "../../redux/seo/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SeoComponent from "../../components/seo";
import HorizontalSidebar from "../../components/horizontal-sidebar";
import VerticalSidebar from "../../components/vertical-sidebar";
function Seo() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SeoGet());
  }, []);
  return window.localStorage.getItem("checked") == "false" ? (
    <HorizontalSidebar>
      <WrapperContainer style={{ marginTop: "112px" }}>
        <HeaderTopCommon
          title={"Ceo"}
          onClick={showDrawer}
          textBtn={"Добавить ceo"}
        />
        <SeoComponent handleClose={onClose} open={open} />
      </WrapperContainer>
    </HorizontalSidebar>
  ) : (
    <VerticalSidebar>
      <WrapperContainer>
        <HeaderTopCommon
          title={"Ceo"}
          onClick={showDrawer}
          textBtn={"Добавить ceo"}
        />
        <SeoComponent handleClose={onClose} open={open} />
      </WrapperContainer>
    </VerticalSidebar>
  );
}
export default Seo;
