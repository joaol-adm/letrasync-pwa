export default async function handler(req, res) {
  const { artist, title } = req.query;

  if (!artist || !title) {
    return res.status(400).json({ error: 'Parâmetros ausentes' });
  }

  try {
    const url = `https://lyrics.lewagon.ai/search?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Erro ao buscar na API LeWagon');
    }

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no proxy' });
  }
}