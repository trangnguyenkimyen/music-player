// Dữ liệu lrc
const rawLrc = `
[00:00.50]Love is painful, all the love is painful (huh)
[00:04.00]바보처럼 반복 | Like a fool, I do it over and over
[00:05.50]that's what I always do
[00:08.10]But pain is beautiful (yeah), it's same as you
[00:11.67]희망은 실망으로, 소망은 절망으로 | Hope turns into disappointment, wishes turn into despair
[00:15.50]사랑이 깊어질수록 | The deeper the love gets
[00:17.80]아픔은 deep해 더 | The deeper the pain gets too
[00:19.73]이번엔 다를 거란 착각 혹은 기대, uh | Thinking this time would be different, or maybe just hoping, uh
[00:23.41]결국 몇 년이 지났을까? | In the end, how many years have passed?
[00:27.06]영원이란 건 없다 | Nothing lasts forever
[00:30.71]결국 인연이 아닌 걸까 | Maybe we were never meant to be
[00:34.65]다시 혼자가 되다 | And here I am alone again
[00:38.58]겨우, 겨우, 겨우 | Just when, just when, just when
[00:44.00]진짜 사랑을 찾은 줄 알다가 | I thought I'd finally found true love
[00:48.00]결국, 또 결국, | In the end, once again
[00:51.23]이렇게 끝나버린다 | It all ends like this
[00:54.45]내 마음은 처음부터 그대로인데 | My heart's been the same from the start
[00:57.45]상처로 가득해 | It's covered in scars
[01:00.68]이젠 그대로 인해 | And now it's all because of you
[01:02.95]점점 변해가 | I'm slowly changing
[01:05.00]차가운 네 목소리에 나도 식어가고 | Your cold voice is making me grow cold too
[01:10.00]멀어지는 우리 사이 | The distance between us keeps growing
[01:12.00]되돌리기엔 | Too far gone
[01:13.98]아무 감정 없이 | With nothing left to feel
[01:14.96]서로를 맴돌기엔 | We're just going in circles
[01:18.00]힘에 겨워 나 | I'm too tired to go on
[01:19.64]이별을 선물하고 돌아서 | So I say goodbye and walk away
[01:22.52]I'm fallin' without you
[01:32.33]결국 누구의 잘못일까? | In the end, whose fault is it?
[01:37.35]사랑이란 건 없다 | Maybe there's no such thing as love
[01:40.38]결국 이별이 지는 걸까 | In the end, does goodbye always win?
[01:45.42]지쳐 나 잠이 들다 | Worn out, I fall asleep
[01:47.43]겨우, 겨우, 겨우 | Just when, just when, just when
[01:53.00]여기까지가 마지막인지 우린 | Is this really where it ends for us?
[01:58.00]결국, 또 결국, | In the end, once again
[02:04.00]또 다시 남이 되나 | Do we become strangers again?

[02:05.92]내 마음은 처음부터 그대로인데 | My heart's been the same from the start
[02:10.03]상처로 가득해 | It's covered in scars
[02:12.12]이젠 그대로 인해 | And now it's all because of you
[02:14.00]점점 변해가 | I'm slowly changing
[02:16.46]차가운 네 목소리에 나도 식어가고 | Your cold voice is making me grow cold too
[02:20.88]멀어지는 우리 사이 | The distance between us keeps growing
[02:23.45]되돌리기엔 | Too far gone
[02:25.05]아무 감정 없이 | With nothing left to feel
[02:27.00]서로를 맴돌기엔 | We're just going in circles
[02:29.89]힘에 겨워 나 | I'm too tired to go on
[02:32.10]이별을 선물하고 돌아서 | So I say goodbye and walk away
[02:35.03]I'm fallin' without you
[02:38.67]Yeah, I'm fallin' without you, hey
[02:43.00]Uh, let's go

[02:45.00]처음에는 몰랐겠지 | You probably didn't know at first
[02:46.23]그녀의 빈 자리가 좋았겠지 | You probably liked having her gone
[02:48.05]하루 이틀 모레 지나 보낸 | A day passed, then two, then another
[02:50.00]뒤에서야 비로소 그녀가 고맙겠지 | Only then did you realize how much you appreciated her
[02:52.00]몰랐겠지 네 자신에 대해 | You probably didn't know yourself
[02:54.00]너 없이 | Without her
[02:54.50]잘 살 수 있다던 그 확신에 대해 | Or how sure you were you'd be just fine
[02:56.00]오늘과 다른 내일 | Tomorrow's different from today
[02:57.50]벌써 1, 2년 | And suddenly, one or two years have passed
[02:58.41]이 시련만큼 늘어나는 미련 | My regrets grow with every hardship
[03:02.50](미련, 미련, 미련) | (Regrets, regrets, regrets)
[03:08.08]시간이 지나면 달라지길 기도해 | I pray things will change with time
[03:14.50]For you, my baby, hey

[03:16.00]내 마음은 처음부터 그대로인데 | My heart's been the same from the start
[03:19.50]상처로 가득해 | It's covered in scars
[03:21.00]이젠 그대로 인해 (for you, my baby) | And now it's all because of you (for you, my baby)
[03:24.00]점점 변해가 | I'm slowly changing
[03:26.00]차가운 네 목소리에 나도 식어가고 | Your cold voice is making me grow cold too
[03:31.27]멀어지는 우리 사이 | The distance between us keeps growing
[03:33.50]되돌리기엔 | Too far gone
[03:35.29]아무 감정 없이 | With nothing left to feel
[03:37.20]서로를 맴돌기엔 | We're just going in circles
[03:39.50]힘에 겨워 나 | I'm too tired to go on
[03:42.00]이별을 선물하고 돌아서 | So I say goodbye and walk away
[03:44.50]I'm fallin' without you
[03:52.00]Yeah, I'm fallin' without you
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
