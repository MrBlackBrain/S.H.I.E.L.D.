import React, { useState } from "react";
import Column from "./column";
import type { Link } from "@prisma/client";

function Board({ links }: { links: Link[] }) {
  const [cards, setCards] = useState(links);

  const columns = [0, 1, 2];

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      {columns.map((c) => {
        return <Column key={c} column={c} cards={cards} setCards={setCards} />;
      })}
    </div>
  );
}

export default Board;
