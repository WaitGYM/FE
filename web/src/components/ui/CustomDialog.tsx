import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { motion } from "framer-motion";

// mui 모달 강제 스타일링
const CustomDialogStyle = styled(Dialog)(() => ({
  "& .MuiDialog-container": {
    alignItems: "end",
    "& .MuiDialog-paper": {
      margin: 0,
      position: "absolute",
      bottom: 0,
      width: "100%",
      background: "#334155",
      borderRadius: "0.75rem 0.75rem 0 0",
      "& .modal-contents": {
        "& .title": {
          fontSize: "1.125rem",
          fontWeight: "600",
          textAlign: "center",
          padding: "1.5rem",
          lineHeight: "1.4rem",
          color: "#fff",
          "& .text-orange": {
            color: "#ee6c4d",
          },
        },
      },
      "& .btn-wrap": {
        position: "relative",
      },
    },
  },
}));

function CustomDialog({ open, onClose, children }) {
  return (
    <CustomDialogStyle open={open} onClose={onClose}>
      {children}
    </CustomDialogStyle>
  );
}
export default motion(CustomDialog);
