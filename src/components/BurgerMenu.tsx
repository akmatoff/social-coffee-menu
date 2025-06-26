import { useState } from "react";
import type { Category } from "../types";

interface Props {
  menuOptions: Category[];
}
export default function BurgerMenu({ menuOptions }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 z-40 fixed right-4 top-28 focus:outline-none bg-white text-secondary rounded-full shadow-lg"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M20.75 7a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75m0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75m0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75"
              clip-rule="evenodd"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 lg:w-[40%] bg-secondary z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <h1 className="px-6 pt-6 text-primary font-extralight">Меню</h1>
        <nav className="flex flex-col p-6 space-y-4">
          {menuOptions.map((option) => (
            <a
              key={option.id}
              href={`/${option.slug}`}
              className="inline-flex items-center text-white text-2xl font-semibold hover:text-primary duration-300"
            >
              {option.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
