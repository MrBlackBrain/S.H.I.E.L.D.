import React, { useState } from "react";
import { api } from "~/utils/api";

function Add() {
  const postMessage = api.link.create.useMutation();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="flex flex-col items-center px-4 py-4">
      <form
        className="flex flex-col gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          postMessage.mutate({
            name,
            url,
            icon,
            description,
          });
        }}
      >
        <input
          type="text"
          className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
          placeholder="Sonarr"
          minLength={2}
          maxLength={100}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
          placeholder="Url"
          minLength={2}
          maxLength={100}
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <input
          type="text"
          className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
          placeholder="Icon"
          minLength={2}
          maxLength={100}
          value={icon}
          onChange={(event) => setIcon(event.target.value)}
        />
        <input
          type="text"
          className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
          placeholder="Description"
          minLength={2}
          maxLength={100}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button
          type="submit"
          className="rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Add;
