import { Outlet } from "react-router";

export function MainContent() {
  return (
    <main className="flex h-full flex-col items-center">
      <Outlet />
    </main>
  );
}
