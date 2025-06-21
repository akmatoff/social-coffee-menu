import type { ReactNode } from "react";
import HeaderSection from "./HeaderSection";

export default function App({ children }: { children: ReactNode }) {
  return (
    <main>
      <HeaderSection />
      {children}
    </main>
  );
}
