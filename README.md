# yong


첫 번째 화면에서는 일단 css로 좀 꾸며서, 부산 여행을 떠나기 전에 차에서 진행하는거인 만큼, 봄의 느김이 좀 나게, 그리고 2주년 이벤트인 만큼 첫 화면에서 우리 옛 추억을 추억할만한 사진들로 좀 꾸미면 좋을거 같음..




.polaroid {
    position: absolute; 
    width: 160px; /* 폰 화면을 고려해 살짝 슬림하게 변경 */
    
    padding: 8px 8px 25px 8px;
    background: white; 
    box-shadow: 0 10px 20px rgba(0,0,0,0.15); 
    border-radius: 2px;
    transition: transform 0.3s ease; /* 만졌을 때 반응 */
} 

.polaroid:hover {
    transform: scale(1.2) rotate(0deg); /* 크기를 1.1배 키우고 각도를 똑바로 세움 */
    z-index: 10; /* 다른 사진보다 위로 올라오게 함 */
    box-shadow: 0 15px 30px rgba(0,0,0,0.3); /* 그림자를 더 진하게 해서 붕 뜬 느낌을 줌 */
}