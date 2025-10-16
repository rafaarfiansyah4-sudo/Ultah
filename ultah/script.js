const questions = [
  "Halloowww Fitaaa ❤️",
  "Berapa umur kamu di tahun ini?🤔 ",
  "Apa harapan kamu di ulang tahun kali ini?",
  "Lanjutkan jika kamu ingin mengetahui sesuatu!!!"
];

let current = 0;
let ulangTahunKe = "";
let harapan = "";
let q1 = "";
let q4 = "";

const questionDiv = document.getElementById('question');
const nextBtn = document.getElementById('nextBtn');
const birthdayDiv = document.getElementById('birthday');
const greetingText = document.getElementById('greetingText');
const harapanText = document.getElementById('harapanText');
const harapanDoa = document.getElementById('harapanDoa');
const jawabanForm = document.getElementById('jawabanForm');
const infoKirim = document.getElementById('infoKirim');
const uploadPhoto = document.getElementById('uploadPhoto');
const preview = document.getElementById('preview');
const partyCanvas = document.getElementById('party');

function showQuestion() {
  if (current < questions.length) {
    if (questions[current].includes("🤔")) {
      questionDiv.innerHTML = questions[current] +
        '<br><input type="number" id="inputUmur" min="1" max="100" style="margin-top:10px;">';
    } else if (questions[current].includes("harapan kamu")) {
      questionDiv.innerHTML = questions[current] +
        '<br><textarea id="inputHarapan" placeholder="Tulis harapanmu di sini..."></textarea>';
    } else {
      questionDiv.textContent = questions[current];
    }
  } else {
    questionDiv.style.display = "none";
    nextBtn.style.display = "none";
    birthdayDiv.style.display = "block";
    greetingText.innerHTML = `Selamat ulang tahun yang ke-${ulangTahunKe || "___"}!<br>
    Udah ${ulangTahunKe || "___"} aja yaa, selamat ulang tahun yaappss! Semoga kamu selalu dalam lindungan Allah, rezekinya lancar, dan hatinya tetep lembut kayak sekarang 😚💫`;
    harapanText.innerHTML = harapan ? `<b>Harapan kamu:</b> <br> "${harapan}"` : "";
    harapanDoa.textContent = "aku harap semua harapan kamu tercapai yaaa.... amiinnn";

    // Isi data ke form
    document.getElementById('formUlangTahun').value = ulangTahunKe;
    document.getElementById('formHarapan').value = harapan;
    document.getElementById('formQ1').value = q1;
    document.getElementById('formQ4').value = q4;
  }
}

nextBtn.onclick = () => {
  if (questions[current].includes("🤔")) {
    const input = document.getElementById('inputUmur');
    ulangTahunKe = input && input.value ? input.value : "";
  }
  if (questions[current].includes("harapan kamu")) {
    const input = document.getElementById('inputHarapan');
    harapan = input && input.value ? input.value : "";
  }
  if (current === 0) {
    q1 = questionDiv.textContent || "";
  }
  if (current === 3) {
    q4 = questionDiv.textContent || "";
  }
  current++;
  showQuestion();
};

// Foto upload preview (satu saja)
uploadPhoto.onchange = function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
    preview.innerHTML = `<img src="${evt.target.result}" alt="Foto Kamu" style="width:120px;height:120px;border-radius:50%;border:2px solid #db6d88;margin-bottom:12px;">`;
  };
  reader.readAsDataURL(file);
};

// Info kirim form + party popper effect
jawabanForm.addEventListener('submit', function(e) {
  setTimeout(() => {
    jawabanForm.classList.add('hidden');
    infoKirim.classList.remove('hidden');
    showPartyPopper();
  }, 1500);
});

// Simple party popper / confetti effect (canvas animation)
function showPartyPopper() {
  partyCanvas.width = window.innerWidth;
  partyCanvas.height = window.innerHeight;
  partyCanvas.classList.remove('hidden');
  const ctx = partyCanvas.getContext('2d');
  const confetti = [];
  const colors = ["#db6d88", "#ffd700", "#7ee2fa", "#f08080", "#b5ead7", "#fff0f6"];
  for (let i=0; i<80; i++) {
    confetti.push({
      x: Math.random() * partyCanvas.width,
      y: Math.random() * -partyCanvas.height/2,
      r: Math.random() * 8 + 6,
      c: colors[Math.floor(Math.random()*colors.length)],
      d: Math.random()*2+1
    });
  }
  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, partyCanvas.width, partyCanvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
      ctx.fillStyle = c.c;
      ctx.fill();
      c.y += c.d + Math.random()*2;
      c.x += Math.sin(frame/10) * 2;
      if (c.y > partyCanvas.height) c.y = Math.random()*-partyCanvas.height/4;
    });
    frame++;
    if (frame < 120) requestAnimationFrame(animate);
    else setTimeout(()=>partyCanvas.classList.add('hidden'), 500);
  }
  animate();
}

showQuestion();