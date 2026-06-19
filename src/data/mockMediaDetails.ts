import { Actor } from "@/types/Actor";
import { Genre } from "@/types/Genre";
import { MediaDetail } from "@/types/MediaDetail";

const genre1: Genre = {
  id: "231",
  name: "Хоррор",
  slug: "horror",
};

const actor1: Actor = {
  id: "4325",
  name: "Will",
};

export const movie1: MediaDetail = {
  id: "1",
  title: "Початок",
  categoryName: "Фільми",
  slug: "inception",
  posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
  releaseYear: 2010,
  rating: 9.5,
  status: "Avaliable",
  genres: ["Фантастика", "Трилер"],
  createdAt: new Date(2026, 2, 5),
  updatedAt: new Date(2026, 3, 16),
  actors: [actor1],
  relatedMedia: [],
  masterPlaylistURL: "",
  description: `Сюжет розгортається навколо складної операції, пов'язаної з багаторівневим проникненням у світ сновидінь. Герой збирає команду фахівців, кожен із яких відповідає за окремий аспект роботи з підсвідомістю. Їхнє завдання вимагає точного розрахунку, довіри та синхронних дій, де будь-яка помилка може призвести до незворотних наслідків. 
    У міру розвитку історії кордону між рівнями сну починають стиратися, а тиск часу та внутрішніх страхів посилюється. Фільм досліджує теми пам'яті, провини та суб'єктивності реальності, поступово ускладнюючи структуру оповідання та нарощуючи напругу.`,
};
