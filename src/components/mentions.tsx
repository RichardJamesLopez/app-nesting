import { forwardRef } from "react";
import {
  BeautifulMentionsTheme,
  BeautifulMentionsMenuItemProps,
  BeautifulMentionsMenuProps,
} from "lexical-beautiful-mentions";

import { cn } from "~/lib/utils";

const mentionsStyle =
  "px-1 mx-2/3 mx-px align-baseline inline-block rounded break-words";
const mentionsStyleFocused = "ring-2 ring-offset-1";

export const getBeautifulMentionsTheme = ({
  editable,
}: {
  editable: boolean;
}): BeautifulMentionsTheme => ({
  "@": cn(
    mentionsStyle,
    "bg-blue-100 text-blue-600",
    editable && "cursor-pointer",
  ),
  "@Focused": cn(mentionsStyleFocused, "ring-blue-600 ring-offset-background"),
});

export function MentionsMenu({
  loading,
  ...other
}: BeautifulMentionsMenuProps) {
  if (loading) {
    return (
      <div className="top-[2px] m-0 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-2.5 text-sm text-popover-foreground shadow-md">
        Loading...
      </div>
    );
  }
  return (
    <ul
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className="absolute top-[2px] m-0 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
      {...other}
    />
  );
}

export const MentionsMenuItem = forwardRef<
  HTMLLIElement,
  BeautifulMentionsMenuItemProps
>(({ selected, item, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      selected && "bg-accent text-accent-foreground",
    )}
    {...props}
  />
));
MentionsMenuItem.displayName = "MentionsMenuItem";
