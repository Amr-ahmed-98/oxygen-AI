"use client";

import { AppShell, TablePage } from "@atomic-ai/blocks";
import { AtomButton, AtomTextField } from "@atomic-ai/ui";

export default function Dashboard() {
  return (
    <AppShell
      sidebar={
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Customers</li>
            <li>Orders</li>
            <li>Settings</li>
          </ul>
        </nav>
      }
      header={<div>ERP Header</div>}
    >
      <TablePage
        title="Dashboard"
        addButtonText="Add New"
        onAdd={() => console.log("Add clicked")}
      >
        <div>
          <h2>Welcome to ERP</h2>
          <AtomButton variant="solid" tone="primary">
            Click Me
          </AtomButton>
          <AtomTextField placeholder="Enter text..." />
        </div>
      </TablePage>
    </AppShell>
  );
}

