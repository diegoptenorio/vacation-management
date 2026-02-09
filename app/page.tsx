import Title from "./components/title";
import Insights from "./features/insights";
import MainActions from "./features/main-actions";
import VacationList from "./features/vacation-list";

export default function Home() {
  return (
    <>
      <Title type="h1">Férias</Title>
      <Title type="h2">Painel</Title>
      <MainActions />
      <VacationList />
      <Insights />
    </>
  );
}
