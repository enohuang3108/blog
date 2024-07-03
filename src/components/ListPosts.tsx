import React from "react";

interface Post {
  slug: string;
  data: Record<string, any>;
}

interface PostListProps {
  list: Post[];
}

const ListPosts: React.FC<PostListProps> = ({ list = [] }) => {
  const getDate = (date: string) => {
    return new Date(date).toISOString();
  };

  const getHref = (post: Post) => {
    if (post.data.redirect) return post.data.redirect;
    return `/blog/${post.slug}`;
  };

  const getTarget = (post: Post) => {
    if (post.data.redirect) return "_blank";
    return "_self";
  };

  const getYear = (date: Date | string | number) => {
    return new Date(date).getFullYear();
  };

  const isSameYear = (a: Date | string | number, b: Date | string | number) => {
    return a && b && getYear(a) === getYear(b);
  };

  return (
    <ul className="sm:min-h-38 mb-20 min-h-28">
      {!list || list.length === 0 ? (
        <div className="my-12 opacity-50">nothing here yet.</div>
      ) : (
        list.map((post, index) => (
          <li key={post.data.title} className="mb-8">
            {!isSameYear(post.data.date, list[index - 1]?.data.date) && (
              <div className="pointer-events-none relative h-20 select-none">
                <span className="text-stroke absolute top-1 text-9xl font-bold text-transparent opacity-10">
                  {getYear(post.data.date)}
                </span>
              </div>
            )}
            <a
              className="flex flex-col gap-2 text-lg leading-tight opacity-70 transition-opacity hover:opacity-100"
              aria-label={post.data.title}
              target={getTarget(post)}
              href={getHref(post)}
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <div className="flex items-center gap-2 text-wrap">
                  <span className="leading-normal">{post.data.title}</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap text-sm opacity-50">
                  {post.data.date && (
                    <time dateTime={getDate(post.data.date)}>
                      {post.data.date.split(",")[0]}
                    </time>
                  )}
                  {post.data.tag && (
                    <span>
                      {" · "}
                      {post.data.tag}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-sm opacity-50">{post.data.description}</div>
            </a>
          </li>
        ))
      )}
    </ul>
  );
};

export { ListPosts };
