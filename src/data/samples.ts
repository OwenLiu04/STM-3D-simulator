export interface Sample {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

// 使用 SVG 和 feTurbulence 生成逼真的 TEM 噪声背景和样品图像
// 修复：使用 encodeURIComponent 确保 SVG 中的 # 等特殊字符能被正确解析为 Data URL
const generateTEMImage = (content: string) => {
  const svg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 0.2 0" />
      </filter>
      <filter id="blur">
        <feGaussianBlur stdDeviation="1.5" />
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="#8c8c8c"/>
    <g filter="url(#blur)">
      ${content}
    </g>
    <rect width="100%" height="100%" style="pointer-events:none;" filter="url(#noise)"/>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const samples: Sample[] = [
  {
    id: 'au-np',
    name: '金纳米颗粒 (Au NPs)',
    description: '分散在碳膜上的高对比度球形金纳米颗粒。由于金的原子序数大，对电子散射强，在明场像中呈现暗色圆点。',
    imageUrl: generateTEMImage(`
      <circle cx="100" cy="120" r="25" fill="#222"/>
      <circle cx="250" cy="180" r="35" fill="#1a1a1a"/>
      <circle cx="180" cy="280" r="20" fill="#2a2a2a"/>
      <circle cx="320" cy="100" r="15" fill="#333"/>
      <circle cx="80" cy="250" r="30" fill="#111"/>
      <circle cx="200" cy="80" r="18" fill="#222"/>
    `)
  },
  {
    id: 'cnt',
    name: '多壁碳纳米管 (MWCNTs)',
    description: '相互交织的管状碳纳米结构。可以看到管壁的层状结构和中空的内部。',
    imageUrl: generateTEMImage(`
      <path d="M -50 100 Q 200 150 450 50" stroke="#333" stroke-width="20" fill="none" />
      <path d="M -50 100 Q 200 150 450 50" stroke="#666" stroke-width="10" fill="none" />
      
      <path d="M 100 -50 Q 150 200 50 450" stroke="#222" stroke-width="25" fill="none" />
      <path d="M 100 -50 Q 150 200 50 450" stroke="#555" stroke-width="15" fill="none" />

      <path d="M 350 -50 Q 250 250 400 450" stroke="#111" stroke-width="18" fill="none" />
      <path d="M 350 -50 Q 250 250 400 450" stroke="#444" stroke-width="8" fill="none" />
    `)
  },
  {
    id: 'graphene',
    name: '高分辨石墨烯晶格 (HRTEM)',
    description: '极高放大倍数下的石墨烯原子级分辨率图像，呈现出典型的六边形蜂窝状晶格条纹。',
    imageUrl: generateTEMImage(`
      <pattern id="hex" width="40" height="69.282" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
        <path d="M 40 17.321 L 20 5.774 L 0 17.321 L 0 40.415 L 20 51.962 L 40 40.415 Z" stroke="#444" stroke-width="4" fill="none"/>
        <path d="M 20 51.962 L 20 75.055 M 40 17.321 L 60 5.774 M 0 17.321 L -20 5.774" stroke="#444" stroke-width="4" fill="none"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#hex)"/>
      <!-- 添加一些不均匀的照明和厚度变化 -->
      <circle cx="200" cy="200" r="150" fill="#000" opacity="0.3" filter="blur(20px)"/>
    `)
  }
];
