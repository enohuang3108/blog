const Note = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="my-4 border-blue-500 bg-blue-100 p-4 text-blue-700">
      {/* add icon */}
      <p className="font-bold">{title}</p>
      <section className="text-black">{children}</section>
    </div>
  );
};

export { Note };
