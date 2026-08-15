// Dữ liệu lrc
const rawLrc = `
[00:10.52]내 심장의 색깔은 black | My heart is colored black
[00:12.78]시커멓게 타버려 just like that | Burned pitch-black, just like that
[00:15.38]틈만 나면 유리를 깨부수고 | Whenever I can, I smash the glass
[00:17.00]피가 난 손을 보고 | And stare at my bleeding hands
[00:18.60]난 왜 이럴까? 왜? | Why am I like this? Why?
[00:21.10]네 미소는 빛나는 gold | Your smile shines like gold
[00:23.46]하지만 말투는 feel so cold | But the way you talk feels so cold
[00:25.93]갈수록 날 너무 닮아가 | The more time passes, the more you become like me
[00:27.60]가끔씩은 karma가 | Sometimes it feels like karma
[00:29.26]뒤쫓는 것 같아, no | Is chasing after me, no
[00:31.52]사랑의 본명은 분명히 증오 | Love's real name is clearly hate
[00:34.15]희망은 실망과 절망의 부모 | Hope is the parent of disappointment and despair
[00:36.95]어느새 내 얼굴에 드리워진 그림자가 | The shadow that slowly fell across my face
[00:39.79]너란 빛에서 생긴 걸 몰랐을까? | Did I not know it came from the light that is you?
[00:42.17]너와 내 사이에 시간은 멈춘 지 오래 | Time between you and me stopped long ago
[00:45.46]언제나 고통의 원인은 오해 | Misunderstanding is always the source of pain
[00:48.07]하기야 나도 날 모르는데 | Then again, I don't even know myself
[00:50.06]네가 날 알아주길 바라는 것 | Expecting you to understand me
[00:51.60]그 자체가 오해 | Is a misunderstanding itself
[00:53.22]사람들은 다 애써 웃지 | Everyone forces a smile
[00:58.21]진실을 숨긴 채, 그저 행복한 것처럼 | Hiding the truth, pretending to be happy
[01:03.95]사랑이란 말 속 가려진 | Hidden behind the word "love"
[01:08.95]거짓을 숨긴 채, 마치 영원할 것처럼 | Hiding the lies, as if it would last forever
[01:14.28]우울한 내 세상의 색깔은 black | The color of my gloomy world is black
[01:16.75]처음과 끝은 변해 흑과 백 | The beginning and the end turn into black and white
[01:19.39]사람이란 간사해 | People are so fickle
[01:21.00]가끔 헛된 망상에 들어 | Sometimes lost in pointless fantasies
[01:22.32]정말, 난 왜 이럴까? 왜? | Seriously, why am I like this? Why?
[01:24.98]그 입술은 새빨간 red | Those lips are bright red
[01:27.33]거짓말처럼 새빨갛게 | Bright red, just like a lie
[01:30.08]갈수록, 둘만의 언어가 | As time goes on, our own language
[01:31.80]서로 가진 color가 | The colors we each have
[01:33.35]안 맞는 것 같아 (yeah) | Just don't seem to match (yeah)
[01:35.53]사랑의 본명은 분명히 증오 | Love's real name is clearly hate
[01:38.47]희망은 실망과 절망의 부모 | Hope is the parent of disappointment and despair
[01:40.87]어느새 내 얼굴에 드리워진 그림자가 | The shadow that slowly fell across my face
[01:43.65]너란 빛에서 생긴 걸 몰랐을까? | Did I not know it came from the light that is you?
[01:46.36]너를 만나고 남은 건 끝 없는 고뇌 | Since I met you, all that's left is endless agony
[01:49.46]날마다 시련과 시험의 연속 고개 | Every day is an endless chain of hardships and trials
[01:52.15]이젠 이별을 노래해 네게 고해 | Now I sing of goodbye, confessing it all to you
[01:54.86]이건 내 마지막 고해 | This is my final confession
[01:57.22]사람들은 다 애써 웃지 | Everyone forces a smile
[02:02.19]진실을 숨긴 채, 그저 행복한 것처럼 | Hiding the truth, pretending to be happy
[02:08.03]사랑이란 말 속 가려진 | Hidden behind the word "love"
[02:12.75]거짓을 숨긴 채, 마치 영원할 것처럼 | Hiding the lies, as if it would last forever
[02:19.34]Someday 세상의 끝에 (uh) | Someday, at the end of the world (uh)
[02:23.58]홀로 버려진 채 | Left all alone
[02:26.00]널 그리워 할지도, yeah (yeah) | I might end up missing you, yeah (yeah)
[02:29.93]Someday 슬픔의 끝에 | Someday, at the end of all this sorrow
[02:34.12]나 길들여진 채 끝내 후회 할지도 몰라 | Maybe I'll grow used to it and regret it in the end
[02:40.14]나 돌아갈게 내가 왔던 그 길로 (black) | I'll go back down the road I came from (black)
[02:45.30]너와 내가 뜨거웠던 그 여름은 | That summer when you and I burned so bright
[02:48.00]it's been to long
[02:50.78]나 돌아갈게 내가 왔던 그 길로 (black) | I'll go back down the road I came from (black)
[02:55.87]너와 내가 뜨거웠던 그 여름은 | That summer when you and I burned so bright
[02:58.50]it's been to long
[03:00.52]Fade away (fade away), fade away (fade away)
[03:06.03]Fade away (fade away), fade away (fade away)
[03:11.32]Fade away (fade away), fade away (fade away)
[03:16.71]Fade away (fade away), fade away
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
