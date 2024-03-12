import DropIndicator from "./drop-indicator";
import { motion } from "framer-motion";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";

const Bookmark = ({
  name,
  id,
  column,
  handleDragStart,
  icon,
  url,
  description,
}: {
  name: string;
  id: number;
  column: number;
  handleDragStart: (
    e: any,
    card: { name: string; id: number; column: number },
  ) => void;
  icon: string | undefined;
  url: string;
  description: string;
}) => {
  return (
    <div className="py-1">
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id.toString()}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { name, id, column })}
        className="cursor-grab active:cursor-grabbing"
      >
        <Card className="">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle>
                <Link href={url}>{name}</Link>
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <div className="flex">
              <img src={icon} className="h-16 w-16" />
            </div>
          </CardHeader>
        </Card>
      </motion.div>
    </div>
  );
};

export default Bookmark;
