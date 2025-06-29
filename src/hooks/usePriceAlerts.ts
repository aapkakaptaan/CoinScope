import { useState, useEffect } from "react";
import { PriceAlert } from "../types";
import {
  loadAlerts,
  saveAlerts,
  addAlert as addAlertToStorage,
  removeAlert as removeAlertFromStorage,
  toggleAlert as toggleAlertInStorage,
} from "../utils/storage";
import toast from "react-hot-toast";

export const usePriceAlerts = (tokenPrices: Record<string, any>) => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);

  useEffect(() => {
    setAlerts(loadAlerts());
  }, []);

  useEffect(() => {
    // Check alerts when prices update
    if (Object.keys(tokenPrices).length === 0) return;

    alerts.forEach((alert) => {
      if (!alert.isActive) return;

      const tokenPrice = Object.values(tokenPrices).find(
        (price: any) =>
          price.symbol?.toLowerCase() === alert.tokenSymbol.toLowerCase()
      );

      if (!tokenPrice) return;

      const currentPrice = tokenPrice.current_price || tokenPrice.usd;
      const shouldTrigger =
        alert.condition === "above"
          ? currentPrice >= alert.targetPrice
          : currentPrice <= alert.targetPrice;

      if (shouldTrigger) {
        toast.success(
          `🚨 ${alert.tokenSymbol} is ${alert.condition} $${
            alert.targetPrice
          }! Current: $${currentPrice.toFixed(2)}`,
          { duration: 6000 }
        );

        // Deactivate the alert after triggering
        toggleAlert(alert.id);
      }
    });
  }, [tokenPrices, alerts]);

  const addAlert = (
    tokenSymbol: string,
    targetPrice: number,
    condition: "above" | "below"
  ) => {
    const newAlert = addAlertToStorage({
      tokenSymbol,
      targetPrice,
      condition,
      isActive: true,
    });
    setAlerts((prev) => [...prev, newAlert]);
    toast.success(`Alert set for ${tokenSymbol} ${condition} $${targetPrice}`);
  };

  const removeAlert = (id: string) => {
    removeAlertFromStorage(id);
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    toast.success("Alert removed");
  };

  const toggleAlert = (id: string) => {
    toggleAlertInStorage(id);
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
      )
    );
  };

  return {
    alerts,
    addAlert,
    removeAlert,
    toggleAlert,
  };
};
