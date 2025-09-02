import style from "../css/HeroList.module.css";
export default function HeroList({filterHeroes,setGuess,baseURL}) {
      if (filterHeroes.length === 0) {
        return (
          <ul className={style.ul}>
            <li className={style.disabled}>Hero not found</li>
          </ul>
        );
      }
    return (
      <ul className={style.ul}>
        {filterHeroes.map((hero) => (
          <li
            key={hero.name}
            className={style.li}
            onClick={() => {
              setGuess(hero.name);
            }}
          >
            <img
              className={style.icon}
              src={`${baseURL}${hero.icon}`}
              alt={hero.name}
              
            />
            {hero.name}
          </li>
        ))}
      </ul>
    );
}