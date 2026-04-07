export interface TEMPart {
  id: string;
  name: string;
  englishName: string;
  description: string;
  principle: string;
  color: string;
  position: [number, number, number];
  labelPosition: 'left' | 'right';
  args: [number, number, number, number]; // Outer shell dimensions
  diagramUrl?: string;
}

export const temParts: TEMPart[] = [
  {
    id: 'electron-gun',
    name: '电子枪',
    englishName: 'Electron Gun',
    description: '位于镜筒最顶端，是整个显微镜的照明源。',
    principle: '通过加热灯丝（热电子发射）或施加强电场（场发射）产生电子。电子随后在阳极的高压电场（通常为80kV-300kV）作用下加速，形成一束高能、短波长的电子束，向下射入镜筒。',
    color: '#3b82f6', // blue
    position: [0, 7.5, 0],
    labelPosition: 'left',
    args: [1.2, 1.2, 2.0, 32],
    diagramUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=400',
  },
  {
    id: 'condenser-lenses',
    name: '聚光镜系统',
    englishName: 'Condenser Lenses',
    description: '由一系列透镜组成，用于控制照射在样品上的电子束。',
    principle: '主要决定电子束的“光斑大小”（Spot Size）和“强度”（Intensity）。通过改变透镜电流，可以实现平行照明或会聚照明。',
    color: '#22c55e', // green
    position: [0, 4.5, 0],
    labelPosition: 'left',
    args: [1.2, 1.2, 3.0, 32],
    diagramUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800&h=400',
  },
  {
    id: 'specimen',
    name: '样品台',
    englishName: 'Specimen',
    description: '用于放置超薄样品的装置。',
    principle: '样品必须足够薄（通常小于100纳米），以便电子束能够穿透。样品台允许在X、Y、Z轴上精确移动样品，并可以倾斜样品以获得不同的晶体学取向。',
    color: '#ef4444', // red
    position: [0, 2.5, 0],
    labelPosition: 'right',
    args: [1.3, 1.3, 0.6, 32],
    diagramUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=800&h=400',
  },
  {
    id: 'objective-lens',
    name: '物镜',
    englishName: 'Objective Lens',
    description: 'TEM中最关键的透镜，紧挨着样品下方。',
    principle: '高能电子束穿透样品后，物镜对其进行第一级放大，并在其后焦面形成衍射花样，在像平面形成第一级放大像。物镜的像差直接决定了显微镜的最高分辨率。',
    color: '#f97316', // orange
    position: [0, 0.5, 0],
    labelPosition: 'left',
    args: [1.2, 1.2, 2.5, 32],
    diagramUrl: 'https://images.unsplash.com/photo-1581092926229-5a4a23b24083?auto=format&fit=crop&q=80&w=800&h=400',
  },
  {
    id: 'intermediate-lens',
    name: '中间镜',
    englishName: 'Intermediate Lens',
    description: '位于物镜下方，用于选择成像模式或衍射模式。',
    principle: '通过改变中间镜的焦距，可以选择将物镜的像平面（成像模式）或后焦面（衍射模式）作为物进行二次放大。',
    color: '#eab308', // yellow
    position: [0, -2.0, 0],
    labelPosition: 'left',
    args: [1.2, 1.2, 1.5, 32],
    diagramUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800&h=400',
  },
  {
    id: 'projector-lens',
    name: '投影镜',
    englishName: 'Projector Lens',
    description: '位于中间镜下方，用于最终的图像放大。',
    principle: '将中间镜的图像进一步放大，并投射到最终的荧光屏或相机上。投影镜通常具有很深的景深，因此即使改变放大倍数，图像也能保持清晰。',
    color: '#facc15', // lighter yellow
    position: [0, -4.0, 0],
    labelPosition: 'left',
    args: [1.2, 1.2, 1.5, 32],
    diagramUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800&h=400',
  },
  {
    id: 'viewing-screen',
    name: '荧光屏',
    englishName: 'Viewing Screen',
    description: '用于直接观察电子图像的屏幕。',
    principle: '不可见的电子束打在涂有荧光物质的屏幕上，激发出可见光，从而将电子图像转换为人眼可见的光学图像。',
    color: '#94a3b8', // slate
    position: [0, -6.5, 0],
    labelPosition: 'right',
    args: [2.0, 2.0, 2.5, 32], // Sphere-like bounding box
    diagramUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400',
  },
  {
    id: 'camera',
    name: '相机',
    englishName: 'Camera',
    description: '用于数字化记录图像的设备。',
    principle: '当荧光屏升起时，电子束直接打在底部的数字相机（如CCD、CMOS或直接电子探测器）上，记录高分辨率的数字图像。',
    color: '#475569', // dark slate
    position: [0, -9.0, 0],
    labelPosition: 'right',
    args: [1.0, 1.0, 1.5, 32],
    diagramUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800&h=400',
  },
];
