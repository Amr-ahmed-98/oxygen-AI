/**
 * ============================================
 * ERP Block: App Shell
 * ============================================
 */

import React from "react";

export interface AppShellProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
}

export function AppShell({ sidebar, header, children }: AppShellProps) {
  return (
    <div className="app-shell">
      {sidebar && <aside className="app-shell-sidebar">{sidebar}</aside>}
      <div className="app-shell-main">
        {header && <header className="app-shell-header">{header}</header>}
        <main className="app-shell-content">{children}</main>
      </div>
    </div>
  );
}

