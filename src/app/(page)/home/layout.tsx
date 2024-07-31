import ServerProtectComponent from "@/components/serverProtectComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return;
  <>
    <ServerProtectComponent>{children}</ServerProtectComponent>
  </>;
}
