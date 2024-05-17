import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";

import { UserManagement } from "./(user-management)";

export default function SettingsPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight first:mt-0">
        Settings
      </h1>

      <UserManagement />

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Visibility</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch id="hidden-deals" />
            <Label htmlFor="hidden-deals">
              Include hidden deals in total count
            </Label>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
