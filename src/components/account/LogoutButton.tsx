"use client";

import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={async () => {
        await signOut({
          fetchOptions: {
            onSuccess: () => window.location.assign("/"),
          },
        });
      }}
      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-ft-border bg-white px-4 py-2 text-sm font-semibold text-ft-ink transition-colors hover:bg-ft-surface-alt"
    >
      <LogOut aria-hidden="true" size={17} />
      Sign out
    </button>
  );
}
