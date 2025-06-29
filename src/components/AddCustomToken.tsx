import React, { useState } from 'react';
import { X, Plus, AlertCircle } from 'lucide-react';

interface AddCustomTokenProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToken: (address: string) => Promise<any>;
}

export const AddCustomToken: React.FC<AddCustomTokenProps> = ({ 
  isOpen, 
  onClose, 
  onAddToken 
}) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenAddress.trim()) return;

    setIsAdding(true);
    setError('');

    try {
      await onAddToken(tokenAddress.trim());
      setTokenAddress('');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to add token');
    } finally {
      setIsAdding(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Add Custom Token</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Token Contract Address
            </label>
            <input
              type="text"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-3 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <p className="text-blue-400 text-sm">
              <strong>Note:</strong> Make sure the contract address is correct. 
              Only ERC-20 tokens are supported.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-600 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAdding || !tokenAddress.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 px-4 py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2"
            >
              {isAdding ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Token
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};