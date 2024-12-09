import { useMemo } from "react";
import { BRAND_CONFIG } from "../constants/brandConfig";

export const useBrandConfig = () => {
  return useMemo(() => {
    const currentDomain = window.location.hostname;

    const brandConfig =
      Object.values(BRAND_CONFIG).find((config) =>
        currentDomain.includes(config.domain)
      ) || BRAND_CONFIG.MUSINSA; // 기본값으로 무신사 설정

    return brandConfig;
  }, []);
};
