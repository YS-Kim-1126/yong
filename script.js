const quizData = [
    { type: "single", question: "1. 우리 엄마와 아빠는 몇년생일까?", options: ["1972/1969", "1979/1976", "1971/1973", "1977/1974"], correct: 3 },
    { type: "single", question: "2. 현지가 다니는 대학교의 이름은?", options: ["University of Rochester", "Rutgers University-New Brunswick", "Rutgers University-Newwark", "Lewis & Clark College"], correct: 1 },
    { type: "single", question: "3. 2025 Summer에 용식이가 들었던 과목 2개는?", options: ["OS/Algorithm", "Network/Database", "AI/Machine Learning", "Architecture/Cybersecurity"], correct: 2 },
    { type: "single", question: "4. 우리 할머니 할아버지가 사시는 도시는?", options: ["보성", "여수", "전주", "광주"], correct: 3 },
    { type: "single", question: "5. 용식이가 현재 근무 중인 부대 위치는?", options: ["진교", "진주", "진서", "진도"], correct: 0 },
    { type: "single", question: "6. 용식이가 미국에서 다녔던 헬스장 이름은?", options: ["Gold's Gym", "Anytime Fitness", "Planet Fitness", "LA Fitness"], correct: 0 },
    { type: "single", question: "7. 용식이의 고등학교 이름은?", options: ["북산고등학교", "명일고등학교", "북일고등학교", "성산고등학교"], correct: 2 },
    { type: "single", question: "8. 용식이의 현재 몸무게는?", options: ["70kg", "72kg", "74.486kg", "75kg"], correct: 1 },
    { type: "image-grid", question: "9. 이 중에서 김하민의 얼굴을 고르시오", imgs: ["김하민.jpg","이정민.jpg","임병규.jpg","황승진.jpg"], options: ["1번", "2번", "3번", "4번"], correct: 0 },
    { type: "multiple", question: "10. 용식이의 군대 선임/동기가 아닌 사람은?", options: ["정우", "우진", "민재", "지우", "현택", "은한"], correct: [0,1] },
    { type: "audio", question: "11. 이때 우리는 뭘 타고 있었을까요?", audio: "타이를베이슨.MOV", options: ["지하철", "자동차", "스쿠터", "자전거"], correct: 3 },
    { type: "image", question: "12. 이 사진을 찍은 장소는 어디일까요?", img: "memory.jpg", options: ["한강", "해운대", "남산", "익선동"], correct: 3 },
    { type: "single", question: "13. 용식이가 가장 좋아하는 음식은?", options: ["피자", "김치찌개", "초밥", "떡볶이"], correct: 0 },
    { type: "single", question: "14. 우리가 다녀온 여행지 순서로 맞는 것은?", options: ["시카고-퀘백-뉴욕-시카고-푸에르토리코-서부-부산", "퀘백-뉴욕-서부-시카고-푸에르토리코-부산","퀘백-뉴욕-시카고-푸에르토리코-시카고-서부-부산","퀘백-뉴욕-시카고-푸에르토리코-서부-시카고-부산"], correct: 2 }, 
    { type: "single", question: "15. 용식이가 미국에서 타고 다니다가 중고로 팔았던 차의 모델명은?", options: ["Ford Fusion", "Ford Focus", "Ford Fiesta", "Ford Escape"], correct: 1 },
    { type: "single", question: "16. 용식이가 가장 좋아하는 야구 팀의 이름은?", options: ["KIA Giants", "KIA Lions", "KIA Bears", "KIA Tigers"], correct: 3 }
];

let currentIdx = 0;
let userAnswers = Array(quizData.length).fill(null);


// 각 앨범의 현재 인덱스를 저장하는 객체
let albumIndices = {
    p1: 0,
    p2: 0,
    p3: 0
};

function moveAlbumSlide(idPrefix, direction, event) {
    if (event && typeof event.stopPropagation === 'function') {
        event.stopPropagation();
    }

    const slides = document.getElementById(`${idPrefix}-slides`);
    if (!slides) return;

    const totalImages = slides.querySelectorAll('img').length;
    
    // 해당 앨범의 인덱스 업데이트
    albumIndices[idPrefix] += direction;

    if (albumIndices[idPrefix] >= totalImages) {
        albumIndices[idPrefix] = 0;
    } else if (albumIndices[idPrefix] < 0) {
        albumIndices[idPrefix] = totalImages - 1;
    }

    const offset = -albumIndices[idPrefix] * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

// 2. 기존 폴라로이드 확대/축소 로직 수정
document.querySelectorAll('.polaroid').forEach(photo => {
    photo.addEventListener('click', function(e) {
        // [중요] 클릭된 요소가 슬라이드 버튼이면 확대/축소 로직 실행 안 함
        if (e.target.closest('.slide-btn')) return;

        const isActive = this.classList.contains('active');
        
        document.querySelectorAll('.polaroid').forEach(p => p.classList.remove('active'));
        
        if (!isActive) {
            this.classList.add('active'); 
        }
    });
});

const startBtn = document.getElementById('start-btn');
const pwModal = document.getElementById('password-modal');
const pwInput = document.getElementById('pw-input');
const pwSubmit = document.getElementById('pw-submit');
const pwClose = document.getElementById('pw-close');
const overlay = document.querySelector('.overlay');

// 1. 시작 버튼 누르면 창 띄우기
startBtn.addEventListener('click', () => {
    pwModal.style.display = 'block';
    overlay.classList.add('active');
    overlay.style.display = 'block';
    pwInput.focus();
});

// 2. 닫기 버튼 누르면 모달 닫기
pwClose.addEventListener('click', () => {
    pwModal.style.display = 'none';
    overlay.style.display = 'none';
    overlay.classList.remove('active');
    pwInput.value = ''; // 입력값 초기화
});

// 3. 비밀번호 확인 로직
function checkPassword() {
    const password = pwInput.value.trim();
    const correctAnswers = ["24/04/12", "2024/04/12"];

    if (correctAnswers.includes(password)) {
        alert("인증 성공! 우리 지원이 맞네 ❤️");
        
        // [핵심] 정답일 때만 퀴즈 화면으로 이동
        // document.getElementById('intro-screen').style.display = 'none';
        // document.getElementById('quiz-container').style.display = 'block';
        // // 모달 및 오버레이 정리
        // pwModal.style.display = 'none';
        // overlay.style.display = 'none';
        // startQuiz()
        // 음악 버튼 보이게 하기
        const musicBtn = document.getElementById('music-toggle-btn');
        musicBtn.style.display = 'inline-block'; 
        
        // 음악 재생 시작
        document.getElementById('music-toggle-btn').innerText = "▶";
        isPlaying = false;
        // [수정 포인트] 모달과 오버레이를 먼저 정리합니다.
        pwModal.style.display = 'none';
        overlay.style.display = 'none';
        overlay.classList.remove('active');

        startQuiz();
        
    } else {
        alert("어라..? 우리 지원이가 아닌가본데? 🤨");
        pwInput.value = '';
    }
}

pwSubmit.addEventListener('click', checkPassword);
pwInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkPassword(); });


function startQuiz() {
    document.querySelector('#intro-screen').style.display = 'none';
    document.querySelector('#quiz-screen').style.display = 'flex';
    renderQuestion();
}

function renderQuestion() {
    const quiz = quizData[currentIdx];
    document.querySelector('#question-text').innerText = quiz.question;
    
    const mediaContent = document.querySelector('#media-content');
    mediaContent.innerHTML = '';
    if(quiz.type === 'image') {
        mediaContent.innerHTML = `<img src="${quiz.img}" class="quiz-img">`;
    }
    else if(quiz.type === 'image-grid') {
        // 이미지를 여러 개 담을 컨테이너 생성
        let gridHTML = '<div class="image-grid">';
        quiz.imgs.forEach((imgSrc, index) => {
            gridHTML += `
                <div class="grid-item">
                    <span class="grid-number">${index + 1}</span>
                    <img src="${imgSrc}" class="grid-img">
                </div>`;
        });
        gridHTML += '</div>';
        mediaContent.innerHTML = gridHTML;
    }
    else if(quiz.type === 'audio') {
        mediaContent.innerHTML = `<audio controls src="${quiz.audio}"></audio>`;

// --- 비밀 버튼 추가 로직 ---
        const secretBtn = document.createElement('button');
        secretBtn.className = 'secret-video-btn';
        secretBtn.onclick = () => openVideoModal(quiz.audio); // MOV 파일을 비디오로 열기
        
        // question-box에 버튼을 붙입니다.
        document.getElementById('question-box').appendChild(secretBtn);
    }
    

    const optionsContainer = document.querySelector('#options-container');
    optionsContainer.innerHTML = '';

    quiz.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        
        // 선택 상태 유지
        const isSelected = quiz.type === 'multiple' 
            ? (userAnswers[currentIdx] || []).includes(i)
            : userAnswers[currentIdx] === i;
        if(isSelected) btn.classList.add('selected');

        btn.onclick = () => {
            if(quiz.type === 'multiple') {
                if(!userAnswers[currentIdx]) userAnswers[currentIdx] = [];
                const index = userAnswers[currentIdx].indexOf(i);
                index > -1 ? userAnswers[currentIdx].splice(index, 1) : userAnswers[currentIdx].push(i);
            } else {
                userAnswers[currentIdx] = i;
            }
            renderQuestion();
        };
        optionsContainer.appendChild(btn);
    });

    document.querySelector('#progress-bar').style.width = `${((currentIdx + 1) / quizData.length) * 100}%`;
    document.querySelector('#prev-btn').style.visibility = currentIdx === 0 ? 'hidden' : 'visible';
    document.querySelector('#next-btn').innerText = currentIdx === quizData.length - 1 ? '결과 확인하기 ❤️' : '다음으로';
}

function changeQuestion(step) {
    if(step === 1 && userAnswers[currentIdx] === null) return alert("답을 골라줘야지 지원리 ㅎㅎ");
    
    currentIdx += step;
    if(currentIdx >= quizData.length) return showResult();
    renderQuestion();
}

// 1. 네비게이션 서랍 열고 닫기
function toggleNav(open) {
    const nav = document.querySelector('#side-nav');
    if (open) {
        renderNavList(); // 열 때 목록 새로고침
        nav.classList.add('active');
    } else {
        nav.classList.remove('active');
    }
}

// 2. 번호 리스트 그리기
function renderNavList() {
    const navList = document.querySelector('#nav-list');
    navList.innerHTML = '';

    quizData.forEach((_, i) => {
        const item = document.createElement('div');
        item.className = 'nav-item';
        if (i === currentIdx) item.classList.add('current');
        else if (userAnswers[i] !== null) item.classList.add('done'); // 푼 문제는 색칠

        item.innerText = i + 1;
        item.onclick = () => {
            currentIdx = i;
            renderQuestion();
            toggleNav(false); // 이동 후 서랍 닫기
        };
        navList.appendChild(item);
    });
}

function goToHome() {
    // 1. 네비게이션 서랍을 닫음
    toggleNav(false);

    // 2. 퀴즈 화면 숨기고 인트로 화면 보여주기
    const intro = document.querySelector('#intro-screen');
    const quiz = document.querySelector('#quiz-screen');
    
    // 부드러운 전환 효과를 위해 투명도 조절 (선택 사항)
    quiz.style.display = 'none';
    intro.style.display = 'flex';
    intro.style.opacity = '1';
}

function showResult() {
    document.querySelector('#quiz-screen').style.display = 'none';
    document.querySelector('#result-screen').style.display = 'block';

    let score = 0;
    let wrongHTML = '';

    quizData.forEach((q, i) => {
        const isCorrect = JSON.stringify(q.correct) === JSON.stringify(userAnswers[i]);
        if(isCorrect) score++;
        else wrongHTML += `<li>${q.question}<br><span style="color:#999; font-size:0.8rem;">(정답: ${Array.isArray(q.correct) ? q.correct.map(idx => q.options[idx]).join(', ') : q.options[q.correct]})</span></li>`;
    });

    document.querySelector('#score-display').innerHTML = `<h3>${quizData.length}문제 중 ${score}문제 정답!</h3>`;
    document.querySelector('#result-comment').innerText = score === quizData.length ? "완벽해! 넌 역시 최고야❤️" : "조금 틀렸지만 괜찮아, 이제 부산에서 더 많은 추억 쌓자!";
    document.querySelector('#wrong-list').innerHTML = wrongHTML || "틀린 문제가 없어요! 대단해!";
}



// [추가] 유튜브 플레이어 변수와 상태 변수
let player;
let isPlaying = false;
let progressTimer;

// [추가] YouTube API 비동기 로드
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// 1. YouTube API 준비
function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '0',
        width: '0',
        videoId: '9Fmg0W_updc', // 여기에 원하는 영상 ID
        playerVars: { 'autoplay': 0, 'controls': 0 },
        events: { 'onReady': onPlayerReady }
    });
}

function onPlayerReady() {
    // 플레이어가 준비되면 시간을 업데이트하기 시작함
    updateProgress(); 
}

// 2. 재생/일시정지 토글 (아이콘 변경)
function toggleMusic() {
    const btn = document.getElementById('music-toggle-btn');
    if (!isPlaying) {
        player.playVideo();
        btn.innerText = "❚❚"; // 일시정지 모양으로 변경
        isPlaying = true;
    } else {
        player.pauseVideo();
        btn.innerText = "▶"; // 재생 모양으로 변경
        isPlaying = false;
    }
}

// 3. 재생 바 실시간 업데이트
function updateProgress() {
    setInterval(() => {
        if (player && player.getCurrentTime) {
            const currentTime = player.getCurrentTime();
            const duration = player.getDuration();
            
            // 재생 바 업데이트
            const progressPercent = (currentTime / duration) * 100;
            document.getElementById('music-progress-bar').style.width = progressPercent + "%";
            
            // 시간 텍스트 업데이트 (00:00 형식)
            document.getElementById('music-time').innerText = 
                formatTime(currentTime) + " / " + formatTime(duration);
        }
    }, 1000);
}

// 4. 클릭 시 해당 위치로 이동 (Seek)
function seek(event) {
    const wrapper = event.currentTarget;
    const clickX = event.offsetX;
    const width = wrapper.clientWidth;
    const duration = player.getDuration();
    
    const seekTime = (clickX / width) * duration;
    player.seekTo(seekTime, true);
}

// 초 단위를 분:초로 바꾸는 도우미 함수
function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return (min < 10 ? '0' + min : min) + ":" + (sec < 10 ? '0' + sec : sec);
}


let gameTimer;
let moveIntervals = [];

// [새로 추가] 버튼 클릭 시 실행되는 함수
function openMiniGame() {
    const container = document.getElementById('game-container');
    const startBtn = document.getElementById('minigame-start-btn');

    // 1. 시작 버튼을 숨김
    startBtn.style.display = 'none';
    
    // 2. 게임 컨테이너를 보여줌 (display를 먼저 바꿔야 크기 계산이 됨)
    container.style.display = 'block';

    // 3. 약간의 시간차(0.1초)를 두고 게임 시작 (브라우저가 렌더링할 시간 확보)
    setTimeout(() => {
        startFaceGame();
    }, 100);
}

function startFaceGame() {
    const container = document.getElementById('game-container');
    container.innerHTML = ''; 
    moveIntervals.forEach(clearInterval);
    moveIntervals = [];

    // [중요] 컨테이너 크기 다시 확인 (0이면 강제 지정)
    const cw = container.clientWidth || 300;
    const ch = container.clientHeight || 300;

    const faceCount = 8;
    let clickedCount = 0;

    for (let i = 0; i < faceCount; i++) {
        const face = document.createElement('div');
        face.className = 'game-face';
        // --- 이 부분이 이미지를 넣는 핵심 로직 ---
        const img = document.createElement('img');
        img.src = '나.jpg'; // 👈 여기에 실제 파일 이름을 확장자(png, jpg 등)까지 정확히 적어주세요.
        img.style.width = '100%';   // 부모(face) 크기에 맞춤
        img.style.height = '100%';
        img.style.display = 'block';
        img.style.pointerEvents = 'none'; // 이미지 때문에 클릭이 씹히는 현상 방지
        
        face.appendChild(img); 
        // ------------------------------------------
        
        // 위치 랜덤 (컨테이너 안으로 제한)
        let posX = Math.random() * (cw - 50);
        let posY = Math.random() * (ch - 50);
        let velX = (Math.random() - 0.5) * 8; // 속도 약간 조절
        let velY = (Math.random() - 0.5) * 8;

        face.style.left = posX + 'px';
        face.style.top = posY + 'px';

        face.onclick = (e) => {
            e.stopPropagation();
            face.style.transform = 'scale(0)';
            clickedCount++;
            setTimeout(() => face.remove(), 200);

            if (clickedCount === faceCount) {
                clearTimeout(gameTimer);
                finishMiniGame(true);
            }
        };

        container.appendChild(face);

        const move = setInterval(() => {
            posX += velX;
            posY += velY;

            // 벽 튕기기 로직
            if (posX <= 0 || posX >= cw - 40) velX *= -1;
            if (posY <= 0 || posY >= ch - 40) velY *= -1;

            face.style.left = posX + 'px';
            face.style.top = posY + 'px';
        }, 20);

        moveIntervals.push(move);
    }

    gameTimer = setTimeout(() => {
        if (clickedCount < faceCount) {
            finishMiniGame(false);
        }
    }, 5000); // 5초
}

function finishMiniGame(isSuccess) {
    moveIntervals.forEach(clearInterval);
    if (isSuccess) {
        alert("내 얼굴을 너무 열심히 클릭한 거 아니야..?ㅋㅋㅋㅋ");
    } else {
        alert("5초 생각보다 짧지 ㅎㅎ 다시해바~");
    }
    // 게임 종료 후 다시 시작 버튼을 보이게 하거나 새로고침 유도
    document.getElementById('minigame-start-btn').style.display = 'inline-block';
    document.getElementById('game-container').style.display = 'none';
}


// 비밀 비디오 모달 열기 함수
function openVideoModal(videoSrc) {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('surprise-video');
    
    if (!modal || !video) {
        console.error("모달 요소를 찾을 수 없습니다!");
        return;
    }

    video.src = videoSrc; 
    modal.style.display = 'flex'; // hidden에서 보임으로 변경
    video.play().catch(e => console.log("자동 재생 방지 정책으로 클릭 후 재생 필요"));
}

// 모달 닫기 함수
function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('surprise-video');
    
    video.pause();
    modal.style.display = 'none';
}