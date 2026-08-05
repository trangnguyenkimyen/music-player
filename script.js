// Dữ liệu lrc
const rawLrc = `
[00:21.00]대체 뭔 말이 많아 | Why do you talk so much?
[00:23.00]너가 내 속을 알아 | Like you know what's on my mind
[00:24.00]그냥 싫다면 떠나 | If you don't want me, just leave
[00:27.00]넌 내 시간을 뺏어 | You keep wasting all my time
[00:28.00]필요 없다고 버려 | Tossed me out like I meant nothing
[00:30.00]그런 사람이라서, yeah | That's just the way you are, yeah
[00:32.00]I hope you understand what I'm saying (yeah)
[00:35.00]I hope you understand what I'm saying (yeah)
[00:38.00]I hope you understand what I'm saying (yeah)
[00:41.00]I hope you understand what I'm saying (yeah)
[00:44.00]너 왜 자꾸 화내는 건데 | Why do you keep getting mad?
[00:46.00]I did nothing to you 그건 서운해 | I did nothing to you, that hurts
[00:49.00]그래 맘은 문을 닫았네 | Guess you've shut your heart for good
[00:52.00]시간에 무뎌지면 좋겠네 | Hope time will make this fade away
[00:55.00]I'm just doing what I gotta do
[00:57.00]몰라서 물어 더우니까 화내지 말고 | I'm just asking, don't lose your cool
[01:00.00]내가 널 왜 믿어 뭘 보고 안 봐도 뻔해 | Why should I trust you? I know how this goes
[01:02.00]Look at this picky eater
[01:04.00]발 담그고 도망 | You dip your toes, then run away
[01:05.00]갈 거 알고 있으니 그냥 빨리 물러가 | If you're leaving anyway, just go
[01:07.00]온도는 내려가지 않아 | The heat just won't die down
[01:10.00]너도 내 속 모르면서 | You don't know what's in my heart
[01:11.00]이해 바라고 있잖아 | Still asking me to understand
[01:13.00]그러니 날 미워하지 마 | So don't go blaming me
[01:15.00]나도 니 속 모르면서 | I don't know your heart either
[01:17.00]벌써 판단하고 있잖아 | Still I judged you way too soon
[01:18.00]대체 뭔 말이 많아 | Why do you talk so much?
[01:19.00]너가 내 속을 알아 | Like you know what's on my mind
[01:20.00]그냥 싫다면 떠나 | If you don't want me, just leave
[01:23.00]넌 내 시간을 뺏어 | You keep wasting all my time
[01:25.00]필요 없다고 버려 | Tossed me out like I meant nothing
[01:26.00]그런 사람이라서, yeah | That's just the way you are, yeah
[01:29.00]I hope you understand what I'm saying (yeah)
[01:31.00]I hope you understand what I'm saying (yeah)
[01:34.00]I hope you understand what I'm saying (yeah)
[01:37.00]I hope you understand what I'm saying (yeah)
[01:40.00]대체 뭔 말이 많아 | Why do you talk so much?
[01:42.00]이해해 주길 바라지마 | Don't expect me to understand
[01:44.00]내가 여태껏 해준 건 | After all I've done for you
[01:45.00]어디로 갔나 | Where did it all go?
[01:47.00]너를 말할 때 도망만 갔네 | You always ran from every talk
[01:50.00]사랑은 누구 죄 똑같은 무게 | Love weighs the same on both of us
[01:53.00]근데 너 비교만 해 | But you only compare
[01:55.00]그러고는 할말 안 해 | Then you don't say a word
[01:56.00]그러니 안 아파 내 마음이 | My heart doesn't hurt no more
[01:59.00]널 믿을 수 있는 껀덕지 하나라도 | I just needed one reason to trust you
[02:03.00]주길 바랬어 | I hoped you'd give me one
[02:05.00]같이 있던 곳이 담긴 앨범은 | That album full of memories
[02:10.00]이 추운 날씨에 나처럼 혼자 있어 | Sitting alone, just like me
[02:14.00]대체 뭔 말이 많아 | Why do you talk so much?
[02:16.00]너가 내 속을 알아 | Like you know what's on my mind
[02:17.00]그냥 싫다면 떠나 | If you don't want me, just leave
[02:20.00]넌 내 시간을 뺏어 | You keep wasting all my time
[02:21.00]필요 없다고 버려 | Tossed me out like I meant nothing
[02:23.00]그런 사람이라서 yeah | That's just the way you are, yeah
[02:25.00]I hope you understand what I'm saying (yeah)
[02:28.00]I hope you understand what I'm saying (yeah)
[02:31.00]I hope you understand what I'm saying (yeah)
[02:33.00]I hope you understand what I'm saying (yeah)
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
