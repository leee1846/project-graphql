import "./components.css";
import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_TEAMS = gql`
  query GetTeams {
    teams {
      id
      manager
      members {
        id
        first_name
        last_name
        role
      }
    }
  }
`;

function Teams() {
  const [contentId, setContentId] = useState(0);
  const [inputs, setInputs] = useState({
    manager: "",
    offices: "",
    extension_number: "",
    mascot: "",
    cleaning_duty: "",
    project: "",
  });

  function AsideItems() {
    const roleIcons = {
      developer: "💻",
      designer: "🎨",
      planner: "📝",
    };

    const { loading, error, data, refetch } = useQuery(GET_TEAMS);

    if (loading) return <p className='loading'>Loading...</p>;
    if (error) return <p className='error'>Error...</p>;
    return (
      <ul>
        {data.teams.map(({ id, manager, members }) => {
          return (
            <li key={id}>
              <span className='teamItemTitle' onClick={() => setContentId(id)}>
                Team {id} : {manager}'s
              </span>
              <ul className='teamMembers'>
                {members.map(({ id, first_name, last_name, role }) => {
                  return (
                    <li key={id}>
                      {roleIcons[role]} {first_name} {last_name}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }

  function MainContents() {
    return <div></div>;
  }

  return (
    <div id='teams' className='component'>
      <aside>{AsideItems()}</aside>
      <section className='contents'>{MainContents()}</section>
    </div>
  );
}

export default Teams;
