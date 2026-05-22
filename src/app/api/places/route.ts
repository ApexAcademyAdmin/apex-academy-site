import { NextRequest, NextResponse } from "next/server";

const API_KEY = "AIzaSyCxRAmuIo-NL32Iukmg7A1gCUEdho2LpSw";

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  if (!query || query.length < 2) {
    return NextResponse.json({ places: [] });
  }

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
    },
    body: JSON.stringify({
      textQuery: query,
      locationBias: {
        circle: {
          center: { latitude: 42.36, longitude: -71.06 },
          radius: 50000,
        },
      },
      maxResultCount: 5,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ places: [], error: res.statusText }, { status: res.status });
  }

  const data = await res.json();
  const places = (data.places || []).map((p: any) => ({
    id: p.id,
    name: p.displayName?.text || "",
    address: p.formattedAddress || "",
  }));

  return NextResponse.json({ places });
}
