import Link from "next/link";
import { UserPlusIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";

import { UserManagement } from "./(user-management)";

export default function SettingsPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight first:mt-0">
        Settings
      </h1>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex justify-between">
            User management
            <Link href="settings/invites">
              <Button size="sm" variant="outline">
                <UserPlusIcon className="mr-2 h-4 w-4" />
                Invites
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UserManagement />
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
