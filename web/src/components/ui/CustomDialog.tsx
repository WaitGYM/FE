import { Drawer } from "@mui/material";
import { BottomButtonWrapper } from "./Button";
import { useEffect, useRef } from "react";

export default function CustomDialog({
  open,
  onClose,
  onConfirm,
  children,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}) {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open && confirmButtonRef.current) {
      confirmButtonRef.current.focus();
    }
  }, [open]);

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <div className="modal-contents">{children}</div>
      <BottomButtonWrapper>
        <button className="btn btn-blue" onClick={onClose}>
          취소
        </button>
        <button
          className="btn btn-orange"
          ref={confirmButtonRef}
          onClick={onConfirm}
        >
          확인
        </button>
      </BottomButtonWrapper>
    </Drawer>
  );
}
