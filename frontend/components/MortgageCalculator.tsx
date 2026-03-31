'use client';

import { useState, useEffect, useCallback } from 'react';
import { DollarSign, Percent, Calendar, TrendingDown } from 'lucide-react';

interface MortgageCalculatorProps {
  propertyPrice: number;
  currency?: string;
}

export default function MortgageCalculator({ propertyPrice, currency = 'USD' }: MortgageCalculatorProps) {
  const [homePrice, setHomePrice] = useState(propertyPrice);
  const [downPayment, setDownPayment] = useState(Math.round(propertyPrice * 0.2));
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const calculateMortgage = useCallback(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal <= 0 || monthlyRate <= 0 || numberOfPayments <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      return;
    }

    const payment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const total = payment * numberOfPayments;
    const interest = total - principal;

    setMonthlyPayment(payment);
    setTotalInterest(interest);
  }, [homePrice, downPayment, loanTerm, interestRate]);

  useEffect(() => {
    calculateMortgage();
  }, [calculateMortgage]);

  const formatCurrency = (amount: number) => {
    const currencySymbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      AUD: 'A$',
      CAD: 'C$',
    };
    const symbol = currencySymbols[currency] || '$';
    return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const downPaymentPercent = ((downPayment / homePrice) * 100).toFixed(1);
  const loanAmount = homePrice - downPayment;

  return (
    <div className="lux-card p-6">
      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <DollarSign className="w-6 h-6 text-[#C9A96A]" />
        Mortgage Calculator
      </h3>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#C9A96A] to-[#B78F4A] text-white">
          <div className="text-sm opacity-90 mb-1">Monthly Payment</div>
          <div className="text-3xl font-bold">{formatCurrency(monthlyPayment)}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#F8F6F3]">
          <div className="text-sm text-[#7A6E60] mb-1">Total Interest</div>
          <div className="text-2xl font-semibold text-[#2B2620]">{formatCurrency(totalInterest)}</div>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-6">
        {/* Home Price */}
        <div>
          <label className="block text-sm font-medium text-[#5F5448] mb-2">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Home Price
          </label>
          <input
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="lux-input"
            step="1000"
          />
        </div>

        {/* Down Payment */}
        <div>
          <label className="block text-sm font-medium text-[#5F5448] mb-2">
            <TrendingDown className="w-4 h-4 inline mr-1" />
            Down Payment ({downPaymentPercent}%)
          </label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="lux-input"
            step="1000"
          />
          <div className="flex gap-2 mt-2">
            {[10, 15, 20, 25, 30].map((percent) => (
              <button
                key={percent}
                type="button"
                onClick={() => setDownPayment(Math.round((homePrice * percent) / 100))}
                className="px-3 py-1 text-sm rounded-full border border-[#E8E1D7] hover:border-[#C9A96A] hover:bg-[#F8F6F3] transition"
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-medium text-[#5F5448] mb-2">
            <Percent className="w-4 h-4 inline mr-1" />
            Interest Rate
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="lux-input"
            step="0.1"
            min="0"
            max="20"
          />
        </div>

        {/* Loan Term */}
        <div>
          <label className="block text-sm font-medium text-[#5F5448] mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Loan Term (years)
          </label>
          <div className="flex gap-2">
            {[15, 20, 30].map((years) => (
              <button
                key={years}
                type="button"
                onClick={() => setLoanTerm(years)}
                className={`flex-1 px-4 py-2 rounded-full border transition ${
                  loanTerm === years
                    ? 'bg-[#C9A96A] text-white border-[#C9A96A]'
                    : 'bg-white text-[#2B2620] border-[#E8E1D7] hover:border-[#C9A96A]'
                }`}
              >
                {years} yrs
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-[#E8E1D7] space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[#7A6E60]">Loan Amount</span>
          <span className="font-semibold text-[#2B2620]">{formatCurrency(loanAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#7A6E60]">Down Payment</span>
          <span className="font-semibold text-[#2B2620]">{formatCurrency(downPayment)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#7A6E60]">Total Paid Over {loanTerm} Years</span>
          <span className="font-semibold text-[#2B2620]">
            {formatCurrency(monthlyPayment * loanTerm * 12 + downPayment)}
          </span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-[#F8F6F3] rounded-lg">
        <p className="text-xs text-[#7A6E60]">
          * This calculator provides estimates only. Actual monthly payment may include property taxes, homeowners insurance, HOA fees, and PMI.
        </p>
      </div>
    </div>
  );
}
