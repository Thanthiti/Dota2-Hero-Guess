import fs from "fs";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function saveHeroes() {
  const response = await fetch("https://api.opendota.com/api/heroStats");
  const unCleanedFieldHeroes = await response.json();


  const cleanFieldsHeroes = unCleanedFieldHeroes.map((hero) => {
    const cleanName = hero.name.replace("npc_dota_hero_", "");

    return{

      id: hero.id,
      name: cleanName.replace(/_/g, " "),   
      primary_attr: hero.primary_attr,
      attack_type: hero.attack_type,
      roles: hero.roles,
      legs: hero.legs,
      image: hero.img,
      icon: hero.icon,
    }
  });

  const filePath = join(__dirname, "public", "heroes.json");
  fs.writeFileSync(filePath, JSON.stringify(cleanFieldsHeroes, null, 2));
  console.log("heroes.json saved!");
}

saveHeroes();
