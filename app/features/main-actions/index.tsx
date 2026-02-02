"use client";

import Image from "next/image";
import Card from "../../components/card";
import Menu from "../../components/menu";
import UserIcon from "../../assets/img/user.png";
import CalendarIcon from "../../assets/img/calendar.png";

export default function MainActions() {
  return (
    <Card>
      <Menu
        actions={[
          {
            id: "create-vacation",
            label: "Solicitar férias para colaborador",
            leftIcon: (
                <Image src={UserIcon} alt="Usuário" width={40} height={41} />
            ),
            onClick: () => {},
          },
          {
            id: "timeline",
            label: "Cronograma das férias",
            leftIcon: (
              <Image src={CalendarIcon} alt="Calendário" width={40} height={41} />
            ),
            onClick: () => {},
          },
        ]}
      />
    </Card>
  );
}
