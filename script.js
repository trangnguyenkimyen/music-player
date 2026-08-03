// Dữ liệu lrc
const rawLrc = `
[00:09.00]시작은 뭐 즐거웠었네 | The beginning was quite fun
[00:14.00]오르락내리락 그 자체로 | Going up and down, just like that
[00:18.00]어느새 서로 지쳐버렸네 | Before we knew it, we both got tired
[00:23.00]의미 없는 감정소모에 | From this meaningless emotional drain
[00:26.00]반복된 시소 시소게임 | A repeating seesaw, seesaw game
[00:31.00]이쯤 되니 지겨워 지겨워 졌네 | By now, I'm sick and tired of it
[00:35.00]반복된 시소 시소게임 | A repeating seesaw, seesaw game
[00:40.00]우린 서로 지쳐서 지겨워 졌네 | We got tired of each other and sick of it
[00:44.00]사소한 말다툼이 시작이었을까 | Was a petty argument the beginning?
[00:46.00]내가 너보다 무거워졌었던 순간 | The moment I became heavier than you
[00:49.00]애초에 평행은 존재한 적이 없기에 | Since parallel never existed in the first place
[00:51.00]더욱이 욕심내서 맞추려 했을까 | Did we get greedy and try to force it?
[00:53.00]사랑이었고 이게 사랑이란 단어의 자체면 | If it was love, and if this is what the word love means
[00:56.00]굳이 반복해야 할 필요 있을까 | Is there really a need to repeat it?
[00:58.00]서로 지쳤고 같은 카드를 쥐고 있는 듯해 | We're both tired and seem to hold the same card
[01:00.00]그렇다면 뭐 | If so, well
[01:03.00]All right 반복된 시소게임 | All right, a repeating seesaw game
[01:07.00]이제서야 끝을 내보려 해 | I'm finally trying to put an end to it
[01:12.00]All right 지겨운 시소게임 | All right, a tiresome seesaw game
[01:16.00]누군간 여기서 내려야 돼 | Someone has to get off here
[01:20.00]할 순 없지만 | Even though we can't
[01:22.00]누가 내릴지 말진 서로 눈치 말고 | Let's not read each other's minds on who gets off
[01:26.00]그저 맘 가는 대로 질질 끌지 말고 | Let's not drag it out, just follow our hearts
[01:30.00]이젠 내릴지 말지 끝을 내보자고 | Let's put an end to whether we get off or not
[01:34.00]반복되는 시소게임 | A repeating seesaw game
[01:38.00]이젠 그만해 | Stop it now
[01:39.00]사람이 참 간사하긴 하지 | Humans are truly so cunning
[01:41.00]한 명이 없음 다칠 걸 알면서 | Knowing one will get hurt if the other is gone
[01:44.00]서로 나쁜 새낀 되기 싫기에 | Because neither wants to be the bad guy
[01:46.00]애매한 책임전가의 연속에 umm umm | In this endless, vague shifting of blame, umm umm
[01:50.00]지칠 만큼 지쳐서 되려 평행이 됐네 | We got so tired that it actually became parallel
[01:53.00]Ay 이런 평행을 바란 건 아닌데 | Ay, this wasn't the kind of parallel I wanted
[01:56.00]처음에는 누가 더 무거운지 | At first, who was heavier
[01:58.00]자랑하며 서롤 바라보며 웃지 | We'd boast, look at each other and laugh
[02:00.00]이제는 누가 무거운지를 두고 | Now, over who is heavier
[02:02.00]경쟁을 하게 되었네 | It has become a competition
[02:04.00]되려 싸움의 불씨 | Rather, a spark for a fight
[02:05.00]누군가는 결국 이곳에서 | Someone will eventually have to
[02:08.00]내려야 끝이 날 듯하네 | Get off here for this to end
[02:10.00]가식 섞인 서롤 위하는 척 | Pretending to care for each other with fake kindness
[02:12.00]더는 말고 이젠 결정해야 돼 | Let's stop and decide now
[02:15.00]서로 마음이 없다면 | If we don't have feelings for each other
[02:18.00]서롤 생각 안 했다면 | If we didn't care about each other
[02:21.00]우리가 이리도 질질 끌었을까 | Would we have dragged it out this long?
[02:25.00]이제 마음이 없다면 | If there are no feelings left now
[02:27.00]이 시소 위는 위험해 위험해 | It's dangerous, dangerous on this seesaw
[02:30.00]내 생각 더는 말고 | Don't think about me anymore
[02:33.00]All right 반복된 시소게임 | All right, a repeating seesaw game
[02:36.00]이제서야 끝을 내보려 해 | I'm finally trying to put an end to it
[02:41.00]All right 지겨운 시소게임 | All right, a tiresome seesaw game
[02:45.00]누군간 여기서 내려야 돼 | Someone has to get off here
[02:49.00]할 순 없지만 | Even though we can't
[02:51.00](Hol' up Hol' up) 니가 없는 이 시소 위를 걸어 | (Hol' up Hol' up) I walk on this seesaw without you
[02:55.00](Hol' up Hol' up) 니가 없던 처음의 그때처럼 | (Hol' up Hol' up) Like the very beginning when you weren't here
[03:00.00](Hol' up Hol' up) 니가 없는 이 시소 위를 걸어 | (Hol' up Hol' up) I walk on this seesaw without you
[03:04.00](Hol' up Hol' up) 니가 없는 이 시소에서 내려 | (Hol' up Hol' up) I get off this seesaw without you
[03:08.00]All right 반복된 시소게임 | All right, a repeating seesaw game
[03:12.00]이제서야 끝을 내보려 해 | I'm finally trying to put an end to it
[03:17.00]All right 지겨운 시소게임 | All right, a tiresome seesaw game
[03:21.00]누군간 여기서 내려야 돼 | Someone has to get off here
[03:25.00]할 순 없지만 | Even though we can't
[03:27.00]누가 내릴지 말진 서로 눈치 말고 | Let's not read each other's minds on who gets off
[03:32.00]그저 맘 가는 대로 질질 끌지 말고 | Let's not drag it out, just follow our hearts
[03:36.00]이젠 내릴지 말지 끝을 내보자고 | Let's put an end to whether we get off or not
[03:40.00]반복되는 시소게임 | A repeating seesaw game
[03:43.00]이젠 그만해 | Stop it now
[03:45.00](Hol' up Hol' up) 니가 없는 이 시소 위를 걸어 | (Hol' up Hol' up) I walk on this seesaw without you
[03:49.00](Hol' up Hol' up) 니가 없던 처음의 그때처럼 | (Hol' up Hol' up) Like the very beginning when you weren't here
[03:54.00](Hol' up Hol' up) 니가 없는 이 시소 위를 걸어 | (Hol' up Hol' up) I walk on this seesaw without you
[03:58.00](Hol' up Hol' up) 니가 없는 이 시소에서 내려 | (Hol' up Hol' up) I get off this seesaw without you
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
