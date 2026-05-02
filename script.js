const quizData = [
    { type: "single", question: "1. 우리 엄마와 아빠는 몇년생일까?", options: ["1972/1969", "1979/1976", "1971/1973", "1977/1976"], correct: 3 },
    { type: "single", question: "2. 현지가 다니는 대학교의 이름은?", options: ["University of Rochester", "Rutgers University-New Brunswick", "Rutgers University-Newwark", "Lewis & Clark College"], correct: 1 },
    { type: "single", question: "3. 2025 Summer에 용식이가 들었던 과목 2개는?", options: ["OS/Algorithm", "Network/Database", "AI/Machine Learning", "Architecture/Cybersecurity"], correct: 2 },
    { type: "single", question: "4. 우리 할머니 할아버지가 사시는 도시는?", options: ["보성", "여수", "전주", "광주"], correct: 3 },
    { type: "single", question: "5. 용식이가 현재 근무 중인 부대 위치는?", options: ["진교", "진주", "진서", "진도"], correct: 0 },
    { type: "single", question: "6. 용식이가 미국에서 다녔던 헬스장 이름은?", options: ["Gold's Gym", "Anytime Fitness", "Planet Fitness", "LA Fitness"], correct: 0 },
    { type: "single", question: "7. 용식이의 고등학교 이름은?", options: ["북산고등학교", "명일고등학교", "북일고등학교", "성산고등학교"], correct: 2 },
    { type: "single", question: "8. 용식이의 현재 몸무게는?", options: ["70kg", "72kg", "74.486kg", "75kg"], correct: 1 },
    { type: "image-grid", question: "9. 이 중에서 김하민의 얼굴을 고르시오", imgs: ["김하민.jpg","이정민.jpg","임병규.jpg","황승진.jpg"], options: ["1번", "2번", "3번", "4번"], correct: 0 },
    { type: "multiple", question: "10. 용식이의 군대 선임/동기가 아닌 사람은?", options: ["정우", "우진", "민재", "지우", "현택", "은한"], correct: [0,3,4,5] },
    { type: "audio", question: "11. 대화를 잘 들어보고 장소를 맞추시오", audio: "voice.mp3", options: ["지하철", "카페", "학교 앞", "잠실역"], correct: 2 },
    { type: "image", question: "12. 이 사진을 찍은 장소는 어디일까요?", img: "memory.jpg", options: ["한강", "해운대", "남산", "익선동"], correct: 3 },
    { type: "single", question: "13. 용식이가 가장 좋아하는 음식은?", options: ["피자", "김치찌개", "초밥", "떡볶이"], correct: 0 },
    { type: "single", question: "14. 우리가 다녀온 여행지 순서로 맞는 것은?", options: ["퀘백-뉴욕-시카고-푸에르토리코=시카고=서부-부산", "시카고-퀘백-뉴욕-시카고-푸에르토리코-서부-부산", "퀘백-뉴욕-서부-시카고-부산", "퀘백-뉴욕-시카고-푸에르토리코-서부-시카고-부산"], correct: 0 }   // 화면 주변에 엘범 만들어서 우리가 갔던 여행지역 사진들 확인할 수 있도록 하는거 좋을거 같음
];

let currentIdx = 0;
let userAnswers = Array(quizData.length).fill(null);

document.querySelectorAll('.polaroid').forEach(photo => {
    photo.addEventListener('click', function() {
        // 이미 커진 사진을 다시 누르면 작아지게, 다른 걸 누르면 그것만 커지게
        const isActive = this.classList.contains('active');
        
        // 일단 모든 사진의 active를 제거
        document.querySelectorAll('.polaroid').forEach(p => p.classList.remove('active'));
        
        if (!isActive) {
            this.classList.add('active'); // 클릭한 사진만 키우기
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