import { PriceAlert } from "../types";

const ALERTS_KEY = "crypto-portfolio-alerts";

export const saveAlerts = (alerts: PriceAlert[]) => {
  localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
};

export const loadAlerts = (): PriceAlert[] => {
  const stored = localStorage.getItem(ALERTS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addAlert = (alert: Omit<PriceAlert, "id" | "createdAt">) => {
  const alerts = loadAlerts();
  const newAlert: PriceAlert = {
    ...alert,
    id: Date.now().toString(),
    createdAt: Date.now(),
  };
  alerts.push(newAlert);
  saveAlerts(alerts);
  return newAlert;
};

export const removeAlert = (id: string) => {
  const alerts = loadAlerts();
  const filtered = alerts.filter((alert) => alert.id !== id);
  saveAlerts(filtered);
};

export const toggleAlert = (id: string) => {
  const alerts = loadAlerts();
  const alert = alerts.find((a) => a.id === id);
  if (alert) {
    alert.isActive = !alert.isActive;
    saveAlerts(alerts);
  }
};
