const UPSTREAM = "https://rockytraffic.serveousercontent.com";

export default async (request) => {
  const incoming = new URL(request.url);

  const target = new URL(
    incoming.pathname + incoming.search,
    UPSTREAM
  );

  const headers = new Headers(request.headers);

  headers.set("serveo-skip-browser-warning", "true");
  headers.delete("host");

  const options = {
    method: request.method,
    headers,
    redirect: "follow",
  };

  if (!["GET", "HEAD"].includes(request.method)) {
    options.body = request.body;
  }

  return await fetch(target, options);
};
