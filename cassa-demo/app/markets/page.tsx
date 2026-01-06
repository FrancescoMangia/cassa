'use client';

import React, { useState } from 'react';
import { Shield, TrendingDown, Zap, AlertCircle, X, Clock, DollarSign, BarChart3, TrendingUp, ArrowUpDown, ArrowLeftRight, Droplets } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CassaProtocol = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [currentPage, setCurrentPage] = useState('markets'); // 'markets' or 'amm'
  const [selectedPool, setSelectedPool] = useState(null);
  const [swapFrom, setSwapFrom] = useState('');
  const [swapTo, setSwapTo] = useState('');
  const [swapAmount, setSwapAmount] = useState('');

  // Mock historical price data with different patterns
  const generateHistoricalData = (itStart: number, utStart: number, pattern: string = 'stable') => {
    const data = [];
    const days = 30;
    
    for (let i = 0; i < days; i++) {
      let itPrice: number = 0;  // ← AGGIUNGI QUESTO
      let utPrice: number = 0;  // ← AGGIUNGI QUESTO
      const progress = i / days;
      
      if (pattern === 'stable') {
        // IT converges to 0, UT to 1
        itPrice = itStart * (1 - progress * 0.8) + (Math.random() * 0.002 - 0.001);
        utPrice = 1 - itPrice;
      } else if (pattern === 'volatile') {
        // Add spikes and volatility (rumors, FUD, etc)
        const spike = i > 15 && i < 20 ? 0.03 * Math.sin((i - 15) * Math.PI / 5) : 0;
        itPrice = itStart + spike + (Math.random() * 0.015 - 0.0075);
        utPrice = 1 - itPrice;
      } else if (pattern === 'declining') {
        // Gradual decline in IT price
        itPrice = itStart * (1 - progress * 0.5) + (Math.random() * 0.003 - 0.0015);
        utPrice = 1 - itPrice;
      }
      
      data.push({
        date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        IT: Math.max(0, Math.min(1, itPrice)).toFixed(4),
        UT: Math.max(0, Math.min(1, utPrice)).toFixed(4)
      });
    }
    return data;
  };

  // Calculate theoretical redemption price based on current conditions
  const calculateRedemptionPrice = (policy: any) => {
    // Mock current oracle values
    const mockOracle: Record<number, { value: number; itRedemption: number }> = {
        1: { value: 0.998, itRedemption: 0.002 },
        2: { value: 0, itRedemption: 0 },
        3: { value: 14.2, itRedemption: 0.053 },
        4: { value: 0, itRedemption: 0 }
    };

    const oracle = mockOracle[policy.id] || { value: 0, itRedemption: 0 };
    const itRedemption = oracle.itRedemption;
    const utRedemption = 1 - itRedemption;
    
    return {
      itRedemption: itRedemption.toFixed(4),
      utRedemption: utRedemption.toFixed(4),
      itDeviation: ((parseFloat(policy.itPrice) - itRedemption) / itRedemption * 100).toFixed(2),
      utDeviation: ((parseFloat(policy.utPrice) - utRedemption) / utRedemption * 100).toFixed(2)
    };
  };

  // Mock data per le policies
  const policies = [
    {
      id: 1,
      name: 'USDC Depeg Protection',
      type: 'Stablecoin Depeg',
      icon: TrendingDown,
      color: 'blue',
      tvl: '$2.4M',
      itPrice: '0.0230',
      utPrice: '0.9770',
      apy: '12.4%',
      expiry: '2026-03-15',
      status: 'Active',
      description: 'Coverage for USDC depeg events. IT pays proportionally to deviation from $1 peg.',
      underlying: 'aUSDC',
      settlement: 'Π = max(0, 1 - price_USDC) at expiration',
      contractAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      curator: {
        name: 'LlamaRisk',
        address: '0x1234...5678'
      },
      utBreakdown: {
        tradingFees: '3.8%',
        underlyingYield: '5.2%',
        policyPremiums: '3.4%'
      },
      historicalData: generateHistoricalData(0.023, 0.977, 'stable'),
      details: {
        effectiveDate: '2025-12-01',
        expirationDate: '2026-03-15',
        oracle: 'Chainlink USDC/USD',
        threshold: '$0.95',
        maxPayout: '1.0 USDC per IT'
      }
    },
    {
      id: 2,
      name: 'Morpho Vault Exploit',
      type: 'Protocol Exploit',
      icon: Shield,
      color: 'blue',
      tvl: '$5.8M',
      itPrice: '0.0450',
      utPrice: '0.9550',
      apy: '18.2%',
      expiry: '2026-02-28',
      status: 'Active',
      description: 'Binary coverage for confirmed exploits >$50M on Morpho protocol.',
      underlying: 'sUSDe',
      settlement: 'Π = 1 if confirmed loss ≥ $50M, else 0',
      contractAddress: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      curator: {
        name: 'Euler Risk DAO',
        address: '0xabcd...ef01'
      },
      utBreakdown: {
        tradingFees: '4.5%',
        underlyingYield: '9.8%',
        policyPremiums: '3.9%'
      },
      historicalData: generateHistoricalData(0.045, 0.955, 'volatile'),
      details: {
        effectiveDate: '2025-11-15',
        expirationDate: '2026-02-28',
        oracle: 'Multi-sig attestation (3/5)',
        threshold: '$50M loss',
        maxPayout: '1.0 sUSDe per IT'
      }
    },
    {
      id: 3,
      name: 'Ethena Yield Protection',
      type: 'Yield Underperformance',
      icon: BarChart3,
      color: 'blue',
      tvl: '$3.2M',
      itPrice: '0.0310',
      utPrice: '0.9690',
      apy: '15.8%',
      expiry: '2026-06-30',
      status: 'Active',
      description: 'Protection against sUSDe yield falling below 15% APY benchmark.',
      underlying: 'sUSDe',
      settlement: 'Π = min(1, max(0, (B - y)/B)) where B = 15%',
      contractAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      curator: {
        name: 'Gauntlet',
        address: '0x9876...5432'
      },
      historicalData: generateHistoricalData(0.031, 0.969, 'declining'),
      details: {
        effectiveDate: '2025-12-15',
        expirationDate: '2026-06-30',
        oracle: 'Ethena reported APY',
        threshold: '15% APY benchmark',
        maxPayout: '1.0 sUSDe per IT'
      }
    },
    {
      id: 4,
      name: 'Aave V3 Hack Coverage (Q4 2025)',
      type: 'Protocol Exploit',
      icon: AlertCircle,
      color: 'gray',
      tvl: '$4.1M',
      itPrice: '0.0000',
      utPrice: '1.0000',
      apy: '-',
      expiry: '2025-12-31',
      status: 'Expired',
      description: 'Binary coverage for Aave V3 exploits in Q4 2025. No exploit occurred.',
      underlying: 'USDC',
      settlement: 'Π = 0 (no exploit occurred)',
      contractAddress: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      curator: {
        name: 'Chaos Labs',
        address: '0x5555...9999'
      },
      utBreakdown: {
        tradingFees: '4.2%',
        underlyingYield: '8.1%',
        policyPremiums: '3.5%'
      },
      finalSettlement: {
        itRedemption: '0.00 USDC',
        utRedemption: '1.00 USDC'
      },
      historicalData: generateHistoricalData(0.028, 0.972, 'stable'),
      details: {
        effectiveDate: '2025-10-01',
        expirationDate: '2025-12-31',
        oracle: 'Multi-sig attestation (4/7)',
        threshold: '>$10M loss',
        maxPayout: '1.0 USDC per IT'
      }
    }
  ];

  // Mock AMM pools data
  const ammPools = policies.flatMap(policy => [
    {
      id: `${policy.id}-it-underlying`,
      policyId: policy.id,
      policyName: policy.name,
      pair: `IT/${policy.underlying}`,
      token0: 'IT',
      token1: policy.underlying,
      reserve0: '145,230',
      reserve1: '3,340',
      volume24h: '$45,230',
      fees24h: '$135.69',
      tvl: (parseFloat(policy.tvl.replace(/[$M,]/g, '')) * 0.4).toFixed(1) + 'M',
      price: policy.itPrice
    },
    {
      id: `${policy.id}-ut-underlying`,
      policyId: policy.id,
      policyName: policy.name,
      pair: `UT/${policy.underlying}`,
      token0: 'UT',
      token1: policy.underlying,
      reserve0: '562,100',
      reserve1: '548,450',
      volume24h: '$123,450',
      fees24h: '$370.35',
      tvl: (parseFloat(policy.tvl.replace(/[$M,]/g, '')) * 0.4).toFixed(1) + 'M',
      price: policy.utPrice
    },
    {
      id: `${policy.id}-it-ut`,
      policyId: policy.id,
      policyName: policy.name,
      pair: 'IT/UT',
      token0: 'IT',
      token1: 'UT',
      reserve0: '89,340',
      reserve1: '2,110,450',
      volume24h: '$32,100',
      fees24h: '$96.30',
      tvl: (parseFloat(policy.tvl.replace(/[$M,]/g, '')) * 0.2).toFixed(1) + 'M',
      price: (parseFloat(policy.itPrice) / parseFloat(policy.utPrice)).toFixed(4)
    }
  ]).filter(pool => {
    const policy = policies.find(p => p.id === pool.policyId);
    return policy.status === 'Active';
  });

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      gray: 'bg-gray-100 text-gray-600 border-gray-300'
    };
    return colors[color];
  };

  const getStatusBadge = (status) => {
    if (status === 'Active') {
      return 'px-2 sm:px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full';
    }
    return 'px-2 sm:px-3 py-1 bg-gray-400 text-white text-xs font-medium rounded-full';
  };

  const PolicyCard = ({ policy }: { policy: any }) => {
    const Icon = policy.icon;
    return (
      <div
        onClick={() => setSelectedPolicy(policy)}
        className="bg-white border border-gray-300 rounded-xl p-4 sm:p-6 hover:border-gray-900 hover:shadow-lg transition-all cursor-pointer group"
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2 sm:p-3 rounded-lg border ${getColorClasses(policy.color)}`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className={getStatusBadge(policy.status)}>
            {policy.status}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {policy.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{policy.type}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-600 mb-1">TVL</p>
            <p className="text-base sm:text-lg font-semibold text-gray-900">{policy.tvl}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">UT APY</p>
            <p className="text-base sm:text-lg font-semibold text-blue-600">{policy.apy}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-300">
          <div>
            <p className="text-xs text-gray-600 mb-1">IT Price</p>
            <p className="text-sm font-medium text-blue-600">{policy.itPrice}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">UT Price</p>
            <p className="text-sm font-medium text-gray-900">{policy.utPrice}</p>
          </div>
        </div>
      </div>
    );
  };

  const PolicyModal = ({ policy, onClose }: { policy: any; onClose: () => void }) => {
    if (!policy) return null;

    const isExpired = policy.status === 'Expired';
    const redemption = !isExpired ? calculateRedemptionPrice(policy) : null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto pt-16 pb-8">
        <div className="bg-white border border-gray-300 rounded-2xl max-w-4xl w-full my-auto max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-300 p-4 sm:p-6 flex items-start justify-between z-10">
            <div className="flex-1 min-w-0 pr-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 break-words">{policy.name}</h2>
              <p className="text-sm sm:text-base text-gray-600">{policy.type}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">Description</h3>
              <p className="text-gray-900">{policy.description}</p>
            </div>

            {/* Market Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-300">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-gray-600" />
                  <p className="text-xs text-gray-600">TVL</p>
                </div>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{policy.tvl}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-300">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-gray-600" />
                  <p className="text-xs text-gray-600">UT APY</p>
                </div>
                <p className="text-lg sm:text-2xl font-bold text-blue-600">{policy.apy}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-300">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <p className="text-xs text-gray-600">Expiry</p>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-900">{policy.expiry}</p>
              </div>
            </div>

            {/* Historical Price Chart */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">Price History (30 Days)</h3>
              <div className="bg-gray-50 rounded-lg p-2 sm:p-4 border border-gray-300">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={policy.historicalData}>
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 10, fill: '#4b5563' }}
                      stroke="#9ca3af"
                    />
                    <YAxis 
                      tick={{ fontSize: 10, fill: '#4b5563' }}
                      stroke="#9ca3af"
                      domain={[0, 1]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line 
                      type="monotone" 
                      dataKey="IT" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                      dot={false}
                      name="IT Price"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="UT" 
                      stroke="#1f2937" 
                      strokeWidth={2}
                      dot={false}
                      name="UT Price"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Current Market Prices vs Redemption Price */}
            {!isExpired && redemption && (
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">Current Prices vs Theoretical Redemption</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                    <p className="text-xs text-blue-600 mb-2 font-semibold">IT (Insured Token)</p>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-600">Market Price</p>
                        <p className="text-2xl font-bold text-blue-600">{policy.itPrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Redemption Price (if expired now)</p>
                        <p className="text-lg font-semibold text-gray-900">{redemption.itRedemption}</p>
                      </div>
                      <div className={`text-xs font-medium ${parseFloat(redemption.itDeviation) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {parseFloat(redemption.itDeviation) > 0 ? '↑' : '↓'} {Math.abs(parseFloat(redemption.itDeviation))}% vs redemption
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                    <p className="text-xs text-gray-900 mb-2 font-semibold">UT (Underwriting Token)</p>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-600">Market Price</p>
                        <p className="text-2xl font-bold text-gray-900">{policy.utPrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Redemption Price (if expired now)</p>
                        <p className="text-lg font-semibold text-gray-900">{redemption.utRedemption}</p>
                      </div>
                      <div className={`text-xs font-medium ${parseFloat(redemption.utDeviation) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {parseFloat(redemption.utDeviation) > 0 ? '↑' : '↓'} {Math.abs(parseFloat(redemption.utDeviation))}% vs redemption
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* IT Coverage Economics */}
            {!isExpired && (
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">IT Coverage Economics</h3>
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Cost per $100k coverage</span>
                      <span className="text-lg font-bold text-blue-600">
                        ${(parseFloat(policy.itPrice) * 100000).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Max Leverage</span>
                      <span className="text-lg font-bold text-blue-600">
                        {(1 / parseFloat(policy.itPrice)).toFixed(0)}x
                      </span>
                    </div>
                    <div className="pt-3 border-t border-blue-200">
                      <p className="text-xs text-gray-700 mb-1">Example:</p>
                      <p className="text-sm font-semibold text-gray-900">
                        $5,000 → ${((5000 / parseFloat(policy.itPrice)) / 1000000).toFixed(2)}M coverage
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* UT Return Breakdown */}
            {!isExpired && policy.apy !== '-' && policy.utBreakdown && (
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">UT Return Breakdown ({policy.apy} APY)</h3>
                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">📊 Trading Fees (AMM LPs)</span>
                      <span className="text-sm font-semibold text-gray-900">{policy.utBreakdown.tradingFees}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">💰 Underlying Yield ({policy.underlying})</span>
                      <span className="text-sm font-semibold text-gray-900">{policy.utBreakdown.underlyingYield}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">🔒 Policy Premiums</span>
                      <span className="text-sm font-semibold text-gray-900">{policy.utBreakdown.policyPremiums}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Settlement Function */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">Settlement Function</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-300 overflow-x-auto">
                <code className="text-xs sm:text-sm text-blue-600 font-mono break-all block mb-2">{policy.settlement}</code>
                <a 
                  href={`https://etherscan.io/address/${policy.contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1"
                >
                  Explore Contract →
                </a>
              </div>
            </div>

            {/* Curator Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">Market Curator</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-semibold text-gray-900 mb-1">{policy.curator.name}</p>
                    <p className="text-xs text-gray-600 font-mono">{policy.curator.address}</p>
                  </div>
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Policy Details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">Policy Details</h3>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-300 gap-1">
                  <span className="text-sm text-gray-600">Underlying Asset</span>
                  <span className="text-sm text-gray-900 font-medium">{policy.underlying}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-300 gap-1">
                  <span className="text-sm text-gray-600">Effective Date</span>
                  <span className="text-sm text-gray-900 font-medium">{policy.details.effectiveDate}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-300 gap-1">
                  <span className="text-sm text-gray-600">Expiration Date</span>
                  <span className="text-sm text-gray-900 font-medium">{policy.details.expirationDate}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-300 gap-1">
                  <span className="text-sm text-gray-600">Oracle</span>
                  <span className="text-sm text-gray-900 font-medium break-all">{policy.details.oracle}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-300 gap-1">
                  <span className="text-sm text-gray-600">Threshold</span>
                  <span className="text-sm text-gray-900 font-medium">{policy.details.threshold}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 gap-1">
                  <span className="text-sm text-gray-600">Max Payout</span>
                  <span className="text-sm text-gray-900 font-medium">{policy.details.maxPayout}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            {isExpired ? (
              <div className="space-y-3 pt-4">
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                  <p className="text-sm text-blue-800 font-medium mb-2">⏱️ Policy Expired - Redemption Available</p>
                  <p className="text-xs text-blue-700">
                    IT redeems at {policy.finalSettlement.itRedemption} • UT redeems at {policy.finalSettlement.utRedemption}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base">
                    Redeem IT
                  </button>
                  <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base">
                    Redeem UT
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-4">
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                  <p className="text-sm text-blue-800 font-medium mb-1">💡 How to participate</p>
                  <p className="text-xs text-blue-700">
                    Mint IT+UT by depositing {policy.underlying}, or swap on the AMM to buy IT or UT separately
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 sm:px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    Mint IT + UT
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPage('amm');
                      onClose();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 sm:px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                    <ArrowUpDown className="w-4 h-4 sm:w-5 sm:h-5" />
                    Trade on AMM
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };



  const MarketsPage = () => (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Insurance Markets</h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Liquid, tradable risk protection for DeFi. Every policy is fully collateralized with IT + UT = 1 underlying asset.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-12">
        <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Total TVL</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">$15.5M</p>
        </div>
        <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Active Policies</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">3</p>
        </div>
        <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Avg UT APY</p>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">15.5%</p>
        </div>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {policies.map(policy => (
          <PolicyCard key={policy.id} policy={policy} />
        ))}
      </div>
    </main>
  );

  const AMMPage = () => {
    const [selectedTokenIn, setSelectedTokenIn] = useState('');
    const [selectedTokenOut, setSelectedTokenOut] = useState('');
    const [amountIn, setAmountIn] = useState('');
    const [selectedPolicy, setSelectedPolicyForSwap] = useState('');

    // Get available tokens based on selected policy
    const getAvailableTokens = () => {
      if (!selectedPolicy) return [];
      const policy = policies.find(p => p.id === parseInt(selectedPolicy));
      if (!policy) return [];
      return ['IT', 'UT', policy.underlying];
    };

    // Calculate pool data based on selections
    const getPoolData = () => {
      if (!selectedPolicy || !selectedTokenIn || !selectedTokenOut) return null;

      const policy = policies.find(p => p.id === parseInt(selectedPolicy));
      if (!policy || policy.status === 'Expired') return null;

      // Find the appropriate pool
      const poolKey = [selectedTokenIn, selectedTokenOut].sort().join('/');
      const pool = ammPools.find(p => 
        p.policyId === policy.id && 
        (p.pair === `${selectedTokenIn}/${selectedTokenOut}` || p.pair === `${selectedTokenOut}/${selectedTokenIn}`)
      );

      return pool || {
        reserve0: '0',
        reserve1: '0',
        volume24h: '$0',
        fees24h: '$0',
        price: '0'
      };
    };

    const poolData = getPoolData();
    const availableTokens = getAvailableTokens();
    const estimatedOut = amountIn && poolData ? (parseFloat(amountIn) * parseFloat(poolData.price)).toFixed(4) : '0.0';

    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Automated Market Maker</h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Trade IT and UT tokens with instant liquidity. All pools maintain IT + UT = 1 invariant.
          </p>
        </div>

        {/* Swap Interface */}
        <div className="bg-white border border-gray-300 rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Swap Tokens</h2>
          
          {/* Policy Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Policy</label>
            <select
              value={selectedPolicy}
              onChange={(e) => {
                setSelectedPolicyForSwap(e.target.value);
                setSelectedTokenIn('');
                setSelectedTokenOut('');
                setAmountIn('');
              }}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Choose a policy...</option>
              {policies.filter(p => p.status === 'Active').map(policy => (
                <option key={policy.id} value={policy.id}>
                  {policy.name}
                </option>
              ))}
            </select>
          </div>

          {/* From Token */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <select
                  value={selectedTokenIn}
                  onChange={(e) => setSelectedTokenIn(e.target.value)}
                  disabled={!selectedPolicy}
                  className="flex-shrink-0 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-900 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value="">Token</option>
                  {availableTokens.map(token => (
                    <option key={token} value={token} disabled={token === selectedTokenOut}>
                      {token}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="0.0"
                  value={amountIn}
                  onChange={(e) => setAmountIn(e.target.value)}
                  disabled={!selectedTokenIn}
                  className="flex-1 bg-transparent text-right text-2xl sm:text-3xl font-semibold text-gray-900 outline-none disabled:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Switch Button */}
          <div className="flex justify-center my-4">
            <button
              onClick={() => {
                const temp = selectedTokenIn;
                setSelectedTokenIn(selectedTokenOut);
                setSelectedTokenOut(temp);
              }}
              disabled={!selectedTokenIn || !selectedTokenOut}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeftRight className="w-5 h-5 text-gray-900" />
            </button>
          </div>

          {/* To Token */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <select
                  value={selectedTokenOut}
                  onChange={(e) => setSelectedTokenOut(e.target.value)}
                  disabled={!selectedPolicy}
                  className="flex-shrink-0 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-900 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value="">Token</option>
                  {availableTokens.map(token => (
                    <option key={token} value={token} disabled={token === selectedTokenIn}>
                      {token}
                    </option>
                  ))}
                </select>
                <div className="flex-1 text-right text-2xl sm:text-3xl font-semibold text-gray-600">
                  {estimatedOut}
                </div>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <button
            disabled={!selectedPolicy || !selectedTokenIn || !selectedTokenOut || !amountIn}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors text-base sm:text-lg"
          >
            Swap
          </button>
        </div>

        {/* Pool Info - Only shown when tokens are selected */}
        {poolData && selectedTokenIn && selectedTokenOut && (
          <div className="bg-white border border-gray-300 rounded-2xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Pool Information</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-300">
                <span className="text-sm text-gray-600">Pool</span>
                <span className="text-sm font-semibold text-gray-900">{selectedTokenIn}/{selectedTokenOut}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-300">
                <span className="text-sm text-gray-600">Price</span>
                <span className="text-sm font-semibold text-blue-600">{poolData.price}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
                  <p className="text-xs text-gray-600 mb-1">Reserve {selectedTokenIn}</p>
                  <p className="text-lg font-bold text-gray-900">{poolData.reserve0}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
                  <p className="text-xs text-gray-600 mb-1">Reserve {selectedTokenOut}</p>
                  <p className="text-lg font-bold text-gray-900">{poolData.reserve1}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-gray-600 mb-1">24h Volume</p>
                  <p className="text-base font-semibold text-gray-900">{poolData.volume24h}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">24h Fees</p>
                  <p className="text-base font-semibold text-blue-600">{poolData.fees24h}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-300 bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">cassa</div>
            <span className="text-xs text-gray-500 mt-1">Protocol</span>
          </div>
          <nav className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => setCurrentPage('markets')}
              className={`text-sm font-medium transition-colors ${currentPage === 'markets' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Markets
            </button>
            <button 
              onClick={() => setCurrentPage('amm')}
              className={`text-sm font-medium transition-colors ${currentPage === 'amm' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              AMM
            </button>
          </nav>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors shadow-sm text-sm sm:text-base">
            Connect Wallet
          </button>
        </div>

      </header>

      {currentPage === 'markets' ? <MarketsPage /> : <AMMPage />}

      {/* Modals */}
      {selectedPolicy && (
        <PolicyModal policy={selectedPolicy} onClose={() => setSelectedPolicy(null)} />
      )}
    </div>
  );
};

export default function MarketsPage() {
  return <CassaProtocol />;
}