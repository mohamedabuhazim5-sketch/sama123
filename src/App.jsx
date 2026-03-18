import { useEffect, useMemo, useRef, useState } from "react";
import {
  Heart,
  Lock,
  Clock3,
  Music2,
  Pause,
  Gift,
  Sparkles,
  ImageIcon,
  ChevronDown,
  MailOpen,
  Stars,
  PartyPopper,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const START_DATE = "2025-05-19T00:00:00";
const PASSWORD = "sama";
const SITE_NAME = "سما";

const storyCards = [
  {
    title: "وجودك فرق",
    subtitle: "اضغطي علشان الرسالة",
    message:
      "مع نهاية شهر رمضان وبداية عيد الفطر، حبيت أقولك إن وجودك في حياتي فرق معايا أكتر مما تتخيلي. وجودك بقى جزء جميل من أيامي فعلًا.",
  },
  {
    title: "ضحكتك",
    subtitle: "فيها حاجة مختلفة",
    message:
      "كلامك البسيط، وضحكتك اللي بتيجي فجأة… بيقدروا يغيّروا يوم كامل ويخلّوه أخف وأجمل، وده شيء جميل أوي عندي.",
  },
  {
    title: "مكانتك عندي",
    subtitle: "رسالة صغيرة من قلبي",
    message:
      "حابب أقولك إنك أرق وأحسن وأجمل بنوته في عيني، ولو عملت عشانك أي حاجة فهي أقل من اللي إنتِ تستحقيه أكيد.",
  },
  {
    title: "وعدي ليكي",
    subtitle: "وهفضل عنده",
    message:
      "وبقدر المستطاع هحاول أسعدك وأفرحك، وأفضل أعملك حاجات تليق بمكانتك الحلوة في قلبي.",
  },
  {
    title: "وجودك",
    subtitle: "خلّى الأيام أحلى",
    message:
      "أيامي احلوت بصحبتك ووجودك، وخفة روحك طيبة على القلب بشكل مش عادي.",
  },
  {
    title: "دعوة من قلبي",
    subtitle: "أمنية ليكي",
    message:
      "ربنا يجبر بخاطرك ويسعدك يا رب، ويفضل الفرح قريب منك على طول، لأنك تستحقي كل حاجة حلوة.",
  },
];

const galleryImages = [
  "/profile.jpg/1.jpg",
  "/profile.jpg/2.jpg",
  "/profile.jpg/3.jpg",
  "/profile.jpg/4.jpg",
];

const specialMoments = [
  {
    image: "/profile.jpg/1.jpg",
    title: "لحظة مميزة",
    text: "أجمل لحظة بينكم هنا",
  },
  {
    image: "/profile.jpg/2.jpg",
    title: "صورة حلوة",
    text: "وصف بسيط للصورة",
  },
  {
    image: "/profile.jpg/3.jpg",
    title: "لحظة مميزة",
    text: "أجمل لحظة بينكم هنا",
  },
  {
    image: "/profile.jpg/4.jpg",
    title: "لحظة مميزة",
    text: "أجمل لحظة بينكم هنا",
  },
];

function useCounter(startDate) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  return useMemo(() => {
    const start = new Date(startDate);
    const diff = now - start;

    const totalMinutes = Math.max(0, Math.floor(diff / (1000 * 60)));
    const totalHours = Math.max(0, Math.floor(diff / (1000 * 60 * 60)));
    const totalDays = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));

    return { totalDays, totalHours, totalMinutes };
  }, [now, startDate]);
}

function FloatingHearts() {
  const items = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 10 + Math.random() * 14,
    duration: 9 + Math.random() * 8,
    delay: Math.random() * 5,
    x1: -8 + Math.random() * 16,
    x2: -15 + Math.random() * 30,
  }));

  return (
    <div className="floating-hearts" aria-hidden="true">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="floating-heart"
          style={{ left: item.left }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: -1000,
            opacity: [0, 0.45, 0],
            x: [0, item.x1, item.x2, 0],
            rotate: [0, -6, 6, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
          }}
        >
          <Heart size={item.size} />
        </motion.div>
      ))}
    </div>
  );
}

function MusicButton({ shouldStart }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const startAudio = async () => {
      if (!shouldStart || !audioRef.current || playing) return;

      try {
        audioRef.current.volume = 0.45;
        await audioRef.current.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };

    startAudio();
  }, [shouldStart, playing]);

  const toggle = async () => {
    if (!audioRef.current) return;

    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current.volume = 0.45;
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto" src="/profile.jpg/love.mp3" />
      <button className="music-btn" onClick={toggle} type="button">
        {playing ? <Pause size={18} /> : <Music2 size={18} />}
      </button>
    </>
  );
}
function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="section-title">
      <div className="section-icon">
        <Icon size={18} />
      </div>
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}

function OpeningScreen({ onStart }) {
  return (
    <motion.div
      className="opening-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="opening-heart-wrap"
        animate={{ scale: [1, 1.06, 1], rotate: [0, -3, 3, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Heart size={40} className="opening-heart" />
      </motion.div>

      <h1>هدية صغيرة لـ {SITE_NAME}</h1>
      <p>
        حاجة معمولة مخصوص علشان نهاية رمضان وبداية العيد تفضل ذكرى جميلة
        ومختلفة بينكم
      </p>

      <button className="primary-btn" type="button" onClick={onStart}>
        افتحي البداية
      </button>
    </motion.div>
  );
}

function StoryCard({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        type="button"
        className={`story-card ${open ? "active" : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="story-card-head">
          <div className="story-card-icon">
            <Sparkles size={16} />
          </div>

          <div className="story-card-content">
            <div className="story-card-top">
              <h3>{item.title}</h3>
              <span>{item.subtitle}</span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="story-card-body-wrap"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="story-card-body">{item.message}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

function SecretMessage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-card">
      <SectionTitle
        icon={MailOpen}
        title="رسالة مخفية"
        subtitle="رسالة صغيرة مخصوص ليكي"
      />

      <div className="centered">
        <button
          className="primary-btn"
          type="button"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "إخفاء الرسالة" : "افتحي الرسالة"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="secret-box"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            مهما أقول، هيفضل في كلام أكتر من اللي أقدر أكتبه… لكن يكفيني إنك
            بقيتي حاجة جميلة ومميزة في قلبي، وكل سنة وإنتِ بخير يا سما ♡
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SurpriseCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-card">
      <SectionTitle
        icon={PartyPopper}
        title="سوربرايز صغيرة"
        subtitle="كارتة مخصوصة ليكي"
      />

      <div className="centered">
        <button
          className="primary-btn"
          type="button"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "إخفاء السوربرايز" : "افتحي السوربرايز"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="surprise-card"
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
          >
            <div className="surprise-top">
              <Gift size={22} />
              <span>هدية مخصوصة</span>
            </div>
            <h3>كل سنة وإنتِ أجمل حاجة حلوة</h3>
            <p>
              وكنت عند اتفاقي، فعدّيتك واديني جبتها لكِ بتاريخ ميلادك المحبب
              لقلبي… وآه يا ستي تصرفيها عادي وأجيب لك غيرها 😂
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [enteredIntro, setEnteredIntro] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const counter = useCounter(START_DATE);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (input.trim().toLowerCase() === PASSWORD.toLowerCase()) {
      setAuthorized(true);
      setError("");
    } else {
      setError("كلمة السر مش صحيحة 💜");
    }
  };

  const scrollToContent = () => {
    const el = document.getElementById("content");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
     <MusicButton shouldStart={enteredIntro || authorized} />

      <div className="app-shell">
        <div className="bg-layer" />
        <div className="blur-orb orb-1" />
        <div className="blur-orb orb-2" />
        <FloatingHearts />

        <AnimatePresence>
          {loading && (
            <motion.div
              className="loading-screen"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="loading-box">
                <motion.div
                  className="loading-heart-wrap"
                  animate={{ scale: [1, 1.06, 1], rotate: [0, -4, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                >
                  <Heart size={38} className="loading-heart" />
                </motion.div>

                <h1>هدية صغيرة لـ {SITE_NAME}</h1>
                <p>كل حاجة هنا معمولالك من القلب</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && !enteredIntro ? (
          <OpeningScreen onStart={() => setEnteredIntro(true)} />
        ) : (
          <main className="page">
            {!authorized ? (
              <div className="login-wrap">
                <motion.div
                  className="glass-card login-card"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="login-avatar">
                    <img src="/profile.jpg/profile.jpg" alt="سما" />
                  </div>

                  <div className="login-lock">
                    <Lock size={22} />
                  </div>

                  <h1 className="login-title">جاهزة؟ 🤍</h1>
                  <p className="login-subtitle">
                    لو إنتِ يا صاحبة أجمل ضحكة، اكتبي الباسورد
                  </p>

                  <form className="login-form" onSubmit={handleLogin}>
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="اكتبي الباسورد"
                    />

                    {error ? <p className="error-text">{error}</p> : null}

                    <button className="primary-btn full" type="submit">
                      يلا نبدأ
                    </button>
                  </form>
                </motion.div>
              </div>
            ) : (
              <div className="content-stack">
                <motion.section
                  className="glass-card hero-card"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="hero-overlay" />
                  <div className="hero-content">
                    <div className="hero-image-wrap">
                      <div className="hero-image-glow" />
                      <img
                        src="/profile.jpg"
                        alt="سما"
                        className="hero-image"
                      />
                    </div>

                    <div className="hero-badge">
                      <Stars size={15} />
                      <span>لأغلى حد في قلبي</span>
                    </div>

                    <h1>{SITE_NAME}</h1>
                    <p>
                      مع نهاية رمضان وبداية العيد، كان لازم تبقى النهاية مختلفة…
                      ويبقى ليكي حاجة معمولة مخصوص علشانك.
                    </p>

                    <button
                      className="primary-btn"
                      type="button"
                      onClick={scrollToContent}
                    >
                      افتحي الهدية
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </motion.section>

                <div id="content" className="content-stack">
                  <div className="glass-card">
                    <SectionTitle
                      icon={Clock3}
                      title="من أول قرب بينكم"
                      subtitle="من 19 / 05 / 2025 لحد دلوقتي"
                    />

                    <div className="counter-box">
                      <div className="counter-label">عدّى</div>
                      <div className="counter-number">{counter.totalDays}</div>
                      <div className="counter-unit">يوم</div>
                    </div>

                    <div className="mini-stats">
                      <div className="mini-stat">
                        <strong>{counter.totalHours}</strong>
                        <span>ساعة</span>
                      </div>
                      <div className="mini-stat">
                        <strong>{counter.totalMinutes}</strong>
                        <span>دقيقة</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card">
                    <SectionTitle
                      icon={Gift}
                      title="رسالة العيد"
                      subtitle="كلام من القلب لنهاية رمضان وبداية عيد الفطر"
                    />

                    <div className="message-text">
                      <p>
                        مع نهاية شهر رمضان وبداية عيد الفطر، حبيت أقولك إن
                        وجودك في حياتي فرق معايا أكتر مما تتخيلي. كلامك البسيط،
                        وضحكتك اللي بتيجي فجأة… بيقدروا يغيّروا يوم كامل
                        ويخلّوه أخف وأجمل.
                      </p>

                      <p>
                        حابب اقولك انك ارق واحسن واجمل بنوته ف عيني، ولو عملت
                        عشانك أي حاجة فهي أقل من اللي إنتِ تستحقيه أكيد.
                      </p>

                      <p>
                        وبقدر المستطاع هحاول اسعدك و افرحك، أيامي احلوت بصحبتك و
                        وجودك، خفيفة ع القلب و روحك طيبة.
                      </p>

                      <p>ربنا يجبر بخاطرك و يسعدك يارب.</p>

                      <p>
                        وعدتك ان رمضان دا هيكون مميز و هحاول بقدر الإمكان افرحك
                        فيه، وزي ما ابتدي بحاجة تفرحك و متعملتش لحد قبلك، ف لازم
                        نهايته تكون كريتف برضه. كل عام وانت بخير يا كل الخير ♡
                      </p>
                    </div>
                  </div>

                  <div className="glass-card">
                    <SectionTitle
                      icon={Sparkles}
                      title="كروت مخصوصة"
                      subtitle="كل كارت فيه رسالة، اضغطي عليه"
                    />

                    <div className="cards-grid">
                      {storyCards.map((item, index) => (
                        <StoryCard key={item.title} item={item} index={index} />
                      ))}
                    </div>
                  </div>

                  <SurpriseCard />

                  <div className="glass-card">
                    <SectionTitle
                      icon={ImageIcon}
                      title="ذكرياتكم"
                      subtitle="صوركم الحقيقية هنا"
                    />

                    <div className="gallery-grid">
                      {galleryImages.map((src, index) => (
                        <motion.div
                          key={src}
                          className={`gallery-item ${
                            index === 0 ? "gallery-wide" : ""
                          }`}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.04 }}
                        >
                          <img src={src} alt={`memory-${index + 1}`} />
                          <div className="gallery-overlay" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <SecretMessage />

                  <div className="glass-card footer-card">
                    <div className="footer-gift">
                      <Gift size={22} />
                    </div>
                    <h2>كل عام وإنتِ بخير يا سما</h2>
                    <p>
                      ويا رب أقدر دايمًا أفرحك، وأفضل أعملك حاجات تليق بمكانتك
                      الحلوة في قلبي.
                    </p>
                    <button className="primary-btn" type="button">
                      عيد سعيد يا كل الخير ♡
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        )}
      </div>
    </>
  );
}