import React, { useState } from "react";
import Bookmark from "./bookmark";
import DropIndicator from "./drop-indicator";
import type { Link } from "@prisma/client";

function Column({
  cards,
  column,
  setCards,
}: {
  cards: Link[];
  column: number;
  setCards: React.Dispatch<React.SetStateAction<Link[]>>;
}) {
  const [active, setActive] = useState(false);

  console.log(cards);

  const handleDragStart = (
    e: { dataTransfer: { setData: (arg0: string, arg1: any) => void } },
    card: { id: any },
  ): void => {
    e.dataTransfer.setData("cardId", card.id.toString());
  };

  const handleDragEnd = (e: {
    dataTransfer: { getData: (arg0: string) => any };
  }) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(
      e as unknown as { clientY: number },
      indicators,
    );

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id.toString() === cardId);
      console.log(cardToTransfer);

      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      console.log(cardId, typeof cardId);

      copy = copy.filter((c) => c.id.toString() !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const index = copy.findIndex((c) => c.id.toString() === before);
        copy.splice(index, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[] | undefined) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      (i as HTMLElement).style.opacity = "0";
    });
  };

  const highlightIndicator = (e: any) => {
    const indicators = getIndicators();

    clearHighlights(indicators as HTMLElement[]); // Cast indicators to HTMLElement[]

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: { clientY: number }, indicators: any[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (
        closest: { offset: number },
        child: { getBoundingClientRect: () => any },
      ) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  if (!cards?.length) return <div>add</div>;

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-full">
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return (
            <Bookmark key={c.id} {...c} handleDragStart={handleDragStart} />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
      </div>
    </div>
  );
}

export default Column;
