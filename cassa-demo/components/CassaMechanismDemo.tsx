'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CassaMechanismDemo = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const phase1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.33], [1, 1, 0]);
  const phase2Opacity = useTransform(scrollYProgress, [0.25, 0.4, 0.6, 0.66], [0, 1, 1, 0]);
  const phase3Opacity = useTransform(scrollYProgress, [0.6, 0.75, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="bg-[#f1f0ec]" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header - Fixed */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-[#f1f0ec]/80 backdrop-blur-sm border-b border-gray-300">
          <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-light tracking-tight text-gray-900">cassa</h1>
              <p className="text-sm text-gray-600 mt-1 font-light">Insurance Vaults & Tokenized Risk</p>
            </div>
            <div className="flex gap-2">
              <div className="w-1 h-16 bg-gray-300 rounded-full overflow-hidden">
                <motion.div 
                  className="w-full bg-blue-600"
                  style={{ 
                    height: useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Phase 1: Market Inception */}
        <motion.div 
          style={{ opacity: phase1Opacity }}
          className="absolute inset-0 flex items-center justify-center pt-24"
        >
          <div className="max-w-6xl w-full px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-12">
                <div className="text-sm font-medium text-blue-600 mb-2 tracking-wider">PHASE 01</div>
                <h2 className="text-5xl font-light text-gray-900 mb-4">Market Inception</h2>
                <p className="text-xl text-gray-600 font-light max-w-2xl">
                  Deposit underlying assets to mint fully collateralized insurance tokens
                </p>
              </div>

              <div className="flex items-center justify-center gap-12 mt-16">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="relative"
                >
                  <div className="w-48 h-48 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center">
                    <div className="text-6xl mb-3">💵</div>
                    <div className="text-2xl font-light text-gray-900">10.00</div>
                    <div className="text-sm text-gray-500 mt-1">USDC</div>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                    Underlying
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex flex-col items-center gap-2"
                >
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="text-4xl text-gray-400"
                  >
                    →
                  </motion.div>
                  <div className="text-xs text-gray-500 font-medium">DEPOSIT</div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="relative"
                >
                  <div className="w-48 h-48 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-xl flex flex-col items-center justify-center border border-slate-600">
                    <div className="text-3xl font-light text-white mb-2">VAULT</div>
                    <div className="text-sm text-slate-400">cassa protocol</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="flex flex-col items-center gap-2"
                >
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
                    className="text-4xl text-gray-400"
                  >
                    →
                  </motion.div>
                  <div className="text-xs text-gray-500 font-medium">MINT 1:1</div>
                </motion.div>

                <div className="flex flex-col gap-6">
                  <motion.div
                    initial={{ scale: 0, opacity: 0, x: -30 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="relative"
                  >
                    <div className="w-40 h-32 bg-white rounded-xl shadow-md border-2 border-blue-500 flex flex-col items-center justify-center">
                      <div className="text-3xl mb-2">🛡️</div>
                      <div className="text-xl font-light text-gray-900">10.00 IT</div>
                      <div className="text-xs text-gray-500 mt-1">Insured Token</div>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      Coverage
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0, opacity: 0, x: -30 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="relative"
                  >
                    <div className="w-40 h-32 bg-white rounded-xl shadow-md border-2 border-slate-600 flex flex-col items-center justify-center">
                      <div className="text-3xl mb-2">⚡</div>
                      <div className="text-xl font-light text-gray-900">10.00 UT</div>
                      <div className="text-xs text-gray-500 mt-1">Underwriting Token</div>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-slate-600 text-white text-xs px-2 py-1 rounded-full">
                      Risk
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.1 }}
                className="mt-16 text-center"
              >
                <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">1 IT + 1 UT = 1 USDC</span>
                  <span className="text-xs text-gray-400">Perfect backing</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Phase 2: Trading Period */}
        <motion.div 
          style={{ opacity: phase2Opacity }}
          className="absolute inset-0 flex items-center justify-center pt-24"
        >
          <div className="max-w-6xl w-full px-8">
            <div className="mb-12">
              <div className="text-sm font-medium text-blue-600 mb-2 tracking-wider">PHASE 02</div>
              <h2 className="text-5xl font-light text-gray-900 mb-4">Trading Period</h2>
              <p className="text-xl text-gray-600 font-light max-w-2xl">
                Tokens are freely tradable or redeemable as pairs before maturity
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-16">
              {/* Option A: Trade Separately */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-medium">A</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-gray-900">Trade Separately</h3>
                    <p className="text-sm text-gray-500">Liquid secondary markets</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="flex-1 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200"
                    >
                      <div className="text-2xl mb-1">🛡️</div>
                      <div className="text-lg font-light text-gray-900">IT Token</div>
                      <div className="text-xs text-gray-500 mt-1">Buy/Sell coverage</div>
                    </motion.div>
                    
                    <div className="text-2xl text-gray-300">↔</div>
                    
                    <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="text-2xl mb-1">📊</div>
                      <div className="text-lg font-light text-gray-900">AMM</div>
                      <div className="text-xs text-gray-500 mt-1">Price discovery</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                      className="flex-1 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-300"
                    >
                      <div className="text-2xl mb-1">⚡</div>
                      <div className="text-lg font-light text-gray-900">UT Token</div>
                      <div className="text-xs text-gray-500 mt-1">Earn yield on risk</div>
                    </motion.div>
                    
                    <div className="text-2xl text-gray-300">↔</div>
                    
                    <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="text-2xl mb-1">📊</div>
                      <div className="text-lg font-light text-gray-900">AMM</div>
                      <div className="text-xs text-gray-500 mt-1">Price discovery</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">Arbitrage:</span> IT + UT prices remain balanced through mint/redeem mechanisms
                  </div>
                </div>
              </div>

              {/* Option B: Redeem Together */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-medium">B</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-gray-900">Redeem Together</h3>
                    <p className="text-sm text-gray-500">Exit anytime before maturity</p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center py-8">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <motion.div
                      animate={{ x: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-200 text-center w-28"
                    >
                      <div className="text-2xl mb-1">🛡️</div>
                      <div className="text-base font-light text-gray-900">1 IT</div>
                    </motion.div>

                    <div className="text-xl text-gray-400 font-light">+</div>

                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border-2 border-slate-300 text-center w-28"
                    >
                      <div className="text-2xl mb-1">⚡</div>
                      <div className="text-base font-light text-gray-900">1 UT</div>
                    </motion.div>
                  </div>

                  <div className="text-2xl text-gray-300 my-6">
                    ↓
                  </div>

                  <motion.div
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 border-2 border-green-200 text-center shadow-sm w-48"
                  >
                    <div className="text-3xl mb-2">💵</div>
                    <div className="text-xl font-light text-gray-900">1.00 USDC</div>
                    <div className="text-xs text-gray-500 mt-1">Instant redemption</div>
                  </motion.div>
                </div>

                <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">Liquidity:</span> Redeem pairs anytime for underlying collateral
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Phase 3: Maturity */}
        <motion.div 
          style={{ opacity: phase3Opacity }}
          className="absolute inset-0 flex items-center justify-center pt-24 pb-16"
        >
          <div className="max-w-6xl w-full px-8">
            <div className="mb-8">
              <div className="text-sm font-medium text-blue-600 mb-2 tracking-wider">PHASE 03</div>
              <h2 className="text-5xl font-light text-gray-900 mb-4">Settlement</h2>
              <p className="text-xl text-gray-600 font-light max-w-2xl">
                Policy determines final redemption values at maturity
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">📋</div>
                    <div>
                      <h3 className="text-xl font-light text-gray-900">Policy Function Π</h3>
                      <p className="text-xs text-gray-600">Deterministic onchain settlement</p>
                    </div>
                  </div>
                  <code className="text-sm text-gray-700 bg-white px-4 py-2 rounded-lg border border-gray-200">
                    Π : H[t<sub>e</sub>, t<sub>x</sub>] → [0, 1]
                  </code>
                </div>
              </div>

              {/* Policy Examples - Compact */}
              <div className="grid grid-cols-6 gap-2">
                <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                  <div className="text-xl mb-1">⚠️</div>
                  <div className="text-xs font-medium text-gray-900">Exploit</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                  <div className="text-xl mb-1">📉</div>
                  <div className="text-xs font-medium text-gray-900">Depeg</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                  <div className="text-xl mb-1">📊</div>
                  <div className="text-xs font-medium text-gray-900">Yield</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                  <div className="text-xl mb-1">🔮</div>
                  <div className="text-xs font-medium text-gray-900">Oracle</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                  <div className="text-xl mb-1">⛓️</div>
                  <div className="text-xs font-medium text-gray-900">Slashing</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                  <div className="text-xl mb-1">💱</div>
                  <div className="text-xs font-medium text-gray-900">IL</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md border-2 border-blue-500 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">🛡️</div>
                    <div>
                      <h3 className="text-2xl font-light text-gray-900">IT Redemption</h3>
                      <p className="text-xs text-gray-500">Coverage payout</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-100 text-center">
                    <div className="text-3xl font-light text-gray-900 mb-1">Π × 1</div>
                    <div className="text-xs text-gray-600">Policy ratio</div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Π = 0.00</span>
                      <span className="font-medium text-gray-900">0.00 USDC</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded border border-blue-100">
                      <span className="text-gray-600">Π = 0.20</span>
                      <span className="font-medium text-blue-900">0.20 USDC</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Π = 1.00</span>
                      <span className="font-medium text-gray-900">1.00 USDC</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md border-2 border-slate-600 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">⚡</div>
                    <div>
                      <h3 className="text-2xl font-light text-gray-900">UT Redemption</h3>
                      <p className="text-xs text-gray-500">Residual value</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-200 text-center">
                    <div className="text-3xl font-light text-gray-900 mb-1">(1 - Π) × 1</div>
                    <div className="text-xs text-gray-600">Residual</div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Π = 0.00</span>
                      <span className="font-medium text-gray-900">1.00 USDC</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-100 rounded border border-slate-200">
                      <span className="text-gray-600">Π = 0.20</span>
                      <span className="font-medium text-slate-900">0.80 USDC</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Π = 1.00</span>
                      <span className="font-medium text-gray-900">0.00 USDC</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Conservation</div>
                    <div className="text-lg font-light text-gray-900">IT + UT = 1</div>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Total Value</div>
                    <div className="text-lg font-light text-gray-900">1 USDC</div>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Risk</div>
                    <div className="text-lg font-light text-green-600">Zero</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-gray-400 text-sm flex flex-col items-center gap-2"
          >
            <span>Scroll to explore</span>
            <div className="text-2xl">↓</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CassaMechanismDemo;