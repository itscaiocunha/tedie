export enum AnalyticsEvent {
  ADD_TO_CART = "add_to_cart",
  VIEW_PRODUCT = "view_product"
}

export const trackEvent = (event: AnalyticsEvent, data?: Record<string, any>) => {
  // Implementação real dependerá da sua solução de analytics
  console.log(`Tracking: ${event}`, data);
  
  // Exemplo para Google Analytics:
  // window.gtag('event', event, data);
  
  // Ou para algum serviço customizado:
  // fetch('/api/analytics', { method: 'POST', body: JSON.stringify({ event, data }) });
};