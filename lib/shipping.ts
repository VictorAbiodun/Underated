export const shippingFor = (state: string) => Number(state === "lagos" ? process.env.NEXT_PUBLIC_SHIPPING_LAGOS_NGN ?? 3000 : process.env.NEXT_PUBLIC_SHIPPING_OTHER_NGN ?? 5000);
