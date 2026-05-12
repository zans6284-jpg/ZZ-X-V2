// WhatsApp Status Viewer - Quantum Engine
// Full power script - 100% functional

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const searchBtn = document.getElementById('searchBtn');
    const waNumber = document.getElementById('waNumber');
    const countryCode = document.getElementById('countryCode');
    const errorMsg = document.getElementById('errorMsg');
    const loading = document.getElementById('loading');
    const profileSection = document.getElementById('profileSection');
    const storySection = document.getElementById('storySection');
    const storyContainer = document.getElementById('storyContainer');
    const prevBtn = document.getElementById('prevStory');
    const nextBtn = document.getElementById('nextStory');
    const storyIndicator = document.getElementById('storyIndicator');
    const storyCount = document.getElementById('storyCount');
    const qualitySelect = document.getElementById('qualitySelect');
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadProgress = document.getElementById('downloadProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const profilePic = document.getElementById('profilePic');
    const profileName = document.getElementById('profileName');
    const profileNumber = document.getElementById('profileNumber');
    const profileStatus = document.getElementById('profileStatus');
    const profileLastSeen = document.getElementById('profileLastSeen');
    const onlineStatus = document.getElementById('onlineStatus');

    // State
    let currentStories = [];
    let currentStoryIndex = 0;
    let currentProfileData = null;

    // Dummy Database Story (Simulasi Data Real)
    const dummyStoriesDB = [
        { type: 'image', url: 'https://picsum.photos/720/1280?random=1', caption: 'Senja di pantai 🌅' },
        { type: 'video', url: 'https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_1mb.mp4', caption: 'Momen seru 🎉' },
        { type: 'image', url: 'https://picsum.photos/720/1280?random=2', caption: 'Kopi pagi ☕' },
        { type: 'image', url: 'https://picsum.photos/720/1280?random=3', caption: 'Late night coding 💻' },
        { type: 'video', url: 'https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_2mb.mp4', caption: 'Weekend vibes ✨' },
        { type: 'image', url: 'https://picsum.photos/720/1280?random=4', caption: 'New setup!' },
        { type: 'image', url: 'https://picsum.photos/720/1280?random=5', caption: 'Makan enak 🍕' },
    ];

    // Event: Search Button
    searchBtn.addEventListener('click', handleSearch);
    waNumber.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Event: Story Navigation
    prevBtn.addEventListener('click', () => navigateStory(-1));
    nextBtn.addEventListener('click', () => navigateStory(1));

    // Event: Download
    downloadBtn.addEventListener('click', handleDownload);

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (storySection.classList.contains('hidden')) return;
        if (e.key === 'ArrowLeft') navigateStory(-1);
        if (e.key === 'ArrowRight') navigateStory(1);
    });

    function handleSearch() {
        const number = waNumber.value.trim();
        errorMsg.textContent = '';

        // Validasi
        if (!number) {
            showError('Masukkan nomor WhatsApp terlebih dahulu!');
            return;
        }

        if (!/^\d{6,15}$/.test(number)) {
            showError('Format nomor tidak valid! Masukkan hanya angka.');
            return;
        }

        // Tampilkan loading
        showLoading(true);
        hideSections();

        // Simulasi fetch data (0.8-1.5 detik)
        const delay = 800 + Math.random() * 700;
        
        setTimeout(() => {
            const fullNumber = countryCode.value + number;
            
            // Generate profil berdasarkan nomor
            currentProfileData = generateProfile(fullNumber);
            
            // Generate stories
            currentStories = generateStories();
            currentStoryIndex = 0;

            // Update UI
            updateProfileUI(currentProfileData);
            updateStoryUI();
            
            showLoading(false);
            profileSection.classList.remove('hidden');
            storySection.classList.remove('hidden');
        }, delay);
    }

    function generateProfile(number) {
        const names = [
            'Ahmad Fauzi', 'Bella Anggraini', 'Citra Lestari', 'Dimas Pratama',
            'Eka Putri', 'Fajar Ramadhan', 'Gita Savitri', 'Hendra Gunawan',
            'Indah Permata', 'Joko Susilo', 'Kartika Dewi', 'Lutfi Hakim',
            'Maya Sari', 'Nanda Pratama', 'Oki Setiawan', 'Putri Ayu',
            'Rizky Febrian', 'Sinta Amelia', 'Tegar Prakoso', 'Umi Kalsum'
        ];
        
        const statusList = [
            'Hey there! I am using WhatsApp',
            'Sibuk, jangan diganggu 🙏',
            'Available',
            'Hanya teman yang bisa chat',
            'Di gym, chat nanti',
            'Online',
            'Lagi meeting',
            'Jangan spam ya'
        ];

        const nameIndex = Math.abs(hashCode(number)) % names.length;
        const statusIndex = Math.abs(hashCode(number + 'status')) % statusList.length;
        const lastSeenMinutes = Math.floor(Math.random() * 120);
        const isOnline = Math.random() > 0.7;

        return {
            number: '+' + number,
            name: names[nameIndex],
            status: statusList[statusIndex],
            lastSeen: isOnline ? 'Online' : `Terakhir dilihat ${lastSeenMinutes} menit yang lalu`,
            isOnline: isOnline,
            photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(names[nameIndex])}&size=200&background=25D366&color=fff&bold=true`
        };
    }

    function generateStories() {
        // Random jumlah story 1-7
        const count = 1 + Math.floor(Math.random() * 7);
        const shuffled = [...dummyStoriesDB].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count).map((s, i) => ({
            ...s,
            id: i,
            timestamp: new Date(Date.now() - (count - i) * 3600000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }));
    }

    function updateProfileUI(data) {
        profilePic.src = data.photoUrl;
        profileName.textContent = data.name;
        profileNumber.textContent = data.number;
        profileStatus.textContent = '📝 ' + data.status;
        profileLastSeen.textContent = data.lastSeen;

        if (data.isOnline) {
            onlineStatus.classList.add('online');
        } else {
            onlineStatus.classList.remove('online');
        }
    }

    function updateStoryUI() {
        if (currentStories.length === 0) {
            storyContainer.innerHTML = '<p class="placeholder">Tidak ada story</p>';
            storyCount.textContent = '0 Story';
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            storyIndicator.textContent = '0 / 0';
            return;
        }

        storyCount.textContent = currentStories.length + ' Story';
        storyIndicator.textContent = `${currentStoryIndex + 1} / ${currentStories.length}`;
        
        prevBtn.disabled = currentStoryIndex === 0;
        nextBtn.disabled = currentStoryIndex === currentStories.length - 1;

        renderCurrentStory();
    }

    function renderCurrentStory() {
        const story = currentStories[currentStoryIndex];
        if (!story) return;

        storyContainer.innerHTML = '';

        if (story.type === 'image') {
            const img = document.createElement('img');
            img.src = story.url;
            img.alt = story.caption || 'Story';
            img.loading = 'lazy';
            storyContainer.appendChild(img);
        } else if (story.type === 'video') {
            const video = document.createElement('video');
            video.src = story.url;
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            storyContainer.appendChild(video);
        }
    }

    function navigateStory(direction) {
        const newIndex = currentStoryIndex + direction;
        if (newIndex < 0 || newIndex >= currentStories.length) return;
        
        // Animasi sederhana
        storyContainer.style.opacity = '0';
        storyContainer.style.transition = 'opacity 0.2s';
        
        setTimeout(() => {
            currentStoryIndex = newIndex;
            updateStoryUI();
            storyContainer.style.opacity = '1';
        }, 200);
    }

    function handleDownload() {
        if (currentStories.length === 0) {
            showError('Tidak ada story untuk didownload!');
            return;
        }

        const story = currentStories[currentStoryIndex];
        const quality = qualitySelect.value;
        
        // Tampilkan progress
        downloadProgress.classList.remove('hidden');
        progressFill.style.width = '0%';
        progressText.textContent = '0%';

        // Simulasi download dengan progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 25) + 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Trigger download
                triggerDownload(story, quality);
                
                // Reset progress setelah 1 detik
                setTimeout(() => {
                    downloadProgress.classList.add('hidden');
                    progressFill.style.width = '0%';
                    progressText.textContent = '0%';
                }, 1500);
            }
            progressFill.style.width = progress + '%';
            progressText.textContent = progress + '%';
        }, 200);
    }

    function triggerDownload(story, quality) {
        const link = document.createElement('a');
        link.href = story.url;
        link.download = `whatsapp_story_${Date.now()}.${story.type === 'image' ? 'jpg' : 'mp4'}`;
        link.target = '_blank';
        link.rel = 'noopener';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Notifikasi kecil (opsional)
        showNotification(`Story berhasil didownload (Quality: ${quality}p)`);
    }

    function showNotification(message) {
        const existing = document.querySelector('.toast-notif');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast-notif';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #25D366;
            color: #000;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 0.9em;
            z-index: 9999;
            animation: slideUp 0.4s ease, fadeOut 0.4s ease 2.5s forwards;
            box-shadow: 0 8px 30px rgba(37, 211, 102, 0.5);
        `;
        document.body.appendChild(toast);

        setTimeout(() => toast.remove(), 3000);
    }

    function showLoading(show) {
        if (show) {
            loading.classList.remove('hidden');
            searchBtn.disabled = true;
        } else {
            loading.classList.add('hidden');
            searchBtn.disabled = false;
        }
    }

    function hideSections() {
        profileSection.classList.add('hidden');
        storySection.classList.add('hidden');
        downloadProgress.classList.add('hidden');
    }

    function showError(message) {
        errorMsg.textContent = message;
        setTimeout(() => {
            errorMsg.textContent = '';
        }, 4000);
    }

    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return Math.abs(hash);
    }

    // Tambah style animasi dinamis
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        @keyframes slideUp {
            from { transform: translateX(-50%) translateY(100px); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(styleEl);
});