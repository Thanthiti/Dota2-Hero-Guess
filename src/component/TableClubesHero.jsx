import style from "../css/TableClubesHero.module.css";
export default function TableClubesHero({ history, baseURL, answer }) {
  const ALL_ROLES = [
    "Carry",
    "Nuker",
    "Pusher",
    "Initiator",
    "Durable",
    "Disabler",
    "Escape",
    "Support",
  ];

  if (!history || history.length === 0) {
    return null;
  }

  return (
      <div className={style.historyBox}>
      <table className={style.heroTable} border="1">
        <thead>
          <tr>
            <th rowSpan="2">Icon</th>
            <th rowSpan="2">Primary Attack</th>
            <th rowSpan="2">Primary Type</th>
            <th rowSpan="2">Legs</th>
            <th colSpan={ALL_ROLES.length}>Roles</th>
          </tr>
          <tr>
            {ALL_ROLES.map((role) => (
              <th key={role}>{role}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => {
            const isAttackCorrect =
            item.hero.attack_type === answer.attack_type;
            const isTypeCorrect =
            item.hero.primary_attr === answer.primary_attr;
            const isLegsCorrect = item.hero.legs === answer.legs;
            
            return (
              <tr key={index}>
                <td>
                  <img
                    src={`${baseURL}${item.hero.icon}`}
                    alt={item.hero.name}
                    width={30}
                    height={30}
                  />
                </td>

                <td className={isTypeCorrect ? style.roleYes : style.roleNo}>
                  {item.hero.primary_attr}
                </td>

                <td className={isAttackCorrect ? style.roleYes : style.roleNo}>
                  {item.hero.attack_type}
                </td>

                <td className={isLegsCorrect ? style.roleYes : style.roleNo}>
                  {item.hero.legs}
                </td>

                {ALL_ROLES.map((role) => {
                  const isCorrect =
                    item.hero?.roles?.some(
                      (r) =>
                        r.toLowerCase() === role.toLowerCase() &&
                        answer?.roles?.some(
                          (a) => a.toLowerCase() === role.toLowerCase()
                        )
                    ) || false;
                  return (
                    <td
                      key={role}
                      className={isCorrect ? style.roleYes : style.roleNo}
                    >
                      {isCorrect ? "✔" : "-"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
