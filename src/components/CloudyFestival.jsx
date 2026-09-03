import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import generatePayload from 'promptpay-qr';

// Component สำหรับสร้าง Dynamic PromptPay QR Code
function PromptPayCard({ phoneNumber, amount }) {
  const qrPayload = generatePayload(phoneNumber, { amount: Number(amount) });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col items-center text-center shadow-xl relative overflow-hidden">
      {/* Badge บอกประเภทการชำระเงิน */}
      <div className="flex items-center space-x-2 mb-3 bg-blue-950/60 border border-blue-800/50 px-3 py-1 rounded-full">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
        <span className="text-xs font-semibold text-blue-300 tracking-wide">PROMPTPAY DYNAMIC QR</span>
      </div>

      {/* กรอบแสดง QR Code */}
      <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-200 my-2">
        <QRCodeSVG 
          value={qrPayload} 
          size={180} 
          level="H" 
          includeMargin={false}
        />
      </div>

      {/* แสดง ยอดเงิน และ เบอร์ที่ต้องชำระ */}
      <div className="mt-3 space-y-1 w-full">
        <div className="text-xs text-gray-400">ยอดชำระสุทธิ</div>
        <div className="text-2xl font-black text-emerald-400 tracking-tight">
          ฿{amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[11px] text-gray-500 pt-1">
          สแกนผ่านแอปธนาคารใดก็ได้ • ยอดเงินตรงทันที
        </p>
      </div>
    </div>
  );
}

export default function CloudyFestival() {
  const totalTickets = 10000;
  const [currentCount, setCurrentCount] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  const [ticketQuantity, setTicketQuantity] = useState(1);
  const ticketPrice = 890;
  const totalAmount = ticketQuantity * ticketPrice;
  const promptPayNumber = "0812345678"; // เปลี่ยนเป็นเบอร์โทรศัพท์ หรือ PromptPay ID ของคุณ

  useEffect(() => {
    const baseTickets = 6000;
    const randomBonus = Math.floor(Math.random() * 151) + 100;
    const targetTickets = baseTickets + randomBonus;

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

  return (
    <div className="bg-slate-950 text-white font-sans scroll-smooth">
      {/* ส่วนที่ 1 : LIVE TRACKING */}
      <section
        id="home"
        className="min-h-screen text-white p-6 pt-28 relative bg-cover bg-center flex flex-col justify-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url('https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/rockcms/2024-06/240602-concert-fans-stock-vl-1023a-9b4766.jpg')`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="bg-blue-600/80 text-white text-xs px-3 py-1 rounded-sm uppercase tracking-wider">
            01 | LIVE TRACKING
          </span>
          <p className="text-gray-400 text-sm">จำนวนบัตรที่จำหน่ายแบบเรียลไทม์</p>

          <div className="text-7xl font-extrabold tracking-tight">
            <span className="tabular-nums">{currentCount.toLocaleString()}</span>{' '}
            <span className="text-2xl font-normal text-gray-400">/ 10,000 TICKETS</span>
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 relative shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full transition-all duration-1000 ease-out animate-pulse relative overflow-hidden"
                style={{ width: `${progressWidth}%` }}
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>0</span>
              <span>2,500</span>
              <span>5,000</span>
              <span>7,500</span>
              <span>10,000</span>
            </div>
          </div>

          <p className="text-sm text-gray-300">
            เหลืออีก{' '}
            <span className="text-yellow-400 font-bold tabular-nums inline-block min-w-[45px] text-center">
              {(totalTickets - currentCount).toLocaleString()}
            </span>{' '}
            ใบ เพื่อปลดล็อกความมันส์ขั้นต่อไป!
          </p>

          <a
            href="#presentation"
            className="bg-transparent border border-white/30 hover:border-white px-6 py-2 rounded-full text-sm inline-flex items-center space-x-2 transition"
          >
            <span>ดูรายละเอียดการปลดล็อก</span>
            <span>↓</span>
          </a>

          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 p-4 rounded-xl max-w-md mx-auto flex justify-between items-center text-left">
            <div>
              <span className="text-xs text-gray-400 block">NEXT UNLOCK</span>
              <span className="font-bold text-lg">7,500 ใบ</span>
            </div>
            <span className="text-sm text-yellow-400 font-semibold">: ศิลปินลับ + กิจกรรมพิเศษ</span>
          </div>
        </div>
      </section>

      {/* ส่วนที่ 2 : PRESENTATION */}
      <section
        id="presentation"
        className="min-h-screen text-white p-6 pt-28 relative bg-cover bg-center flex flex-col justify-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80')`,
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
              allowFullScreen
            ></iframe>
          </div>

          <div className="flex justify-between items-end">
            <p className="text-sm text-gray-300">
              มาร่วมสร้างประสบการณ์ดนตรีที่มากกว่าคอนเสิร์ต
              <br />
              ไปด้วยกันกับ Cloudy Festival
            </p>
            <a
              href="#festival"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center space-x-2"
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
            <button className="bg-lime-400 text-black px-4 py-2 rounded-md">STAGES</button>
            <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-md">ACTIVITIES</button>
            <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-md">FOOD & DRINK</button>
            <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-md">MARKET</button>
            <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-md">CAMPING</button>
            <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-md">ART & INSTALLATION</button>
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
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide">CLOUDY FESTIVAL 2026</h2>
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
                  พบกับไลน์อัปศิลปินชื่อดังกว่า 20 วงที่จะมาร่วมสร้างความมันส์ตลอด 2 วันเต็ม
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
                    onClick={() => setTicketQuantity(num)}
                    className={`py-2 rounded-lg text-sm font-bold transition border ${
                      ticketQuantity === num
                        ? 'bg-pink-600 border-pink-500 text-white shadow-lg shadow-pink-600/30'
                        : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-gray-300'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 mt-4">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>รายการ</span>
                  <span>บัตร Cloudy Festival 2026</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>ราคาต่อใบ</span>
                  <span>฿{ticketPrice.toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-800 pt-3 flex justify-between items-center font-bold">
                  <span className="text-sm">ยอดรวมทั้งสิ้น</span>
                  <span className="text-lg text-pink-400">฿{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Step 2: สแกนชำระเงิน (QR Code แบบ Dynamic) */}
            <div className="space-y-4 md:border-l border-slate-800 md:pl-6">
              <h3 className="text-sm font-bold text-gray-200 flex items-center space-x-2">
                <span className="bg-pink-600 text-white w-5 h-5 rounded-full inline-flex items-center justify-center text-xs">2</span>
                <span>สแกนจ่ายเงิน</span>
              </h3>

              {/* แสดง QR Code พร้อมยอดเงินอัตโนมัติ */}
              <PromptPayCard phoneNumber={promptPayNumber} amount={totalAmount} />
            </div>

            {/* Step 3: แนบสลิปและข้อมูล */}
            <div className="space-y-4 md:border-l border-slate-800 md:pl-6">
              <h3 className="text-sm font-bold text-gray-200 flex items-center space-x-2">
                <span className="bg-pink-600 text-white w-5 h-5 rounded-full inline-flex items-center justify-center text-xs">3</span>
                <span>แจ้งชำระเงิน</span>
              </h3>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                <div className="border-2 border-dashed border-slate-700 hover:border-pink-500 rounded-xl p-4 text-center cursor-pointer transition bg-slate-900/50">
                  <p className="text-xs font-medium text-gray-300">แนบรูปภาพสลิปโอนเงิน</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">รองรับ JPG, PNG</p>
                </div>

                <div className="space-y-2 text-xs">
                  <input
                    type="text"
                    placeholder="ชื่อ-นามสกุล"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 focus:border-pink-500 focus:outline-none text-white placeholder-gray-500"
                  />
                  <input
                    type="email"
                    placeholder="อีเมล (สำหรับรับบัตร)"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 focus:border-pink-500 focus:outline-none text-white placeholder-gray-500"
                  />
                  <input
                    type="tel"
                    placeholder="เบอร์โทรศัพท์"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 focus:border-pink-500 focus:outline-none text-white placeholder-gray-500"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 rounded-lg text-sm transition shadow-lg shadow-pink-600/20"
                >
                  ยืนยันการชำระเงิน
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}