const COUNTRIES_URL =
  "https://api.restcountries.com/countries/v5?fields=names,codes,capitals,flag,region,subregion,population,tlds,currencies,languages,borders";
const COUNTRIES_API_KEY = "rc_live_faafc7326eca4f6db8b97011f9afbc42";

export default async function handler(_request, response) {
  try {
    const upstreamResponse = await fetch(COUNTRIES_URL, {
      headers: {
        Authorization: `Bearer ${COUNTRIES_API_KEY}`,
      },
    });

    const body = await upstreamResponse.text();

    response.setHeader(
      "Content-Type",
      upstreamResponse.headers.get("content-type") || "application/json",
    );
    response.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    response.status(upstreamResponse.status).send(body);
  } catch {
    response.status(502).json({ message: "Failed to fetch countries from upstream API" });
  }
}
