import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";

import { Members } from "./members";
import { InviteMember } from "./inviteMember";

export default function SettingsPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight first:mt-0">
        Settings
      </h1>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex justify-between">
            Members
            <InviteMember />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Members />
        </CardContent>
      </Card>

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
