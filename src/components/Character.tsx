import React from "react";
type CharacterProps = {
  type: "fox" | "bear" | "rabbit" | "owl" | "turtle";
  className?: string;
};
export function Character({
  type,
  className = ""
}: CharacterProps) {
  const characters = {
    fox: "https://cdn-icons-png.flaticon.com/512/6462/6462895.png",
    bear: "https://cdn-icons-png.flaticon.com/512/1998/1998610.png",
    rabbit: "https://cdn-icons-png.flaticon.com/512/3468/3468377.png",
    owl: "https://cdn-icons-png.flaticon.com/512/3468/3468608.png",
    turtle: "https://cdn-icons-png.flaticon.com/512/3069/3069172.png"
  };
  const altTexts = {
    fox: "Friendly fox character",
    bear: "Cute bear character",
    rabbit: "Happy rabbit character",
    owl: "Wise owl character",
    turtle: "Smiling turtle character"
  };
  return <div className={`${className}`}>
      <img src={characters[type]} alt={altTexts[type]} className="object-contain w-full h-full drop-shadow-lg" />
    </div>;
}