import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SeoDelete, SeoPut } from "../../redux/seo/index";
import Delete from "./delete";
import SeoForm from "./post";
import Put from "./put";
import TableAdd from "./table";
function SeoComponent({ open, handleClose }) {
  const Seodelete = useSelector((state) => state.seo);
  const dispatch = useDispatch();
  const [SeoId, setSeoId] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleDeleteModal = (e) => {
    setSeoId(e.target.id);
    setOpenDelete(true);
  };
  const [openPut, setOpenPut] = useState(false);
  const onClosePut = () => {
    setOpenPut(false);
  };
  const handlePutModal = (e) => {
    setSeoId(e.currentTarget.id);
    setOpenPut(true);
  };
  const HandleDelete = (e) => {
    dispatch(SeoDelete(e.currentTarget.id));
  };
  if (Seodelete.SeoDelete.Success == true) {
    window.location.reload();
  }
  const HandlePut = () => {
    dispatch(SeoPut(SeoId));
  };
  return (
    <>
      <SeoForm Open={open} HandleClose={handleClose} />
      <TableAdd
        onClickDelete={handleDeleteModal}
        HandleDelete={HandleDelete}
        onClickPut={handlePutModal}
      />
      <Delete openDelete={openDelete} handleCloseDelete={handleCloseDelete} />
      <Put
        put_id={SeoId}
        HandlePut={HandlePut}
        openPut={openPut}
        handleClosePut={onClosePut}
      />
    </>
  );
}

export default SeoComponent;
