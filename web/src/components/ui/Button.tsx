import type { ReactNode } from "react";

/**
 * 페이지 하단에 버튼을 고정시키는 레이아웃 래퍼 컴포넌트입니다.
 */
export function BottomButtonWrapper({ children }: { children: ReactNode }) {
  return <div className="btn-wrap">{children}</div>;
}

// TODO: 추후 이 파일에 <button> 자체를 꾸미는 Button 컴포넌트를 추가할 수 있습니다.
// export function Button({ ... }) { ... }
