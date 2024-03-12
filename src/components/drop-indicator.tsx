const DropIndicator = ({
  beforeId,
  column,
}: {
  beforeId: string | number | null;
  column: string | number;
}) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-1 w-full bg-violet-400 opacity-0"
    />
  );
};

export default DropIndicator;
