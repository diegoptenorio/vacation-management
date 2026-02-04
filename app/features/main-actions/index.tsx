"use client";

import { useState } from "react";
import Image from "next/image";
import Card from "../../components/card";
import Menu from "../../components/menu";
import UserIcon from "../../assets/img/user.png";
import CalendarIcon from "../../assets/img/calendar.png";
import AddVacation from "../add-vacation";

export default function MainActions() {
  const [isAddVacationModalOpen, setIsAddVacationModalOpen] = useState(false);
  return (
    <section className="mt-[30px]">
      <Card>
        <Menu
          actions={[
            {
              id: "create-vacation",
              label: "Solicitar férias para colaborador",
              leftIcon: (
                <Image src={UserIcon} alt="Usuário" width={40} height={41} />
              ),
              onClick: () => setIsAddVacationModalOpen(true),
            },
            {
              id: "timeline",
              label: "Cronograma das férias",
              leftIcon: (
                <Image
                  src={CalendarIcon}
                  alt="Calendário"
                  width={40}
                  height={41}
                />
              ),
              onClick: () => {},
            },
          ]}
        />
      </Card>
      {isAddVacationModalOpen && (
        <AddVacation close={() => setIsAddVacationModalOpen(false)} />
      )}
    </section>
  );
}
