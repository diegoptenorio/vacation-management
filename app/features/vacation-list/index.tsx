import Table from "../../components/table";
import Card from "../../components/card";
import Title from "../../components/title";

export default function VacationList() {
    const header = ["Status", "Nome", "Início", "Fim"];
    const dataMock = [
      ["Não iniciado", "Jamesson Bond", "23/02/2026", "15/03/2026"],
      ["Em aprovação", "Maicon da Silva Jackson", "21/02/2026", "19/03/2026"],
      ["Em andamento", "Natália Portman", "03/03/2026", "23/03/2026"],
      ["Concluído", "Marília Monroe", "25/03/2026", "20/04/2026"],
    ];

    return (
      <section>
        <Title type="h3" className="mt-[30px] mb-[16px]">
          Lista
        </Title>
        <Card>
          <Table header={header} body={dataMock} />
        </Card>
      </section>
    );
};