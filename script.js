// Dữ liệu lrc
const rawLrc = `
[00:01.00]괜한 자존심 때문에 끝내자고 말을 | Because of my useless pride, I brought up breaking up
[00:08.00]해버린 거야 (one, two, let's go) | I ended up saying it (one, two, let's go)
[00:12.00]뺏긴 my heart, that girl's a killer | She stole my heart, that girl's a killer
[00:15.00]Love so good, feels like a thriller
[00:17.00]시작됐지, 이건 emergency (vroom) | It has started, this is an emergency (vroom)
[00:22.00]One-one-nine, one-one-nine
[00:24.00]Save my life, save my life
[00:26.00]She sets me free
[00:29.00]이건 emergency love (love) | this is an emergency love (love)
[00:32.00]너는 마치 flashlight (flashlight) | You are like a flashlight (flashlight)
[00:34.00]자꾸만 시선을 뺏겨 (oh) | You keep stealing my gaze (oh)
[00:36.00]많은 사람 속에서 (ooh) | Among the many people (ooh)
[00:39.00]순간 너만 보였어 (you) | In that moment, I only saw you (you)
[00:41.00]다들 말하지, love is so sweet, oh-ah | Everyone says, love is so sweet, oh-ah
[00:45.00](so sweet)
[00:46.00]아직 난 뭔지 모르겠지 right now | I still don't know what it is right now
[00:50.00]처음 느낀 이상한 떨림 | This strange trembling I feel for the first time
[00:52.00]이건 진심, I'm not kidding | This is sincere, I'm not kidding
[00:55.00]친구이기엔 더 | To just be friends, it's
[00:56.00]deeper, deeper, deeper
[00:57.00]어쩌면 love song, yah (love song, yah) | Maybe it's a love song, yah (love song, yah)
[01:01.00]뺏긴 my heart, that girl's a killer (killer) | She stole my heart, that girl's a killer (killer)
[01:03.00]Love so good, feels like a thriller (thrillеr)
[01:05.00]시작됐지, 이건 emergency (vroom) | It has started, this is an emergency (vroom)
[01:10.00]Onе-one-nine, one-one-nine (one-one-nine)
[01:13.00]Save my life, save my life (save my life)
[01:15.00]She sets me free
[01:17.00]이건 emergency love (love) | this is an emergency love (love)
[01:21.00]이상해 나, what do I do? | I feel strange, what do I do?
[01:23.00]너에 관한 건 뭐라도 | Anything about you
[01:24.00]신경 쓰여 난 all day | I care about it all day
[01:26.00]넌 만들어, my day | you make my day
[01:27.00]이 감정은 someday, 난 알고 싶어 | This feeling someday, I want to know
[01:30.00]귓가에 울린, love is so sweet, oh-ah | Ringing in my ears, love is so sweet, oh-ah
[01:34.00](so sweet)
[01:35.00]멈출 수 없이 빠져버린 나야 (ooh) | I've fallen for you unstoppably (ooh)
[01:39.00]네가 자꾸 궁금해 왜지? | I keep getting curious about you, why?
[01:41.00]말도 안 돼, I'm not kidding | No way, I'm not kidding
[01:43.00](I'm not)
[01:44.00]시간이 갈수록 깊어, 깊어, 깊어져 | As time goes by, it gets deeper, deeper, deeper
[01:46.00]가는 나잖아 (나잖아) | That's what's happening to me (to me)
[01:50.00]뺏긴 my heart, that girl's a killer (killer, killer) | She stole my heart, that girl's a killer (killer, killer)
[01:52.00]Love so good, feels like a thriller (thriller, thriller)
[01:54.00]시작됐지, 이건 emergency (vroom) | It has started, this is an emergency (vroom)
[01:59.00]One-one-nine, one-one-nine (one-one-nine)
[02:02.00]Save my life, save my life (save my life)
[02:04.00]She sets me free
[02:07.00]이건 emergency love (love) | this is an emergency love (love)
[02:08.00]Yeah, 이건 뭘까? | Yeah, what is this?
[02:09.50]You know what I'm talking about
[02:11.00]왜 이렇게 나의 맘이 어지러운 걸까? | Why is my heart so dizzy like this?
[02:14.00]이 모든 게 내가 널 좋아하는 건가? | Does all this mean I like you?
[02:16.00]난 그럼 더 이상 끌고 싶지 않아, ooh | Then I don't want to drag it out any longer, ooh
[02:19.00]다른 건 (다른 건) | Everything else (everything else)
[02:21.00]nothing but (nothing but)
[02:24.00]I want it all with you
[02:29.00]뺏긴 my heart, that girl's a killer (killer) | She stole my heart, that girl's a killer (killer)
[02:31.00]Love so good, feels like a thriller (thriller)
[02:33.00]시작됐지, 이건 emergency (oh, vroom) | It has started, this is an emergency (oh, vroom)
[02:38.00]One-one-nine, one-one-nine (oh, one-one-nine)
[02:41.00]Save my life, save my life (save my life)
[02:43.00]She sets me free (hey)
[02:45.00]이건 emergency love (love) | this is an emergency love (love)
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
