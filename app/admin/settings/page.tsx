import { SeedButton } from "./seed-button";

export default async function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage application configuration and data.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <h3 className="text-sm font-medium tracking-tight">Database Management</h3>
          </div>
          <div className="p-6 pt-0">
            <p className="text-muted-foreground mb-4 text-xs">
              Seed the database with the initial set of questions and topics from the data folder.
              This will update existing records and create new ones.
            </p>
            <SeedButton />
          </div>
        </div>
      </div>
    </div>
  );
}
