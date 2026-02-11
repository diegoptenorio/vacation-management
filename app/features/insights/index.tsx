"use client";

import Card from "../../components/card";
import Title from "../../components/title";
import Loading from "../../components/loading";
import Fallback from "../../components/fallback";
import Detail from "../../components/detail";
import { useFetch } from "../../hooks/use-fetch";
import ENDPOINT from "../../constants/endpoint";

interface DataProps {
    status?: number;
    body?: {
        vacation_steps: {
            waiting: string;
            approving: string;
            progress: string;
        };
        vacation_deadline: {
            waiting: string;
            approving: string;
            progress: string;
        };
        vacation_duration: {
            waiting: string;
            approving: string;
            progress: string;
        };
    };
};

export default function Insights() {
    const { status, data } = useFetch<DataProps>({
        auto: true,
        url: ENDPOINT.INSIGHTS,
    });

    const { vacation_steps, vacation_deadline, vacation_duration } =
        data?.body ?? {};

    return (
        <section className="pt-[30px]">
            {status === "loading" && <Loading />}
            {status === "error" && <Fallback />}
            {status === "success" && (
                <>
                    <Title type="h3">Insights</Title>
                    <div className="mt-[16px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <Card>
                            <Title type="h3">Etapas</Title>
                            <Detail
                                quantity={vacation_steps?.waiting}
                                intention="default"
                                alternativeText="Não iniciado"
                            />
                            <Detail
                                quantity={vacation_steps?.approving}
                                intention="warning"
                                alternativeText="Em aprovação"
                            />
                            <Detail
                                quantity={vacation_steps?.progress}
                                intention="waiting"
                                alternativeText="Em andamento"
                            />
                        </Card>
                        <Card>
                            <Title type="h3">Férias por vencimento</Title>
                            <Detail
                                quantity={vacation_deadline?.waiting}
                                intention="default"
                                alternativeText="Em até 30 dias"
                            />
                            <Detail
                                quantity={vacation_deadline?.approving}
                                intention="warning"
                                alternativeText="Em até 60 dias"
                            />
                            <Detail
                                quantity={vacation_deadline?.progress}
                                intention="waiting"
                                alternativeText="Em até 90 dias"
                            />
                        </Card>
                        <Card>
                            <Title type="h3">Duração das férias</Title>
                            <Detail
                                quantity={vacation_duration?.waiting}
                                intention="default"
                                alternativeText="Até 15 dias"
                            />
                            <Detail
                                quantity={vacation_duration?.approving}
                                intention="warning"
                                alternativeText="Até 30 dias"
                            />
                            <Detail
                                quantity={vacation_duration?.progress}
                                intention="waiting"
                                alternativeText="Mais de 30 dias"
                            />
                        </Card>
                    </div>
                </>
            )}
        </section>
    );
}
