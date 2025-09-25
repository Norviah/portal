"use client";

import { Button } from "@/components/ui/Button";
import { useState } from "react";

export function DownloadButton({ promise }: { promise: () => Promise<void> }) {
  const [failed, setFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Button
        loading={isLoading}
        disabled={isLoading}
        onClick={async () => {
          try {
            setIsLoading(true);
            await promise();
          } catch {
            setFailed(true);
            setIsLoading(false);
          }
        }}
      >
        Download Monday Data
      </Button>

      {failed && (
        <>
          <p className="text-red-600 mb-4">Unable to connect to Monday.com. Please check your MONDAY_ACCESS_TOKEN environment variable.</p>
          <p className="text-gray-600">This page requires a valid Monday.com access token to function properly.</p>
        </>
      )}
    </>
  );
}
