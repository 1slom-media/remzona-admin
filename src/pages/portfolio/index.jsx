import React, { useEffect, useState } from "react";
import HeaderTopCommon from "../../components/common/HeaderTop";
import { WrapperContainer } from "../../style-App";
import { PortfolioGet } from "../../redux/portfolio/index";
import { useDispatch } from "react-redux";
import CategoryAddComponent from "../../components/portfolio_add";
import HorizontalSidebar from "../../components/horizontal-sidebar";
import VerticalSidebar from "../../components/vertical-sidebar";
function Category() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(PortfolioGet());
  }, []);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    window.localStorage.getItem("checked") == 'false' ? <HorizontalSidebar>
      <WrapperContainer style={{ marginTop: "112px" }}>
        <HeaderTopCommon
          title={"Портфолио"}
          onClick={handleOpen}
          textBtn={"Добавить Портфолио"}
        />
        <CategoryAddComponent handleClose={handleClose} open={open} />
      </WrapperContainer>

    </HorizontalSidebar> : <VerticalSidebar>
      <WrapperContainer>
        <HeaderTopCommon
          title={"Портфолио"}
          onClick={handleOpen}
          textBtn={"Добавить Портфолио"}
        />
        <CategoryAddComponent handleClose={handleClose} open={open} />
      </WrapperContainer>

    </VerticalSidebar>
  );
}
export default Category;
