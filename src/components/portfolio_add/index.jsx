import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PortfolioDelete,} from "../../redux/portfolio/index";
import Delete from "./delete";
import CategoryAddForm from "./post";
import Put from "./put";
import TableAdd from "./table";
function CategoryAddComponent({ open, handleClose }) {
  const portfoliodelete = useSelector((state) => state.portfolio);
  const dispatch = useDispatch();
  const [portfolioId, setPortfolioId] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleDeleteModal = (e) => {
    setPortfolioId(e.target.id);
    setOpenDelete(true);
  };
  const [openPut, setOpenPut] = useState(false);
  const handleClosePut = () => setOpenPut(false);
  const handlePutModal = (e) => {
    setPortfolioId(e.currentTarget.id);
    setOpenPut(true);
  };
  const HandleDelete = (e) => {
    dispatch(PortfolioDelete(e.currentTarget.id));
  };
  if (portfoliodelete.portfolioDelete?.Success === true) {
    window.location.reload();
  }
  return (
    <>
      <CategoryAddForm Open={open} HandleClose={handleClose} />
      <TableAdd onClickDelete={handleDeleteModal} HandleDelete={HandleDelete} onClickPut={handlePutModal} />
      <Delete
        HandleDelete={HandleDelete}
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
      />
      <Put
        put_id={portfolioId}
        openPut={openPut}
        handleClosePut={handleClosePut}
      />
    </>
  );
}

export default CategoryAddComponent;
