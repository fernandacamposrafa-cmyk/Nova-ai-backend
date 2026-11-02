
const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200);
    return res.end(JSON.stringify({
      name: "NOVA AI",
      version: "1.0",
      status: "online"
    }));
  }

  if (req.method === "POST" && req.url === "/ask") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;

      if (body.length > 10000) {
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const prompt = String(data.prompt || "").trim();

        if (!prompt) {
          res.writeHead(400);
          return res.end(JSON.stringify({
            error: "Pedido vazio"
          }));
        }

        res.writeHead(200);
        res.end(JSON.stringify({
          name: "NOVA AI",
          reply: "Pedido recebido: " + prompt,
          connected: false,
          message: "A integração com o modelo de IA ainda precisa ser configurada."
        }));
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({
          error: "JSON inválido"
        }));
      }
    });

    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({
    error: "Rota não encontrada"
  }));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("NOVA AI iniciada na porta " + PORT);
});
  
