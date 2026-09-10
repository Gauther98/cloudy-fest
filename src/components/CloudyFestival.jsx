import React, { useState, useEffect, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import generatePayload from 'promptpay-qr';

// Component สำหรับสร้าง Dynamic PromptPay QR Code และข้อมูลโอนเงิน
function PromptPayCard({ phoneNumber, accountNumber, accountName, amount }) {
  const [copied, setCopied] = useState(false);
  
  const qrPayload = useMemo(() => {
    return generatePayload(phoneNumber, { amount: Number(amount) });
  }, [phoneNumber, amount]);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber.replace(/-/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
        <div className="text-xs text-emerald-400 font-semibold flex items-center justify-between">
          <span>ธนาคารกสิกรไทย</span>
          <button 
            type="button"
            onClick={handleCopy}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-gray-300 px-2 py-0.5 rounded border border-slate-700 transition cursor-pointer"
          >
            {copied ? 'คัดลอกแล้ว!' : 'คัดลอกเลขบัญชี'}
          </button>
        </div>
        <div className="text-sm font-mono text-white tracking-wide">{accountNumber}</div>
        <div className="text-[11px] text-gray-400">ชื่อบัญชี: {accountName}</div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-xl relative overflow-hidden">
        <div className="flex items-center space-x-2 mb-2 bg-blue-950/60 border border-blue-800/50 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          <span className="text-[11px] font-semibold text-blue-300 tracking-wide">PROMPTPAY DYNAMIC QR</span>
        </div>

        <div className="bg-white p-3 rounded-xl shadow-inner border border-gray-200 my-1">
          <QRCodeSVG 
            value={qrPayload} 
            size={160} 
            level="H" 
            includeMargin={false}
          />
        </div>

        <div className="mt-2 space-y-0.5 w-full">
          <div className="text-[11px] text-gray-400">ยอดชำระสุทธิ</div>
          <div className="text-xl font-black text-emerald-400 tracking-tight">
            ฿{amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[10px] text-gray-500 pt-0.5">
            สแกนผ่านแอปธนาคารใดก็ได้ • ยอดเงินตรงทันที
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CloudyFestival() {
  const totalTickets = 10000;
  const [currentCount, setCurrentCount] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [heroPhoto, setHeroPhoto] = useState(null);

  const ticketPrice = 890;
  const totalAmount = ticketQuantity * ticketPrice;
  const promptPayNumber = "0812345678";
  const accountNumber = "123-4-56789-0";
  const accountName = "Cloudy Festival";

  // Countdown Logic
  useEffect(() => {
    const targetDate = new Date('2026-11-28T16:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("กรุณาแนบสลิปการโอนเงินก่อนยืนยันครับ");
      return;
    }
    setSubmitting(true);
    
    setTimeout(() => {
      setSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setFileName('');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleHeroPhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (heroPhoto) {
        URL.revokeObjectURL(heroPhoto);
      }
      setHeroPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const clearHeroPhoto = () => {
    if (heroPhoto) {
      URL.revokeObjectURL(heroPhoto);
      setHeroPhoto(null);
    }
  };

  useEffect(() => {
    const targetTickets = 6842;
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counterInterval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const count = Math.floor(easeOutProgress * targetTickets);

      setCurrentCount(count);

      if (frame >= totalFrames) {
        clearInterval(counterInterval);
        setCurrentCount(targetTickets);
      }
    }, frameRate);

    const targetPercentage = (targetTickets / totalTickets) * 100;
    const timer = setTimeout(() => {
      setProgressWidth(targetPercentage);
    }, 100);

    return () => {
      clearInterval(counterInterval);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (heroPhoto) {
        URL.revokeObjectURL(heroPhoto);
      }
    };
  }, [heroPhoto]);

  return (
    <div className="bg-[#0a0512] text-white font-['Kanit',sans-serif] scroll-smooth selection:bg-purple-500 selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
      `}</style>

      {/* STICKY TOP NAVBAR */}
      <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-purple-900/40 px-4 sm:px-8 py-3 flex items-center justify-between">
        <a href="#home" className="text-base sm:text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
          BACK TO CHILDHOOD
        </a>
        <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-gray-300">
          <a href="#home" className="hover:text-pink-400 transition">หน้าแรก</a>
          <a href="#presentation" className="hover:text-pink-400 transition">วิดีโอ</a>
          <a href="#festival" className="hover:text-pink-400 transition">LINE-UP</a>
          <a href="#buy-ticket" className="hover:text-pink-400 transition">ซื้อบัตร</a>
        </nav>
        <a 
          href="#buy-ticket" 
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-md shadow-pink-600/30"
        >
          ซื้อบัตรเข้างาน
        </a>
      </header>

      {/* Top Ticker Banner */}
      <div className="w-full bg-purple-600 text-white text-[11px] font-bold py-1.5 px-4 tracking-widest uppercase overflow-hidden whitespace-nowrap shadow-lg border-b border-purple-500/30">
        <div className="animate-marquee inline-block space-x-8">
          <span>LIVE MUSIC ✦ PLAYGROUND ✦ MUD ZONE ✦ KHAO YAI ✦ THREE STAGES ✦ LIVE MUSIC ✦ PLAYGROUND ✦ MUD ZONE ✦ KHAO YAI ✦ THREE STAGES</span>
        </div>
      </div>

      {/* SECTION 1: HERO */}
      <section
        id="home"
        className="min-h-screen relative flex flex-col justify-between pt-8 pb-16 px-4 sm:px-8 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10, 5, 18, 0.75), rgba(10, 5, 18, 0.95)), url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="max-w-5xl mx-auto w-full space-y-8 my-auto text-center pt-4">
          <div className="inline-block">
            <span className="bg-purple-950/80 border border-purple-500/40 text-gray-300 text-[10px] sm:text-xs font-semibold px-4 py-1 rounded-full tracking-widest uppercase backdrop-blur-md">
              28 NOVEMBER 2026 • KHAO YAI • ONE DAY ONLY
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight leading-none text-white uppercase font-sans">
              BACK TO
            </h1>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-[0.25em] text-gray-200 uppercase pt-2">
              CHILDHOOD FESTIVAL
            </h2>
          </div>

          {/* COUNTDOWN TIMER WIDGET */}
          <div className="max-w-lg mx-auto bg-slate-900/80 border border-purple-800/60 rounded-2xl p-4 backdrop-blur-md">
            <p className="text-[11px] font-bold text-pink-400 tracking-widest uppercase mb-2">COUNTDOWN TO SHOWTIME</p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-slate-950 p-2 rounded-xl border border-purple-900/50">
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">{timeLeft.days}</div>
                <div className="text-[9px] text-gray-400 uppercase font-semibold">DAYS</div>
              </div>
              <div className="bg-slate-950 p-2 rounded-xl border border-purple-900/50">
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">{timeLeft.hours}</div>
                <div className="text-[9px] text-gray-400 uppercase font-semibold">HOURS</div>
              </div>
              <div className="bg-slate-950 p-2 rounded-xl border border-purple-900/50">
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">{timeLeft.minutes}</div>
                <div className="text-[9px] text-gray-400 uppercase font-semibold">MINS</div>
              </div>
              <div className="bg-slate-950 p-2 rounded-xl border border-purple-900/50">
                <div className="text-2xl sm:text-3xl font-black text-pink-400 font-mono animate-pulse">{timeLeft.seconds}</div>
                <div className="text-[9px] text-gray-400 uppercase font-semibold">SECS</div>
              </div>
            </div>
          </div>

          <p className="text-gray-300 text-xs sm:text-sm font-light max-w-2xl mx-auto leading-relaxed pt-1">
            ทิ้งความเป็นผู้ใหญ่ไว้หน้าประตู แล้วกลับมาวิ่ง เล่น ร้อง และหัวเราะให้ดังเหมือนเมื่อก่อน
          </p>

          {/* Ticket Counter Box */}
          <div className="max-w-3xl mx-auto bg-slate-950/70 border border-purple-800/50 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-purple-950/50 space-y-6 mt-6">
            <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold tracking-wider text-gray-400">
              <span className="uppercase tracking-widest text-purple-200/80">THE CROWD IS GROWING</span>
              <div className="flex items-center space-x-1.5 text-pink-400">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                <span className="uppercase tracking-wider">LIVE TICKET COUNTER</span>
              </div>
            </div>

            <div className="flex justify-center items-baseline space-x-2 sm:space-x-4">
              <span className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-fuchsia-200 tabular-nums drop-shadow-[0_0_25px_rgba(217,70,239,0.3)]">
                {currentCount.toLocaleString()}
              </span>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-gray-300">/10,000</div>
                <div className="text-[10px] text-purple-300 font-semibold tracking-wider uppercase">TICKETS SOLD</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-3.5 w-full bg-slate-900/90 rounded-full overflow-hidden p-0.5 border border-purple-800/40 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-rose-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(236,72,153,0.8)]"
                  style={{ width: `${progressWidth}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#buy-ticket"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold px-10 py-4 rounded-xl text-base transition shadow-lg shadow-pink-600/30"
              >
                <span>จองที่ของคุณ</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PRESENTATION */}
      <section
        id="presentation"
        className="min-h-screen text-white p-6 pt-28 relative bg-cover bg-center flex flex-col justify-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10, 5, 18, 0.85), rgba(10, 5, 18, 0.95)), url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80')`,
        }}
      >
        <div className="max-w-4xl mx-auto w-full my-auto space-y-6">
          <div>
            <span className="bg-indigo-600 text-xs px-3 py-1 rounded-sm font-bold">02 PRESENTATION</span>
            <p className="text-xs text-gray-400 mt-1">วิดีโอพรีเซนเทชันงาน</p>
          </div>

          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/L_LUpnjgPso"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="flex justify-between items-end">
            <p className="text-sm text-gray-300">
              มาร่วมสร้างประสบการณ์ดนตรีที่มากกว่าคอนเสิร์ต
              <br />
              ไปด้วยกันกับ Back to Childhood Festival
            </p>
            <a
              href="#festival"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center space-x-2 transition"
            >
              <span>NEXT : THE LINE-UP</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 3: HEADLINERS & FESTIVAL */}
      <section id="festival" className="min-h-screen bg-slate-950 text-white p-6 pt-24 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto space-y-8 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded-sm">03 HEADLINERS</span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mt-2 text-white">LINE-UP & STAGES</h2>
            </div>
            <p className="text-xs text-gray-400 max-w-xs">3 เวทีการแสดง อัดแน่นด้วยศิลปินมากกว่า 20 วง ตลอดวันและคืน</p>
          </div>

          {/* HEADLINER CARDS (ปรับปรุงใหม่ตามตัวอย่าง) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Headliner 1 */}
            <div className="relative group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-pink-500/50 transition duration-300">
              <div className="h-80 w-full relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
                  alt="Headliner 1"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <span className="absolute top-3 left-3 bg-pink-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-widest">
                  MAIN STAGE • HEADLINER
                </span>
              </div>
              <div className="p-5 relative -mt-12 space-y-2">
                <div className="text-xs text-pink-400 font-mono font-semibold">21:30 - 23:00 PM</div>
                <h3 className="text-2xl font-black text-white">THE RETRO KIDS</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  วงป๊อปร็อกระดับแนวหน้าที่พาคุณย้อนเวลากลับสู่ยุค 2000s พร้อมโชว์สุดตระการตา
                </p>
              </div>
            </div>

            {/* Headliner 2 */}
            <div className="relative group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-purple-500/50 transition duration-300">
              <div className="h-80 w-full relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80"
                  alt="Headliner 2"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <span className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-widest">
                  MUD STAGE • HEADLINER
                </span>
              </div>
              <div className="p-5 relative -mt-12 space-y-2">
                <div className="text-xs text-purple-400 font-mono font-semibold">20:00 - 21:15 PM</div>
                <h3 className="text-2xl font-black text-white">MIDNIGHT SUN</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  อินดี้ร็อกซาวด์เฉพาะตัว โยกกันให้สุดแรงกลางโซนกิจกรรม Mud Playground
                </p>
              </div>
            </div>

            {/* Headliner 3 */}
            <div className="relative group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-lime-500/50 transition duration-300">
              <div className="h-80 w-full relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
                  alt="Headliner 3"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <span className="absolute top-3 left-3 bg-lime-400 text-black text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-widest">
                  PLAYGROUND STAGE
                </span>
              </div>
              <div className="p-5 relative -mt-12 space-y-2">
                <div className="text-xs text-lime-400 font-mono font-semibold">18:30 - 19:45 PM</div>
                <h3 className="text-2xl font-black text-white">BEAT BLASTERS</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  จังหวะบีตชวนเต้นและอิเล็กทรอนิกส์มิวสิกที่จะเปลี่ยนสนามหญ้าให้กลายเป็นดิสโก้
                </p>
              </div>
            </div>

          </div>

          <div className="text-center pt-4">
            <a
              href="#buy-ticket"
              className="bg-pink-600 hover:bg-pink-500 text-white px-8 py-3 rounded-lg font-bold text-sm inline-flex items-center space-x-2 transition"
            >
              <span>NEXT : BUY TICKET</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 4: BUY TICKET (เพิ่มรายละเอียดบัตรเข้างาน) */}
      <section id="buy-ticket" className="min-h-screen bg-slate-950 text-white p-6 py-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <span className="bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-sm">04 BUY TICKET</span>
            <p className="text-xs text-gray-400 mt-1">ซื้อง่ายๆ รับบัตรทันทีผ่านระบบอัตโนมัติ</p>
          </div>

          {/* รายละเอียดบัตรเข้างาน (เพิ่มใหม่ตามคำขอ) */}
          <div className="bg-gradient-to-r from-purple-900/40 via-slate-900 to-slate-900 p-6 rounded-2xl border border-purple-800/50 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="bg-pink-500/20 text-pink-400 text-[10px] font-bold px-2 py-0.5 rounded border border-pink-500/30 uppercase">
                  REGULAR PASS
                </span>
                <h3 className="text-xl font-bold text-white mt-1">บัตรเข้าชมงาน Back to Childhood (1 วันเต็ม)</h3>
              </div>
              <div className="text-2xl font-black text-pink-400">฿890 <span className="text-xs text-gray-400 font-normal">/ ใบ</span></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-300">
              <div className="flex items-center space-x-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>เข้าได้ทุกเวที (3 Stages)</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>ฟรี เครื่องดื่ม 1 แก้ว</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>โซน Playground & Mud</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>ริสต์แบนด์ที่ระลึกหน้างาน</span>
              </div>
            </div>
          </div>

          {/* ขั้นตอนซื้อบัตรและโอนเงิน */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-800">
            
            {/* Step 1: จำนวนบัตร */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-200 flex items-center space-x-2">
                <span className="bg-pink-600 text-white w-5 h-5 rounded-full inline-flex items-center justify-center text-xs">1</span>
                <span>เลือกจำนวนบัตร</span>
              </h3>
              
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setTicketQuantity(num)}
                    className={`py-2 rounded-lg text-sm font-bold transition border cursor-pointer ${
                      ticketQuantity === num
                        ? 'bg-pink-600 border-pink-500 text-white shadow-lg shadow-pink-600/30'
                        : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-gray-300'
                    }`}
                  >
                    {num} ใบ
                  </button>
                ))}
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 mt-4">
                <div className="text-xs font-bold text-pink-400 uppercase tracking-wider">SUMMARY</div>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>ราคาต่อใบ</span>
                  <span>฿{ticketPrice.toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-800 pt-3 flex justify-between items-center font-bold">
                  <span className="text-sm">รวมทั้งหมด</span>
                  <span className="text-xl text-pink-500">฿{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Step 2: ชำระเงิน */}
            <div className="space-y-4 md:border-l border-slate-800 md:pl-6">
              <h3 className="text-sm font-bold text-gray-200 flex items-center space-x-2">
                <span className="bg-pink-600 text-white w-5 h-5 rounded-full inline-flex items-center justify-center text-xs">2</span>
                <span>ชำระเงิน</span>
              </h3>

              <PromptPayCard 
                phoneNumber={promptPayNumber} 
                accountNumber={accountNumber}
                accountName={accountName}
                amount={totalAmount} 
              />
            </div>

            {/* Step 3: กรอกข้อมูลและยืนยันการชำระเงิน */}
            <div className="space-y-4 md:border-l border-slate-800 md:pl-6">
              <h3 className="text-sm font-bold text-gray-200 flex items-center space-x-2">
                <span className="bg-pink-600 text-white w-5 h-5 rounded-full inline-flex items-center justify-center text-xs">3</span>
                <span>ยืนยันการชำระเงิน</span>
              </h3>

              {isSuccess ? (
                <div className="bg-emerald-950/40 border border-emerald-800 p-5 rounded-xl text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="font-bold text-emerald-300 text-base">ชำระเงินสำเร็จแล้ว!</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    ระบบได้รับการยืนยันเรียบร้อยแล้ว บัตรเข้างานจะถูกส่งไปยังอีเมลของคุณภายใน 5 นาที
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setSelectedFile(null);
                      setFileName('');
                      clearHeroPhoto();
                      setFormData({ fullName: '', email: '', phone: '' });
                    }}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-gray-300 px-4 py-2 rounded-lg border border-slate-700 transition mt-2 cursor-pointer"
                  >
                    ทำรายการใหม่
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="space-y-2 text-xs">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="ชื่อ-นามสกุล"
                      required
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 focus:border-pink-500 focus:outline-none text-white placeholder-gray-500"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="อีเมล (สำหรับรับบัตร)"
                      required
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 focus:border-pink-500 focus:outline-none text-white placeholder-gray-500"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="เบอร์โทรศัพท์"
                      required
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 focus:border-pink-500 focus:outline-none text-white placeholder-gray-500"
                    />
                  </div>

                  <label className="block border-2 border-dashed border-slate-700 hover:border-pink-500 rounded-xl p-3.5 text-center cursor-pointer transition bg-slate-900/50 relative">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    
                    {fileName ? (
                      <div className="flex items-center justify-between text-xs text-pink-400 font-medium px-1">
                        <span className="truncate max-w-[180px]">📄 {fileName}</span>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="text-gray-400 hover:text-white bg-slate-800 px-2 py-0.5 rounded text-[10px]"
                        >
                          ยกเลิก
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-xs font-medium text-gray-300">
                          คลิกหรือลากไฟล์สลิปมาที่นี่
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">( JPG, PNG ไม่เกิน 5MB )</p>
                      </>
                    )}
                  </label>

                  <button 
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold py-3 rounded-lg text-sm transition shadow-lg shadow-pink-600/20 flex justify-center items-center space-x-2 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>กำลังยืนยัน...</span>
                      </>
                    ) : (
                      <span>ยืนยันการชำระเงิน</span>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl text-xs text-gray-300 flex items-center space-x-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>เมื่อยืนยันการชำระเงินสำเร็จ ระบบจะส่งอีเมลคอนเฟิร์มไปยังอีเมลของคุณทันที</span>
          </div>

        </div>
      </section>
    </div>
  );
}