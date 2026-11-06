(window.RA_DOMAINS = window.RA_DOMAINS || []).push(
{
  id: "03", name: "计算机视觉", en: "Computer Vision", branch: "vision",
  tagline: "从“刷单个任务的榜”走向“视觉基础模型 + 3D/视频 + 为具身服务”。经典任务正在被基础模型吞并，空白在它们失败的地方。",
  meters: [2, 3, 5, 5],
  leaves: ["分类 / 检测 / 分割", "视觉预训练表征", "开放词汇与 SAM", "相机几何与标定", "SfM / MVS / 前馈重建", "深度估计", "光流与跟踪", "BEV 与点云感知", "视频理解", "视觉基础模型", "测试时自适应"],
  keywords: ["CV", "检测", "分割", "SAM", "VGGT", "depth"],
  overview: [
    "计算机视觉经历了三次范式转移：<b>手工特征</b>（SIFT/HOG + SVM）→ <b>任务专用 CNN</b>（Faster R-CNN、FCN、U-Net）→ <b>大规模预训练的视觉基础模型</b>（ViT、CLIP、MAE、DINO、SAM）。今天大部分 2D 任务的标准做法是“拿一个基础模型做骨干/提示，再微调或适配”。",
    "2024–2025 年最大的变化在<b>3D</b>：DUSt3R/MASt3R、VGGT 等前馈模型直接从若干张图回归相机位姿、深度与点云，把传统 SfM 流程压缩成一次前向，VGGT 获得 CVPR 2025 最佳论文。单目深度（Depth Anything）、通用分割与跟踪（SAM 2/3）也都变成了“开箱即用”的基础模型。",
    "所以今天的 CV 研究格局是：<b>大厂做基础模型</b>，学术界做<b>失败模式分析、高效适配、新任务定义、几何与语义的结合、视频与 4D、以及为机器人/自动驾驶提供可用的感知</b>。这是最拥挤的领域之一，选题要避开“+0.3 mIoU”。"
  ],
  frontier: [
    ["前馈式 3D 重建", "VGGT、DUSt3R/MASt3R、π³ 等直接从图像回归几何，正在替代 COLMAP；动态场景、大规模场景、与 SLAM 结合是热点。"],
    ["通用分割与跟踪", "SAM 2 统一图像/视频分割；SAM 3 支持用概念（名词短语）提示分割所有实例。开放词汇检测（Grounding DINO 等）成为基础设施。"],
    ["自监督视觉表征", "DINOv3 在 7B 规模上证明纯视觉自监督的稠密特征质量；视觉表征如何服务 VLM 与机器人仍在探索。"],
    ["视频理解与长视频", "时序定位、长视频问答、事件推理；与多模态大模型（07）高度融合。"],
    ["空间智能", "从 2D 识别到 3D 空间关系理解，为具身与导航服务（与 07、19 交叉）。"]
  ],
  ideas: [
    ["基础模型的“失败地图”+ 轻量修复", "SAM/VGGT/Depth Anything 被所有人当工具用，但在透明物体、细长结构、医学/遥感、极端光照上系统性失败。把失败分类、找到根因并给出低成本修复，影响面大、算力小。", "选一个模型和一个失败类型，构建 200–500 张的诊断集，量化失败；试 adapter / 测试时优化 / 提示策略三种修复。"],
    ["几何一致性作为免费监督", "多视角之间的几何约束不需要标注。用前馈 3D 模型提供的对应关系去自训练 2D 模型（分割、语义特征），是“几何 × 语义”的优雅结合。", "在 ScanNet 场景上用 VGGT 得到跨视角对应，加一个跨视角一致性损失微调分割模型，看单视角性能与一致性指标。"],
    ["为下游具身任务定义的视觉评测", "现有视觉指标（mIoU、AbsRel）和机器人成功率相关性很弱。定义“对控制有用”的视觉指标是被低估的问题。", "收集同一操作任务下多种视觉骨干的策略成功率，研究哪些视觉指标能预测成功率。"]
  ],
  prereq: {
    must: ["02 深度学习基础", "CNN 与 ViT 架构，注意力的计算方式", "经典范式：Faster R-CNN / DETR（检测）、FCN / U-Net / Mask2Former（分割）", "相机模型、内外参、多视几何基础（对极几何、三角化）", "熟练使用 timm、HuggingFace、detectron2 / mmdetection 之一"],
    nice: ["OpenCV 与传统视觉算法", "3D 坐标变换与点云处理（Open3D）", "可视化与误差分析能力（这是 CV 研究者的核心技能）"]
  },
  setup: {
    data: "分类 ImageNet-1k；检测/分割 COCO（约 11.8 万训练图）、ADE20K（约 2 万）、Cityscapes；3D/深度 ScanNet、CO3D、KITTI、NYUv2；视频 Kinetics、DAVIS、YouTube-VOS。",
    compute: "微调/适配类工作 1–8 张 24–80GB 卡、数小时到数天；从头预训练基础模型需要百卡以上，学术界很少做。",
    code: "detectron2、mmdetection/mmsegmentation、timm、HuggingFace Transformers；各基础模型官方仓库（SAM 2、VGGT、DINOv2）。",
    bench: "检测 AP（COCO）、分割 mIoU / PQ、深度 AbsRel / δ1、位姿 AUC、跟踪 J&F；越来越重视零样本跨数据集泛化。",
    improve: "骨干与解码头、训练策略与数据增广、提示/适配器（LoRA、prompt）、蒸馏与轻量化、测试时自适应、新的任务定义与评测。",
    venue: "CVPR / ICCV / ECCV / NeurIPS / ICLR；TPAMI、IJCV"
  },
  recipe: ["选主 benchmark，复现强 baseline 到论文报告值的 0.5 点以内", "找到 baseline 的具体失败模式（可视化！）", "针对失败模式设计方法，而不是随便堆模块", "主表 + 消融 + 可视化 + 2–3 个数据集泛化", "效率对比（参数量、FLOPs、延迟）"],
  fit: {
    yes: ["对图像结果敏感，喜欢看可视化找规律", "希望工业界就业面广", "能接受高竞争、快节奏的投稿周期"],
    no: ["不想和大厂基础模型正面竞争又找不到差异化切口", "厌倦“+0.x 点”式改进"]
  },
  trial: [
    ["Day 1–3", "跑通 SAM 2 和 Depth Anything V2 的推理，在你自己拍的 50 张图上看效果，记录失败案例。"],
    ["Day 4–7", "用 mmsegmentation 在 ADE20K 子集上微调一个分割模型，学会完整的训练-评测流程。"],
    ["Day 8–11", "跑通 VGGT 或 DUSt3R，从手机视频重建一个房间，观察失败处。"],
    ["Day 12–14", "写下 3 个你观察到的、基础模型解决不了的问题。如果其中一个让你兴奋——这就是选题起点。"]
  ],
  classic: [
    ["Fully Convolutional Networks for Semantic Segmentation", "Long, Shelhamer, Darrell", 2015, "CVPR", "稠密预测的范式起点。"],
    ["Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks", "Ren et al.", 2015, "NeurIPS", "两阶段检测。"],
    ["Mask R-CNN", "He et al.", 2017, "ICCV", "实例分割。"],
    ["End-to-End Object Detection with Transformers", "Carion et al.", 2020, "ECCV", "DETR：集合预测。"],
    ["An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale", "Dosovitskiy et al.", 2021, "ICLR", "ViT。"],
    ["Masked Autoencoders Are Scalable Vision Learners", "He et al.", 2022, "CVPR", "MAE 自监督。"],
    ["Learning Transferable Visual Models From Natural Language Supervision", "Radford et al.", 2021, "ICML", "CLIP。"],
    ["Segment Anything", "Kirillov et al.", 2023, "ICCV", "提示式分割基础模型。"]
  ],
  recent: [
    ["VGGT: Visual Geometry Grounded Transformer", "Wang et al.", 2025, "CVPR", "前馈 3D 重建，CVPR 2025 最佳论文。"],
    ["DUSt3R: Geometric 3D Vision Made Easy", "Wang et al.", 2024, "CVPR", "点图回归，开启前馈重建浪潮。"],
    ["SAM 2: Segment Anything in Images and Videos", "Ravi et al.", 2025, "ICLR", "统一图像视频分割。"],
    ["SAM 3: Segment Anything with Concepts", "Carion et al. (Meta)", 2025, "arXiv", "概念提示分割。"],
    ["Depth Anything V2", "Yang et al.", 2024, "NeurIPS", "单目深度基础模型。"],
    ["DINOv3", "Siméoni et al. (Meta)", 2025, "arXiv", "大规模自监督稠密特征。"]
  ]
},
{
  id: "04", name: "图形学与 3D", en: "Graphics & 3D", branch: "vision",
  tagline: "神经渲染把图形学和视觉合流：NeRF 打开了门，3D Gaussian Splatting 让它实时，现在的问题是生成、动态与可编辑。",
  meters: [4, 3, 4, 4],
  leaves: ["渲染管线与光栅化", "光线追踪", "NeRF 神经辐射场", "3D Gaussian Splatting", "可微渲染", "SDF 与表面重建", "网格 / 点云 / 隐式表示", "人体与动画 SMPL", "3D 生成", "4D 动态场景", "数字人与可驱动化身"],
  keywords: ["NeRF", "3DGS", "gaussian", "渲染", "SMPL", "3D生成"],
  overview: [
    "传统图形学研究“给定场景如何渲染出图像”，视觉研究反问题“给定图像如何恢复场景”。<b>可微渲染</b>把两者连起来：只要渲染过程可微，就可以用图像损失优化 3D 表示。",
    "NeRF（2020）用 MLP 表示辐射场，实现了照片级新视角合成但很慢；Instant-NGP 用哈希编码加速到秒级；<b>3D Gaussian Splatting（2023）</b>用显式高斯基元 + 光栅化做到实时渲染，迅速成为主流表示。",
    "当下的主战场：<b>前馈重建</b>（不再逐场景优化，一次前向得到 3DGS）、<b>3D 资产生成</b>（从 2D 扩散蒸馏的 DreamFusion 走向原生 3D 潜空间扩散，如 TRELLIS、Hunyuan3D）、<b>4D 动态场景</b>、<b>可驱动数字人</b>，以及与机器人仿真（16）结合的 real2sim。"
  ],
  frontier: [
    ["原生 3D 生成", "结构化 3D 潜变量 + 扩散/流（TRELLIS、Hunyuan3D 2.0），从图像或文本直接生成带纹理网格/高斯，质量快速逼近可用资产。"],
    ["前馈 3DGS 与大重建模型", "LRM、pixelSplat、MVSplat 等从少量图像直接预测 3D 表示，与 03 的 VGGT 系列融合。"],
    ["几何精确的高斯", "2DGS 等让高斯能提取高质量表面；3DGS 的压缩、大场景、抗锯齿仍有大量工作。"],
    ["4D 与可驱动数字人", "动态高斯、从单目视频重建可驱动的人体/动物，服务于内容创作与人形机器人（20）。"],
    ["物理与可交互 3D", "为仿真生成带材质、质量、关节的资产（articulated objects），连接 3D 生成与具身智能。"]
  ],
  ideas: [
    ["面向仿真的“物理可用” 3D 生成", "现在的 3D 生成只管好看，不管能不能放进物理引擎（闭合网格、碰撞体、质量、关节）。这直接卡住了机器人数据规模化，需求明确。", "从 PartNet-Mobility 取关节物体，评估现有生成模型输出在 MuJoCo/Isaac 中的可用率，提出一个后处理或条件生成方案提升可用率。"],
    ["3DGS 的不确定性与主动采集", "知道“哪里重建得不好”能指导下一张照片拍哪里，对机器人与测绘都实用，理论上也干净。", "给 3DGS 加 Fisher 信息或集成式不确定性，在 Mip-NeRF 360 上做“选下一视角”实验，对比随机选择的 PSNR 增长曲线。"],
    ["编辑性作为一等公民的表示", "大多数表示为重建优化，编辑时就崩。设计天然支持语义编辑/重光照的表示，比再提 0.2dB PSNR 更有长远价值。", "在 3DGS 上绑定语义特征与材质参数，做“替换材质/移动物体”的基准任务并定义评测。"]
  ],
  prereq: {
    must: ["线性代数与几何变换（齐次坐标、四元数、相机投影）", "渲染方程与体渲染基础（NeRF 的积分怎么离散化）", "NeRF 与 3DGS 原理，能读懂 gsplat / nerfstudio 代码", "PyTorch，能读懂 CUDA kernel（3DGS 光栅化器是 CUDA 写的）", "03 中的多视几何基础与 COLMAP 使用"],
    nice: ["传统图形学（Games101 课程级别）", "Blender 脚本与 3D 资产格式（glTF/OBJ/USD）", "扩散模型（05）用于 3D 生成"]
  },
  setup: {
    data: "新视角合成：NeRF-Synthetic、Mip-NeRF 360、Tanks and Temples、DTU；3D 生成：Objaverse（80 万+ 物体）、Objaverse-XL；人体：SMPL 拟合数据、ZJU-MoCap、ActorsHQ。",
    compute: "单场景 3DGS 优化：1 张 RTX 4090 几分钟到一小时；前馈重建/3D 生成大模型：数十到数百张 A100/H100。",
    code: "gsplat、nerfstudio、原版 3DGS 仓库、PyTorch3D、Kaolin、threestudio（3D 生成）、TRELLIS 官方仓库。",
    bench: "PSNR / SSIM / LPIPS、渲染 FPS 与显存；几何 Chamfer 距离；生成任务 CLIP score、FID、用户研究。",
    improve: "基元表示与稠密化策略、正则项、抗锯齿、压缩与速度、少视角先验、生成模型的潜空间设计。",
    venue: "SIGGRAPH / SIGGRAPH Asia（TOG）、CVPR / ICCV / ECCV、3DV、NeurIPS"
  },
  recipe: ["选定表示（3DGS / NeRF / 网格）与任务（重建 / 生成 / 编辑）", "在标准场景集上复现基线指标与 FPS", "定位失败（漂浮物、模糊、几何错误）", "改进表示/损失/稠密化，或引入新先验", "定量 + 大量视频对比（图形学评审很看视觉效果）"],
  fit: {
    yes: ["喜欢看得见的结果、对视觉质量挑剔", "数学和工程都能接受（几何 + CUDA）", "对游戏/影视/AR/具身仿真有兴趣"],
    no: ["不想碰底层代码与 CUDA", "只想做纯语言/推理类工作"]
  },
  trial: [
    ["Day 1–3", "看 Games101 光栅化与光线追踪部分；读 3DGS 论文。"],
    ["Day 4–7", "用 nerfstudio/gsplat 对自己拍的物体视频做 COLMAP + 3DGS 重建，在浏览器里查看。"],
    ["Day 8–11", "改一个东西：稠密化阈值、加深度正则或少视角设置，观察 PSNR 与漂浮物变化。"],
    ["Day 12–14", "试一个 3D 生成模型（TRELLIS），把生成结果导入 Blender 或 MuJoCo，看问题在哪。"]
  ],
  classic: [
    ["The Rendering Equation", "Kajiya", 1986, "SIGGRAPH", "渲染的统一方程。"],
    ["SMPL: A Skinned Multi-Person Linear Model", "Loper et al.", 2015, "SIGGRAPH Asia", "参数化人体模型，人体方向的公共语言。"],
    ["DeepSDF: Learning Continuous Signed Distance Functions for Shape Representation", "Park et al.", 2019, "CVPR", "隐式表示。"],
    ["NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis", "Mildenhall et al.", 2020, "ECCV", "神经渲染的起点。"],
    ["Instant Neural Graphics Primitives with a Multiresolution Hash Encoding", "Müller et al.", 2022, "SIGGRAPH", "哈希编码加速。"],
    ["Mip-NeRF 360: Unbounded Anti-Aliased Neural Radiance Fields", "Barron et al.", 2022, "CVPR", "无界场景标准基准。"],
    ["3D Gaussian Splatting for Real-Time Radiance Field Rendering", "Kerbl et al.", 2023, "SIGGRAPH", "当前主流表示。"],
    ["DreamFusion: Text-to-3D using 2D Diffusion", "Poole et al.", 2023, "ICLR", "SDS：用 2D 扩散生成 3D。"]
  ],
  recent: [
    ["LRM: Large Reconstruction Model for Single Image to 3D", "Hong et al.", 2024, "ICLR", "大规模前馈重建。"],
    ["MVSplat: Efficient 3D Gaussian Splatting from Sparse Multi-View Images", "Chen et al.", 2024, "ECCV", "前馈高斯。"],
    ["2D Gaussian Splatting for Geometrically Accurate Radiance Fields", "Huang et al.", 2024, "SIGGRAPH", "几何精确的高斯。"],
    ["4D Gaussian Splatting for Real-Time Dynamic Scene Rendering", "Wu et al.", 2024, "CVPR", "动态场景。"],
    ["Structured 3D Latents for Scalable and Versatile 3D Generation", "Xiang et al.", 2025, "CVPR", "TRELLIS：原生 3D 生成。"],
    ["Hunyuan3D 2.0: Scaling Diffusion Models for High Resolution Textured 3D Assets Generation", "Tencent Hunyuan3D Team", 2025, "arXiv", "开源高质量 3D 资产生成。"]
  ]
},
{
  id: "05", name: "生成模型", en: "Generative Models", branch: "vision",
  tagline: "学会一个分布并从中采样。扩散与流匹配统一了图像、视频、3D 甚至语言；现在的问题是更快、更可控、更懂物理。",
  meters: [4, 4, 5, 5],
  leaves: ["VAE / ELBO", "GAN", "自回归生成", "扩散 DDPM", "Score / SDE / 概率流 ODE", "Flow Matching / Rectified Flow", "条件生成与 CFG", "潜空间扩散 / DiT", "少步采样 / 蒸馏 / 一致性模型", "离散 / 掩码扩散", "Tokenizer", "视频生成"],
  keywords: ["diffusion", "扩散", "flow matching", "流匹配", "GAN", "视频生成", "DiT"],
  overview: [
    "生成模型的核心问题：给定数据样本，学会它的分布并能高效采样。历史上有四条路线：<b>VAE</b>（最大化 ELBO）、<b>GAN</b>（对抗博弈）、<b>自回归</b>（逐 token 预测）、<b>扩散/流</b>（学一个把噪声搬运到数据的向量场）。",
    "2020 年 DDPM 之后扩散模型统治了图像生成；Song 等人的 SDE 框架和 2022 年后的<b>Flow Matching / Rectified Flow</b> 给出更统一简洁的视角——今天 SD3、FLUX、主流视频模型都基于流匹配 + Transformer（DiT）在 VAE 潜空间中训练。",
    "前沿在四个方向推进：<b>少步/一步生成</b>（一致性模型、MeanFlow）、<b>更好的 tokenizer 与表征对齐</b>（REPA）、<b>视频与世界模拟</b>（Sora、Veo、开源 Wan）、<b>离散扩散语言模型</b>（LLaDA）。自回归路线也通过 VAR 等在图像上回归，“统一理解与生成”是与 07 交汇的热点。"
  ],
  frontier: [
    ["一步/少步生成", "Consistency Models、Shortcut Models、MeanFlow 等从目标函数层面做到 1–4 步高质量采样，不再依赖蒸馏。"],
    ["表征对齐与 tokenizer", "REPA 把扩散模型中间特征对齐到 DINOv2，训练提速十几倍；VAE/tokenizer 的设计（压缩率 vs 可生成性）成为独立研究方向。"],
    ["视频生成", "Wan、HunyuanVideo 等开源模型把视频生成带入学术界可研究范围；长视频一致性、物理合理性、相机控制是主要问题。"],
    ["离散扩散语言模型", "LLaDA 等证明掩码扩散在 8B 规模可与自回归 LLM 竞争，具备并行解码与双向推理潜力。"],
    ["自回归视觉生成的复兴", "VAR（next-scale prediction，NeurIPS 2024 最佳论文）等让自回归在图像上重新具备竞争力，并便于与 LLM 统一。"]
  ],
  ideas: [
    ["生成模型的记忆与数据效率", "什么时候扩散模型在复刻训练样本、什么时候在泛化，这关系到版权与科学理解。在 CIFAR/小 ImageNet 上即可研究，理论与实验都能做。", "固定架构，改变训练集大小（1k→50k），测量最近邻相似度与 FID，找到记忆→泛化的转折点并研究它与模型容量的关系。"],
    ["Tokenizer 的“可生成性”度量", "重建好的 tokenizer 不一定好生成。如果能给出一个不训练生成模型就能预测生成质量的指标，能省大量算力。", "训练 5–10 个不同配置的小 VAE，在 ImageNet-64 上分别训练小 DiT，寻找与最终 FID 相关的 tokenizer 潜空间统计量。"],
    ["视频生成中的物理一致性评测与改进", "视频模型常违反物体恒存、重力与碰撞。可度量的物理一致性是通往“世界模型”（12）的必经之路。", "构造带物理真值的合成视频集（简单刚体碰撞），评测开源视频模型，尝试用物理仿真数据少量微调。"]
  ],
  prereq: {
    must: ["01 中的概率、KL、变分推断；能推 ELBO", "扩散的前向/反向过程、DDPM 损失、score 与噪声预测的关系", "Flow Matching 的条件流与速度场目标", "Classifier-free guidance 原理", "U-Net 与 DiT 架构；VAE 潜空间扩散流程"],
    nice: ["SDE / ODE 数值求解器", "最优传输视角", "diffusers 库源码熟悉度", "大规模数据处理（视频数据清洗很重）"]
  },
  setup: {
    data: "CIFAR-10、ImageNet 256×256（类条件 FID-50K 是黄金标准）、LAION/DataComp 子集（文生图）、WebVid、Panda-70M（视频）。",
    compute: "CIFAR 级研究 1–8 卡数天；ImageNet-256 DiT-XL 级训练需要数百到上千 GPU 天（REPA 等可大幅缩短）；文生图/视频从头训练学术界很难，多做微调与后训练。",
    code: "diffusers、DiT / SiT / REPA 官方仓库、k-diffusion、EDM 代码、torchcfm（流匹配）。",
    bench: "FID、IS、Precision/Recall；文生图 GenEval、T2I-CompBench；视频 FVD、VBench；人类偏好评测。",
    improve: "训练目标与参数化、噪声调度、采样器与步数、引导方法、架构、tokenizer、蒸馏与一步生成、后训练对齐（RLHF/DPO for diffusion）。",
    venue: "NeurIPS / ICLR / ICML / CVPR / ICCV；SIGGRAPH（偏应用）"
  },
  recipe: ["在 CIFAR-10 或 ImageNet-64 上复现基线 FID", "提出目标函数/采样/架构改动，用小模型快速验证", "扩展到 ImageNet-256（或在潜空间），报告 FID vs 训练步数/NFE 曲线", "消融 + 理论解释（生成模型评审很看重原理）", "附大量样本图，避免挑图嫌疑"],
  fit: {
    yes: ["喜欢概率与微分方程，又喜欢看图", "愿意在算力上精打细算", "对内容生成产业感兴趣"],
    no: ["算力极少且不想做理论或小规模研究", "受不了 FID 的噪声和评测争议"]
  },
  trial: [
    ["Day 1–3", "精读 DDPM 与 Flow Matching，手推损失函数；读 Lilian Weng 的扩散博客。"],
    ["Day 4–7", "从零写一个 MNIST/CIFAR 流匹配模型（200 行内），生成样本。"],
    ["Day 8–11", "改采样步数、CFG 强度、噪声调度，画 FID-步数曲线。"],
    ["Day 12–14", "用 diffusers 对 SD/FLUX 做 LoRA 微调，体会工业流程；判断你更喜欢原理还是应用。"]
  ],
  classic: [
    ["Auto-Encoding Variational Bayes", "Kingma, Welling", 2014, "ICLR", "VAE。"],
    ["Generative Adversarial Nets", "Goodfellow et al.", 2014, "NeurIPS", "GAN。"],
    ["Denoising Diffusion Probabilistic Models", "Ho, Jain, Abbeel", 2020, "NeurIPS", "DDPM。"],
    ["Score-Based Generative Modeling through Stochastic Differential Equations", "Song et al.", 2021, "ICLR", "SDE 统一框架。"],
    ["Elucidating the Design Space of Diffusion-Based Generative Models", "Karras et al.", 2022, "NeurIPS", "EDM：设计空间的系统梳理。"],
    ["High-Resolution Image Synthesis with Latent Diffusion Models", "Rombach et al.", 2022, "CVPR", "Stable Diffusion。"],
    ["Classifier-Free Diffusion Guidance", "Ho, Salimans", 2021, "NeurIPS Workshop", "CFG。"],
    ["Flow Matching for Generative Modeling", "Lipman et al.", 2023, "ICLR", "流匹配。"],
    ["Scalable Diffusion Models with Transformers", "Peebles, Xie", 2023, "ICCV", "DiT。"]
  ],
  recent: [
    ["Consistency Models", "Song et al.", 2023, "ICML", "一步生成的起点。"],
    ["Scaling Rectified Flow Transformers for High-Resolution Image Synthesis", "Esser et al.", 2024, "ICML", "SD3：流匹配规模化。"],
    ["Visual Autoregressive Modeling: Scalable Image Generation via Next-Scale Prediction", "Tian et al.", 2024, "NeurIPS", "VAR，最佳论文。"],
    ["Representation Alignment for Generation: Training Diffusion Transformers Is Easier Than You Think", "Yu et al.", 2025, "ICLR", "REPA。"],
    ["Mean Flows for One-step Generative Modeling", "Geng et al.", 2025, "NeurIPS", "一步生成新目标。"],
    ["Large Language Diffusion Models", "Nie et al.", 2025, "arXiv", "LLaDA：扩散语言模型。"],
    ["Wan: Open and Advanced Large-Scale Video Generative Models", "Wan Team (Alibaba)", 2025, "arXiv", "开源视频生成。"]
  ]
}
);
