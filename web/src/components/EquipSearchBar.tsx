import { Search, X } from "lucide-react";

export default function EquipSearchBar({
  searchInput,
  onSearchChange,
  onClearSearch,
}: {
  searchInput: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
}) {
  return (
    <div className="search-bar">
      <div className="input-wrap">
        <input
          type="search"
          placeholder="기구명, 부위를 검색해주세요"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="기구 검색"
        />
        {searchInput && (
          <button
            className="btn-clear"
            onClick={onClearSearch}
            aria-label="검색어 지우기"
            type="button"
          >
            <X size={18} strokeWidth={2} />
          </button>
        )}
      </div>
      <button className="btn-search" aria-label="검색" type="button">
        <Search size={24} strokeWidth="2" />
      </button>
    </div>
  );
}
