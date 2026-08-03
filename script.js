// Dữ liệu lrc
const rawLrc = `
[00:15.00]Flower field, that's where I'm at (where I'm at)
[00:18.00]Open land, that's where I'm at (where I'm at)
[00:21.00]No name, that's what I have (what I have)
[00:24.00]No shame, I'm on my grave, yo
[00:27.00]두 발이 땅에 닿지 않을 때 | When my two feet don't touch the ground
[00:29.00]당신의 마음이 당신을 넘볼 때 | When your own heart threatens to overtake you
[00:33.00]꿈이 나를 집어삼킬 때 | When dreams swallow me whole
[00:35.00]내가, 내가 아닐 때, 그 모든 때, yeah | When I'm not myself, all those times, yeah
[00:39.00]불꽃을 나는 동경했었네 | I used to long for the flames
[00:42.00]그저 화려하게 지고 싶었네 | I just wanted to fall beautifully
[00:45.00]시작의 전부터 나 상상했었지 | Even before the start, I had imagined it
[00:48.00]끝엔 웃으며 박수 쳐 줄 수 있길 | Hoping I could smile and applaud at the end
[00:51.00]나 소원했었네 | I had wished for it
[00:52.00]믿었던 게 다 멀어지던 때 | when everything I believed in faded away
[00:55.00]이 모든 명예가 이젠 멍에가 됐을 때 | When all this honor became a yoke
[00:58.00]이 욕심을 제발 거둬가소서 | Please take away this greed
[01:00.00]어떤 일이 있어도 | no matter what happens
[01:02.00]Oh, 나를 나로 하게 하소서 | Oh, let me just be me
[01:04.00]Oh, everyday and every night (yeah)
[01:07.00]Persistin' pain and criminal mind (yeah)
[01:10.00]내 심장소리에 잠 못 들던 밤 | Nights I couldn't sleep because of the sound of my heart
[01:12.00]창밖에 걸린 청승맞은 초승달 | The sorrowful crescent moon hanging outside the window
[01:16.00]I do wish me a lovely night (yeah)
[01:18.00]내 분수보다 비대해진 life (yeah) | A life that grew bigger than I deserved (yeah)
[01:21.00]저기 날아오르는 풍선을 애써 쥐고 | Struggling to hold onto the balloon flying away over there
[01:24.00]따져 물어, 대체 지금 넌 어디에? | Asking myself, where are you right now?
[01:26.00]Where you go? Where's your soul?
[01:28.00]Yo, where's your dream?
[01:28.00]저 하늘에 흩어질래 (ooh-ooh) | I want to scatter in that sky (ooh-ooh)
[01:34.00]Light a flower, flowerwork, flower, flowerwork
[01:40.00]저 하늘에 눈부시게 (hey, hey) | Dazzlingly in that sky (hey, hey)
[01:47.00]Light a flower, flowerwork, flower, flowerwork
[01:53.00]그 어디까지가 내 마지막일까? | Where exactly is my end?
[01:56.00]전부 진저리 나, 하나 열까지 다 | I'm sick of it all, from one to ten
[01:59.00]이 지긋지긋한 가면은 언제 벗겨질까? | When will this damn mask come off?
[02:02.00]Yeah, me no hero, me no villain
[02:03.50]아무것도 아닌 나 | I am nothing
[02:06.00]공회전은 반복돼, 기억들은 난폭해 | Idling repeats, memories turn violent
[02:09.00]난 누워 들판 속에, 시선을 던져 하늘 위에 | I lie in the field, throw my gaze to the sky
[02:12.00]뭘 원했었던 건지? | What was it I wanted? 
[02:13.00]이제 기억이 안 나 | I can't remember anymore
[02:15.00]얻었다 믿었던 모든 행복은 | All the happiness I thought I got 
[02:16.00]겨우 찰나 | was just fleeting
[02:18.00]Yeah, I been goin', no matter what's in front
[02:20.00]그게 뭐가 됐건 | whatever it is
[02:21.00]새벽의 옷자락을 붙잡고 | Memories of holding onto the edge of dawn 
[02:23.00]뭔가 토해내던 기억 | and throwing up something
[02:24.00]목소리만 큰 자들의 사회 | A society of loud mouths
[02:26.00]난 여전히 침묵을 말해 | I still speak in silence
[02:28.00]이건 방백, 완숙한 돛단배 | This is a monologue, a fully matured sailboat
[02:29.00]모든 오해 편견들에 닿게 | reaching all misunderstandings and prejudices
[02:31.00]반갑지 않아, 너의 헹가래 | Your tossing me in the air is not welcome
[02:32.00]내 두 발이 여기 땅 위에 (ayy) | My two feet are here on the ground (ayy)
[02:34.00]이름도 없는 꽃들과 함께 | Together with the nameless flowers
[02:35.00]다신 별에 갈 수 없어, I can't | I can't go to the stars again, I can't
[02:37.00]발밑으로, I just go | Under my feet, I just go
[02:38.00]목적 없는 목적지로 | to a destination without purpose
[02:40.00]슬픈 줄도 모르고 | Not even knowing it's sad
[02:41.00]그림자마저 친구로, I be gone | with even shadows as friends, I be gone
[02:42.00]저 하늘에 흩어질래 (ooh-ooh) | I want to scatter in that sky (ooh-ooh)
[02:49.00]Light a flower, flowerwork, flower, flowerwork
[02:55.00]저 하늘에 눈부시게 (hey, hey) | Dazzlingly in that sky (hey, hey)
[03:01.00]Light a flower, flowerwork, flower, flowerwork
[03:08.00]문득 멈춰보니 찬란한 맨발 | Suddenly stopping, I see my radiant bare feet
[03:11.00]원래 내 것은 아무것도 없었지 | Nothing was ever mine to begin with
[03:13.00](that's right)
[03:14.00]And don't tell me like you gotta be someone
[03:17.00]난 절대 그들처럼 될 수 없으니 | Because I can never be like them
[03:20.00](light a flower)
[03:21.00]그래, 내 시작은 시 | Yeah, my beginning was poetry
[03:23.00]여태껏 날 지켜온 단 하나의 힘과 dream | The only strength and dream that protected me so far
[03:25.00](light a flower)
[03:26.00]타는 불꽃에서 들꽃으로 | From a burning flame to a wildflower
[03:28.00]소년에서 영원으로 | from a boy to eternity
[03:30.00]나 이 황량한 들에 남으리 | I will remain in this desolate field
[03:32.00]Ah, 언젠가 나 되돌아가리 | Ah, someday I will return
[03:35.00]저 하늘에 흩어질래 | I want to scatter in that sky
[03:41.00]Light a flower, flowerwork, flower, flowerwork
[03:47.00]저 하늘에 눈부시게 (hey, hey) | Dazzlingly in that sky (hey, hey)
[03:54.00]Light a flower, flowerwork, flower, flowerwork
[04:01.00]Flower field, that's where I'm at (where I'm at)
[04:04.00]Open land, that's where I'm at (where I'm at)
[04:07.00]No name, that's what I have (what I have)
[04:10.00]No shame, I'm on my grave, yo
[04:13.00]두 발이 땅에 닿지 않을 때 | When my two feet don't touch the ground
[04:15.00](두 발이 땅에 닿지 않을 때) | (when my two feet don't touch the ground)
[04:16.00]당신의 마음이 당신을 넘볼 때 | When your own heart threatens to overtake you
[04:18.00](당신의 마음이 당신을 넘볼 때) | (when your own heart threatens to overtake you)
[04:19.00]꿈이 나를 집어삼킬 때 | When dreams swallow me whole
[04:21.00]내가 내가 아닌 때 | when I am not myself
[04:23.00]그 모든 때, yeah | All those times, yeah
`;

function parseLrc(lrcString) {
  const lines = lrcString.split("\n");
  const result = [];
  const regex = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/;
  for (let line of lines) {
    const match = regex.exec(line);
    if (match) {
      const time =
        parseInt(match[1], 10) * 60 +
        parseInt(match[2], 10) +
        parseInt(match[3], 10) / (match[3].length === 3 ? 1000 : 100);
      result.push({ time, text: match[4].trim() });
    }
  }
  return result;
}

const lyricsData = parseLrc(rawLrc);

const audio = document.getElementById("my-audio");
const currentLyricEl = document.getElementById("current-lyric");
const playBtn = document.getElementById("play-btn");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const discSpin = document.getElementById("disc-spin");

// --- Khai báo mã SVG ---
const playIcon = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
const pauseIcon = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = pauseIcon;
    discSpin.style.animationPlayState = "running";
  } else {
    audio.pause();
    playBtn.innerHTML = playIcon;
    discSpin.style.animationPlayState = "paused";
  }
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

audio.addEventListener("loadedmetadata", () => {
  durationEl.innerText = formatTime(audio.duration);
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

let currentActiveIndex = -1;
let lastUpdateTime = 0;

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;

  if (Date.now() - lastUpdateTime > 250) {
    if (audio.duration) {
      progressBar.value = (currentTime / audio.duration) * 100;
      currentTimeEl.innerText = formatTime(currentTime);
    }
    lastUpdateTime = Date.now();
  }

  let activeIndex = -1;
  for (let i = 0; i < lyricsData.length; i++) {
    if (currentTime >= lyricsData[i].time) {
      activeIndex = i;
    } else {
      break;
    }
  }

  if (activeIndex !== currentActiveIndex && activeIndex !== -1) {
    currentActiveIndex = activeIndex;
    currentLyricEl.style.opacity = 0;

    // Yêu cầu trình duyệt lên lịch chuyển đổi khung hình tiếp theo
    requestAnimationFrame(() => {
      setTimeout(() => {
        const rawText = lyricsData[activeIndex].text || "♪ ♪ ♪";
        const parts = rawText.split(" | "); // Tách chuỗi

        if (parts.length > 1) {
          // Dùng innerHTML thay vì innerText để chèn thẻ HTML
          currentLyricEl.innerHTML = `${parts[0]}<br><span class="trans">${parts[1]}</span>`;
        } else {
          currentLyricEl.innerHTML = rawText;
        }

        currentLyricEl.style.opacity = 1;
      }, 200);
    });
  }
});

audio.addEventListener("ended", () => {
  playBtn.innerHTML = playIcon;
  progressBar.value = 0;
  currentTimeEl.innerText = "0:00";
  discSpin.style.animationPlayState = "paused";
});
