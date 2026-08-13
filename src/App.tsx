import { useEffect, useState } from "react";

import { AgencyHomePage } from "@/components/agency-home-page";

type Agency = {
  id: string;
  slug: string;
  name: string;
};

function App() {
  const agencySlug = window.location.pathname.split("/").filter(Boolean)[0];
  const [agency, setAgency] = useState<Agency | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    agencySlug ? "loading" : "idle",
  );

  useEffect(() => {
    if (!agencySlug) {
      return;
    }

    async function loadAgency() {
      try {
        const response = await fetch(`/api/agencies/${agencySlug}`);

        if (!response.ok) {
          throw new Error("Agency not found");
        }

        const agency = (await response.json()) as Agency;

        setAgency(agency);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }

    loadAgency();
  }, [agencySlug]);

  if (!agencySlug) {
    return <main>Enter an agency slug in the URL.</main>;
  }

  if (status === "loading") {
    return <main>Loading agency...</main>;
  }

  if (status === "error") {
    return <main>Agency not found.</main>;
  }

  return (
    <>{agency ? <AgencyHomePage agency={agency} /> : null}</>
  );
}

export default App;
