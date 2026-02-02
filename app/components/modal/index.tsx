
import Card from "../card";

import { ReactNode } from "react";

interface ModalProps {
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
}

export default function Modal({ header, body, footer }: ModalProps) {
  return (
    <>
      <div className="fixed inset-0 bg-[#2C2C2C]/80 flex items-center justify-center h-screen">
        <Card isWhite={true} isFullWidth={false}>
          <header>{header}</header>
          <section className="my-8">{body}</section>
          <footer>{footer}</footer>
        </Card>
      </div>
    </>
  );
};