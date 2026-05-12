const express = require('express');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const upload = multer({ dest: 'uploads/' });

app.post('/api/tiktok', async (req, res) => {
  try {
    const { url } = req.body;

    const api = await axios.get(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const data = api.data.data;

    res.json({
      profile: data.author.avatar,
      username: data.author.unique_id,
      caption: data.title || "-",
      sound: data.music,
      soundTitle: data.music_info?.title || "Unknown",
      media: data.play,
      images: data.images || [],
      type: data.images ? "photo" : "video"
    });
  } catch (e) {
    res.status(500).json({ error: 'Gagal mengambil data TikTok.' });
  }
});

app.post('/api/enhance', upload.single('file'), async (req, res) => {
  try {
    const input = req.file.path;
    const output = `outputs/${Date.now()}_${req.file.originalname}`;

    if (!fs.existsSync('outputs')) {
      fs.mkdirSync('outputs');
    }

    ffmpeg(input)
      .videoCodec('libx264')
      .audioCodec('aac')
      .outputOptions([
        '-crf 14',
        '-preset slow',
        '-b:a 320k'
      ])
      .save(output)
      .on('end', () => {
        res.download(output);
      });
  } catch (e) {
    res.status(500).json({ error: 'Enhance gagal.' });
  }
});

app.listen(PORT, () => {
  console.log(`ZZ X V2 running at http://localhost:${PORT}`);
});
