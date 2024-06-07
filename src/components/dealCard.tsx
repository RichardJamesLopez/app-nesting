import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import { DealType } from "~/server/api/routers/deal";

export function DealCard({
  name,
  value,
  status,
  lastEdited,
  visibility,
}: DealType) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{visibility === "Show" ? name : "---"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label>Estimated Value</Label>
            <Input
              defaultValue={`$${new Intl.NumberFormat("en-US").format(value)}`}
              disabled
            />
          </div>
          <div>
            <Label>Pipeline Status</Label>
            <Select disabled defaultValue={status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={status}>{status}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Last Edited</Label>
            <div className="px-2 py-3 text-sm text-muted-foreground">
              {format(new Date(lastEdited), "MM/dd/yyyy, hh:mm aa")}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
