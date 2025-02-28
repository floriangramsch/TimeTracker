import { ReactNode } from "react";

type ConnectionProps = {
  children: ReactNode;
};

export default function Connection(props: ConnectionProps) {
  return (
    <div className="flex relative">
      <div className="bg-gray-300 h-6 w-1" />
      <div className="absolute left-2">{props.children}</div>
    </div>
  );
}
