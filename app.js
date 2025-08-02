
async function fetchLyrics() {
  const artist = document.getElementById("artist").value.trim();
  const title = document.getElementById("title").value.trim();
  const lyricsContainer = document.getElementById("lyrics");
  lyricsContainer.innerHTML = "⏳ Buscando...";

  try {
    const url = `https://lyrics.lewagon.ai/search?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`;
    console.log("🔍 Requisitando:", url);

    const res = await fetch(url);
    const data = await res.json();
    console.log("📦 Resultado da API:", data);

    if (!data || !data.lyrics) throw new Error("Letra não encontrada");

    const lines = data.lyrics.split("\n");
    lyricsContainer.innerHTML = "";
    lines.forEach((line) => {
      const div = document.createElement("div");
      div.textContent = line;
      div.className = "line";
      lyricsContainer.appendChild(div);
    });
  } catch (error) {
    console.error("❌ Erro ao buscar letra:", error);
    lyricsContainer.innerHTML = "❌ Erro ao buscar letra. Verifique nome artista/música.";
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(() => {
    console.log("✅ Service Worker registrado!");
  });
}
