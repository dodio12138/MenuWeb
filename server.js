import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 80);

app.use("/api/convert-cmyk", express.raw({
  limit: "30mb",
  type: ["image/png", "image/jpeg", "application/octet-stream"]
}));

app.post("/api/convert-cmyk", async (req, res) => {
  try {
    if (!req.body?.length) {
      res.status(400).send("没有收到图片数据。");
      return;
    }

    const output = await sharp(req.body)
      .flatten({ background: "#ffffff" })
      .toColourspace("cmyk")
      .jpeg({ quality: 95, chromaSubsampling: "4:4:4" })
      .toBuffer();

    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("X-Color-Space", "CMYK");
    res.send(output);
  } catch (error) {
    console.error(error);
    res.status(500).send("CMYK 转换失败。");
  }
});

app.use(express.static(__dirname, {
  etag: true,
  setHeaders(res, filePath) {
    if (filePath.endsWith("index.html")) {
      res.setHeader("Cache-Control", "no-store");
    }
  }
}));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`MenuWeb listening on ${port}`);
});

