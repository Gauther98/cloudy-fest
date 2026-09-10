import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import generatePayload from 'promptpay-qr';

// Component สำหรับสร้าง Dynamic PromptPay QR Code และข้อมูลโอนเงิน
function PromptPayCard({ phoneNumber, accountNumber, accountName, amount }) {
  const [copied, setCopied] = useState(false);
  const qrPayload = generatePayload(phoneNumber, { amount: Number(amount) });

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber.replace(/-/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      {/* เลขบัญชีธนาคารสำหรับโอนเงิน */}
      <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
        <div className="text-xs text-emerald-400 font-semibold flex items-center justify-between">
          <span>ธนาคารกสิกรไทย</span>
          <button 
            type="button"
            onClick={handleCopy}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-gray-300 px-2 py-0.5 rounded border border-slate-700 transition"
          >
            {copied ? 'คัดลอกแล้ว!' : 'คัดลอกเลขบัญชี'}
          </button>
        </div>
        <div className="text-sm font-mono text-white tracking-wide">{accountNumber}</div>
        <div className="text-[11px] text-gray-400">ชื่อบัญชี: {accountName}</div>
      </div>

      {/* กรอบ Dynamic PromptPay QR Code */}
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

  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  
  // State สำหรับเก็บข้อมูลการจอง
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  // State สำหรับจัดการการส่งฟอร์ม
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // State เพิ่มเติมสำหรับ Hero Interactive Feature
  const [heroPhoto, setHeroPhoto] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Function สำหรับส่งฟอร์มยืนยัน
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("กรุณาแนบสลิปการโอนเงินก่อนยืนยันครับ");
      return;
    }
    setSubmitting(true);
    
    // จำลองการส่งข้อมูลไปยัง Server / API
    setTimeout(() => {
      setSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  // Function สำหรับล้าง/ลบไฟล์สลิป
  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setFileName('');
  };

  const ticketPrice = 890;
  const totalAmount = ticketQuantity * ticketPrice;
  const promptPayNumber = "0812345678";
  const accountNumber = "123-4-56789-0";
  const accountName = "Cloudy Festival";

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

  // Clean up Object URL เมื่อ unmount หรือเมื่อเลิกใช้
  useEffect(() => {
    return () => {
      if (heroPhoto) {
        URL.revokeObjectURL(heroPhoto);
      }
    };
  }, [heroPhoto]);

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

  return (
    <div className="bg-[#0a0512] text-white font-['Kanit',sans-serif] scroll-smooth selection:bg-purple-500 selection:text-white">
      
      {/* Font Kanit & Marquee Keyframes Animation */}
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

      {/* 1. Top Ticker Banner */}
      <div className="w-full bg-purple-600 text-white text-[11px] font-bold py-1.5 px-4 tracking-widest uppercase overflow-hidden whitespace-nowrap shadow-lg border-b border-purple-500/30">
        <div className="animate-marquee inline-block space-x-8">
          <span>LIVE MUSIC ✦ PLAYGROUND ✦ MUD ZONE ✦ KHAO YAI ✦ THREE STAGES ✦ LIVE MUSIC ✦ PLAYGROUND ✦ MUD ZONE ✦ KHAO YAI ✦ THREE STAGES</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ส่วนที่ 1 : BACK TO CHILDHOOD HERO SECTION */}
      {/* ========================================================= */}
      <section
        id="home"
        className="min-h-screen relative flex flex-col justify-between pt-8 pb-16 px-4 sm:px-8 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10, 5, 18, 0.75), rgba(10, 5, 18, 0.95)), url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="max-w-5xl mx-auto w-full space-y-8 my-auto text-center pt-4">
          
          {/* FEBRUARY Tag */}
          <div className="inline-block">
            <span className="bg-purple-950/80 border border-purple-500/40 text-gray-300 text-[10px] sm:text-xs font-semibold px-4 py-1 rounded-full tracking-widest uppercase backdrop-blur-md">
              FEBRUARY • KHAO YAI • ONE DAY ONLY
            </span>
          </div>

          {/* Main Title Section */}
          <div className="space-y-1">
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight leading-none text-white uppercase font-sans">
              BACK TO
            </h1>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-[0.25em] text-gray-200 uppercase pt-2">
              CHILDHOOD FESTIVAL
            </h2>
          </div>

          {/* Slogan */}
          <p className="text-gray-300 text-xs sm:text-sm font-light max-w-2xl mx-auto leading-relaxed pt-1">
            ทิ้งความเป็นผู้ใหญ่ไว้หน้าประตู แล้วกลับมาวิ่ง เล่น ร้อง และหัวเราะให้ดังเหมือนเมื่อก่อน
          </p>

          {/* Key Stats Bar */}
          <div className="flex justify-center items-center space-x-4 sm:space-x-8 text-[11px] sm:text-xs font-semibold text-gray-300 tracking-wider pt-1 uppercase">
            <span>10,000 FRIENDS</span>
            <span className="text-purple-500">|</span>
            <span>3 STAGES</span>
            <span className="text-purple-500">|</span>
            <span>1 DAY TO REMEMBER</span>
          </div>

          {/* Ticket Counter Box (อัปเดตสีเป็นโทนม่วง-ชมพูนีออน) */}
          <div className="max-w-3xl mx-auto bg-slate-950/70 border border-purple-800/50 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-purple-950/50 space-y-6 mt-6">
            
            <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold tracking-wider text-gray-400">
              <span className="uppercase tracking-widest text-purple-200/80">THE CROWD IS GROWING</span>
              <div className="flex items-center space-x-1.5 text-pink-400">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                <span className="uppercase tracking-wider">LIVE TICKET COUNTER</span>
              </div>
            </div>

            {/* Giant Number Counter */}
            <div className="flex justify-center items-baseline space-x-2 sm:space-x-4">
              <span className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-fuchsia-200 tabular-nums drop-shadow-[0_0_25px_rgba(217,70,239,0.3)]">
                {currentCount.toLocaleString()}
              </span>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-gray-300">/10,000</div>
                <div className="text-[10px] text-purple-300 font-semibold tracking-wider uppercase">TICKETS SOLD</div>
              </div>
            </div>

            {/* Neon Progress Bar */}
            <div className="space-y-2">
              <div className="h-3.5 w-full bg-slate-900/90 rounded-full overflow-hidden p-0.5 border border-purple-800/40 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-rose-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(236,72,153,0.8)]"
                  style={{ width: `${progressWidth}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] font-semibold text-gray-400 tracking-wider">
                <span>0</span>
                <span>5,000</span>
                <span>10,000</span>
              </div>
            </div>

            {/* Artist Unlock Box */}
            <div className="bg-slate-900/90 border border-purple-700/40 rounded-2xl p-4 flex justify-between items-center text-left">
              <div className="flex items-center space-x-3">
                <span className="text-pink-400 text-lg">✦</span>
                <div>
                  <div className="text-[10px] text-purple-300 font-medium">NEXT ARTIST UNLOCK · 7,000 ใบ</div>
                  <div className="text-xs sm:text-sm font-bold text-white">อีกไม่กี่คน ศิลปินลำดับถัดไปจะถูกเปิดเผย</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm sm:text-base font-bold text-pink-400 font-mono">158</span>
                <span className="text-[10px] text-gray-400 ml-1">TO GO</span>
              </div>
            </div>

            {/* Main Action Button */}
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

          {/* Interactive Photo Upload Widget */}
          <div className="max-w-md mx-auto pt-4">
            <div className="bg-slate-900/80 border border-purple-900/50 p-4 rounded-2xl backdrop-blur-md space-y-3">
              <div className="text-left text-xs text-gray-300 font-semibold flex items-center justify-between">
                <span>📸 ลองแต่งการ์ดพรีวิวเข้างานของคุณ</span>
                <span className="text-[10px] text-pink-400">#BackToChildhood</span>
              </div>
              <div className="relative aspect-video w-full rounded-xl bg-slate-950 border border-dashed border-purple-700/60 flex items-center justify-center overflow-hidden">
                {heroPhoto ? (
                  <div className="relative w-full h-full">
                    <img src={heroPhoto} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={clearHeroPhoto}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white w-6 h-6 rounded-full text-xs flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer text-center p-2 w-full h-full flex items-center justify-center">
                    <input type="file" accept="image/*" onChange={handleHeroPhotoUpload} className="hidden" />
                    <span className="text-xs text-purple-300 font-medium hover:underline">+ อัปโหลดรูปถ่ายของคุณที่นี่</span>
                  </label>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ส่วนที่ 2 : PRESENTATION */}
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
              <span>NEXT : THE FESTIVAL</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ส่วนที่ 3 : THE FESTIVAL */}
      <section id="festival" className="min-h-screen bg-slate-950 text-white p-6 pt-24 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto space-y-8 w-full">
          <div>
            <span className="bg-lime-500 text-black text-xs font-bold px-3 py-1 rounded-sm">03 THE FESTIVAL</span>
            <p className="text-xs text-gray-400 mt-1">กิจกรรมและรายละเอียดภายในงาน</p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <button type="button" className="bg-lime-400 text-black px-4 py-2 rounded-md">STAGES</button>
            <button type="button" className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-md transition">ACTIVITIES</button>
            <button type="button" className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-md transition">FOOD & DRINK</button>
            <button type="button" className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-md transition">MARKET</button>
            <button type="button" className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-md transition">CAMPING</button>
            <button type="button" className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-md transition">ART & INSTALLATION</button>
          </div>

          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
            <img
              src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/rockcms/2024-06/240602-concert-fans-stock-vl-1023a-9b4766.jpg"
              alt="Festival Main Banner"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-6 sm:p-8 flex flex-col justify-end">
              <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-1">
                Experience The Magic
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide">BACK TO CHILDHOOD 2026</h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl mt-2">
                เตรียมพบกับเทศกาลดนตรีที่รวมที่สุดแห่งแสง สี เสียง และไลน์อัปศิลปินที่คุณรอคอย
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden p-5 flex flex-col justify-between">
              <div>
                <div className="h-32 w-full rounded-xl overflow-hidden mb-4 bg-slate-950">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRySwK00bOArBxKB9g2xMsf9f1RCy_bMsM6nLq5050GqolwlFFOyCBEYg8F&s=10"
                    alt="Lineup"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-purple-400">LINE-UP ARTISTS</h3>
                <p className="text-xs text-gray-400 mt-2">
                  พบกับไลน์อัปศิลปินชื่อดังกว่า 20 วงที่จะมาร่วมสร้างความมันส์ตลอดวัน
                </p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden p-5 flex flex-col justify-between">
              <div>
                <div className="h-32 w-full rounded-xl overflow-hidden mb-4 bg-slate-950">
                  <img
                    src="https://blisslights.com/cdn/shop/articles/2021_08_9.jpg?v=1650323229"
                    alt="Stage"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-purple-400">STAGE & LIGHTING</h3>
                <p className="text-xs text-gray-400 mt-2">
                  เวทีแสง สี เสียง ระดับมาตรฐานสากล พร้อมเอฟเฟกต์สุดอลังการตระการตา
                </p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden p-5 flex flex-col justify-between">
              <div>
                <div className="h-32 w-full rounded-xl overflow-hidden mb-4 bg-slate-950">
                  <img
                    src="https://www.tastingtable.com/img/gallery/4-bar-foods-from-history-we-think-deserve-a-renaissance/intro-1737566886.webp"
                    alt="Food Market"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-purple-400">FOOD & MARKET</h3>
                <p className="text-xs text-gray-400 mt-2">
                  โซนอาหารและตลาดไลฟ์สไตล์ รวมร้านเด็ดร้านดังมากกว่า 50 ร้านค้า
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

      {/* ส่วนที่ 4 : BUY TICKET */}
      <section id="buy-ticket" className="min-h-screen bg-slate-950 text-white p-6 py-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <span className="bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-sm">04 BUY TICKET</span>
            <p className="text-xs text-gray-400 mt-1">ซื้อง่ายๆ รับบัตรทันทีผ่านระบบอัตโนมัติ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-800">
            
            {/* Step 1: เลือกจำนวนบัตร */}
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
                    className={`py-2 rounded-lg text-sm font-bold transition border ${
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
                <div className="text-xs font-bold text-pink-400 uppercase tracking-wider">BACK TO CHILDHOOD FESTIVAL</div>
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
                      setFormData({ fullName: '', email: '', phone: '' });
                    }}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-gray-300 px-4 py-2 rounded-lg border border-slate-700 transition mt-2"
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

                  {/* ปุ่มอัปโหลดรูปภาพสลิป */}
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
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold py-3 rounded-lg text-sm transition shadow-lg shadow-pink-600/20 flex justify-center items-center space-x-2"
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

          {/* Note แจ้งเตือนส่งอีเมล */}
          <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl text-xs text-gray-300 flex items-center space-x-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>เมื่อยืนยันการชำระเงินสำเร็จ ระบบจะส่งอีเมลคอนเฟิร์มไปยังอีเมลของคุณทันที หากไม่พบอีเมล กรุณาตรวจสอบในกล่องจดหมายขยะ (Junk/Spam)</span>
          </div>

        </div>
      </section>
    </div>
  );
}