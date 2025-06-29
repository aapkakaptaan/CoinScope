import React from "react";
import { Bell, BellOff, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { PriceAlert } from "../types";

interface PriceAlertsProps {
  alerts: PriceAlert[];
  onToggleAlert: (id: string) => void;
  onRemoveAlert: (id: string) => void;
}

export const PriceAlerts: React.FC<PriceAlertsProps> = ({
  alerts,
  onToggleAlert,
  onRemoveAlert,
}) => {
  if (alerts.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="text-center">
          <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-white text-lg font-medium mb-2">
            No Price Alerts
          </h3>
          <p className="text-gray-400">
            Set alerts on tokens to get notified when prices reach your targets
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
      <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
        <Bell className="w-5 h-5" />
        Price Alerts ({alerts.length})
      </h2>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
              alert.isActive
                ? "bg-blue-500/10 border-blue-500/30"
                : "bg-gray-700/30 border-gray-600/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  alert.condition === "above"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {alert.condition === "above" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
              </div>

              <div>
                <p className="text-white font-medium">
                  {alert.tokenSymbol} {alert.condition} ${alert.targetPrice}
                </p>
                <p className="text-gray-400 text-sm">
                  {alert.isActive ? "Active" : "Inactive"} •
                  {new Date(alert.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleAlert(alert.id)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  alert.isActive
                    ? "text-blue-400 hover:bg-blue-500/20"
                    : "text-gray-500 hover:bg-gray-600/50"
                }`}
                title={alert.isActive ? "Disable Alert" : "Enable Alert"}
              >
                {alert.isActive ? (
                  <Bell className="w-4 h-4" />
                ) : (
                  <BellOff className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => onRemoveAlert(alert.id)}
                className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                title="Remove Alert"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
