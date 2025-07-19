// Audio Player voor RTV1 Interview
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const audioPlayer = document.getElementById('audioPlayer');
    const audioControls = document.getElementById('audioControls');
    const progressBar = document.getElementById('progressBar');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    const playIcon = document.querySelector('.play-icon');
    const playText = document.querySelector('.play-text');
    
    if (!playButton || !audioPlayer) {
        console.log('PlayButton or AudioPlayer not found');
        return;
    }
    
    console.log('Audio player initialized');
    
    // Force metadata loading bij pagina load
    audioPlayer.load();
    
    // Error handling
    audioPlayer.addEventListener('error', function(e) {
        console.log('Audio error:', e);
        console.log('Audio error details:', audioPlayer.error);
    });
    
    playButton.addEventListener('click', function() {
        console.log('Play button clicked');
        
        if (audioPlayer.paused) {
            audioPlayer.play().then(function() {
                console.log('Audio resumed/started successfully');
                playIcon.textContent = '⏸️';
                playText.textContent = 'Pauzeer interview';
                playButton.classList.add('playing');
                audioControls.style.display = 'block';
            }).catch(function(error) {
                console.log('Audio play failed:', error);
                alert('Kan audio niet afspelen: ' + error.message);
            });
        } else {
            audioPlayer.pause();
            console.log('Audio paused');
            playIcon.textContent = '▶️';
            playText.textContent = 'Hervat interview';
            playButton.classList.remove('playing');
        }
    });
    
    audioPlayer.addEventListener('loadedmetadata', function() {
        console.log('Metadata loaded, duration:', audioPlayer.duration);
        if (durationDisplay) {
            durationDisplay.textContent = formatTime(audioPlayer.duration);
            console.log('Duration display updated to:', formatTime(audioPlayer.duration));
        }
    });
    
    // Extra check - soms is metadata al geladen
    if (audioPlayer.duration && !isNaN(audioPlayer.duration)) {
        console.log('Duration already available:', audioPlayer.duration);
        if (durationDisplay) {
            durationDisplay.textContent = formatTime(audioPlayer.duration);
        }
    }
    
    audioPlayer.addEventListener('timeupdate', function() {
        if (progressBar && currentTimeDisplay) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = progress + '%';
            currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        }
    });
    
    audioPlayer.addEventListener('ended', function() {
        console.log('Audio ended');
        playIcon.textContent = '▶️';
        playText.textContent = 'Start het RTV1 interview';
        playButton.classList.remove('playing');
        if (progressBar) progressBar.style.width = '0%';
    });
    
    // Progress bar als display-only
    const progressContainer = document.querySelector('.progress-container');
    if (progressContainer) {
        progressContainer.style.cursor = 'default';
        progressContainer.title = 'Voortgang interview';
        console.log('Progress bar set to display-only mode');
    }
    
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }
    
    // Fallback: probeer metadata na 2 seconden opnieuw te laden
    setTimeout(function() {
        if (!audioPlayer.duration || isNaN(audioPlayer.duration)) {
            console.log('Retrying metadata load...');
            audioPlayer.load();
        }
    }, 2000);
});