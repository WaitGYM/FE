import type { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * 페이지 하단에 버튼을 고정시키는 레이아웃 래퍼 컴포넌트입니다.
 */
export function BottomButtonWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="btn-wrap"
      initial={{ opacity: 0, y: 20, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

// TODO: 추후 이 파일에 <button> 자체를 꾸미는 Button 컴포넌트를 추가할 수 있습니다.
// export function Button({ ... }) { ... }
