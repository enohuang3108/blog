import React from "react";

interface Slide {
  title: string;
  description: string;
  date: string;
  url: string;
  tags: string[];
}

interface SlideListProps {
  list: Slide[];
}

const ListSlides: React.FC<SlideListProps> = ({ list = [] }) => {
  const getDate = (date: string) => {
    return new Date(date).toISOString();
  };

  const getYear = (date: Date | string | number) => {
    return new Date(date).getFullYear();
  };

  const isSameYear = (a: Date | string | number, b: Date | string | number) => {
    return a && b && getYear(a) === getYear(b);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <ul className="sm:min-h-38 mb-20 min-h-28">
      {!list || list.length === 0 ? (
        <div className="my-12 opacity-50">nothing here yet.</div>
      ) : (
        list.map((slide, index) => (
          <li key={slide.title} className="mb-8">
            {!isSameYear(slide.date, list[index - 1]?.date) && (
              <div className="pointer-events-none relative h-20 select-none">
                <span className="text-stroke absolute top-1 text-9xl font-bold text-transparent opacity-10">
                  {getYear(slide.date)}
                </span>
              </div>
            )}
            <a
              className="flex flex-col gap-2 text-lg leading-tight opacity-70 transition-opacity hover:opacity-100"
              aria-label={slide.title}
              target="_blank"
              rel="noopener noreferrer"
              href={slide.url}
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <div className="flex items-center gap-2 text-wrap">
                  <span className="leading-normal">{slide.title}</span>
                  <svg
                    className="h-4 w-4 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap text-sm opacity-50">
                  <time dateTime={getDate(slide.date)}>
                    {formatDate(slide.date)}
                  </time>
                  {slide.tags && slide.tags.length > 0 && (
                    <span>
                      {" · "}
                      {slide.tags.join(", ")}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-sm opacity-50">{slide.description}</div>
            </a>
          </li>
        ))
      )}
    </ul>
  );
};

export { ListSlides };