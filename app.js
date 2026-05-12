async function analyzeTikTok(){
    const url = document.getElementById('tturl').value;

    if(!url){
        alert('Masukkan URL TikTok');
        return;
    }

    // Placeholder UI response
    document.getElementById('statusBox').classList.remove('hidden');

    document.getElementById('profilePic').src =
        'https://dummyimage.com/200x200/000/fff.png&text=TT';

    document.getElementById('username').innerText = '@TikTokUser';
    document.getElementById('mediaType').innerText = 'Video';
    document.getElementById('caption').innerText =
        'TikTok caption preview';
    document.getElementById('sound').innerText =
        'Original Sound';

    const preview = document.getElementById('previewVideo');
    preview.classList.remove('hidden');
}

function enhanceMedia(){
    const fileInput = document.getElementById('mediaInput');
    const file = fileInput.files[0];

    if(!file){
        alert('Pilih file terlebih dahulu');
        return;
    }

    const previewArea = document.getElementById('previewArea');
    previewArea.classList.remove('hidden');

    const imagePreview = document.getElementById('imagePreview');
    const videoPreview = document.getElementById('videoPreview');

    const fileURL = URL.createObjectURL(file);

    if(file.type.startsWith('image')){
        imagePreview.src = fileURL;
        imagePreview.classList.remove('hidden');
        videoPreview.classList.add('hidden');
    } else if(file.type.startsWith('video')){
        videoPreview.src = fileURL;
        videoPreview.classList.remove('hidden');
        imagePreview.classList.add('hidden');
    }
}
