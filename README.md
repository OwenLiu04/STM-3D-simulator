# STM 3D Simulator 🔬 / 透射电子显微镜 3D 教学系统

[English](#english) | [中文版](#中文版)

---

<a id="english"></a>
## English

An interactive, browser-based 3D educational application designed to help students and researchers understand the structure and working principles of a Scanning Transmission Electron Microscope (STM). 

The entire application is bundled into a **single HTML file**, making it incredibly easy to share, host, or use completely offline without any server setup.

### ✨ Features

*   **Interactive 3D Model:** Explore a detailed 3D model of a TEM. Rotate around the central axis and zoom in to specific parts using your mouse.
*   **Component Inspection:** Click on individual components (Electron Gun, Condenser Lenses, Objective Lens, etc.) to view detailed descriptions and working principles.
*   **Schematic Diagrams:** Features custom-drawn SVG schematic diagrams for each major component, visually explaining the complex physics and electron paths.
*   **Real-time Control Console:** Simulate operating a TEM. Adjust the acceleration voltage (80kV to 300kV) and instantly see how it affects the resolution (blur) of the electron image. Toggle the electron beam to see its path through the column.
*   **Modern Tech Stack:** Built with React, Three.js, React Three Fiber, and Tailwind CSS for a smooth, responsive, and visually appealing experience.

### 🚀 Getting Started

#### For Users (No installation required)
Simply download the latest `index.html` (or `tem-3d-simulator.html`) file from the [Releases](../../releases) page and double-click it to open it in any modern web browser (Chrome, Edge, Safari, Firefox).

#### For Developers (Build from source)
1. Open a command-line tool (such as PowerShell or Terminal) in the project folder.
2. Run the following command to install dependencies:
   ```bash
   npm install
   ```
3. Run the following command to build:
   ```bash
   npm run build
   ```
After the build is complete, you will find a file named `index.html` in the `dist` folder under the project directory.

This `index.html` is a single file containing all code and resources. You can double-click it to open it in your browser directly, without any local server environment, making it very convenient for sharing and offline use!

---

<a id="中文版"></a>
## 中文版

这是一个基于浏览器的交互式 3D 教学应用程序，旨在帮助学生和科研人员直观地了解扫描透射电子显微镜（STM）的内部结构和工作原理。

整个应用程序被打包成一个**单 HTML 文件**，无需任何服务器配置，即可极其方便地分享、托管或完全离线使用。

### ✨ 功能特点

*   **交互式 3D 模型：** 探索精细的 TEM 3D 模型。支持绕中心轴旋转，以及以鼠标为中心的精准缩放。
*   **部件详细解析：** 点击显微镜的各个部件（如电子枪、聚光镜、物镜等），即可在侧边栏查看详细的核心功能和工作原理。
*   **专属原理示意图：** 每个核心部件都配备了专门绘制的 SVG 原理示意图，直观展示复杂的物理过程和电子束光路。
*   **实时控制台模拟：** 模拟真实的 TEM 操作。调节加速电压（80kV 至 300kV），实时观察电压变化对成像分辨率（模糊度）的影响；一键开启/关闭电子束，观察电子在镜筒中的传输路径。
*   **现代技术栈：** 采用 React, Three.js, React Three Fiber 和 Tailwind CSS 构建，提供流畅、响应迅速且美观的视觉体验。

### 🚀 快速开始

#### 面向普通用户（无需安装）
只需从 [Releases](../../releases) 页面下载最新的 `index.html`文件，双击即可在任何现代网页浏览器（如 Chrome, Edge, Safari, Firefox）中直接打开使用。

#### 面向开发者（从源码构建）
1. 在源代码文件夹中打开命令行工具（如 PowerShell 或 Terminal）。
2. 运行以下命令安装依赖：
   ```bash
   npm install
   ```
3. 运行以下命令进行构建：
   ```bash
   npm run build
   ```
构建完成后，您会在项目目录下的 `dist` 文件夹中找到一个名为 `index.html` 的文件。

这个 `index.html` 就是包含了所有代码和资源的单个文件。您可以直接双击在浏览器中打开它，无需任何本地服务器环境，非常方便分享和离线使用！
