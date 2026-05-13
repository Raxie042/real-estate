'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Check, Lock } from 'lucide-react';

export interface ESignatureModalProps {
  /** Title shown at top */
  title?: string;
  /** NDA / agreement body text */
  agreementText?: React.ReactNode;
  /** Called with base64 PNG of signature when user confirms */
  onSign: (signatureDataUrl: string) => void;
  onClose: () => void;
}

const DEFAULT_NDA = (
  <div className="space-y-3 text-sm text-[#5F5448] leading-relaxed">
    <p className="font-semibold text-[#1C1A17]">Non-Disclosure Agreement — Property Enquiry</p>
    <p>
      By signing below, you agree to keep all information regarding the property, its owners, asking price,
      documentation and any associated negotiations strictly confidential. You acknowledge that:
    </p>
    <ol className="list-decimal list-inside space-y-2 pl-2">
      <li>Information disclosed is solely for the purpose of evaluating a potential purchase or tenancy.</li>
      <li>You will not share, reproduce, or disclose any information to third parties without express written consent from Raxie Zenith Estate.</li>
      <li>This NDA remains in effect for 24 months from the date of signature.</li>
      <li>Breach of this agreement may result in legal action and damages.</li>
      <li>This agreement is governed by the laws of England and Wales.</li>
    </ol>
    <p>
      Raxie Zenith Estate Ltd · Registered in England No. 12345678 · {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
    </p>
  </div>
);

export default function ESignatureModal({ title, agreementText, onSign, onClose }: ESignatureModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // Init canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.fillStyle = '#FAFAF8';
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    ctx.strokeStyle = '#1C1A17';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  useEffect(() => { initCanvas(); }, [initCanvas]);

  useEffect(() => {
    const onResize = () => initCanvas();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [initCanvas]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  function getPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    canvasRef.current?.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    lastPos.current = getPos(e);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current || !lastPos.current) return;
    const ctx = canvasRef.current.getContext('2d')!;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
    setHasSigned(true);
  };

  const onPointerUp = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };

  const clearCanvas = () => {
    initCanvas();
    setHasSigned(false);
  };

  const handleConfirm = () => {
    if (!hasSigned || !agreed) return;
    const canvas = canvasRef.current!;
    onSign(canvas.toDataURL('image/png'));
  };

  return (
    <motion.div
      className="fixed inset-0 z-[500] flex items-center justify-center bg-black/60 p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#F6F2EC] rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
      >
        {/* Header */}
        <div className="bg-[#1C1A17] px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-[#C9A96A]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C9A96A]">
              {title ?? 'Non-Disclosure Agreement'}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 transition text-white/60 hover:text-white">
            <X size={16} />
          </button>
        </div>

        {/* NDA text */}
        <div className="px-6 py-5 overflow-y-auto flex-1 border-b border-[#E8E1D7]">
          {agreementText ?? DEFAULT_NDA}
        </div>

        {/* Signature pad */}
        <div className="px-6 py-5 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase tracking-widest text-[#7A6E60]">Sign below</p>
            <button
              onClick={clearCanvas}
              className="flex items-center gap-1 text-xs text-[#9A8B7A] hover:text-[#C9A96A] transition-colors"
            >
              <RotateCcw size={11} /> Clear
            </button>
          </div>

          <div className="relative border-2 border-dashed border-[#C9A96A]/50 rounded-xl overflow-hidden bg-[#FAFAF8] h-32">
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-crosshair touch-none"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            />
            {!hasSigned && (
              <p className="absolute inset-0 flex items-center justify-center text-xs text-[#BBAD98] pointer-events-none select-none">
                Draw your signature here
              </p>
            )}
          </div>

          {/* Agreement checkbox */}
          <label className="flex items-start gap-3 mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="mt-0.5 accent-[#C9A96A] w-4 h-4 flex-shrink-0"
            />
            <span className="text-xs text-[#7A6E60] leading-relaxed">
              I have read and understand this agreement, and I confirm that the signature above is my own lawful signature.
            </span>
          </label>

          <button
            onClick={handleConfirm}
            disabled={!hasSigned || !agreed}
            className="mt-4 w-full lux-button disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Check size={16} />
            I Agree & Sign
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
