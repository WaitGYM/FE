import { useCallback } from "react";

const BASE = 0xac00;
const LAST = 0xd7a3;
const JONGSUNG = 28;

/**
 * 한글 음절의 받침 유무 판별
 */
function hasBatchim(ch: string): boolean {
  const code = ch.codePointAt(0);
  if (!code) return false;
  if (code < BASE || code > LAST) return false;
  const idx = code - BASE;
  const jongIdx = idx % JONGSUNG;
  return jongIdx !== 0;
}

/**
 * 커스텀 훅: 단어에 을/를 자동으로 붙여줌
 */
export function useEulReul() {
  const pickEulReul = useCallback((word: string): string => {
    if (!word) return "";

    // 뒤에서부터 한글 음절을 찾아 조사 결정
    for (let i = word.length - 1; i >= 0; i--) {
      const ch = word[i];
      const code = ch.codePointAt(0);
      if (code && code >= BASE && code <= LAST) {
        const particle = hasBatchim(ch) ? "을" : "를";
        return word + particle;
      }
    }

    // 한글이 없으면 기본적으로 '를'
    return word + "를";
  }, []);

  return { pickEulReul };
}
