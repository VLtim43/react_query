import { http, HttpResponse } from "msw";
import { agencies } from "../data/agencies";

export const handlers = [
  http.get("/api/agencies/:agencySlug", ({ params }) => {
    const agency = agencies.find(
      (agency) => agency.slug === params.agencySlug,
    );

    if (!agency) {
      return HttpResponse.json({ message: "Agency not found" }, { status: 404 });
    }

    return HttpResponse.json(agency);
  }),
];
