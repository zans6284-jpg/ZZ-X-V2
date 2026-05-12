<?php
// WhatsApp Status Viewer & Downloader v2.0
// Full Power Quantum Build
error_reporting(0);
session_start();
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WhatsApp Status Viewer - Downloader</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <!-- HEADER -->
        <div class="header">
            <h1>WhatsApp Status Downloader</h1>
            <p class="subtitle">Masukkan nomor WhatsApp untuk melihat profil & story</p>
        </div>

        <!-- INPUT NOMOR -->
        <div class="input-section">
            <div class="input-group">
                <select id="countryCode" class="country-select">
                    <option value="62">🇮🇩 +62</option>
                    <option value="1">🇺🇸 +1</option>
                    <option value="44">🇬🇧 +44</option>
                    <option value="91">🇮🇳 +91</option>
                    <option value="81">🇯🇵 +81</option>
                    <option value="60">🇲🇾 +60</option>
                    <option value="65">🇸🇬 +65</option>
                    <option value="66">🇹🇭 +66</option>
                    <option value="63">🇵🇭 +63</option>
                    <option value="82">🇰🇷 +82</option>
                </select>
                <input type="number" id="waNumber" class="number-input" placeholder="81234567890" autocomplete="off">
                <button id="searchBtn" class="search-btn">
                    <span class="btn-text">CARI</span>
                </button>
            </div>
            <div id="errorMsg" class="error-msg"></div>
        </div>

        <!-- LOADING -->
        <div id="loading" class="loading hidden">
            <div class="spinner"></div>
            <p>Mengambil data...</p>
        </div>

        <!-- PROFIL SECTION -->
        <div id="profileSection" class="profile-section hidden">
            <div class="profile-card">
                <div class="profile-avatar">
                    <img id="profilePic" src="" alt="Profile" class="avatar-img">
                    <div class="online-status" id="onlineStatus"></div>
                </div>
                <div class="profile-info">
                    <h2 id="profileName">-</h2>
                    <p id="profileNumber">-</p>
                    <p id="profileStatus">-</p>
                    <p id="profileLastSeen">-</p>
                </div>
            </div>
        </div>

        <!-- STORY SECTION -->
        <div id="storySection" class="story-section hidden">
            <div class="story-header">
                <h3>Story WhatsApp</h3>
                <span id="storyCount" class="story-count">0 Story</span>
            </div>
            
            <div class="story-viewer">
                <div class="story-container" id="storyContainer">
                    <!-- Video/Image akan dimuat di sini -->
                </div>
                
                <!-- NAVIGASI STORY -->
                <div class="story-navigation">
                    <button id="prevStory" class="nav-btn">← Prev</button>
                    <span id="storyIndicator" class="story-indicator">1 / 1</span>
                    <button id="nextStory" class="nav-btn">Next →</button>
                </div>

                <!-- QUALITY SELECTOR -->
                <div class="quality-section">
                    <label for="qualitySelect">Quality:</label>
                    <select id="qualitySelect" class="quality-select">
                        <option value="420">420p</option>
                        <option value="480">480p</option>
                        <option value="720" selected>720p</option>
                        <option value="1080">1080p (1K)</option>
                    </select>
                    <button id="downloadBtn" class="download-btn">
                        ⬇ Download
                    </button>
                </div>

                <!-- PROGRESS BAR -->
                <div id="downloadProgress" class="download-progress hidden">
                    <div class="progress-bar">
                        <div id="progressFill" class="progress-fill"></div>
                    </div>
                    <span id="progressText">0%</span>
                </div>
            </div>
        </div>

        <!-- FOOTER -->
        <div class="footer">
            <p>QuantumVIP System v2.0</p>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>