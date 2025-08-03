async function buscarLetra() {
  const artist = document.getElementById('artist').value.trim();
  const title = document.getElementById('title').value.trim();
  const endpoint = 'https://letrasync-proxy.vercel.app/api';
  const url = `${endpoint}?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`;

  try {
    console.log("🔍 Requisitando:", url);
    const response = await fetch(url);
    if (!response.ok) throw new Error("Resposta inválida");

    const data = await response.json();
    if (!data.lyrics) throw new Error("Letra não encontrada");

    document.getElementById('lyrics').innerText = data.lyrics;
  } catch (error) {
    console.error("❌ Erro ao buscar letra:", error);
    document.getElementById('lyrics').innerText = "Erro ao buscar letra. Verifique o nome do artista/música.";
  }
}

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('✅ Service Worker registrado!'))
      .catch(err => console.error('❌ Erro no Service Worker:', err));
  });
}