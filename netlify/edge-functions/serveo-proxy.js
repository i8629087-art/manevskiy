const UPSTREAM = "https://rockytraffic.serveousercontent.com";

export default async (request) => {
  const incoming = new URL(request.url);

  // Сохраняем путь и параметры запроса
  const target = new URL(
    incoming.pathname + incoming.search,
    UPSTREAM
  );

  // Передаём заголовки посетителя Serveo
  const headers = new Headers(request.headers);

  headers.set("serveo-skip-browser-warning", "true");
  headers.delete("host");

  const options = {
    method: request.method,
    headers,
    redirect: "follow",
  };

  // Передаём тело POST/PUT/PATCH запросов
  if (!["GET", "HEAD"].includes(request.method)) {
    options.body = request.body;
  }

  // Получаем ответ от твоего компьютера через Serveo
  return await fetch(target, options);
};

export const config = {
  path: "/*",
};
