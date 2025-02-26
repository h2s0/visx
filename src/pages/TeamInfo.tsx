import createTeamInfo from "@/data/createTeamInfo";
import { useEffect, useState } from "react";
import { ReactCountryFlag } from 'react-country-flag';

const TeamInfo: React.FC = () => {
  const [ teams, setTeams ] = useState([]);

  useEffect(() => {
    const newTeams = createTeamInfo(20);
    setTeams(newTeams);
  }, []);

  return(
    <section className="flex gap-5 w-full flex-wrap">
      {teams.map((team, i) => (
        <div key={i} className="border p-3">
          <p>팀 이름: {team.name}</p>
          <p>점수: {team.score}</p>
          <p>나라: {team.country}</p>
          <p>색깔: {team.color}</p>
          <ReactCountryFlag
            svg
            countryCode={team.countryCode}
            style={{
              width: '2em',
              height: '2em',
            }}
          />
        </div>
      ))}
      
    </section>
  )
};

export default TeamInfo;