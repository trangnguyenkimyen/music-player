// Dữ liệu lrc
const rawLrc = `
[00:12.229] Hey girl, where you at?
[00:13.493] (Where you at?)
[00:15.176] Daeche eodiseo mwo haneunji gunggeumhae
[00:18.023] Gibuni neomu bad, bad
[00:20.269] (So bad)
[00:21.520] Chimdaega heojeonhae jami an ojana
[00:24.468] Jaemido eopseo TV show
[00:26.506] Neo derigo noldeon pretty boy
[00:28.102] Geu gomineul naege teoreonoteon
[00:29.761] Neoui pyojeongi ajik seonmyeonghae
[00:31.400] Sopae ben ni hyanggiga birithae
[00:32.995] Nae momi jakku ppajyeo gipi, yeah
[00:34.812] Miri arado nan iri
[00:36.121] Mеongcheonghage haengdongеul haebeorindanikka
[00:38.383] Oh, please
[00:39.100] Love me, love me, love me
[00:40.251] I know, I'm stupid
[00:41.639] Eojjeol su eopseo neol bogo sipeungeol
[00:44.039] Oh, please
[00:45.403] Love me, love me, love me
[00:46.591] I know, I'm stupid
[00:48.014] Eojjeol su eopseo neol bogo sipeungeol
[00:50.482] Now I say, I love you
[00:52.053] So I love you
[00:53.638] Now I say, I love you
[00:55.198] Na apeudeorado molla
[00:57.149] Now I say, I love you
[00:58.542] So, I love you
[00:59.962] Now I say, I love you
[01:01.619] Na apeudeorado molla
[01:03.959] Oh, please
[01:05.006] Love me, love me, love me
[01:06.019] I know, I'm stupid
[01:07.419] Eojjeol su eopseo neol bogo sipeungeol
[01:10.380] Oh, please
[01:11.381] Love me, love me, love me
[01:12.564] I know, I'm stupid
[01:13.969] Eojjeol su eopseo neol bogo sipeungeol
[01:16.268] Now I say, I love you
[01:17.867] Try, try
[01:18.817] Malhalkka nae burane buraneul
[01:20.321] Kkeunkyeotdaneun Wi-Fi
[01:21.745] Ijen an mideo Lie, lie
[01:23.360] Maeil ppajyeoitdeon neoui banjigachi
[01:25.001] Heojeonham saisai
[01:26.581] Geu jariui gihoereul
[01:27.944] Amuegena jugo tto, bye-bye
[01:30.075] Neoneun neom ppalli deulleotda gagi ttaeme
[01:32.501] Naneun taiming an maja maeil bappi
[01:33.681] Hwareul naeya halji animyeon geunyang agicheoreom
[01:35.348] Ureobeorigoseo ttereul sseoya halji
[01:37.062] I don't know aye moreugesseo
[01:38.499] Ireoni naega noryeokaedo
[01:40.013] Sigani eopseuni eojjeogesseo
[01:41.570] Hal mari hanabakke deo itgesseo
[01:43.246] Oh, please
[01:43.907] Love me, love me, love me
[01:45.195] I know, I'm stupid
[01:46.496] Eojjeol su eopseo neol bogo sipeungeol
[01:48.889] Oh, please
[01:50.253] Love me, love me, love me
[01:51.489] I know, I'm stupid
[01:52.812] Eojjeol su eopseo neol bogo sipeungeol
[01:59.578] Now I say, I love you
[02:01.399] So, I love you
[02:03.030] Now I say, I love you
[02:04.558] Na apeudeorado molla
[02:06.698] Now I say, I love you
[02:07.933] So, I love you
[02:09.455] Now I say, I love you
[02:11.052] Na apeudeorado molla
[02:13.456] Oh, please
[02:14.278] Love me, love me, love me
[02:15.332] I know, I'm stupid
[02:16.797] Eojjeol su eopseo neol bogo sipeungeol
[02:19.664] Oh, please
[02:20.627] Love me, love me, love me
[02:21.876] I know, I'm stupid
[02:23.196] Eojjeol su eopseo neol bogo sipeungeol
[02:25.561] Now I say, I love you
[02:27.218] Oh, please
[02:27.850] Love me, love me, love me
[02:28.762] Oh, please
[02:30.440] Love me, love me, love me
[02:31.817] Oh, please
[02:33.593] Love me, love me, love me
[02:34.854] I know, I'm stupid
[02:36.257] Eojjeol su eopseo neol bogo sipeungeol
[02:38.594] Now I say, I love you
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
let lastUpdateTime = 0; // Biến giới hạn fps thanh cuộn chống lag

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;

  // 1. CHỐNG LAG THANH THỜI GIAN: Chỉ cập nhật giao diện 4 lần/giây thay vì liên tục
  if (Date.now() - lastUpdateTime > 250) {
    if (audio.duration) {
      progressBar.value = (currentTime / audio.duration) * 100;
      currentTimeEl.innerText = formatTime(currentTime);
    }
    lastUpdateTime = Date.now();
  }

  // 2. CHẠY LỜI BÀI HÁT
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

    // Yêu cầu trình duyệt lên lịch chuyển đổi khung hình tiếp theo (chống khựng chữ)
    requestAnimationFrame(() => {
      setTimeout(() => {
        currentLyricEl.innerText = lyricsData[activeIndex].text || "♪ ♪ ♪";
        currentLyricEl.style.opacity = 1;
      }, 200);
    });
  }
});

// Khi hết bài nhạc
audio.addEventListener("ended", () => {
  playBtn.innerHTML = playIcon;
  progressBar.value = 0;
  currentTimeEl.innerText = "0:00";
  discSpin.style.animationPlayState = "paused";
});
