import { TAGS_QUERYResult } from "../../../sanity.types";

export default function Filter({
  projectTags,
  selectedTag,
  onFilterChange,
  resetFilter,
}: {
  projectTags: TAGS_QUERYResult;
  selectedTag: string | null;
  onFilterChange: (slug: string) => void;
  resetFilter: () => void;
}) {
  return (
    <div className="flex w-full items-center justify-center pt-3 pb-20">
      <div className="flex w-1/2 flex-wrap items-center justify-center gap-2">
        {selectedTag && (
          <button
            onClick={resetFilter}
            className="font-dia-bold h-6 rounded-4xl bg-black px-2.5 py-[5px] text-xs text-white uppercase"
          >
            All
          </button>
        )}
        {projectTags.map((tag, index) => (
          <button
            key={index}
            onClick={() => onFilterChange(tag.slug?.current || "")}
            className={`font-dia-bold h-6 rounded-4xl px-2.5 py-[5px] text-xs uppercase transition-colors ${
              selectedTag === tag.slug?.current
                ? "bg-black text-white"
                : "bg-gray-100 text-black hover:bg-black hover:text-white"
            }`}
          >
            {tag.title}
            <span className="pl-1 opacity-70">{tag.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
