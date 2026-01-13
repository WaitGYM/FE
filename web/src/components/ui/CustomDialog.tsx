import { Drawer } from "@mui/material";
import { BottomButtonWrapper } from "./Button";
import { useRef, useEffect } from "react";

export default function CustomDialog({
  open,
  onClose,
  onConfirm,
  children,
  showButtons = true,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
  showButtons?: boolean;
}) {
  const triggerElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      triggerElementRef.current = document.activeElement as HTMLElement;
    }
  }, [open]);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    (e.currentTarget as HTMLElement).blur();
    document.body.focus();

    setTimeout(() => {
      onClose();
      setTimeout(() => {
        if (triggerElementRef.current) {
          triggerElementRef.current.focus();
        }
      }, 50);
    }, 0);
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    (e.currentTarget as HTMLElement).blur();
    document.body.focus();

    setTimeout(() => {
      onConfirm?.();
      setTimeout(() => {
        if (triggerElementRef.current) {
          triggerElementRef.current.focus();
        }
      }, 50);
    }, 0);
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={() => {
        document.body.focus();
        setTimeout(onClose, 0);
      }}
      disableAutoFocus={true}
      disableEnforceFocus={true}
      disableRestoreFocus={true}
    >
      <div className="modal-contents">{children}</div>
      {showButtons && (
        <BottomButtonWrapper>
          <button className="btn btn-blue" onClick={handleClose}>
            취소
          </button>
          <button className="btn btn-orange" onClick={handleConfirm}>
            확인
          </button>
        </BottomButtonWrapper>
      )}
    </Drawer>
  );
}
