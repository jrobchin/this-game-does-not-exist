import fs from "fs";
import path from "path";

import { Game } from "../types";

var gamesRepository: Game[];

(function initGamesRepository() {
  const gamesDb = path.join(process.cwd(), "db.json");
  const gamesBuf = fs.readFileSync(gamesDb);
  gamesRepository = JSON.parse(gamesBuf.toString());
})();

export function getGame(_id: string): Game {
  return gamesRepository.find((game) => game._id == _id)!;
}

export function getAllGames(): Game[] {
  return gamesRepository;
}
