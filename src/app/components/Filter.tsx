import { TAGS_QUERYResult } from "../../../sanity.types";

export default function Filter({
  projectTags,
  selectedTags,
  onFilterChange,
}: {
  projectTags: TAGS_QUERYResult;
  selectedTags: string[];
  onFilterChange: (slug: string) => void;
}) {
  return (
    <div className="flex w-full items-center justify-center pt-20 pb-20">
      <div className="flex w-1/2 cursor-pointer flex-wrap items-center justify-center gap-2">
        {projectTags.map((tag, index) => {
          const slug = tag.slug?.current || "";
          const isSelected = selectedTags.includes(slug); // 👈 check array membership

          return (
            <button
              key={index}
              onClick={() => onFilterChange(slug)} // 👈 toggles handled in parent
              className={`font-dia-bold h-6 cursor-pointer rounded-4xl px-2.5 py-[5px] text-xs uppercase transition-colors ${
                isSelected
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black hover:bg-black hover:text-white"
              }`}
            >
              {tag.title}
              <span className="pl-1 opacity-70">{tag.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
