import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import generatePayload from 'promptpay-qr';

export default function PromptPayQR({ phoneNumber = "0812345678", amount = 0 }) {
  // สร้าง Payload ตามมาตรฐาน EMVCo สำหรับ PromptPay
  const payload = generatePayload(phoneNumber, { amount });

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-lg border border-slate-200 text-slate-800 max-w-xs mx-auto">
      {/* Header โลโก้ PromptPay */}
      <div className="w-full flex justify-center mb-3 border-b border-slate-100 pb-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c5/PromptPay-logo.png"
          alt="PromptPay"
          className="h-8 object-contain"
        />
      </div>

      {/* ตัว QR Code */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-inner">
        {payload ? (
          <QRCodeSVG
            value={payload}
            size={180}
            level="M"
            includeMargin={false}
          />
        ) : (
          <div className="w-[180px] h-[180px] flex items-center justify-center text-xs text-red-500">
            ไม่สามารถสร้าง QR Code ได้
          </div>
        )}
      </div>

      {/* ยอดเงินชำระ */}
      <div className="mt-4 text-center">
        <span className="text-xs text-slate-500 font-medium block">ยอดชำระทั้งหมด</span>
        <span className="text-2xl font-extrabold text-blue-900">
          ฿{amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* หมายเหตุ */}
      <p className="text-[11px] text-slate-400 mt-2 text-center">
        สแกนผ่านแอปพลิเคชันธนาคารเพื่อชำระเงิน
      </p>
    </div>
  );
}