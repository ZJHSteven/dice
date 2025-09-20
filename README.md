# 骰子



适用于 d20 规则的精美 3D 骰子扩展，提供平滑的动画与真实的物理掷骰体验。



> 本仓库基于 [Owlbear Rodeo Dice](https://github.com/owlbear-rodeo/dice) 翻译为简体中文，原作者为 Owlbear Rodeo。汉化维护者：ZJHSteven（<https://github.com/ZJHSteven/dice>）。如需反馈非本地化问题或了解最新进展，请以原仓库为准；本仓库仅负责界面与文档汉化。



![示例](/docs/header.jpg)



## 安装

推荐使用“从 URL 安装”的方式添加本汉化扩展：

- 复制清单链接：`https://dice-2ed.pages.dev/manifest.json`
- 在 OBR 中打开 Extensions → Install from URL，粘贴上述链接并确认。

提示：如你已从上游商店安装了英文版，请先卸载后再按以上步骤安装本汉化版本，以避免混淆。


## 使用提示



- 点击左侧骰子列表可以将对应骰子加入骰子盘。

- 按下“掷骰”按钮后会启动 3D 物理模拟，掷骰动画与结果会同步推送给房间内所有玩家。

- 右下角默认展示其他玩家的骰子预览，点击可展开查看完整动画。

- 通过侧栏的“眼睛”图标可以切换私密掷骰；使用“+/-”图标可以为下一次掷骰添加加值或优势/劣势；“放大镜”图标可以快速复掷最近的记录。



## 工作原理



本扩展采用 [React](https://reactjs.org/) 构建界面、[Three.js](https://threejs.org/) 渲染 3D 场景，并使用 [Rapier](https://rapier.rs/) 进行物理模拟。掷骰结果依据物理模拟产生，同时用于驱动动画和最终点数。



Rapier 具备确定性，意味着在不同计算机上给出相同初始条件会得到一致的结果。因此扩展只需同步掷骰的初始参数，便可降低网络负担并确保所有客户端呈现一致的动画。



关于公平性，原作者提供了 [统计分析](https://blog.owlbear.rodeo/are-owlbear-rodeos-dice-fair/) 说明掷骰结果符合公平分布。



想在 Owlbear Rodeo 之外体验掷骰器，可访问 <https://dice.owlbear.rodeo/>。



## 本地开发流程



以下步骤提供一个最小可运行示例，便于快速验证汉化效果：



1. 安装依赖：在项目根目录执行 `npm install`，会依据 `package-lock.json` 安装锁定版本的依赖。

2. 启动开发服务器：运行 `npm run dev`，按照命令行提示访问本地地址（通常为 <http://localhost:5173/>）。

3. 构建生产版本：执行 `npm run build`，构建结果输出至 `dist` 目录，CI/CD 亦应调用该命令。

4. 可选：执行 `npm run preview` 检视构建版本的运行效果。



## 项目结构



- `src`：源代码目录，包含 UI、状态管理以及物理模拟相关模块。

- `src/plugin`：与 Owlbear Rodeo 扩展集成的入口代码。

- `src/sets/diceSets.ts`：如需基于现有样式创建新骰子组合，可在此文件中调整配置。

- `src/materials` / `src/meshes` / `src/colliders` / `src/previews`：分别存放材质、网格、碰撞体与预览图资源。



## 许可证



遵循 GNU GPLv3 许可证。



## 贡献说明



本项目旨在提供中文本地化示例，不计划接受功能性新特性。欢迎基于本仓库二次开发您自己的骰子扩展；如涉及核心功能改动，请优先向上游仓库提交议题或合并请求。

